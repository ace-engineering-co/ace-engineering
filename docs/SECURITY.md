# Security

Security posture of the site and the practices that keep it that way.

## Threat surface

The site is almost entirely static: no accounts, no database, no
cookies, no third-party scripts except Cloudflare Turnstile. The
attack surface reduces to:

1. `POST /api/contact` — the only mutable endpoint
2. The dependency chain (npm)
3. Hosting/DNS/provider accounts (Vercel, Resend, Cloudflare, registrar)

## HTTP security headers

Set for every response in `next.config.mjs`:

| Header | Value / effect |
|---|---|
| `Content-Security-Policy` | Everything locked to `'self'`; the only external origin allowed is `challenges.cloudflare.com` (Turnstile script, XHR, iframe). `object-src 'none'`, `frame-ancestors 'none'`, `base-uri 'self'`, `form-action 'self'`. |
| `X-Frame-Options` | `DENY` (clickjacking, legacy browsers) |
| `X-Content-Type-Options` | `nosniff` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | camera, microphone, geolocation, payment all disabled |
| `Strict-Transport-Security` | 2 years, includeSubDomains, preload |

`X-Powered-By` is disabled. `'unsafe-inline'` in script/style is
required by Next.js' static bootstrap (no per-request nonces on a
prerendered page); there is no user-generated content rendered anywhere,
so inline-injection vectors are absent by construction.

**If you add any external service** (analytics, embeds, fonts), you must
extend the CSP or the browser will silently block it. Test with DevTools
console after changing.

## Contact endpoint hardening

`app/api/contact/route.ts`, in order:

1. Malformed JSON → 400.
2. **Honeypot** — hidden `website` field filled → fake success (200),
   nothing sent.
3. **Validation** — required fields, email/phone format, length caps on
   every field (5 000 chars max message) → 400.
4. **Cloudflare Turnstile** — token verified server-side against
   `siteverify`, **fail-closed**: missing/invalid token or an
   unreachable verifier → 403.
5. **Templating** — all user input is HTML-escaped
   (`lib/contact-email.ts`) before entering the email body; subject and
   Reply-To use the validated values.

Secrets (`RESEND_API_KEY`, `TURNSTILE_SECRET_KEY`) exist only as
environment variables — never in the repository. `.env*.local` is
gitignored.

## Dependencies

- `npm audit` is **0 vulnerabilities** as of handover, and should stay
  that way — run it with every dependency change.
- The `overrides` block in `package.json` forces Next.js' nested
  `postcss` and `sharp` to patched versions (upstream Next 15.5 pins
  vulnerable ones). Keep it until `npm ls postcss sharp` shows no
  vulnerable nested copies after a Next upgrade.
- GitHub Dependabot alerts on the repository cover the lockfile;
  Vercel builds use `npm ci`-equivalent installs from that lockfile.

## Operational security

- Vercel, Resend, Cloudflare and the domain registrar accounts are the
  real keys to the site — protect them with strong auth/2FA and remove
  departed staff promptly.
- Key rotation procedures: see [DEPLOYMENT.md](./DEPLOYMENT.md#rotating-keys).
- The Resend key's blast radius is email-sending only; the Turnstile
  secret's is spam-filter bypass. Neither exposes data — the site
  stores nothing.

## Reporting

There is no user data to breach and no authentication to bypass, but if
a vulnerability is found in the site itself, fix-forward via the normal
deploy flow; Vercel's instant rollback covers regressions.
