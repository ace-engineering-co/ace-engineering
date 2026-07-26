"use client";
import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValue,
  useSpring
} from "framer-motion";
/** Circuit paths shared by the drawn lines and the travelling energy pulses. */
const WIRES = [
  { d: "M-40 420 H360 L420 360 H820 L880 420 H1480", o: 1, dur: 7 },
  { d: "M-40 300 H240 L300 240 H700", o: 0.5, dur: 9 },
  { d: "M760 240 L820 300 H1480", o: 0.5, dur: 8 }
];

/** Travelling glow dot along a wire (decorative). */
function Pulse({ path, dur, delay = 0 }: { path: string; dur: number; delay?: number }) {
  return (
    <>
      <circle r="7" fill="#7FA6D9" opacity="0.28" filter="url(#pulseblur)">
        <animateMotion dur={`${dur}s`} begin={`${delay}s`} repeatCount="indefinite" path={path} />
      </circle>
      <circle r="2.6" fill="#EAF2FC">
        <animateMotion dur={`${dur}s`} begin={`${delay}s`} repeatCount="indefinite" path={path} />
      </circle>
    </>
  );
}

/** Floating HUD chip: framed image + live telemetry readout. */
function Chip({
  src,
  label,
  value,
  status,
  className,
  floatDur
}: {
  src: string;
  label: string;
  value: string;
  status: string;
  className?: string;
  floatDur: string;
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute z-10 hidden lg:block ${className}`}
      style={{ animation: `floaty ${floatDur} ease-in-out infinite` }}
    >
      <div className="relative border border-paper/20 bg-ink/55 p-2 backdrop-blur-md">
        {/* corner ticks */}
        <span className="absolute -left-px -top-px h-3 w-3 border-l-2 border-t-2 border-amp" />
        <span className="absolute -bottom-px -right-px h-3 w-3 border-b-2 border-r-2 border-amp" />
        <div className="relative h-40 w-36 overflow-hidden xl:h-48 xl:w-44">
          <Image src={src} alt="" fill sizes="11rem" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
        </div>
        <div className="flex items-end justify-between px-1 pb-0.5 pt-2">
          <div>
            <p className="spec text-[0.58rem] text-steel">{label}</p>
            <p className="display mt-0.5 text-lg text-paper">{value}</p>
          </div>
          <p className="spec flex items-center gap-1.5 text-[0.58rem] text-amp">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amp/60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amp" />
            </span>
            {status}
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * Pinned hero scene, 190vh tall. Depth is sold three ways:
 *  - scroll: city zooms slowly, circuit drifts faster, headline exits fastest
 *  - pointer: layers lean toward the cursor on springs (fine pointers only)
 *  - ambient: energy pulses travel the grid, aurora glow breathes, chips float
 */
export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const imgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.22]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "-6%"]);
  const circuitY = useTransform(scrollYProgress, [0, 1], ["0%", "-34%"]);
  const chipsY = useTransform(scrollYProgress, [0, 1], ["0%", "-120%"]);
  const contentY = useTransform(scrollYProgress, [0, 0.9], ["0%", "-52%"]);
  const contentScale = useTransform(scrollYProgress, [0, 0.9], [1, 0.92]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const dim = useTransform(scrollYProgress, [0.2, 1], [0, 0.55]);

  // Pointer parallax — normalized -0.5..0.5, smoothed on springs
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });
  const bgMx = useTransform(sx, (v) => v * -14);
  const bgMy = useTransform(sy, (v) => v * -8);
  const chipMx = useTransform(sx, (v) => v * 34);
  const chipMy = useTransform(sy, (v) => v * 22);

  const onMove = (e: React.MouseEvent) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <div id="top" ref={ref} className="relative h-[190vh] bg-ink">
      <section
        onMouseMove={onMove}
        className="sticky top-0 flex h-screen flex-col justify-end overflow-hidden"
      >
        {/* City — far layer */}
        <motion.div style={reduce ? undefined : { scale: imgScale, y: imgY }} className="absolute inset-0">
          <motion.div style={reduce ? undefined : { x: bgMx, y: bgMy }} className="absolute -inset-4">
            <Image
              src="/img/hero-plant.webp"
              alt="Combined-cycle power plant at dusk"
              fill
              priority
              className="object-cover object-center"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/25" />
        </motion.div>

        {/* Aurora energy glow */}
        <div
          aria-hidden
          className="animate-aurora absolute left-[-15%] top-[8%] h-[70vh] w-[70vw] rounded-full mix-blend-screen"
          style={{
            background:
              "radial-gradient(closest-side, rgba(127,166,217,0.30), rgba(46,111,242,0.10) 55%, transparent 75%)",
            filter: "blur(60px)"
          }}
        />

        {/* Circuit — mid layer, with travelling energy pulses */}
        <motion.svg
          style={reduce ? undefined : { y: circuitY }}
          className="absolute inset-x-0 bottom-[-20%] h-[70%] w-full opacity-50"
          viewBox="0 0 1440 500"
          preserveAspectRatio="xMidYMax slice"
          aria-hidden
        >
          <defs>
            <filter id="pulseblur" x="-200%" y="-200%" width="500%" height="500%">
              <feGaussianBlur stdDeviation="4" />
            </filter>
          </defs>
          <g fill="none" stroke="#7FA6D9" strokeWidth="1.4">
            {WIRES.map((w) => (
              <motion.path
                key={w.d}
                d={w.d}
                opacity={w.o}
                initial={reduce ? false : { pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.6, delay: 0.4, ease: "easeInOut" }}
              />
            ))}
          </g>
          {[[420, 360], [880, 420], [300, 240], [820, 300]].map(([x, y]) => (
            <rect
              key={`${x}-${y}`}
              x={x - 7}
              y={y - 7}
              width="14"
              height="14"
              fill="#040E1C"
              stroke="#7FA6D9"
              strokeWidth="1.4"
              transform={`rotate(45 ${x} ${y})`}
            />
          ))}
          {!reduce &&
            WIRES.map((w, i) => <Pulse key={w.d} path={w.d} dur={w.dur} delay={i * 1.7} />)}
        </motion.svg>

        {/* Floating telemetry chips — near layer */}
        <motion.div
          style={reduce ? undefined : { y: chipsY }}
          className="absolute inset-0"
          aria-hidden
        >
          <motion.div style={reduce ? undefined : { x: chipMx, y: chipMy }} className="absolute inset-0">
            <Chip
              src="/img/chip-a.webp"
              label="Genset module"
              value="2.0 MW"
              status="Online"
              floatDur="7s"
              className="right-[7%] top-[20%]"
            />
            <Chip
              src="/img/chip-b.webp"
              label="Switchgear · MV line-up"
              value="11 kV"
              status="Synced"
              floatDur="9s"
              className="right-[24%] top-[47%] xl:right-[26%]"
            />
          </motion.div>
        </motion.div>

        <motion.div style={{ opacity: dim }} className="absolute inset-0 bg-ink" />
        <div className="grain" />

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
            ACE Engineering — Infrastructure Solutions
          </motion.p>

          <h1 className="display max-w-4xl text-3xl text-paper sm:text-5xl lg:text-6xl">
            {["Integrated", "infrastructure", "solutions."].map((line, i) => (
              <span key={line} className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={reduce ? false : { y: "112%", filter: "blur(6px)" }}
                  animate={{ y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.9, delay: 0.2 + i * 0.13, ease: [0.22, 1, 0.36, 1] }}
                >
                  {i === 2 ? <span className="text-amp">{line}</span> : line}
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
            For critical industries — data centers, oil &amp; gas, mining and
            industrial — we turn complex requirements into reliable, practical
            and commercially viable solutions.
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
              Explore our solutions
            </a>
            <a
              href="#contact"
              className="spec border border-paper/30 px-7 py-4 text-paper transition-colors hover:border-amp hover:text-amp"
            >
              Discuss your project
            </a>
          </motion.div>

          {/* Scroll cue — thin charging line */}
          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="mt-16 flex items-center gap-4 text-steel"
          >
            <span className="relative block h-10 w-px overflow-hidden bg-paper/15">
              <motion.span
                animate={reduce ? undefined : { y: ["-100%", "100%"] }}
                transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
                className="absolute left-0 top-0 h-1/2 w-px bg-amp"
              />
            </span>
            <span className="spec">Scroll</span>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
