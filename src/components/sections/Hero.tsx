"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { CSSProperties } from "react";
import { personal, heroTaglines } from "@/data/content";
import { WindowChrome } from "@/components/ui/WindowChrome";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { OrderBook } from "@/components/sections/OrderBook";
import { ChevronRightIcon, DownloadIcon } from "@/components/ui/icons";

const CMD = "whoami";

const CHIPS: { l: string; a: string }[] = [
  { l: "c++", a: "--coral" },
  { l: "redis", a: "--mint" },
  { l: "fastapi", a: "--indigo" },
  { l: "hft", a: "--amber" },
  { l: "linux", a: "--cyan" },
  { l: "mcp", a: "--mint" },
];

export function Hero() {
  const [typed, setTyped] = useState("");
  const [cmdDone, setCmdDone] = useState(false);
  const [tagIdx, setTagIdx] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) {
      const t = setTimeout(() => {
        setTyped(CMD);
        setCmdDone(true);
      }, 0);
      return () => clearTimeout(t);
    }
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setTyped(CMD.slice(0, i));
      if (i >= CMD.length) {
        clearInterval(id);
        setTimeout(() => setCmdDone(true), 200);
      }
    }, 95);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(
      () => setTagIdx((i) => (i + 1) % heroTaglines.length),
      3200,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="top"
      className="mx-auto flex min-h-[100svh] max-w-5xl items-center px-5 pt-16 pb-10"
    >
      <div className="grid w-full items-center gap-6 lg:grid-cols-[1.25fr_1fr]">
        {/* identity window */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <WindowChrome title="~/whoami" bodyClassName="p-6 sm:p-8">
            <div className="font-mono text-sm text-[var(--text-2)]">
              <span className="text-[var(--amber)]">$</span> {typed}
              {!cmdDone && <span className="cursor-blink">▮</span>}
            </div>

            {cmdDone && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="mt-3"
              >
                <h1 className="font-mono text-3xl font-semibold leading-tight text-[var(--text)] sm:text-4xl">
                  {personal.name}
                  <span className="cursor-blink ml-1">▮</span>
                </h1>
                <p className="mt-1 font-mono text-sm text-[var(--muted)]">
                  ~ aka{" "}
                  <span className="text-[var(--amber)]">
                    &quot;{personal.alias.toLowerCase()}&quot;
                  </span>
                </p>
              </motion.div>
            )}

            <p className="mt-4 text-[15px] text-[var(--text-2)]">
              Backend Engineer · Low-Latency Systems · IIT Roorkee &apos;27
            </p>

            {/* tagline rotator */}
            <div className="mt-3 flex min-h-[1.4rem] items-center gap-2 font-mono text-[13px]">
              <span className="text-[var(--mint)]">$</span>
              <span className="text-[var(--muted)]">echo</span>
              <div className="relative flex-1 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={tagIdx}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.35 }}
                    className="block text-[var(--text)]"
                  >
                    {heroTaglines[tagIdx]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>

            {/* chips */}
            <div className="mt-5 flex flex-wrap gap-2">
              {CHIPS.map((c) => (
                <span
                  key={c.l}
                  className="chip"
                  style={{ ["--chip" as string]: `var(${c.a})` } as CSSProperties}
                >
                  {c.l}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#projects"
                className="group inline-flex items-center justify-center gap-2 rounded-md border border-[var(--amber)] bg-[color-mix(in_srgb,var(--amber)_14%,transparent)] px-4 py-2.5 font-mono text-sm text-[var(--amber)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[color-mix(in_srgb,var(--amber)_22%,transparent)]"
              >
                <ChevronRightIcon
                  size={15}
                  className="transition-transform group-hover:translate-x-0.5"
                />
                view work
              </a>
              <a
                href={personal.resumePdf}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-[var(--border-strong)] px-4 py-2.5 font-mono text-sm text-[var(--text-2)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--text-2)] hover:text-[var(--text)]"
              >
                <DownloadIcon size={15} />
                resume
              </a>
              <div className="sm:ml-auto">
                <SocialLinks />
              </div>
            </div>
          </WindowChrome>
        </motion.div>

        {/* signature: order book */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
        >
          <OrderBook />
        </motion.div>
      </div>
    </section>
  );
}
