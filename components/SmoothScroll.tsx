"use client";
import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "framer-motion";

/**
 * Lenis inertial scrolling — the glue that makes every scroll-scrubbed
 * animation feel continuous instead of stepped. Disabled entirely for
 * reduced-motion users (native scrolling, instant anchors).
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;
  return (
    <ReactLenis root options={{ lerp: 0.09, wheelMultiplier: 1, anchors: true }}>
      {children}
    </ReactLenis>
  );
}
