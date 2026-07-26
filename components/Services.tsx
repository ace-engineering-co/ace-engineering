"use client";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";
import Reveal from "./Reveal";

const services = [
  {
    code: "S/01",
    img: "/img/svc-01.webp",
    title: "Power generation solutions",
    body: "Reliable and scalable power generation tailored to mission-critical, industrial, temporary and captive power applications.",
    tags: ["Gas gensets", "Diesel gensets", "Gas turbines", "Industrial turbines"]
  },
  {
    code: "S/02",
    img: "/img/svc-02.webp",
    title: "Electrical infrastructure",
    body: "Distribution, protection, control and monitoring systems for projects that demand dependable electrical infrastructure.",
    tags: ["LV & MV switchgear", "Control panels", "Synchronization", "Protection", "Power management", "SCADA"]
  },
  {
    code: "S/03",
    img: "/img/svc-05.webp",
    title: "Packaged infrastructure",
    body: "Custom-engineered packages combining equipment, fabrication, modularization and site-ready integration.",
    tags: ["Acoustic enclosures", "Containerized packages", "E-houses", "Tanks & skids", "Steel fabrication"]
  },
  {
    code: "S/04",
    // TODO: swap for a marine/offshore photo — no offshore image exists yet
    img: "/img/svc-03.webp",
    title: "Offshore infrastructure",
    body: "Specialized asset solutions supporting offshore energy, marine logistics and infrastructure projects.",
    tags: ["Liftboats", "Jack-up barges", "Tugboats", "Support vessels", "Acquisition & chartering"]
  },
  {
    code: "S/05",
    img: "/img/svc-06.webp",
    title: "Project development & advisory",
    body: "Helping clients evaluate opportunities, structure projects and align commercial and technical requirements.",
    tags: ["Opportunity assessment", "Feasibility", "Technology selection", "CAPEX/OPEX", "Commercial structuring"]
  }
];

function Card({ s, i, wide }: { s: (typeof services)[number]; i: number; wide?: boolean }) {
  return (
    <article
      className={`group relative flex h-[28rem] flex-col justify-between overflow-hidden border border-linedark/40 bg-ink p-8 transition-colors duration-300 hover:border-amp ${
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
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {s.tags.map((t) => (
            <li
              key={t}
              className="spec border border-paper/15 px-2 py-1 text-[0.58rem] text-steel transition-colors duration-300 group-hover:border-amp/40 group-hover:text-haze"
            >
              {t}
            </li>
          ))}
        </ul>
        <div className="mt-5 h-px w-10 bg-amp transition-all duration-500 group-hover:w-full" />
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
  // Spring lag makes the track glide and settle instead of tracking 1:1
  const xRaw = useTransform(scrollYProgress, [0.12, 0.95], [0, -overflow]);
  const x = useSpring(xRaw, { stiffness: 90, damping: 28, mass: 0.7 });

  return (
    <section id="services" className="relative z-10 -mt-10 rounded-t-[2.5rem] bg-white">
      {/* Desktop: pinned horizontal scroll */}
      <div ref={sectionRef} className="relative hidden h-[260vh] md:block">
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
          <div className="mx-auto w-full max-w-wrap px-5 lg:px-8">
            <p className="spec text-amp">Our solutions</p>
            <h2 className="display mt-4 text-5xl text-deep md:text-6xl">
              Built around real project needs.
            </h2>
            <p className="mt-4 max-w-2xl text-base text-deep/70">
              Infrastructure projects require more than equipment supply — they
              need the right combination of technology, engineering, fabrication,
              commercial structuring and delivery coordination.
            </p>
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
          <p className="spec text-amp">Our solutions</p>
          <h2 className="display mt-4 text-5xl text-deep">Built around real project needs.</h2>
          <p className="mt-4 text-base text-deep/70">
            Infrastructure projects require more than equipment supply — they
            need the right combination of technology, engineering, fabrication,
            commercial structuring and delivery coordination.
          </p>
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
