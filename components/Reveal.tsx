"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";

/**
 * Scroll-scrubbed reveal. Nothing "triggers": opacity and drift are bound
 * directly to scroll position through a soft spring, so content eases in as
 * it approaches the viewport, settles while read, and drifts away as it
 * leaves — in both scroll directions.
 *
 * `delay` (0..~0.3) staggers siblings by shifting where in the entry range
 * this element starts to appear.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 56,
  className
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Entry: from "top of element hits viewport bottom" to "top reaches 60% height"
  const { scrollYProgress: enter } = useScroll({
    target: ref,
    offset: ["start 102%", "start 60%"]
  });
  // Exit: as the element's bottom approaches the top edge
  const { scrollYProgress: exit } = useScroll({
    target: ref,
    offset: ["end 22%", "end -4%"]
  });

  const enterSpring = useSpring(enter, { stiffness: 110, damping: 26, mass: 0.5 });
  const exitSpring = useSpring(exit, { stiffness: 110, damping: 26, mass: 0.5 });

  const opacityIn = useTransform(enterSpring, [delay, 1], [0, 1]);
  const yIn = useTransform(enterSpring, [delay, 1], [y, 0]);
  const opacityOut = useTransform(exitSpring, [0, 1], [1, 0]);
  const yOut = useTransform(exitSpring, [0, 1], [0, -28]);

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  // Mirror h-full onto the wrappers so grid children can stretch to equal height
  const fill = className?.split(" ").includes("h-full") ? "h-full" : undefined;

  return (
    <motion.div ref={ref} style={{ opacity: opacityOut, y: yOut }} className={fill}>
      <motion.div style={{ opacity: opacityIn, y: yIn }} className={className}>
        {children}
      </motion.div>
    </motion.div>
  );
}
