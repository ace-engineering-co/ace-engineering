"use client";
import { useRef, useEffect, useState } from "react";
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

/** Dark interlude band with a subtle parallax drift on the numbers. */
export default function StatsBand() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);

  return (
    <section ref={ref} className="relative z-10 overflow-hidden bg-ink py-24">
      <motion.div
        style={reduce ? undefined : { y }}
        className="mx-auto grid max-w-wrap grid-cols-2 gap-x-8 gap-y-12 px-5 md:grid-cols-4 lg:px-8"
      >
        {stats.map((s) => (
          <div key={s.label}>
            <Counter to={s.to} suffix={s.suffix} />
            <p className="spec mt-3 text-steel">{s.label}</p>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
