# Deployment & Operations

The site runs on **Vercel** with the production domain pointed at the
project and all environment variables configured. This document covers
the live setup, how to redeploy, and the operational runbook.

## Live configuration

| Item | Where | Value |
|---|---|---|
| Hosting | Vercel project | connected to this repository |
| Production branch | Vercel → Settings → Git | pushes auto-deploy |
| Domain | Vercel → Settings → Domains | apex + `www` of ace-engineering.co |
| `RESEND_API_KEY` | Vercel → Settings → Environment Variables | Resend dashboard → API Keys |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | 〃 | Cloudflare → Turnstile widget |
| `TURNSTILE_SECRET_KEY` | 〃 | 〃 |
| Resend sending domain | Resend → Domains | `ace-engineering.co`, DNS-verified |
| Turnstile widget | Cloudflare → Turnstile | Managed mode, site's domains listed |

The domain's DNS is hosted at **GoDaddy**: the apex `A` record and the
`www` CNAME point at Vercel, and the same zone carries the Microsoft 365
mail records (MX, SPF, DKIM CNAMEs) and Resend's records (`send` MX/TXT,
`resend._domainkey` TXT) — leave those in place when editing DNS.

`CONTACT_FROM_EMAIL` is optional (defaults to
`ACE Engineering <noreply@ace-engineering.co>`). `NEXT_PUBLIC_SITE_URL`
is **not needed on Vercel** — the canonical URL is derived from the
production domain automatically.

> `NEXT_PUBLIC_*` variables are baked in at build time: after changing
> one, trigger a redeploy for it to take effect.

## Deploying changes

1. Merge/push to the production branch.
2. Vercel builds (`npm run build`) and deploys automatically; failed
   builds never go live.
3. Every push also gets a unique preview URL — use it to review before
   merging.

Before pushing, always run locally:

```bash
npm run lint && npm run typecheck && npm run build
```

### Rollback

Vercel → Deployments → previous good deployment → **Promote to
Production** (instant, no rebuild).

## Runbook

### The contact form shows the error message

The form's fallback message includes the direct email, so inquiries are
never fully lost. Diagnose in order:

1. **Vercel → project → Logs**, filter `/api/contact`. The route logs
   the exact cause.
2. `503 Email service is not configured` — `RESEND_API_KEY` missing or
   deleted. Re-add and redeploy.
3. `502 Resend error` — check the [Resend status page](https://resend-status.com)
   and Resend dashboard → Logs (key revoked? domain verification
   lapsed? quota exhausted? Free tier is 100 emails/day).
4. `403 Verification failed` in logs from real users — check the
   Turnstile widget in the Cloudflare dashboard (domain list must
   include the production domain; site key and secret must be a pair).
   Removing both Turnstile env vars + redeploying disables the check
   entirely if Cloudflare is the problem.

### Inquiries aren't arriving in the inbox

1. Resend dashboard → Emails: was the send accepted/delivered?
2. Check the recipient's spam folder; the sending domain's DNS records
   (SPF/DKIM, in Resend → Domains) must remain in place at the DNS host.
3. The recipient address is `site.email` in `lib/site.config.ts`.

Each submission sends **two** emails: the internal notification and an
automated acknowledgment to the inquirer. The acknowledgment is
best-effort — if only it fails (visible in Resend → Emails / Vercel
logs), submissions still succeed and the team still gets the inquiry.
Note this doubles email volume against Resend's quota (free tier:
100/day).

### Rotating keys

- **Resend**: create the new API key first, swap the env var in Vercel,
  redeploy, then revoke the old key.
- **Turnstile**: Cloudflare → Turnstile → widget → rotate secret; update
  both env vars if the site key changed, redeploy.

### Spam getting through

Layers are honeypot → server validation → Turnstile. If spam still
arrives: in Cloudflare Turnstile, review widget analytics and consider
switching the widget from Managed to a stricter mode. All submissions
that pass carry a verified token, so volume abuse can also be curbed
with Vercel's firewall (project → Firewall) by rate-limiting
`POST /api/contact`.

### Dependency updates

```bash
npm outdated               # see what's behind
npm update                 # patch/minor updates within semver ranges
npm audit                  # must stay at 0 vulnerabilities
npm run lint && npm run typecheck && npm run build
```

Two constraints:

- Keep the `overrides` block in `package.json` (pins Next.js' nested
  `postcss`/`sharp` to patched versions) until a Next release includes
  the fixes itself — check with `npm ls postcss sharp` after upgrading
  Next, and drop the block once the nested copies are gone/patched.
- A **Next.js major upgrade** (16+) is a deliberate project, not an
  `npm update`: re-run the Lighthouse checks and the form tests after.

## Moving off Vercel

The site is portable — see the README's deployment options (any Node
host or Docker). When leaving Vercel, set `NEXT_PUBLIC_SITE_URL` to the
canonical origin (e.g. `https://www.ace-engineering.co`) so metadata,
sitemap and structured data keep absolute URLs, and carry over the three
environment variables.
