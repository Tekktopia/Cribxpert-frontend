import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')!;
const FROM = 'Cribxpert <info@tekktopia.com>';
const YEAR = new Date().getFullYear();

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// --- HTML builders ---

function baseTemplate(headerColor: string, headerText: string, body: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    body { margin:0; padding:0; background:#f4f4f4; font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif; color:#333; }
    .wrapper { max-width:600px; margin:40px auto; background:#fff; border-radius:10px; box-shadow:0 4px 12px rgba(0,0,0,.08); overflow:hidden; }
    .header { background:${headerColor}; color:#fff; padding:20px 30px; font-size:22px; font-weight:bold; text-align:center; }
    .content { padding:30px; }
    .greeting { font-size:18px; margin-bottom:20px; }
    .message { font-size:14px; margin-bottom:20px; line-height:1.5; }
    .box { border-radius:8px; padding:20px; margin:20px 0; }
    .footer-text { margin-top:40px; font-size:14px; color:#777; }
    .footer-text a { color:#0668fd; text-decoration:none; font-weight:bold; }
    .footer-banner { background:#0668fd; color:#fff; text-align:center; padding:15px 20px; font-size:14px; font-weight:500; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">${headerText}</div>
    <div class="content">
      ${body}
      <div class="footer-text">
        <p>If you have any questions, contact us at <a href="mailto:info@tekktopia.com">info@tekktopia.com</a>.</p>
        <p>The Cribxpert Support Team</p>
      </div>
    </div>
    <div class="footer-banner">&copy; ${YEAR} Cribxpert. All rights reserved.</div>
  </div>
</body>
</html>`;
}

function listingApprovedHtml(userName: string, listingName: string): string {
  return baseTemplate('#28a745', 'Cribxpert', `
    <p class="greeting">Hello ${userName},</p>
    <p class="message">Great news! Your listing has been reviewed and approved by our admin team.</p>
    <p style="font-weight:bold;color:#0668fd;font-size:16px;">Listing: ${listingName}</p>
    <div class="box" style="background:#d4edda;border:2px solid #28a745;">
      <p style="font-weight:bold;color:#155724;margin:0 0 10px 0;">Status: ✅ Approved</p>
      <p style="color:#155724;margin:0;">Your listing is now live and visible to all users on the platform!</p>
    </div>
    <p class="message">You can now start receiving bookings for your property. Thank you for being part of Cribxpert!</p>
  `);
}

function listingRejectedHtml(userName: string, listingName: string, reason?: string): string {
  return baseTemplate('#dc3545', 'Cribxpert', `
    <p class="greeting">Hello ${userName},</p>
    <p class="message">We regret to inform you that your listing has been reviewed and rejected by our admin team.</p>
    <p style="font-weight:bold;color:#0668fd;font-size:16px;">Listing: ${listingName}</p>
    <div class="box" style="background:#f8d7da;border:2px solid #dc3545;">
      <p style="font-weight:bold;color:#721c24;margin:0 0 10px 0;">Status: ❌ Rejected</p>
      ${reason ? `<div style="margin-top:15px;padding:15px;background:#fff;border-left:4px solid #dc3545;border-radius:4px;">
        <p style="font-weight:bold;color:#721c24;margin:0 0 8px 0;">Reason for Rejection:</p>
        <p style="color:#333;margin:0;">${reason}</p>
      </div>` : ''}
    </div>
    <p class="message">If you have any questions about this decision or would like to submit a new listing, please contact our support team.</p>
  `);
}

function listingFlaggedHtml(userName: string, listingName: string, reason?: string): string {
  return baseTemplate('#ffc107', 'Cribxpert', `
    <p class="greeting">Hello ${userName},</p>
    <p class="message">Your listing has been flagged by our admin team and requires review.</p>
    <p style="font-weight:bold;color:#0668fd;font-size:16px;">Listing: ${listingName}</p>
    <div class="box" style="background:#fff3cd;border:2px solid #ffc107;">
      <p style="font-weight:bold;color:#856404;margin:0 0 10px 0;">Status: ⚠️ Flagged</p>
      ${reason ? `<div style="margin-top:15px;padding:15px;background:#fff;border-left:4px solid #ffc107;border-radius:4px;">
        <p style="font-weight:bold;color:#856404;margin:0 0 8px 0;">Reason for Flagging:</p>
        <p style="color:#333;margin:0;">${reason}</p>
      </div>` : ''}
    </div>
    <p class="message">Your listing is currently under review. Our team will investigate and contact you if any action is required.</p>
  `);
}

function accountBlockedHtml(userName: string, reason: string): string {
  return baseTemplate('#dc3545', 'Cribxpert', `
    <p class="greeting">Hello ${userName},</p>
    <p class="message">We regret to inform you that your Cribxpert account has been blocked by our administration team.</p>
    <div class="box" style="background:#f8d7da;border:2px solid #dc3545;">
      <p style="font-weight:bold;color:#721c24;margin:0 0 10px 0;">⚠️ Account Status: Blocked</p>
      <p style="color:#721c24;margin:0 0 15px 0;line-height:1.5;">Your account access has been temporarily suspended. You will not be able to log in or use any features of the platform until further notice.</p>
      <div style="padding:15px;background:#fff;border-left:4px solid #dc3545;border-radius:4px;">
        <p style="font-weight:bold;color:#721c24;margin:0 0 8px 0;">Reason for Blocking:</p>
        <p style="color:#333;margin:0;line-height:1.6;">${reason}</p>
      </div>
    </div>
    <p class="message">If you believe this is an error, please contact our support team.</p>
  `);
}

function accountReinstatedHtml(userName: string): string {
  return baseTemplate('#28a745', 'Cribxpert', `
    <p class="greeting">Hello ${userName},</p>
    <p class="message">Good news! Your Cribxpert account has been reinstated by our administration team.</p>
    <div class="box" style="background:#d4edda;border:2px solid #28a745;">
      <p style="font-weight:bold;color:#155724;margin:0 0 10px 0;">✅ Account Status: Active</p>
      <p style="color:#155724;margin:0;">You can now log in and use all features of the platform.</p>
    </div>
    <p class="message">Welcome back to Cribxpert!</p>
  `);
}

// --- Send via Resend ---

async function sendEmail(to: string, subject: string, html: string): Promise<void> {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from: FROM, to, subject, html }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Resend error ${res.status}: ${text}`);
  }
}

// --- Router ---

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405, headers: corsHeaders });

  try {
    const { type, to, data } = await req.json() as {
      type: string;
      to: string;
      data: Record<string, string>;
    };

    if (!type || !to) {
      return new Response(JSON.stringify({ error: 'Missing type or to' }), { status: 400, headers: corsHeaders });
    }

    switch (type) {
      case 'listing_approved':
        await sendEmail(to, 'Your Listing Has Been Approved!', listingApprovedHtml(data.userName, data.listingName));
        break;
      case 'listing_rejected':
        await sendEmail(to, 'Your Listing Has Been Rejected', listingRejectedHtml(data.userName, data.listingName, data.reason));
        break;
      case 'listing_flagged':
        await sendEmail(to, 'Your Listing Has Been Flagged for Review', listingFlaggedHtml(data.userName, data.listingName, data.reason));
        break;
      case 'account_blocked':
        await sendEmail(to, 'Your Cribxpert Account Has Been Blocked', accountBlockedHtml(data.userName, data.reason));
        break;
      case 'account_reinstated':
        await sendEmail(to, 'Your Cribxpert Account Has Been Reinstated', accountReinstatedHtml(data.userName));
        break;
      default:
        return new Response(JSON.stringify({ error: `Unknown email type: ${type}` }), { status: 400, headers: corsHeaders });
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Email function error:', err);
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
