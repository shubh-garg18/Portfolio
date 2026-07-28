"use client";

import { useEffect, useRef, useState } from "react";

// Deterministic seed so SSR and first client render match; jittered on mount.
const SEED_ASKS = [
  { p: 100.09, q: 820 },
  { p: 100.08, q: 1340 },
  { p: 100.07, q: 610 },
  { p: 100.06, q: 2210 },
  { p: 100.05, q: 430 },
];
const SEED_BIDS = [
  { p: 100.04, q: 1180 },
  { p: 100.03, q: 760 },
  { p: 100.02, q: 3050 },
  { p: 100.01, q: 540 },
  { p: 100.0, q: 1990 },
];

type Level = { p: number; q: number };

function jitter(levels: Level[]): Level[] {
  return levels.map((l) => {
    const next = l.q + Math.round((Math.random() - 0.5) * 600);
    return { ...l, q: Math.max(120, Math.min(3600, next)) };
  });
}

function Row({
  level,
  max,
  side,
}: {
  level: Level;
  max: number;
  side: "ask" | "bid";
}) {
  const color = side === "ask" ? "var(--coral)" : "var(--mint)";
  return (
    <div className="relative flex items-center justify-between px-2 py-[3px] font-mono text-[14px] tabular-nums">
      {/* scaleX, not width: keeps the 1.1s tick compositor-only */}
      <div
        className="absolute inset-y-0 right-0 w-full origin-right opacity-[0.13] transition-transform duration-500"
        style={{ transform: `scaleX(${level.q / max})`, background: color }}
        aria-hidden="true"
      />
      <span className="relative z-10" style={{ color }}>
        {level.p.toFixed(2)}
      </span>
      <span className="relative z-10 text-[var(--text-2)]">
        {/* pinned locale — SSR is baked on the build machine */}
        {level.q.toLocaleString("en-US")}
      </span>
    </div>
  );
}

/**
 * Signature widget: a depth-of-market ladder (a nod to TradeForge), asks
 * above the spread, bids below, quantities ticking. Honestly labeled as a
 * simulation; the throughput/latency readouts are TradeForge's measured
 * benchmarks. Ticks only while visible and the tab is foreground.
 */
export function OrderBook() {
  const [asks, setAsks] = useState<Level[]>(SEED_ASKS);
  const [bids, setBids] = useState<Level[]>(SEED_BIDS);
  const [active, setActive] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    let inView = true;
    const update = () => setActive(inView && !document.hidden);
    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      update();
    });
    io.observe(el);
    document.addEventListener("visibilitychange", update);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  useEffect(() => {
    if (!active) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      setAsks((a) => jitter(a));
      setBids((b) => jitter(b));
    }, 1100);
    return () => clearInterval(id);
  }, [active]);

  const max = Math.max(...asks.map((l) => l.q), ...bids.map((l) => l.q));

  return (
    <div ref={rootRef} className="panel overflow-hidden">
      <div className="winbar">
        <span className="font-mono text-[15px] text-[var(--coral)]">
          depth_of_market
        </span>
        <span className="ml-auto font-mono text-[13px] text-[var(--muted)]">
          TradeForge · L2 · sim
        </span>
      </div>

      <div className="px-1 py-1.5">
        <div className="flex justify-between px-2 pb-1 font-mono text-[12px] uppercase tracking-wider text-[var(--muted)]">
          <span>price</span>
          <span>size</span>
        </div>

        {asks.map((l) => (
          <Row key={l.p} level={l} max={max} side="ask" />
        ))}

        {/* spread / engine readout — measured TradeForge benchmarks */}
        <div className="my-1 flex items-center justify-between border-y border-[var(--border)] bg-[var(--inset)] px-2 py-1.5 font-mono text-[13px]">
          <span className="font-semibold tabular-nums text-[var(--amber)]">
            2.1M ops/sec
          </span>
          <span className="text-[var(--muted)]">spread 0.01</span>
          <span className="tabular-nums text-[var(--cyan)]">p99 2.3µs</span>
        </div>

        {bids.map((l) => (
          <Row key={l.p} level={l} max={max} side="bid" />
        ))}
      </div>
    </div>
  );
}
