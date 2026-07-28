"use client";

import { LazyMotion, MotionConfig, domMax } from "framer-motion";
import type { ReactNode } from "react";

/**
 * App-wide motion policy: `m` components only (strict — smaller than the
 * full `motion` import) and OS-level reduced-motion respected for every
 * framer animation — the CSS kill-switch in globals.css can't reach
 * JS-driven animations. domMax, not domAnimation: Projects uses layout
 * animations. Features load synchronously: the boot overlay's skip path
 * unmounts at hydration time, and an async feature bundle arriving later
 * leaves AnimatePresence waiting on an exit animation that never starts.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domMax} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
