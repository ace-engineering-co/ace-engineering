"use client";
import { useEffect, useState } from "react";

const links = [
  { href: "#services", label: "Solutions" },
  { href: "#sectors", label: "Industries" },
  { href: "#about", label: "Company" },
  { href: "#process", label: "How we work" },
  { href: "#affiliate", label: "Partners" },
  { href: "#contact", label: "Contact" }
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
        <a href="#top" className="flex items-center gap-3">
          <svg width="18" height="18" viewBox="0 0 16 16" aria-hidden>
            <rect x="3" y="3" width="10" height="10" fill="none" stroke="#F58220" strokeWidth="2" transform="rotate(45 8 8)" />
          </svg>
          <span className="display text-xl tracking-wide text-paper">
            ACE <span className="text-amp">Engineering</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="spec text-steel transition-colors hover:text-paper"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="spec border border-amp px-4 py-2 text-amp transition-colors hover:bg-amp hover:text-ink"
          >
            Discuss your project
          </a>
        </nav>

        <button
          className="text-paper md:hidden"
          aria-label="Toggle menu"
          onClick={() => setOpen(!open)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3 7h18M3 12h18M3 17h18" />}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="border-t border-linedark/50 bg-ink/95 px-5 pb-6 pt-2 backdrop-blur-md md:hidden">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="spec block py-3 text-steel"
            >
              {l.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
