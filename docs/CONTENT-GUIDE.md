# Content Guide

How to change what the site says and shows — written for whoever
maintains the site, including non-specialist developers. Every change
below follows the same loop:

```bash
npm run dev          # preview at http://localhost:3000 while editing
npm run lint && npm run typecheck && npm run build   # before pushing
```

Deploys are automatic on push to the production branch (see
[DEPLOYMENT.md](./DEPLOYMENT.md)).

## Contact details — `lib/site.config.ts`

The single file for every contact detail. Change a value here and it
updates everywhere it appears (nav, contact section, footer, WhatsApp
buttons, inquiry emails).

| Field | Shown where | Notes |
|---|---|---|
| `whatsapp` | WhatsApp buttons | Digits only, international format, no `+` |
| `whatsappMessage` | Pre-filled WhatsApp text | — |
| `email` | Contact section + inquiry recipient | Inquiries are delivered here |
| `affiliateEmail` | Affiliate section links | May equal `email` |
| `phone` / `phoneHref` | Contact section | Keep the two in sync |
| `addressLines` | Contact section "Office" | Each array entry renders as one line |

## Copy (text)

Text lives in plain arrays or JSX at the top of each section component —
edit it in place. Where each section lives:

| To change… | Edit |
|---|---|
| Headline, intro, hero CTAs | `components/Hero.tsx` |
| Solution cards + capability tags | `components/Services.tsx` (`services` array) |
| "Why ACE" pillars + marquee terms | `components/StatsBand.tsx` (`pillars`, `ticker`) |
| Industry cards | `components/Sectors.tsx` (`sectors` array) |
| Company copy + principles | `components/About.tsx` |
| Process steps | `components/HowWeWork.tsx` (`steps`) |
| Affiliate programme steps | `components/Affiliate.tsx` (`steps`) |
| Form labels, sector/power options | `components/Contact.tsx` (`sectors`, `loads`) |

**After changing solution names/descriptions**, mirror the change in
`lib/structured-data.ts` (search engines read it) — the five services
there must match `Services.tsx`.

**After changing major wording**, review the metadata in
`app/layout.tsx` (title, description, keywords) so search results stay
consistent with the page.

## Images

All photography: `public/img/*.webp`. Components render them with
`next/image` fills, so replacing a file with any reasonably sized image
(≥1280px wide, webp, quality ~80) just works — keep the same filename to
avoid touching code.

| File | Used in |
|---|---|
| `hero-plant.webp` | Hero background (also the largest visual — keep it sharp) |
| `svc-01/02/03/05/06.webp` | Solution cards (see `Services.tsx` for mapping) |
| `sector-dc/og/mining/ind.webp` | Industry cards |
| `about-ecosystem.webp` | Company section panel |
| `stats-bg.webp` | "Why ACE" band backdrop |
| `affiliate-bg.webp`, `affiliate-handshake.webp` | Affiliate band backdrops |
| `chip-a/b.webp` | Hero HUD chips (currently hidden in code) |

To convert a new photo to webp:

```bash
node -e "require('sharp')('new.jpg').webp({quality:80}).toFile('public/img/target.webp')"
```

### Brand assets

- `public/brand/` — primary logo lockup (SVG: navy/white/black,
  horizontal + stacked). The UI uses only
  `logo-primary-horizontal-white.svg`.
- `app/icon.png` — favicon (1024×1024).
- `public/og-image.png` — social-share card (1200×630). Replace it if
  branding changes; keep the exact dimensions.
- `lib/email-logo.ts` — the logo inside inquiry emails, embedded as
  base64 PNG. Regenerate after a logo change:

```bash
node -e "
const s = require('sharp');
s('public/brand/logo-primary-horizontal-white.svg', { density: 300 })
  .resize({ width: 400 }).png().toBuffer()
  .then(b => console.log(b.toString('base64')))"
# paste the output into EMAIL_LOGO_PNG_BASE64 in lib/email-logo.ts
```

## Design tokens

Colors and fonts are defined once in `tailwind.config.ts` (see the
README's design-system table). Use token classes (`text-amp`, `bg-ink`,
`text-ampdeep`, …) — never raw hex in components.

Contrast rule: on **light** backgrounds use `text-ampdeep` for small
accent text (the brighter `amp` fails WCAG contrast on white); `amp` is
fine on dark backgrounds and for borders/large shapes anywhere.

## Adding or removing a section

1. Create/delete the component in `components/`.
2. Add/remove it in `app/page.tsx` (order = page order).
3. If it should be navigable: give the `<section>` an `id` and add a
   link to the `links` array in `components/Nav.tsx`.
4. Keep the heading hierarchy: exactly one `h1` (hero), one `h2` per
   section (screen-reader-only is fine — see `StatsBand.tsx`), `h3`
   below that.
