# ACE Engineering — Integrated Infrastructure Solutions

Single-page credibility site. Next.js 15 (App Router) · Tailwind CSS · Framer Motion. Fully static — deploys to Vercel free tier.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Deploy to Vercel

1. Push this folder to a GitHub repo
2. vercel.com → New Project → import the repo → Deploy (zero config needed)
3. Add the custom domain in Vercel → Settings → Domains when ready

## Editing content

Contact details (WhatsApp, emails, phone, registered office address) live in
**one file**: `lib/site.config.ts`.

Site copy comes from the client's wording document (integrated). Sections, in
page order: `Hero`, `Services` (5 solutions + capability tags), `StatsBand`
(Why-ACE pillars + marquee), `Sectors` (4 industries), `About`, `HowWeWork`
(5-step process), `Affiliate` (5-step programme), `Contact`.

Brand assets live in `public/brand/` — the primary lockup from the client's
logo package as vector SVG in navy (`#05162D`), white and black. Per the
client, only the primary lockup is used; the favicon (`app/icon.png`) uses
the A-peak mark from the same artwork.

## Contact form

The consultation form posts to `app/api/contact/route.ts`, which delivers a
branded HTML email (navy header + ACE logo) to `site.email` via
[Resend](https://resend.com), with Reply-To set to the enquirer so the team
can respond directly from their inbox.

Setup:

1. Create a Resend account and verify the `ace-engineering.co` sending domain
   (Resend dashboard → Domains).
2. Create an API key (Resend dashboard → API Keys).
3. Add environment variables — on Vercel: Project → Settings → Environment
   Variables; locally: `.env.local` (gitignored):
   - `RESEND_API_KEY` — required
   - `CONTACT_FROM_EMAIL` — optional; defaults to
     `ACE Engineering <noreply@ace-engineering.co>`. Must be an address on a
     verified domain (use `onboarding@resend.dev` while testing).

The route validates server-side (mirroring the client rules, plus length
caps) and includes a honeypot field that silently drops bot submissions. If
the API key is missing, the endpoint returns 503 and the form shows a
fallback message with the direct email address.

The affiliate section links to a pre-filled `mailto:` — no backend needed.

## Design system

| Token | Value | Use |
|---|---|---|
| `ink` | `#040E1C` | Page background |
| `navy` | `#05162D` | Brand navy (logo colour) |
| `amp` | `#7FA6D9` | Accent — steel/ice blue |
| `volt` | `#2E6FF2` | Blueprint grid lines only |
| Display | Barlow Condensed | Headlines, uppercase |
| Body | IBM Plex Sans | Paragraphs |
| Spec | IBM Plex Mono | Labels, figures, eyebrows |

Signature motion: a pinned hero scene with three parallax layers moving at
different depths (`components/Hero.tsx`), and a scroll-driven horizontal
service gallery (`components/Services.tsx`). Both respect reduced-motion.
