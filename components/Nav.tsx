"use client";
import { useEffect, useState } from "react";

const links: { href: string; label: string; highlight?: boolean }[] = [
  { href: "#services", label: "Solutions" },
  { href: "#sectors", label: "Industries" },
  { href: "#about", label: "Company" },
  { href: "#process", label: "How we work" },
  { href: "#affiliate", label: "Become an Affiliate Partner", highlight: true }
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-linedark/50 bg-ink/85 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-wrap items-center justify-between px-5 py-4 lg:px-8">
        <a href="#top" className="flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/logo-primary-horizontal-white.svg"
            alt="ACE Engineering"
            className="h-9 w-auto"
          />
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={
                l.highlight
                  ? "spec text-paper underline decoration-amp/70 underline-offset-4 transition-colors hover:text-amp"
                  : `spec transition-colors hover:text-paper ${
                      scrolled ? "text-steel" : "text-[#C5CDDB]"
                    }`
              }
            >
              {l.label}
            </a>
          ))}
        </nav>

        <button
          className="text-paper lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(!open)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3 7h18M3 12h18M3 17h18" />}
          </svg>
        </button>
      </div>

      {open && (
        <nav id="mobile-menu" className="border-t border-linedark/50 bg-ink/95 px-5 pb-6 pt-2 backdrop-blur-md lg:hidden">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={
                l.highlight
                  ? "spec block py-3 text-paper underline decoration-amp/70 underline-offset-4"
                  : "spec block py-3 text-steel"
              }
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="spec mt-3 inline-block border border-amp px-4 py-2 text-amp transition-colors hover:bg-amp hover:text-ink"
          >
            Request a consultation
          </a>
        </nav>
      )}
    </header>
  );
}
