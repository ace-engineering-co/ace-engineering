"use client";
import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useMotionTemplate
} from "framer-motion";
import Reveal from "./Reveal";

const principles = [
  {
    title: "Beyond equipment sourcing",
    body: "We structure solution pathways, not supply lists — combining technology, engineering, fabrication and commercial terms into one coherent package."
  },
  {
    title: "Stakeholder alignment",
    body: "We bring manufacturers, fabricators, engineering specialists and asset owners to the same table, aligned on delivery."
  },
  {
    title: "Concept through delivery",
    body: "Support across the full path — from opportunity assessment and solution packaging to execution and delivery coordination."
  }
];

const experience = [
  "Power generation",
  "Electrical systems",
  "Fabrication & modular solutions",
  "Oil & gas",
  "International business development"
];

/** Light section anchored by a cinematic image panel with a scrubbed wipe. */
export default function About() {
  const reduce = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);

  // Wipe + settle are scrubbed by scroll, not triggered once
  const { scrollYProgress } = useScroll({
    target: panelRef,
    offset: ["start 100%", "start 38%"]
  });
  const p = useSpring(scrollYProgress, { stiffness: 100, damping: 26, mass: 0.5 });
  const inset = useTransform(p, [0, 1], [100, 0]);
  const clipPath = useMotionTemplate`inset(${inset}% 0 0 0)`;
  const imgScale = useTransform(p, [0, 1], [1.18, 1]);

  return (
    <section id="about" className="relative z-10 overflow-hidden bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-wrap px-5 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            <p className="spec text-amp">Company</p>
            <h2 className="display mt-4 text-5xl text-deep md:text-6xl">
              Practical infrastructure solutions.
            </h2>
            <p className="mt-6 text-slate">
              ACE Engineering is an infrastructure solutions company supporting
              clients across energy, industrial, offshore and mission-critical
              sectors.
            </p>
            <p className="mt-4 text-slate">
              We combine technical understanding, market access, partner networks
              and commercial discipline to help clients identify, package and
              deliver practical infrastructure solutions — from concept through
              delivery.
            </p>
          </Reveal>

          {/* Image panel: offset amp frame + wipe reveal + floating readout */}
          <div ref={panelRef} className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div aria-hidden className="absolute -right-4 -top-4 h-full w-full border border-amp/40" />
            <motion.div
              style={reduce ? undefined : { clipPath }}
              className="relative aspect-[3/4] overflow-hidden lg:aspect-[4/5]"
            >
              <motion.div
                style={reduce ? undefined : { scale: imgScale }}
                className="absolute inset-0"
              >
                <Image
                  src="/img/about-tower.webp"
                  alt="High-voltage substation at dusk — grid infrastructure ACE Engineering delivers and operates"
                  fill
                  sizes="(min-width: 1024px) 34rem, 28rem"
                  className="object-cover"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
            </motion.div>

            <div
              className="absolute -left-5 bottom-10 border border-linedark/60 bg-ink/85 px-5 py-4 backdrop-blur-md"
              style={{ animation: "floaty 8s ease-in-out infinite" }}
            >
              <p className="spec text-[0.6rem] text-steel">Built on industry experience</p>
              <ul className="mt-3 space-y-1.5">
                {experience.map((e) => (
                  <li key={e} className="flex items-center gap-2 text-xs text-haze">
                    <svg width="8" height="8" viewBox="0 0 16 16" aria-hidden>
                      <rect
                        x="3"
                        y="3"
                        width="10"
                        height="10"
                        fill="none"
                        stroke="#7FA6D9"
                        strokeWidth="2"
                        transform="rotate(45 8 8)"
                      />
                    </svg>
                    {e}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-20 grid gap-6 md:grid-cols-3">
          {principles.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1} y={18} className="h-full">
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
