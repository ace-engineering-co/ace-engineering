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

## Remaining edit checklist

Contact details live in **one file**: `lib/site.config.ts`

- [ ] WhatsApp number (digits only, international format)
- [ ] Contact email + affiliate/partners email
- [ ] Phone, office location and LinkedIn URL

Site copy comes from the client's wording document (integrated). Sections, in
page order: `Hero`, `Services` (5 solutions + capability tags), `StatsBand`
(Why-ACE pillars + marquee), `Sectors` (4 industries), `About`, `HowWeWork`
(5-step process), `Affiliate` (5-step programme), `Contact`.

Brand assets live in `public/brand/` — vector-only set from the client's logo
package (primary navy `#05162D`): primary/horizontal/icon lockups in navy,
white and black. The white variants of the horizontal + icon marks are derived
recolors of the navy SVGs (the package only shipped raster PNGs for those).

Imagery still to swap:

- [ ] `components/Services.tsx` — Offshore infrastructure card needs a
      marine/offshore photo (marked `TODO`); no suitable image exists yet
- [ ] `public/img/hero-plant.webp` — swap if the client wants a different hero

## Forms

Both forms (contact + affiliate) currently open a pre-filled email in the
visitor's mail client (`mailto:`) — zero backend, works everywhere, fine for v1.

To upgrade to silent email delivery later: add a [Resend](https://resend.com)
API key and a small `/app/api/contact/route.ts` handler, or point the form
`action` at [FormSubmit](https://formsubmit.co) / [Formspree](https://formspree.io).

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
