# ACE Engineering — Power Solutions

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

## Before the client meeting — the edit checklist

Everything that needs real data is in **one file**: `lib/site.config.ts`

- [ ] WhatsApp number (digits only, international format)
- [ ] Contact email + affiliate/partners email
- [ ] Phone and office location

Then, when their content document arrives:

- [ ] `components/Hero.tsx` — replace the 4 stat figures (marked `TODO`)
- [ ] `components/Services.tsx` — swap the 6 service descriptions
- [ ] `components/About.tsx` — replace company copy (marked `TODO`)
- [ ] `public/hero-city.webp` — swap if they want a different hero image

## Forms

Both forms (contact + affiliate) currently open a pre-filled email in the
visitor's mail client (`mailto:`) — zero backend, works everywhere, fine for v1.

To upgrade to silent email delivery later: add a [Resend](https://resend.com)
API key and a small `/app/api/contact/route.ts` handler, or point the form
`action` at [FormSubmit](https://formsubmit.co) / [Formspree](https://formspree.io).

## Design system

| Token | Value | Use |
|---|---|---|
| `ink` | `#060B18` | Page background |
| `amp` | `#F58220` | Accent |
| `volt` | `#2E6FF2` | Blueprint grid lines only |
| Display | Barlow Condensed | Headlines, uppercase |
| Body | IBM Plex Sans | Paragraphs |
| Spec | IBM Plex Mono | Labels, figures, eyebrows |

Signature motion: a pinned hero scene with three parallax layers moving at
different depths (`components/Hero.tsx`), and a scroll-driven horizontal
service gallery (`components/Services.tsx`). Both respect reduced-motion.
