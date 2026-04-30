import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import webpush from 'npm:web-push';

const VAPID_PUBLIC_KEY = Deno.env.get('VAPID_PUBLIC_KEY')!;
const VAPID_PRIVATE_KEY = Deno.env.get('VAPID_PRIVATE_KEY')!;
const VAPID_EMAIL = Deno.env.get('VAPID_EMAIL') ?? 'mailto:admin@cribxpert.com';

webpush.setVapidDetails(VAPID_EMAIL, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  const url = new URL(req.url);
  const path = url.pathname.replace(/.*\/push/, '');

  // GET /push/vapid-public-key
  if (req.method === 'GET' && path === '/vapid-public-key') {
    return new Response(JSON.stringify({ publicKey: VAPID_PUBLIC_KEY }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );

  // POST /push/subscribe
  if (req.method === 'POST' && path === '/subscribe') {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) return new Response('Unauthorized', { status: 401, headers: corsHeaders });
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error || !user) return new Response('Unauthorized', { status: 401, headers: corsHeaders });

    const body = await req.json();
    await supabase.from('push_subscriptions').upsert({
      user_id: user.id,
      endpoint: body.endpoint,
      p256dh: body.keys?.p256dh ?? '',
      auth: body.keys?.auth ?? '',
    }, { onConflict: 'endpoint' });

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  // POST /push/unsubscribe
  if (req.method === 'POST' && path === '/unsubscribe') {
    const body = await req.json();
    await supabase.from('push_subscriptions').delete().eq('endpoint', body.endpoint);
    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  // POST /push/send  — called by DB webhook when a notifications row is inserted
  if (req.method === 'POST' && path === '/send') {
    const body = await req.json();
    const userId: string = body.record?.user_id;
    const title: string = body.record?.title ?? 'New notification';
    const message: string = body.record?.description ?? body.record?.message ?? '';

    if (!userId) return new Response('Missing user_id', { status: 400, headers: corsHeaders });

    const { data: subs } = await supabase
      .from('push_subscriptions')
      .select('endpoint, p256dh, auth')
      .eq('user_id', userId);

    const payload = JSON.stringify({ title, body: message });

    const results = await Promise.allSettled(
      (subs ?? []).map((sub) =>
        webpush.sendNotification(
          { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } },
          payload
        )
      )
    );
    console.log('Push results:', results);

    return new Response(JSON.stringify({ sent: results.length }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  return new Response('Not found', { status: 404, headers: corsHeaders });
});
