"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { system, personal } from "@/data/content";

// One-time client facts (visitor's TTFB + wall-clock year), exposed through
// useSyncExternalStore so SSR renders the placeholder without a mismatch.
type ClientStats = { ttfb: number | null; year: number };
let statsCache: ClientStats | null = null;
const noopSubscribe = () => () => {};
function getClientStats(): ClientStats {
  if (!statsCache) {
    const nav = performance.getEntriesByType("navigation")[0] as
      | PerformanceNavigationTiming
      | undefined;
    statsCache = {
      ttfb:
        nav && nav.responseStart > 0
          ? Math.max(1, Math.round(nav.responseStart))
          : null,
      year: new Date().getFullYear(),
    };
  }
  return statsCache;
}
const getServerStats = (): ClientStats | null => null;

/**
 * neovim/lualine-style statusline as the footer. Everything in it is real:
 * mode follows the command palette, showcmd echoes actual keystrokes,
 * the latency cell is this visitor's measured TTFB, and the commit hash
 * is the deployed build.
 */
export function StatusLine({ commit }: { commit?: string }) {
  const [pct, setPct] = useState(0);
  const [mode, setMode] = useState<"NORMAL" | "COMMAND">("NORMAL");
  const [cmd, setCmd] = useState("");
  const stats = useSyncExternalStore(
    noopSubscribe,
    getClientStats,
    getServerStats,
  );

  // rAF-throttled scroll progress
  useEffect(() => {
    let raf = 0;
    const measure = () => {
      raf = 0;
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setPct(max > 0 ? Math.round((h.scrollTop / max) * 100) : 100);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // vim mode + showcmd echo, fed by VimNav
  const cmdTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    const onKey = (e: Event) => {
      setCmd((e as CustomEvent<string>).detail);
      if (cmdTimer.current) clearTimeout(cmdTimer.current);
      cmdTimer.current = setTimeout(() => setCmd(""), 900);
    };
    const onMode = (e: Event) =>
      setMode((e as CustomEvent<"NORMAL" | "COMMAND">).detail);
    window.addEventListener("bw:key", onKey);
    window.addEventListener("bw:mode", onMode);
    return () => {
      window.removeEventListener("bw:key", onKey);
      window.removeEventListener("bw:mode", onMode);
      if (cmdTimer.current) clearTimeout(cmdTimer.current);
    };
  }, []);

  return (
    <footer className="mt-8 select-none border-t border-[var(--border)] font-mono text-[14px]">
      <div className="flex items-stretch overflow-x-auto no-scrollbar">
        {/* mode block */}
        <span
          className="px-3 py-1.5 font-semibold tracking-wider text-[var(--bg)]"
          style={{
            background: mode === "COMMAND" ? "var(--indigo)" : "var(--mint)",
          }}
        >
          {mode}
        </span>
        {/* path */}
        <span className="flex items-center bg-[var(--panel-2)] px-3 text-[var(--text-2)]">
          {system.user}@{system.host}:{system.cwd}
        </span>
        {/* deployed commit */}
        <span className="flex items-center gap-1.5 px-3 text-[var(--muted)]">
          <span className="text-[var(--amber)]">⎇</span>
          {system.branch}
          {commit ? `@${commit}` : ""}
          <span className="text-[var(--mint)]">✓</span>
        </span>

        <span className="ml-auto flex items-center gap-3 px-3 text-[var(--muted)]">
          {/* showcmd — echoes real keystrokes like :set showcmd */}
          <span
            aria-hidden="true"
            className="w-6 text-center text-[var(--amber)]"
          >
            {cmd}
          </span>
          {stats?.ttfb != null && (
            <span
              className="tabular-nums"
              title="your measured time-to-first-byte"
            >
              ttfb {stats.ttfb}ms
            </span>
          )}
          <span className="hidden sm:inline">{system.encoding}</span>
          <span className="hidden sm:inline">{system.filetype}</span>
          <span className="tabular-nums">{pct}%</span>
        </span>
        {/* right cap */}
        <span className="flex items-center bg-[var(--amber)] px-3 py-1.5 font-semibold text-[var(--bg)]">
          © {stats?.year ?? ""} {personal.alias.toLowerCase()}
        </span>
      </div>
    </footer>
  );
}
