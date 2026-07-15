"use client";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Reveal from "./Reveal";

const services = [
  {
    code: "S/01",
    img: "/img/svc-01.webp",
    title: "Fast-track power generation",
    body: "Mobile gas turbines and diesel generator packages delivering grid-scale power in weeks, not years. Bridging capacity while permanent infrastructure catches up."
  },
  {
    code: "S/02",
    img: "/img/svc-02.webp",
    title: "Generators & turbines",
    body: "Supply, installation and commissioning of generator sets and turbine packages — from single standby units to multi-megawatt power blocks."
  },
  {
    code: "S/03",
    img: "/img/svc-03.webp",
    title: "Turnkey power plants",
    body: "Full EPC delivery: engineering, procurement, construction and grid interconnection. One accountable partner from feasibility to first power."
  },
  {
    code: "S/04",
    img: "/img/svc-04.webp",
    title: "Data centre power",
    body: "Prime and backup power architectures for hyperscale and colocation facilities — where uptime is non-negotiable and demand outpaces the grid."
  },
  {
    code: "S/05",
    img: "/img/svc-05.webp",
    title: "Operations & maintenance",
    body: "24/7 O&M contracts covering monitoring, servicing, fuel management and performance optimisation across the asset lifecycle."
  },
  {
    code: "S/06",
    img: "/img/svc-06.webp",
    title: "Cross-border energy",
    body: "Structuring and delivering power where demand and generation sit in different countries — logistics, compliance and deployment end to end."
  }
];

function Card({ s, i, wide }: { s: (typeof services)[number]; i: number; wide?: boolean }) {
  return (
    <article
      className={`group relative flex h-[26rem] flex-col justify-between overflow-hidden border border-linedark/40 bg-ink p-8 transition-colors duration-300 hover:border-amp ${
        wide ? "w-[22rem] shrink-0 md:w-[24rem]" : "w-full"
      }`}
    >
      {/* Image backdrop — eases in scale on hover */}
      <Image
        src={s.img}
        alt=""
        fill
        sizes="(min-width: 768px) 24rem, 100vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/65 to-ink/25 transition-opacity duration-500 group-hover:via-ink/50" />
      {/* Ghost index */}
      <span aria-hidden className="ghost-text display absolute -right-1 top-3 text-8xl opacity-60">
        {String(i + 1).padStart(2, "0")}
      </span>

      <div className="relative">
        <p className="spec text-amp">{s.code}</p>
        <h3 className="display mt-5 text-3xl text-paper">{s.title}</h3>
      </div>
      <div className="relative">
        <p className="text-sm leading-relaxed text-haze">{s.body}</p>
        <div className="mt-6 h-px w-10 bg-amp transition-all duration-500 group-hover:w-full" />
      </div>
    </article>
  );
}

/**
 * White, formal section with a pinned horizontal gallery: the section is
 * 260vh tall; while pinned, vertical scroll drives the card track
 * horizontally by the measured overflow, so it lands exactly on the last
 * card at any viewport width. Vertical stack on mobile / reduced motion.
 */
export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [overflow, setOverflow] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;
      const el = trackRef.current;
      const extra = el.scrollWidth - window.innerWidth;
      setOverflow(extra > 0 ? extra + 48 : 0); // 48px breathing room at the end
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({ target: sectionRef });
  const x = useTransform(scrollYProgress, [0.12, 0.95], [0, -overflow]);

  return (
    <section id="services" className="relative z-10 bg-white">
      {/* Desktop: pinned horizontal scroll */}
      <div ref={sectionRef} className="relative hidden h-[260vh] md:block">
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
          <div className="mx-auto w-full max-w-wrap px-5 lg:px-8">
            <p className="spec text-amp">What we do</p>
            <h2 className="display mt-4 text-5xl text-deep md:text-6xl">
              Power, from requirement to grid.
            </h2>
          </div>
          <motion.div
            ref={trackRef}
            style={reduce ? undefined : { x }}
            className="mt-14 flex gap-6 pl-[max(1.25rem,calc((100vw-76rem)/2+2rem))] pr-12"
          >
            {services.map((s, i) => (
              <Card key={s.code} s={s} i={i} wide />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Mobile: vertical stack */}
      <div className="px-5 py-24 md:hidden">
        <Reveal>
          <p className="spec text-amp">What we do</p>
          <h2 className="display mt-4 text-5xl text-deep">Power, from requirement to grid.</h2>
        </Reveal>
        <div className="mt-12 space-y-5">
          {services.map((s, i) => (
            <Reveal key={s.code} delay={i * 0.05} y={18}>
              <Card s={s} i={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
