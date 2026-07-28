"use client";

import { useEffect, useState } from "react";
import { nav, system } from "@/data/content";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { CrtToggle } from "@/components/ui/CrtToggle";
import { cn } from "@/lib/utils";

/** tmux/i3-style top bar: numbered workspaces (nav), session id, clock, theme. */
export function StatusBar() {
  const [active, setActive] = useState<string>(nav[0].id);
  const [clock, setClock] = useState<string>("");

  // scroll-spy — #top (hero) counts as the first workspace so the
  // highlight resets when navigating back to the top
  useEffect(() => {
    const sections = ["top", ...nav.map((n) => n.id)]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          const id = visible[0].target.id;
          setActive(id === "top" ? nav[0].id : id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // live clock (mount-only to avoid hydration mismatch)
  useEffect(() => {
    const tick = () =>
      setClock(
        new Date().toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--border)] bg-[var(--panel)]/85 backdrop-blur-md">
      <div className="flex h-12 items-center gap-3 px-3 sm:px-4">
        {/* session id */}
        <a
          href="#top"
          className="hidden shrink-0 items-center font-mono text-[15px] text-[var(--text-2)] sm:flex"
        >
          <span className="text-[var(--mint)]">{system.user}</span>
          <span className="text-[var(--muted)]">@{system.host}</span>
        </a>

        {/* workspaces — horizontally scrollable on small screens */}
        <nav className="flex flex-1 items-center gap-1 overflow-x-auto no-scrollbar">
          {nav.map((n, i) => {
            const on = active === n.id;
            return (
              <a
                key={n.id}
                href={`#${n.id}`}
                aria-current={on ? "true" : undefined}
                className={cn(
                  "shrink-0 rounded px-2 py-1 font-mono text-[15px] transition-colors",
                  on
                    ? "bg-[var(--amber)] text-[var(--bg)]"
                    : "text-[var(--text-2)] hover:bg-[var(--panel-2)] hover:text-[var(--text)]",
                )}
              >
                <span className={on ? "opacity-70" : "text-[var(--muted)]"}>
                  {i + 1}:
                </span>
                {n.label}
              </a>
            );
          })}
        </nav>

        {/* display controls sit apart from the workspaces */}
        <span
          aria-hidden="true"
          className="h-5 w-px shrink-0 bg-[var(--border-strong)]"
        />
        <ThemeToggle className="shrink-0" />
        <CrtToggle className="shrink-0" />
        <span className="hidden shrink-0 font-mono text-[15px] tabular-nums text-[var(--muted)] sm:inline">
          {clock || "--:--:--"}
        </span>
      </div>
    </header>
  );
}
