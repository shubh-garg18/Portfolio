"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Stagger delay in seconds. */
  delay?: number;
  className?: string;
  /** Travel distance for the fade-up, px. */
  y?: number;
};

/** Fade-up on scroll into view. Used to stagger section content. */
export function Reveal({ children, delay = 0, className, y = 16 }: Props) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: [0.21, 0.5, 0.4, 1] }}
    >
      {children}
    </motion.div>
  );
}
