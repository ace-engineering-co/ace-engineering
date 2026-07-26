"use client";
import { useEffect, useState } from "react";

/**
 * Floating consultation CTA — horizontal tab pinned to the right edge at
 * mid-height. Slides away once the contact section is on screen.
 */
export default function ConsultationFab() {
  const [hidden, setHidden] = useState(false);

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

  return (
    <a
      href="#contact"
      aria-hidden={hidden}
      tabIndex={hidden ? -1 : undefined}
      className={`spec fixed right-0 top-1/2 z-50 -translate-y-1/2 bg-amp px-5 py-3.5 font-medium text-ink transition-all duration-300 ${
        hidden
          ? "pointer-events-none translate-x-full opacity-0"
          : "opacity-100 hover:-translate-x-1"
      }`}
      style={{ animation: "glowpulse 2.6s ease-in-out infinite" }}
    >
      Request a consultation
    </a>
  );
}
