/**
 * Fonts, images and first-party scripts are all self-hosted, so the CSP
 * locks to 'self' — the only external origin is Cloudflare Turnstile
 * (contact-form bot protection: script + challenge iframe).
 * 'unsafe-inline' is required for Next.js' inline bootstrap script and
 * styles on a statically generated page (no per-request nonces).
 */
const TURNSTILE = "https://challenges.cloudflare.com";
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' ${TURNSTILE}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  `connect-src 'self' ${TURNSTILE}`,
  `frame-src ${TURNSTILE}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests"
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" }
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  headers: async () => [{ source: "/(.*)", headers: securityHeaders }]
};

export default nextConfig;
