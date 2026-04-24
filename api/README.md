# /api/ — Serverless Functions

**Status:** Reserved for future use. No functions live yet.

When you're ready to wire up live features (form submission, contact forms → email, admin auth, AI-assisted content), drop serverless function files in this directory. Vercel will auto-detect and deploy them.

## Example: form submission endpoint

Save as `api/submit-inquiry.js`:

```js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { name, email, phone, model, message } = req.body;

  // Example: send via Resend (resend.com)
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: 'inquiries@allterraincampers.com',
      to: 'atc@allterraincampers.com',
      subject: `New inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nModel: ${model}\n\nMessage:\n${message}`
    })
  });
  const ok = response.ok;
  res.json({ ok });
}
```

Then in `index.html`, change the `<form>` onsubmit handler to call this endpoint.

## Environment variables

Set these in Vercel → Settings → Environment Variables:

- `RESEND_API_KEY` — for email sending (if using Resend)
- `SENDGRID_API_KEY` — alternative email provider
- `ANTHROPIC_API_KEY` — for AI-assisted features (Phase 3+)
- `STRIPE_SECRET_KEY` — when real payments go live (Phase 4+)

## Runtime notes

- Vercel Node.js serverless functions use the `@vercel/node` runtime by default
- Free tier: 100 GB-hours/month, 100k invocations/month — plenty for a small business site
- Cold start: first request ~1s, subsequent ~50ms

See [Vercel Functions docs](https://vercel.com/docs/functions) for details.
