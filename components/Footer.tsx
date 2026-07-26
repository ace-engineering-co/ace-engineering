import { site, waLink } from "../lib/site.config";

export function WhatsAppFab() {
  return (
    <a
      href={waLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="group fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-[0_8px_30px_rgba(37,211,102,0.35)] transition-transform hover:scale-110"
    >
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366]/40 [animation-duration:2.5s]" />
      <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff" aria-hidden>
        <path d="M17.5 14.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07a8.18 8.18 0 0 1-2.4-1.48 9 9 0 0 1-1.66-2.07c-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.5 0 1.47 1.07 2.9 1.22 3.1.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.11.57-.08 1.76-.72 2-1.41.25-.7.25-1.29.18-1.41-.08-.13-.28-.2-.58-.35Z" />
        <path d="M12.04 2a9.9 9.9 0 0 0-8.57 14.86L2 22l5.27-1.38A9.94 9.94 0 1 0 12.04 2Zm0 18.15c-1.5 0-2.97-.4-4.25-1.16l-.3-.18-3.13.82.84-3.05-.2-.31a8.26 8.26 0 1 1 7.04 3.88Z" />
      </svg>
    </a>
  );
}

export default function Footer() {
  return (
    <footer className="relative z-10 bg-ink py-10">
      <div className="mx-auto flex max-w-wrap flex-col items-start justify-between gap-6 px-5 md:flex-row md:items-center lg:px-8">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brand/logo-horizontal-white.svg"
          alt="ACE Engineering"
          className="h-7 w-auto"
        />
        <p className="spec text-steel">
          © {new Date().getFullYear()} {site.name} · {site.tagline}
        </p>
      </div>
    </footer>
  );
}
