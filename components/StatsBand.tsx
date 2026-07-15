"use client";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion, useScroll, useTransform, animate } from "framer-motion";

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) return setVal(to);
    const controls = animate(0, to, {
      duration: 2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setVal(Math.round(v))
    });
    return () => controls.stop();
  }, [inView, to, reduce]);

  return (
    <span ref={ref} className="display text-5xl text-paper md:text-6xl">
      {val}
      <span className="text-amp">{suffix}</span>
    </span>
  );
}

/* TODO: replace with the client's real figures before any client meeting */
const stats = [
  { to: 500, suffix: "+", label: "MW deployable capacity" },
  { to: 12, suffix: "", label: "Countries served" },
  { to: 45, suffix: "d", label: "Fast-track to first power" },
  { to: 24, suffix: "/7", label: "Operations & maintenance" }
];

const ticker = [
  "Generators",
  "Turbines",
  "Turnkey plants",
  "Data centre power",
  "O&M 24/7",
  "Cross-border energy"
];

/**
 * Dark interlude: kinetic ghost-type marquee over a slow-parallax city
 * backdrop, then the counters. The backdrop moves opposite to scroll so the
 * band reads as a window cut into the page.
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
              <span className="ghost-text display text-5xl md:text-6xl">{t}</span>
              <svg width="14" height="14" viewBox="0 0 16 16">
                <rect x="3" y="3" width="10" height="10" fill="none" stroke="#F58220" strokeWidth="2" transform="rotate(45 8 8)" />
              </svg>
            </span>
          ))}
        </div>
      </div>

      <motion.div
        style={reduce ? undefined : { y }}
        className="relative mx-auto grid max-w-wrap grid-cols-2 gap-x-8 gap-y-12 px-5 py-24 md:grid-cols-4 lg:px-8"
      >
        {stats.map((s, i) => (
          <div key={s.label} className="border-l border-linedark/60 pl-5">
            <motion.span
              initial={reduce ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="mb-4 block h-px w-12 origin-left bg-amp"
            />
            <Counter to={s.to} suffix={s.suffix} />
            <p className="spec mt-3 text-steel">{s.label}</p>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
