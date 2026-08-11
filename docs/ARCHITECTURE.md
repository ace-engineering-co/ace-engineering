# Architecture

Technical map of the ACE Engineering website for developers taking over
the codebase. Read the [README](../README.md) first for setup and
deployment; this document explains how the site is put together and why.

## Overview

A single-route Next.js 15 App Router site. Every page is statically
generated at build time; the only server-side code is the contact-form
API route. There is no database, no CMS and no client-side data
fetching — content is compiled in.

```
Request flow
────────────
GET /            → static HTML (prerendered at build)
GET /sitemap.xml → static (build-time)
GET /robots.txt  → static (build-time)
POST /api/contact → serverless function → Turnstile verify → Resend email
```

## Rendering model

- `app/layout.tsx` — server component. Loads fonts (self-hosted via
  Fontsource), global CSS, all SEO metadata, and wraps children in
  `SmoothScroll` (Lenis).
- `app/page.tsx` — server component. Composes the eleven section
  components in page order and embeds the Schema.org JSON-LD
  (`lib/structured-data.ts`).
- Most section components are client components (`"use client"`) because
  they animate with Framer Motion. They contain no data fetching — being
  client components only means they hydrate; their initial HTML is still
  server-rendered and crawlable.

## Section components

Composed top-to-bottom in `app/page.tsx`:

| # | Component | Purpose | Notable mechanics |
|---|---|---|---|
| 1 | `Nav` | Fixed header | Scroll-aware backdrop; mobile burger menu |
| 2 | `Hero` | Pinned intro scene | See "Hero scene" below |
| 3 | `Services` | 5 solution cards | Scroll-driven horizontal gallery (desktop) |
| 4 | `StatsBand` | "Why ACE" pillars | Ghost-type marquee, parallax backdrop |
| 5 | `Sectors` | 4 industry cards | Hover lift + image zoom |
| 6 | `About` | Company copy | Scroll-scrubbed clip-path wipe on the image |
| 7 | `HowWeWork` | 5-step process | Static grid with reveals |
| 8 | `Affiliate` | Partner programme | Dark band, faded handshake backdrop |
| 9 | `Contact` | Form + details | See "Contact pipeline" below |
| 10 | `Footer` + `WhatsAppFab` | Footer, WhatsApp button | — |
| 11 | `ConsultationFab` | Edge CTA tab | Hides when the contact section is visible |

Sections overlap the previous one with `-mt-10 rounded-t-[2.5rem]` to
create the stacked-cards page rhythm.

## Motion system

Three cooperating layers — all of them honour `prefers-reduced-motion`
(via `useReducedMotion()` in components and a global CSS kill switch in
`globals.css` that snaps CSS animations to their end state):

1. **Lenis inertial scrolling** (`SmoothScroll.tsx`) — makes
   scroll-scrubbed animation feel continuous. Disabled entirely for
   reduced-motion users.
2. **Scroll-scrubbed transforms** (Framer Motion `useScroll` +
   `useTransform` + `useSpring`) — nothing "triggers once"; opacity and
   position are functions of scroll position, so everything works in
   both scroll directions. `Reveal.tsx` is the reusable primitive.
3. **CSS keyframe animations** (`globals.css`) — the hero *entrance*
   (`hero-rise`, `hero-line`), marquee, aurora glow, floating chips and
   CTA glow. The hero entrance is deliberately CSS, not Framer: it must
   paint before JS hydrates because the hero intro paragraph is the
   page's LCP element. Do not convert it back to Framer without
   re-checking Lighthouse.

### Hero scene (`Hero.tsx`)

A 190vh wrapper with a sticky full-viewport section. Depth is sold three
ways: scroll parallax (city image, circuit SVG and content move at
different rates), pointer parallax on springs (fine pointers only), and
ambient loops (energy pulses along SVG wires, aurora breathing).

### Services gallery (`Services.tsx`)

Desktop: a 260vh section pins its content; vertical scroll drives the
card track horizontally by the measured overflow, so it lands exactly on
the last card at any viewport width. The skip arrow jumps the page
scroll (the single source of truth) rather than the track. Mobile and
reduced-motion get a vertical stack.

## Contact pipeline

```
Contact.tsx (client)
  ├─ field validation (validators map + PhoneField validity callback)
  ├─ honeypot field ("website" — hidden, must stay empty)
  ├─ Turnstile widget (lazy: script injected when section nears viewport)
  └─ POST /api/contact { ...form, website, captchaToken }

app/api/contact/route.ts (serverless)
  ├─ JSON parse → 400 on garbage
  ├─ honeypot filled → fake 200 (bots learn nothing)
  ├─ validate + length-cap all fields → 400
  ├─ Turnstile siteverify → 403 (fail-closed; skipped if key unset)
  ├─ RESEND_API_KEY missing → 503
  └─ Resend send → 200, or 502 on provider error

lib/contact-email.ts   – HTML + text template (all input HTML-escaped)
lib/email-logo.ts      – logo PNG as base64, attached inline (cid)
```

The email's Reply-To is the inquirer's address, so the team replies
directly from their inbox.

`PhoneField.tsx` exists purely for performance: react-phone-number-input
ships libphonenumber metadata plus 265 inline flag SVGs, so it is loaded
with `next/dynamic` after hydration instead of in the critical bundle.
The flags must stay inline (not the library's default CDN images)
because the CSP blocks external image hosts.

## SEO layer

- `lib/seo.ts` — single source for the canonical origin
  (`NEXT_PUBLIC_SITE_URL` → Vercel production URL → localhost).
- `app/sitemap.ts`, `app/robots.ts`, `app/manifest.ts` — file-convention
  metadata routes.
- `lib/structured-data.ts` — Organization + WebSite JSON-LD with an
  OfferCatalog mirroring the five solutions. **Keep it in sync with
  `Services.tsx` and `site.config.ts` when content changes.**
- `app/layout.tsx` — title/description/keywords/canonical/OG/Twitter.

## Performance decisions worth preserving

Lighthouse (mobile emulation) went 63 → ~87–92 through these; revisit
the report before undoing any of them:

1. `PhoneField` lazy-loading (−97 kB first-load JS).
2. CSS hero entrance (LCP no longer waits for hydration).
3. Modern `browserslist` in `package.json` (no legacy polyfills).
4. `priority` on the hero image only; everything else lazy-loads.
5. Self-hosted fonts with per-subset files (no external font requests).

## Conventions

- **TypeScript strict**, no `any` in app code.
- **One component per section**, copy defined in arrays at the top of
  the file that renders it.
- **Design tokens only** — no raw hex values in components except where
  SVG attributes require them (`#7FA6D9` accents in inline SVGs).
- `npm run lint && npm run typecheck && npm run build` must pass before
  every push; there is no CI, so this is a working agreement.
