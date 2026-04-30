import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const SZND_BASE_URL = Deno.env.get('SZND_BASE_URL') ?? 'https://api.sznd.app/api/v1';
const SZND_API_KEY = Deno.env.get('SZND_API_KEY')!;
const SZND_SECRET_KEY = Deno.env.get('SZND_SECRET_KEY')!;

// Set ESCROW_MOCK_PAYMENT=true to bypass the SZND checkout call and immediately
// mark the booking as FUNDS_HELD — for testing the confirm/disburse flow without
// wallet funding being enabled on the SZND account.
const MOCK_PAYMENT = Deno.env.get('ESCROW_MOCK_PAYMENT') === 'true';

// CribXpert takes this % of the booking amount; host receives the rest.
// Override via PLATFORM_FEE_PERCENT env var (e.g. "10" = 10%).
const PLATFORM_FEE_PERCENT = parseFloat(Deno.env.get('PLATFORM_FEE_PERCENT') ?? '10');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// ── HMAC helpers ─────────────────────────────────────────────────────────────

async function hmacHex(secret: string, message: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(message));
  return Array.from(new Uint8Array(sig)).map((b) => b.toString(16).padStart(2, '0')).join('');
}

async function verifyHmac(secret: string, message: string, expected: string): Promise<boolean> {
  const actual = await hmacHex(secret, message);
  if (actual.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < actual.length; i++) diff |= actual.charCodeAt(i) ^ expected.charCodeAt(i);
  return diff === 0;
}

// ── SZND HTTP client ──────────────────────────────────────────────────────────

async function szndRequest<T>(
  method: string,
  path: string,
  body?: Record<string, unknown>,
): Promise<T> {
  const timestamp = new Date().toISOString();
  const bodyStr = body ? JSON.stringify(body) : '';
  const signature = await hmacHex(SZND_SECRET_KEY, `${bodyStr}|${timestamp}`);

  const res = await fetch(`${SZND_BASE_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': SZND_API_KEY,
      'x-timestamp': timestamp,
      'x-signature': signature,
    },
    ...(body ? { body: bodyStr } : {}),
  });

  const json = await res.json();
  if (!res.ok) throw new Error(json?.message ?? json?.error ?? JSON.stringify(json) ?? `SZND error ${res.status}`);
  return json as T;
}

// ── Password generation ───────────────────────────────────────────────────────

async function generateSzndPassword(email: string): Promise<string> {
  const raw = await hmacHex(SZND_SECRET_KEY, `sznd-customer:${email}`);
  return raw.slice(0, 32) + 'Aa1!';
}

// ── Response helpers ──────────────────────────────────────────────────────────

function jsonRes(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

function jsonErr(message: string, status = 400): Response {
  return jsonRes({ error: message }, status);
}

// ── Main handler ──────────────────────────────────────────────────────────────

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  const url = new URL(req.url);
  const path = url.pathname.replace(/.*\/escrow/, '') || '/';

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  );

  // ── POST /webhook — SZND event receiver (no JWT required) ─────────────────
  if (req.method === 'POST' && path === '/webhook') {
    const rawBody = await req.text();
    const signature = req.headers.get('X-Transfaar-Signature') ?? '';

    if (!(await verifyHmac(SZND_SECRET_KEY, rawBody, signature))) {
      return jsonErr('Invalid signature', 401);
    }

    let event: Record<string, unknown>;
    try { event = JSON.parse(rawBody); } catch { return jsonErr('Invalid JSON', 400); }

    const eventType = event.event as string;
    const data = (event.data ?? {}) as Record<string, unknown>;

    try {
      if (eventType === 'kyc_completed') {
        const szndUserId = data.user_id as string;
        await supabase.from('profiles')
          .update({ kyc_status: 'verified' })
          .eq('sznd_user_id', szndUserId);

        // Move all AWAITING_KYC bookings for this user to AWAITING_PAYMENT
        const { data: profile } = await supabase
          .from('profiles')
          .select('id')
          .eq('sznd_user_id', szndUserId)
          .single();
        if (profile?.id) {
          await supabase.from('bookings')
            .update({ escrow_status: 'AWAITING_PAYMENT' })
            .eq('user_id', profile.id)
            .eq('escrow_status', 'AWAITING_KYC');
        }

      } else if (eventType === 'virtual_bank_account') {
        await supabase.from('profiles')
          .update({ wallet_status: 'active' })
          .eq('sznd_user_id', data.user_id as string);

      } else if (eventType === 'transaction' || eventType === 'payment') {
        // Checkout webhook: { transaction_reference, transaction_status, reference, status }
        const txStatus = ((data.transaction_status ?? data.status) as string ?? '').toLowerCase();
        const ref = (data.reference ?? data.provider_reference ?? data.origin_reference) as string;

        if (ref) {
          const paid = txStatus === 'completed' || txStatus === 'successful' ||
            txStatus === 'funds_held' || txStatus === 'payment_confirmed';

          if (paid) {
            await supabase.from('bookings')
              .update({ escrow_status: 'FUNDS_HELD', paid_at: new Date().toISOString() })
              .eq('provider_reference', ref);
          } else if (txStatus === 'disbursed') {
            await supabase.from('bookings')
              .update({ escrow_status: 'DISBURSED' })
              .eq('provider_reference', ref);
          }
        }
      }
    } catch (err) {
      console.error('Webhook handler error:', err);
    }

    return jsonRes({ ok: true });
  }

  // ── All other routes require a valid Supabase JWT ─────────────────────────
  const authHeader = req.headers.get('Authorization');
  if (!authHeader) return jsonErr('Unauthorized', 401);

  const { data: { user }, error: authError } = await supabase.auth.getUser(
    authHeader.replace('Bearer ', ''),
  );
  if (authError || !user) return jsonErr('Unauthorized', 401);

  try {

    // ── POST /guests/register ───────────────────────────────────────────────
    if (req.method === 'POST' && path === '/guests/register') {
      const body = await req.json().catch(() => ({})) as Record<string, string>;

      // Check if already registered
      const { data: profile } = await supabase
        .from('profiles')
        .select('sznd_user_id, kyc_status, phone_no')
        .eq('id', user.id)
        .single();

      if (profile?.sznd_user_id) {
        return jsonRes({ szndUserId: profile.sznd_user_id, kycStatus: profile.kyc_status });
      }

      // Pull guest info from their most recent booking if not supplied
      const { data: booking } = await supabase
        .from('bookings')
        .select('first_name, last_name, email, phone_no')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      const email = body.email || booking?.email || user.email || '';
      const firstName = body.firstName || booking?.first_name || user.email?.split('@')[0] || 'Guest';
      const lastName = body.lastName || booking?.last_name || 'User';
      const rawPhone = body.phoneNo || booking?.phone_no || profile?.phone_no || '08000000000';
      const phoneNumber = rawPhone.startsWith('+') ? rawPhone : '+234' + rawPhone.replace(/^0/, '');
      const countryCode = body.countryCode || 'NG';
      const dateOfBirth = body.dateOfBirth || '1990-01-01';

      const password = await generateSzndPassword(email);

      let szndUser: { user_id?: string; data?: { id?: string }; user?: { id?: string }; onboarding_data?: { link?: string; expires_at?: string } };

      try {
        szndUser = await szndRequest<typeof szndUser>('POST', '/client/customers', {
          email,
          first_name: firstName,
          last_name: lastName,
          phone_number: phoneNumber,
          country_code: countryCode,
          date_of_birth: dateOfBirth,
          password,
        });
      } catch (err) {
        const msg = String(err).toLowerCase();
        if (msg.includes('403') || msg.includes('already registered') || msg.includes('email') || msg.includes('phone')) {
          // Already exists in SZND — look up their existing user by email
          const existing = await szndRequest<{ user_id?: string; user?: { id?: string } }>(
            'GET', `/client/customers/email/${encodeURIComponent(email)}`,
          ).catch(() => null);
          if (!existing) throw new Error('User already registered with SZND but could not retrieve their account. Please contact support.');
          szndUser = existing;
        } else {
          throw err;
        }
      }

      const szndUserId = szndUser.user_id ?? szndUser.user?.id ?? szndUser.data?.id ?? '';
      const kycLink = szndUser.onboarding_data?.link ?? null;
      const kycExpiresAt = szndUser.onboarding_data?.expires_at ?? null;

      await supabase.from('profiles')
        .update({ sznd_user_id: szndUserId, kyc_status: 'pending' })
        .eq('id', user.id);

      if (kycLink) {
        await supabase.from('bookings')
          .update({ kyc_link: kycLink, kyc_expires_at: kycExpiresAt })
          .eq('user_id', user.id)
          .eq('escrow_status', 'AWAITING_KYC');
      }

      return jsonRes({ szndUserId, kycLink, kycExpiresAt, kycStatus: 'pending' });
    }

    // ── GET /guests/:szndUserId/wallet ──────────────────────────────────────
    const walletMatch = path.match(/^\/guests\/([^/]+)\/wallet$/);
    if (req.method === 'GET' && walletMatch) {
      const wallets = await szndRequest<{ data: unknown[] }>(
        'GET', `/client/virtual-wallets?user_id=${walletMatch[1]}`,
      );
      return jsonRes({ wallets: wallets.data ?? [] });
    }

    // ── GET /bookings/:bookingId/status ─────────────────────────────────────
    const statusMatch = path.match(/^\/bookings\/([^/]+)\/status$/);
    if (req.method === 'GET' && statusMatch) {
      const { data: booking, error } = await supabase
        .from('bookings')
        .select('escrow_status, payment_bank_name, payment_account_number, payment_account_name, payment_currency, paid_at, provider_reference, sznd_transaction_id, kyc_link, kyc_expires_at')
        .eq('id', statusMatch[1])
        .single();

      if (error || !booking) return jsonErr('Booking not found', 404);
      return jsonRes({ booking });
    }

    // ── POST /bookings/:bookingId/initialize-payment ────────────────────────
    const initMatch = path.match(/^\/bookings\/([^/]+)\/initialize-payment$/);
    if (req.method === 'POST' && initMatch) {
      const bookingId = initMatch[1];

      // Load booking + guest details from DB
      const { data: bookingData, error: bookingErr } = await supabase
        .from('bookings')
        .select('total_price, first_name, last_name, email, phone_no')
        .eq('id', bookingId)
        .single() as { data: Record<string, unknown> | null; error: unknown };

      if (bookingErr || !bookingData) return jsonErr('Booking not found', 404);

      const amount = bookingData.total_price as number;
      if (!amount) return jsonErr('Booking has no total price', 400);

      // ── Mock mode: skip SZND, immediately mark as FUNDS_HELD ──────────────
      if (MOCK_PAYMENT) {
        const mockRef = `MOCK-${bookingId.slice(0, 8)}-${Date.now()}`;
        await supabase.from('bookings').update({
          escrow_status: 'FUNDS_HELD',
          paid_at: new Date().toISOString(),
          provider_reference: mockRef,
          sznd_transaction_id: mockRef,
        }).eq('id', bookingId);

        const frontendUrl = Deno.env.get('FRONTEND_URL') ?? 'https://cribxpert.com';
        return jsonRes({
          checkoutLink: `${frontendUrl}/escrow/${bookingId}`,
          transactionRef: mockRef,
          reference: mockRef,
          mocked: true,
        });
      }
      // ──────────────────────────────────────────────────────────────────────

      const rawPhone = (bookingData.phone_no as string) || '';
      const phoneNumber = rawPhone.startsWith('+') ? rawPhone : '+234' + rawPhone.replace(/^0/, '');

      const frontendUrl = Deno.env.get('FRONTEND_URL') ?? 'https://cribxpert.com';
      // Unique reference per attempt (allows retries without "Reference already used" error)
      const reference = `${bookingId.slice(0, 28)}-${Date.now().toString().slice(-10)}`;

      const checkout = await szndRequest<{
        success: boolean;
        data: {
          access_code: string;
          checkout_link: string;
          transactionRef: string;
          reference: string;
        };
      }>('POST', '/client/checkout/initialize', {
        email: bookingData.email as string,
        first_name: bookingData.first_name as string,
        last_name: bookingData.last_name as string,
        amount: amount.toFixed(2),
        currency: 'NGN',
        reference,
        redirectUrl: `${frontendUrl}/escrow/${bookingId}`,
        description: 'CribXpert booking payment',
        checkout_display_name: 'CribXpert',
        customer_phone_number: phoneNumber,
      });

      const cd = checkout.data;

      await supabase.from('bookings').update({
        escrow_status: 'AWAITING_PAYMENT',
        provider_reference: reference,
        sznd_transaction_id: cd.transactionRef,
      }).eq('id', bookingId);

      return jsonRes({
        checkoutLink: cd.checkout_link,
        transactionRef: cd.transactionRef,
        reference,
      });
    }

    // ── POST /bookings/:bookingId/verify-payment ────────────────────────────
    const verifyMatch = path.match(/^\/bookings\/([^/]+)\/verify-payment$/);
    if (req.method === 'POST' && verifyMatch) {
      const bookingId = verifyMatch[1];
      const body = await req.json().catch(() => ({}));
      const { providerReference: bodyRef } = body;

      const { data: booking } = await supabase
        .from('bookings')
        .select('provider_reference')
        .eq('id', bookingId)
        .single();

      const ref = bodyRef ?? booking?.provider_reference;
      if (!ref) return jsonErr('No provider reference found', 400);

      const result = await szndRequest<{
        payment_completed: boolean;
        status_name: string;
        transaction_status: string;
        transaction_id?: string;
        transaction_reference?: string;
      }>('GET', `/client/payment/verify?reference=${encodeURIComponent(ref)}`);

      const paid = result.payment_completed === true ||
        result.status_name === 'COMPLETED' ||
        result.transaction_status === 'COMPLETED';

      if (paid) {
        await supabase.from('bookings')
          .update({ escrow_status: 'FUNDS_HELD', paid_at: new Date().toISOString() })
          .eq('id', bookingId);
      }

      return jsonRes({ status: result.status_name ?? result.transaction_status, paid });
    }

    // ── POST /bookings/:bookingId/confirm-delivery ──────────────────────────
    const confirmMatch = path.match(/^\/bookings\/([^/]+)\/confirm-delivery$/);
    if (req.method === 'POST' && confirmMatch) {
      await supabase.from('bookings')
        .update({ escrow_status: 'DELIVERY_CONFIRMED' })
        .eq('id', confirmMatch[1]);

      return jsonRes({ message: 'Delivery confirmed. Funds are ready for release to the host.' });
    }

    // ── POST /bookings/:bookingId/disburse ──────────────────────────────────
    // Sends (amount × (1 - PLATFORM_FEE_PERCENT/100)) to the host via SZND TRANSFER.
    // CribXpert keeps the fee percentage in its own SZND wallet automatically.
    const disburseMatch = path.match(/^\/bookings\/([^/]+)\/disburse$/);
    if (req.method === 'POST' && disburseMatch) {
      const bookingId = disburseMatch[1];

      // 1. Load booking + listing + host profile in one go
      const { data: booking } = await supabase
        .from('bookings')
        .select('escrow_status, total_price, sznd_transaction_id, listing_id, user_id, profiles!user_id(sznd_user_id)')
        .eq('id', bookingId)
        .single() as { data: Record<string, unknown> | null };

      if (!booking) return jsonErr('Booking not found', 404);

      if (!['DELIVERY_CONFIRMED', 'FUNDS_HELD'].includes(booking.escrow_status as string)) {
        return jsonErr(`Cannot disburse — booking is ${booking.escrow_status}`, 400);
      }

      // 2. Get host's sznd_user_tag from their listing → profile
      const { data: listing } = await supabase
        .from('listings')
        .select('user_id')
        .eq('id', booking.listing_id as string)
        .single();

      if (!listing) return jsonErr('Listing not found', 404);

      const { data: hostProfile } = await supabase
        .from('profiles')
        .select('sznd_user_tag, sznd_user_id')
        .eq('id', listing.user_id)
        .single();

      if (!hostProfile?.sznd_user_tag) {
        return jsonErr('Host has not set up their SZND payout tag yet', 400);
      }

      // 3. Allow body override of amount; fall back to booking total_price
      const bodyData = await req.json().catch(() => ({})) as Record<string, unknown>;
      const rawAmount = (bodyData.amount ?? booking.total_price) as number;
      if (!rawAmount) return jsonErr('Booking has no total price', 400);

      // 4. Calculate host payout (deduct CribXpert's fee %)
      const hostAmount = (rawAmount * (1 - PLATFORM_FEE_PERCENT / 100)).toFixed(2);
      const platformFee = (rawAmount - parseFloat(hostAmount)).toFixed(2);

      // 5. Guest's SZND user id (needed as on_behalf_of for the TRANSFER)
      const guestProfile = booking.profiles as Record<string, unknown> | null;
      const guestSzndId = (guestProfile?.sznd_user_id ?? bodyData.customerId) as string | undefined;

      // 6. Create TRANSFER quote: CribXpert wallet → host wallet
      const quote = await szndRequest<{ data: { quote_id: string; id?: string } }>(
        'POST', '/client/quotes', {
          source_currency: 'NGN',
          target_currency: 'NGN',
          source_amount: hostAmount,
          quote_type: 'TRANSFER',
          user_tag: hostProfile.sznd_user_tag,
          payment_method: 'FIAT',
          narration: `Cribxpert payout - Booking ${bookingId}`,
          origin_reference: bookingId.slice(0, 40),
          tz: 'Africa/Lagos',
          ...(guestSzndId ? { on_behalf_of: guestSzndId } : {}),
        },
      );

      const quoteId = quote.data.quote_id ?? quote.data.id;

      // 7. Accept the quote — this executes the transfer immediately
      const accepted = await szndRequest<{ data: { transaction_id?: string; transaction_reference?: string } }>(
        'POST', `/client/quotes/${quoteId}/accept`, {},
      );

      // 8. Update booking
      await supabase.from('bookings').update({ escrow_status: 'DISBURSED' }).eq('id', bookingId);

      return jsonRes({
        message: 'Funds disbursed to host successfully',
        transactionId: accepted.data.transaction_id,
        reference: accepted.data.transaction_reference,
        hostAmount,
        platformFee,
        feePercent: PLATFORM_FEE_PERCENT,
      });
    }

    // ── POST /bookings/:bookingId/dispute ───────────────────────────────────
    const disputeMatch = path.match(/^\/bookings\/([^/]+)\/dispute$/);
    if (req.method === 'POST' && disputeMatch) {
      const bookingId = disputeMatch[1];
      const { reason } = await req.json();

      await supabase.from('bookings')
        .update({ escrow_status: 'DISPUTED' })
        .eq('id', bookingId);

      await supabase.from('notifications').insert({
        user_id: user.id,
        title: 'Dispute Raised',
        description: reason
          ? `Dispute raised for booking ${bookingId}: ${reason}`
          : `Dispute raised for booking ${bookingId}`,
        category: 'booking',
        is_read: false,
      });

      return jsonRes({ message: 'Dispute raised. Our team will review and contact you shortly.' });
    }

    // ── GET /users/:szndUserId/transactions ─────────────────────────────────
    const txMatch = path.match(/^\/users\/([^/]+)\/transactions$/);
    if (req.method === 'GET' && txMatch) {
      const page = url.searchParams.get('page') ?? '1';
      const limit = url.searchParams.get('limit') ?? '20';
      const result = await szndRequest<{ data: unknown[]; meta?: unknown }>(
        'GET', `/client/transactions/v2?user_id=${txMatch[1]}&page=${page}&limit=${limit}`,
      );
      return jsonRes({ transactions: result.data ?? [], meta: (result as Record<string, unknown>).meta ?? null });
    }

    // ── GET /users/:szndUserId/sznd-tag ─────────────────────────────────────
    const tagMatch = path.match(/^\/users\/([^/]+)\/sznd-tag$/);
    if (req.method === 'GET' && tagMatch) {
      const result = await szndRequest<{ data: { tag: string } }>(
        'GET', `/client/customers/${tagMatch[1]}`,
      );
      const tag = result.data?.tag ?? null;
      if (tag) {
        await supabase.from('profiles')
          .update({ sznd_user_tag: tag })
          .eq('sznd_user_id', tagMatch[1]);
      }
      return jsonRes({ tag });
    }

    // ── POST /users/:szndUserId/retry-wallet ─────────────────────────────────
    const retryMatch = path.match(/^\/users\/([^/]+)\/retry-wallet$/);
    if ((req.method === 'POST' || req.method === 'GET') && retryMatch) {
      const result = await szndRequest<{ data: unknown }>(
        'POST', `/client/customers/${retryMatch[1]}/create-wallet`, {},
      );
      return jsonRes({ wallet: result.data });
    }

    // ── GET /bookings/:bookingId/context ────────────────────────────────────
    const ctxMatch = path.match(/^\/bookings\/([^/]+)\/context$/);
    if (req.method === 'GET' && ctxMatch) {
      const bookingId = ctxMatch[1];
      const { data: b } = await supabase
        .from('bookings')
        .select(`
          *,
          listing:listings!listing_id(id, name, street, city, state, country),
          profile:profiles!user_id(sznd_user_id, kyc_status, wallet_status)
        `)
        .eq('id', bookingId)
        .single() as { data: Record<string, unknown> | null };

      if (!b) return jsonErr('Booking not found', 404);

      const profile = (b.profile ?? {}) as Record<string, unknown>;
      const listing = (b.listing ?? {}) as Record<string, unknown>;

      return jsonRes({
        bookingId: b.id,
        szndUserId: profile.sznd_user_id ?? null,
        kycLink: b.kyc_link ?? null,
        kycExpiresAt: b.kyc_expires_at ?? null,
        escrowStatus: (b.escrow_status as string) ?? 'AWAITING_KYC',
        walletStatus: (profile.wallet_status as string) ?? null,
        amount: b.total_price,
        currency: 'NGN',
        providerReference: b.provider_reference ?? null,
        paymentDetails: b.payment_account_number ? {
          bankName: b.payment_bank_name,
          accountNumber: b.payment_account_number,
          accountName: b.payment_account_name,
          currency: b.payment_currency ?? 'NGN',
        } : null,
        booking: {
          _id: b.id,
          startDate: b.start_date,
          endDate: b.end_date,
          totalPrice: b.total_price,
          listing: {
            name: listing.name,
            street: listing.street,
            city: listing.city,
            state: listing.state,
            country: listing.country,
          },
        },
      });
    }

    return jsonErr('Not found', 404);

  } catch (err) {
    console.error('Escrow function error:', err);
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
