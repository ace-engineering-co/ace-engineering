# ACE Engineering — Corporate Website

Single-page marketing site for **ACE Engineering**, an integrated
infrastructure solutions company (power generation, electrical
infrastructure, packaged solutions, offshore assets and project
development). The site presents the company's solutions, sectors, process
and affiliate programme, and delivers consultation enquiries by email.

## Tech stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router, React 19, TypeScript) |
| Styling | Tailwind CSS 3 |
| Animation | Framer Motion + Lenis smooth scrolling |
| Fonts | Self-hosted via Fontsource (Barlow Condensed, IBM Plex Sans, IBM Plex Mono) |
| Email delivery | Resend (contact form → serverless API route) |
| Linting | ESLint (`next/core-web-vitals` + TypeScript rules) |

Everything is self-hosted — no CDNs, analytics, trackers or external
requests at runtime. The only server-side code is the contact-form API
route; every page is statically generated.

## Requirements

- Node.js 20 or later (developed on Node 22)
- npm 10 or later

## Getting started

```bash
npm install
npm run dev        # development server on http://localhost:3000
```

Other scripts:

```bash
npm run build      # production build
npm run start      # serve the production build
npm run lint       # ESLint
npm run typecheck  # TypeScript, no emit
```

## Environment variables

| Variable | Required | Purpose |
|---|---|---|
| `RESEND_API_KEY` | Yes, for the contact form | API key from [Resend](https://resend.com) (Dashboard → API Keys) |
| `CONTACT_FROM_EMAIL` | No | Sender for enquiry emails. Defaults to `ACE Engineering <noreply@ace-engineering.co>`. Must belong to a domain verified in Resend. |

Locally, put them in `.env.local` (gitignored). Without `RESEND_API_KEY`
the site runs fine but form submissions return 503 and the visitor is
shown a fallback message with the direct contact email — the site never
breaks.

### Contact form / Resend setup

1. Create a Resend account and verify the sending domain
   (Dashboard → Domains → add the DNS records Resend provides).
2. Create an API key and set `RESEND_API_KEY` in your hosting platform.
3. Enquiries are delivered to the address in `lib/site.config.ts`
   (`site.email`), with Reply-To set to the enquirer.

The API route (`app/api/contact/route.ts`) validates all input
server-side, caps field lengths, and silently drops bot submissions via a
honeypot field. The email template (`lib/contact-email.ts`) is
table-based HTML with the ACE logo attached inline, so it renders
correctly in all major email clients without loading remote images.

## Deployment

The site needs a Node.js runtime (or serverless equivalent) because of
the contact-form API route. Any of the following work:

### Option A — Vercel (zero config)

1. Import the repository at vercel.com → New Project → Deploy.
2. Add `RESEND_API_KEY` under Settings → Environment Variables.
3. Add the custom domain under Settings → Domains.

Absolute URLs for social-share images are derived automatically from
`VERCEL_PROJECT_PRODUCTION_URL`, which Vercel sets on every deployment.

### Option B — Any Node host (VPS, Railway, Render, Fly.io, …)

```bash
npm ci
npm run build
npm run start   # listens on port 3000; use -p or PORT to change
```

Run it behind a reverse proxy (nginx/Caddy) with TLS, and keep the
process alive with your platform's supervisor (systemd, PM2, or the
host's built-in process management). Set `RESEND_API_KEY` in the service
environment.

### Option C — Docker

No Dockerfile ships with the repo, but the standard Next.js one works
unchanged: build with `node:22-alpine`, run `npm ci && npm run build`,
then `npm run start`. See the
[Next.js Docker example](https://github.com/vercel/next.js/tree/canary/examples/with-docker).

> **Note on static export:** `next export` / `output: "export"` is not
> supported as-is because of the API route. To host on a purely static
> platform, replace the form submission with a hosted form service and
> remove `app/api/`.

## Editing content

### Contact details — one file

All contact details live in **`lib/site.config.ts`**: company name,
WhatsApp number and pre-filled message, contact email, affiliate email,
phone, and the registered office address (rendered line-by-line in the
contact section).

### Copy and sections

Each page section is one self-contained component in `components/`,
composed in order by `app/page.tsx`:

| Section | Component | Content it owns |
|---|---|---|
| Sticky navigation | `Nav.tsx` | Anchor links, mobile menu |
| Hero | `Hero.tsx` | Headline, intro, CTAs, parallax scene |
| Solutions gallery | `Services.tsx` | 5 solution cards + capability tags |
| "Why ACE" band | `StatsBand.tsx` | 4 pillars + scrolling marquee |
| Industries | `Sectors.tsx` | 4 sector cards |
| Company | `About.tsx` | Company copy, principles, experience strip |
| Process | `HowWeWork.tsx` | 5-step delivery process |
| Affiliate programme | `Affiliate.tsx` | Programme steps + contact routes |
| Contact | `Contact.tsx` | Consultation form + contact details |
| Footer / FABs | `Footer.tsx`, `ConsultationFab.tsx` | Footer, WhatsApp + consultation buttons |

Copy lives in plain arrays/JSX at the top of each component — edit text
there directly; no CMS is involved.

### Images

- Photography: `public/img/*.webp` (webp, quality ~80). Cards and
  backgrounds are `next/image` fills, so any reasonable source size works.
- Brand: `public/brand/` holds the primary logo lockup as SVG in navy
  (`#05162D`), white and black; only the horizontal white variant is used
  in the UI. The favicon is `app/icon.png`.
- The email logo is a base64 PNG embedded in `lib/email-logo.ts`
  (regenerate from the white SVG with sharp if the logo ever changes).
- Social share image: `public/og-image.png` (1200×630).

## Design system

Defined in `tailwind.config.ts` + `app/globals.css`:

| Token | Value | Use |
|---|---|---|
| `ink` | `#040E1C` | Page background |
| `navy` | `#05162D` | Brand navy (logo colour) |
| `deep` | dark navy | Headings on light sections |
| `amp` | `#7FA6D9` | Accent — steel/ice blue |
| `volt` | `#2E6FF2` | Blueprint grid lines only |
| `paper` / `haze` / `steel` | light tones | Text on dark sections |
| `cloud` / `hairline` / `slate` | light greys | Light sections |

Type: Barlow Condensed (`display`, headlines), IBM Plex Sans (body),
IBM Plex Mono (`spec`, labels/eyebrows).

Signature motion: a pinned parallax hero (`Hero.tsx`) and a
scroll-driven horizontal solutions gallery (`Services.tsx`), with
scroll-scrubbed reveals (`Reveal.tsx`) and Lenis inertial scrolling
(`SmoothScroll.tsx`). **All motion honours `prefers-reduced-motion`** —
reduced-motion users get native scrolling and static content.

## Security

- Strict security headers are set for every response in
  `next.config.mjs`: same-origin Content-Security-Policy,
  `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`,
  `Referrer-Policy`, `Permissions-Policy` and HSTS. If you ever add an
  external service (analytics, embeds), extend the CSP accordingly.
- The contact API validates and length-caps all input server-side and
  HTML-escapes it before templating into email.
- Dependencies are pinned clean (`npm audit`: 0 vulnerabilities at
  handover). The `overrides` block in `package.json` keeps Next.js'
  nested `postcss`/`sharp` on patched versions — keep it until a Next
  release ships fixed versions itself.

## Project structure

```
app/
  layout.tsx        Root layout, fonts, metadata (SEO/OG)
  page.tsx          Section composition
  globals.css       Tailwind layers, design tokens, keyframes
  icon.png          Favicon
  api/contact/      Contact-form delivery (Resend)
components/         One component per page section (see table above)
lib/
  site.config.ts    All contact details — edit here
  contact-email.ts  Enquiry email template (HTML + text)
  email-logo.ts     Inline email logo (base64 PNG)
public/
  brand/            Logo SVGs
  img/              Photography (webp)
  og-image.png      Social share image
```
