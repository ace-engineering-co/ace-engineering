"use client";
import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { waLink } from "../lib/site.config";

/**
 * Pinned hero scene, 190vh tall. While the visitor scrolls the first
 * screen-and-a-bit, three layers move at different depths:
 *  - city image: slow zoom + drift (far layer)
 *  - circuit SVG: faster upward drift (mid layer)
 *  - headline block: fastest — scales down and fades as Services slides over
 */
export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const imgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.22]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "-6%"]);
  const circuitY = useTransform(scrollYProgress, [0, 1], ["0%", "-34%"]);
  const contentY = useTransform(scrollYProgress, [0, 0.9], ["0%", "-52%"]);
  const contentScale = useTransform(scrollYProgress, [0, 0.9], [1, 0.92]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const dim = useTransform(scrollYProgress, [0.2, 1], [0, 0.55]);

  return (
    <div id="top" ref={ref} className="relative h-[190vh] bg-ink">
      <section className="sticky top-0 flex h-screen flex-col justify-end overflow-hidden">
        <motion.div
          style={reduce ? undefined : { scale: imgScale, y: imgY }}
          className="absolute inset-0"
        >
          <Image
            src="/hero-city.webp"
            alt="City skyline at night connected by an illuminated power grid"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/25" />
        </motion.div>

        <motion.svg
          style={reduce ? undefined : { y: circuitY }}
          className="absolute inset-x-0 bottom-[-20%] h-[70%] w-full opacity-40"
          viewBox="0 0 1440 500"
          preserveAspectRatio="xMidYMax slice"
          aria-hidden
        >
          <g fill="none" stroke="#F58220" strokeWidth="1.4">
            <path d="M-40 420 H360 L420 360 H820 L880 420 H1480" />
            <path d="M-40 300 H240 L300 240 H700" opacity="0.5" />
            <path d="M760 240 L820 300 H1480" opacity="0.5" />
          </g>
          {[[420, 360], [880, 420], [300, 240], [820, 300]].map(([x, y]) => (
            <rect
              key={`${x}-${y}`}
              x={x - 7}
              y={y - 7}
              width="14"
              height="14"
              fill="#070D1A"
              stroke="#F58220"
              strokeWidth="1.4"
              transform={`rotate(45 ${x} ${y})`}
            />
          ))}
        </motion.svg>

        <motion.div style={{ opacity: dim }} className="absolute inset-0 bg-ink" />

        <motion.div
          style={reduce ? undefined : { y: contentY, scale: contentScale, opacity: contentOpacity }}
          className="relative mx-auto w-full max-w-wrap px-5 pb-24 pt-40 lg:px-8"
        >
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="spec mb-6 text-amp"
          >
            ACE Engineering — Power Solutions
          </motion.p>

          <h1 className="display max-w-4xl text-6xl text-paper sm:text-7xl lg:text-8xl">
            {["Closing the gap", "between demand", "and generation."].map((line, i) => (
              <span key={line} className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={reduce ? false : { y: "112%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.2 + i * 0.13, ease: [0.22, 1, 0.36, 1] }}
                >
                  {i === 2 ? (
                    <>
                      and <span className="text-amp">generation.</span>
                    </>
                  ) : (
                    line
                  )}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75 }}
            className="mt-6 max-w-xl text-lg text-haze"
          >
            Generators, turbines and turnkey power plants — engineered, delivered
            and operated where the grid can&apos;t keep up.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <a
              href="#services"
              className="spec bg-amp px-7 py-4 font-medium text-ink transition-colors hover:bg-paper"
            >
              Explore capabilities
            </a>
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="spec border border-paper/30 px-7 py-4 text-paper transition-colors hover:border-amp hover:text-amp"
            >
              WhatsApp
            </a>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="mt-16 flex items-center gap-3 text-steel"
          >
            <motion.span
              animate={reduce ? undefined : { y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="inline-block"
            >
              ↓
            </motion.span>
            <span className="spec">Scroll</span>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
