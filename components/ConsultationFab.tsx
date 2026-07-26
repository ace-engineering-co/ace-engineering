"use client";
import { useEffect, useState } from "react";

/**
 * Floating consultation CTA — horizontal tab pinned to the right edge at
 * mid-height. Slides away once the contact section is on screen. On mobile
 * the label folds into a compact icon after 4 seconds (md+ keeps the label).
 */
export default function ConsultationFab() {
  const [hidden, setHidden] = useState(false);
  const [folded, setFolded] = useState(false);

  useEffect(() => {
    const target = document.getElementById("contact");
    if (!target) return;
    const observer = new IntersectionObserver(
      ([entry]) => setHidden(entry.isIntersecting),
      { threshold: 0.15 }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setFolded(true), 4000);
    return () => clearTimeout(t);
  }, []);

  return (
    <a
      href="#contact"
      aria-hidden={hidden}
      aria-label="Request a consultation"
      tabIndex={hidden ? -1 : undefined}
      className={`spec fixed right-0 top-1/2 z-50 inline-flex -translate-y-1/2 items-center bg-amp py-3.5 font-medium text-ink transition-all duration-300 ${
        folded ? "px-3.5 md:px-5" : "px-5"
      } ${
        hidden
          ? "pointer-events-none translate-x-full opacity-0"
          : "opacity-100 hover:-translate-x-1"
      }`}
      style={{ animation: "glowpulse 2.6s ease-in-out infinite" }}
    >
      {/* Icon shown only when folded, and only below md */}
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        aria-hidden
        className={folded ? "md:hidden" : "hidden"}
      >
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" />
      </svg>
      <span
        className={`overflow-hidden whitespace-nowrap transition-all duration-500 md:max-w-none md:opacity-100 ${
          folded ? "max-w-0 opacity-0" : "max-w-[16rem] opacity-100"
        }`}
      >
        Request a consultation
      </span>
    </a>
  );
}
