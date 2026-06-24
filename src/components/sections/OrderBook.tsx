"use client";

import { useEffect, useState } from "react";

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
  const width = `${Math.round((level.q / max) * 100)}%`;
  return (
    <div className="relative flex items-center justify-between px-2 py-[3px] font-mono text-[11px] tabular-nums">
      <div
        className="absolute inset-y-0 right-0 opacity-[0.13] transition-[width] duration-500"
        style={{ width, background: color }}
        aria-hidden="true"
      />
      <span className="relative z-10" style={{ color }}>
        {level.p.toFixed(2)}
      </span>
      <span className="relative z-10 text-[var(--text-2)]">
        {level.q.toLocaleString()}
      </span>
    </div>
  );
}

/**
 * Signature widget: a live depth-of-market ladder (a nod to TradeForge),
 * asks above the spread, bids below, both quantities ticking.
 */
export function OrderBook() {
  const [asks, setAsks] = useState<Level[]>(SEED_ASKS);
  const [bids, setBids] = useState<Level[]>(SEED_BIDS);

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      setAsks((a) => jitter(a));
      setBids((b) => jitter(b));
    }, 1100);
    return () => clearInterval(id);
  }, []);

  const max = Math.max(...asks.map((l) => l.q), ...bids.map((l) => l.q));

  return (
    <div className="panel overflow-hidden">
      <div className="winbar">
        <span className="font-mono text-xs text-[var(--coral)]">
          depth_of_market
        </span>
        <span className="ml-auto font-mono text-[10px] text-[var(--muted)]">
          TradeForge · L2
        </span>
      </div>

      <div className="px-1 py-1.5">
        <div className="flex justify-between px-2 pb-1 font-mono text-[9px] uppercase tracking-wider text-[var(--muted)]">
          <span>price</span>
          <span>size</span>
        </div>

        {asks.map((l) => (
          <Row key={l.p} level={l} max={max} side="ask" />
        ))}

        {/* spread / engine readout */}
        <div className="my-1 flex items-center justify-between border-y border-[var(--border)] bg-[var(--inset)] px-2 py-1.5 font-mono text-[10px]">
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
