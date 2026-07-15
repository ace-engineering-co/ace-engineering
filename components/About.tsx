"use client";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import Reveal from "./Reveal";

/* TODO: replace with the client's About Us document when received. */
const principles = [
  {
    title: "Speed with discipline",
    body: "Fast-track delivery backed by rigorous engineering — mobilisation measured in weeks, built to run for years."
  },
  {
    title: "One accountable partner",
    body: "From feasibility to first power to long-term O&M, a single team owns the outcome end to end."
  },
  {
    title: "Proven leadership",
    body: "A founding team with decades of combined delivery experience across power generation, energy infrastructure and industrial projects in the region and beyond."
  }
];

/** Light section anchored by a cinematic image panel with a wipe reveal. */
export default function About() {
  const reduce = useReducedMotion();

  return (
    <section id="about" className="relative z-10 overflow-hidden bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-wrap px-5 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            <p className="spec text-amp">Company</p>
            <h2 className="display mt-4 text-5xl text-deep md:text-6xl">
              Engineering-led. Delivery-obsessed.
            </h2>
            <p className="mt-6 text-slate">
              ACE Engineering is a power solutions company serving markets where
              energy demand has outgrown supply. We design, deliver and operate
              generation assets — generators, turbines and complete power plants —
              for clients who measure downtime in real money.
            </p>
            <p className="mt-4 text-slate">
              Senior engineers lead every engagement, from the first feasibility
              conversation to long-term operations.
            </p>
          </Reveal>

          {/* Image panel: offset amp frame + wipe reveal + floating readout */}
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div aria-hidden className="absolute -right-4 -top-4 h-full w-full border border-amp/40" />
            <motion.div
              initial={reduce ? false : { clipPath: "inset(100% 0 0 0)" }}
              whileInView={{ clipPath: "inset(0% 0 0 0)" }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[3/4] overflow-hidden lg:aspect-[4/5]"
            >
              <motion.div
                initial={reduce ? false : { scale: 1.18 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src="/img/about-tower.webp"
                  alt="High-rise district at night — the loads ACE Engineering keeps powered"
                  fill
                  sizes="(min-width: 1024px) 34rem, 28rem"
                  className="object-cover"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
            </motion.div>

            <div
              aria-hidden
              className="absolute -left-5 bottom-10 border border-linedark/60 bg-ink/85 px-5 py-4 backdrop-blur-md"
              style={{ animation: "floaty 8s ease-in-out infinite" }}
            >
              <p className="spec text-[0.6rem] text-steel">Demand curve · 24h</p>
              {/* mini load sparkline */}
              <svg width="120" height="30" viewBox="0 0 120 30" className="mt-2">
                <polyline
                  points="0,24 15,22 30,25 45,14 60,17 75,8 90,12 105,4 120,7"
                  fill="none"
                  stroke="#F58220"
                  strokeWidth="1.6"
                />
              </svg>
              <p className="display mt-1 text-lg text-paper">
                +38% <span className="text-amp">YoY</span>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20 grid gap-6 md:grid-cols-3">
          {principles.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1} y={18}>
              <div className="h-full border-l-2 border-amp bg-cloud p-7">
                <h3 className="display text-2xl text-deep">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
