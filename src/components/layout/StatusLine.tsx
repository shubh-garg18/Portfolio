"use client";

import { useEffect, useState } from "react";
import { system, personal } from "@/data/content";

/** neovim/lualine-style statusline as the footer. */
export function StatusLine() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setPct(max > 0 ? Math.round((h.scrollTop / max) * 100) : 100);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <footer className="mt-8 select-none border-t border-[var(--border)] font-mono text-[11px]">
      <div className="flex items-stretch overflow-x-auto no-scrollbar">
        {/* mode block */}
        <span className="bg-[var(--mint)] px-3 py-1.5 font-semibold tracking-wider text-[var(--bg)]">
          NORMAL
        </span>
        {/* path */}
        <span className="flex items-center bg-[var(--panel-2)] px-3 text-[var(--text-2)]">
          {system.user}@{system.host}:{system.cwd}
        </span>
        {/* branch */}
        <span className="flex items-center gap-1.5 px-3 text-[var(--muted)]">
          <span className="text-[var(--amber)]">⎇</span>
          {system.branch}
          <span className="text-[var(--mint)]">✓</span>
        </span>

        <span className="ml-auto flex items-center gap-3 px-3 text-[var(--muted)]">
          <span>{system.encoding}</span>
          <span className="hidden sm:inline">{system.filetype}</span>
          <span className="tabular-nums">{pct}%</span>
        </span>
        {/* right cap */}
        <span className="flex items-center bg-[var(--amber)] px-3 py-1.5 font-semibold text-[var(--bg)]">
          © {new Date().getFullYear()} {personal.alias.toLowerCase()}
        </span>
      </div>
    </footer>
  );
}
