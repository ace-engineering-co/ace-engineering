/**
 * Canonical site URL for metadata, sitemap, robots and structured data.
 * Server-side only (sitemap/robots/layout — not client components).
 *
 * Resolution order:
 *  1. NEXT_PUBLIC_SITE_URL — explicit override, set this when hosting
 *     anywhere other than Vercel (e.g. https://www.ace-engineering.co)
 *  2. VERCEL_PROJECT_PRODUCTION_URL — set automatically by Vercel to the
 *     current production domain, so custom-domain changes need no code edit
 *  3. localhost fallback for local development
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");
