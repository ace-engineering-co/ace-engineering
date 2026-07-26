"use client";
import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

const pillars = [
  {
    title: "Industry experience",
    body: "Extensive experience across power generation, industrial infrastructure, offshore assets and project development."
  },
  {
    title: "Technology-neutral",
    body: "Solutions selected on project requirements, commercial objectives and delivery capability — never a single vendor."
  },
  {
    title: "Partner ecosystem",
    body: "Access to manufacturers, fabricators, engineering specialists, asset owners and delivery partners."
  },
  {
    title: "Cross-border capability",
    body: "Supporting projects across Africa, the Middle East, Europe and North America."
  }
];

const ticker = [
  "Power generation",
  "Electrical infrastructure",
  "Packaged solutions",
  "Offshore assets",
  "Project development",
  "Cross-border delivery"
];

/**
 * Dark interlude: kinetic ghost-type marquee over a slow-parallax city
 * backdrop, then the four "Why ACE" pillars. The backdrop moves opposite to
 * scroll so the band reads as a window cut into the page.
 */
export default function StatsBand() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const y = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);

  return (
    <section ref={ref} className="relative z-10 -mt-10 overflow-hidden rounded-t-[2.5rem] bg-ink">
      {/* Parallax backdrop */}
      <motion.div
        style={reduce ? undefined : { y: bgY }}
        className="absolute -inset-y-[12%] inset-x-0"
        aria-hidden
      >
        <Image src="/img/stats-bg.webp" alt="" fill sizes="100vw" className="object-cover opacity-45" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/70 to-ink" aria-hidden />
      <div className="grain" />

      {/* Kinetic marquee */}
      <div className="relative border-b border-linedark/40 py-6" aria-hidden>
        <div className="animate-marquee flex w-max items-center gap-10 whitespace-nowrap pr-10">
          {[...ticker, ...ticker].map((t, i) => (
            <span key={`${t}-${i}`} className="flex items-center gap-10">
              <span className="ghost-text display text-4xl md:text-5xl">{t}</span>
              <svg width="14" height="14" viewBox="0 0 16 16">
                <rect x="3" y="3" width="10" height="10" fill="none" stroke="#7FA6D9" strokeWidth="2" transform="rotate(45 8 8)" />
              </svg>
            </span>
          ))}
        </div>
      </div>

      <motion.div
        style={reduce ? undefined : { y }}
        className="relative mx-auto grid max-w-wrap grid-cols-1 gap-x-8 gap-y-12 px-5 py-24 sm:grid-cols-2 md:grid-cols-4 lg:px-8"
      >
        {pillars.map((p, i) => (
          <div key={p.title} className="border-l border-linedark/60 pl-5">
            <motion.span
              initial={reduce ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="mb-4 block h-px w-12 origin-left bg-amp"
            />
            <h3 className="display text-2xl text-paper">{p.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-steel">{p.body}</p>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
