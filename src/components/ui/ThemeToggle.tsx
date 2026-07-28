"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { AnimatePresence, m } from "framer-motion";
import { themes, type ThemeName } from "@/data/content";
import { setTheme } from "@/lib/theme";
import { SunIcon, MoonIcon, ChevronDownIcon } from "./icons";
import { cn } from "@/lib/utils";

const DARK_DEFAULT: ThemeName = "workstation";
const LIGHT: ThemeName = "paper";

// swatch preview per scheme: [bg, accent] — keep in sync with globals.css
const SWATCHES: Record<ThemeName, [string, string]> = {
  workstation: ["#17161d", "#ffb454"],
  paper: ["#ece9e1", "#8f5606"],
  gruvbox: ["#1d2021", "#fabd2f"],
  catppuccin: ["#1e1e2e", "#fab387"],
  nord: ["#242933", "#ebcb8b"],
  "rose-pine": ["#191724", "#f6c177"],
  tokyonight: ["#1a1b26", "#e0af68"],
  kanagawa: ["#1f1f28", "#e6c384"],
  everforest: ["#272e33", "#dbbc7f"],
};

// The <html data-theme> attribute is the store; VimNav's :theme command and
// this picker both write it (via setTheme) and announce via bw:theme.
function subscribe(onChange: () => void) {
  window.addEventListener("bw:theme", onChange);
  return () => window.removeEventListener("bw:theme", onChange);
}
function getSnapshot(): ThemeName {
  const current = document.documentElement.getAttribute("data-theme");
  return (themes as readonly string[]).includes(current ?? "")
    ? (current as ThemeName)
    : DARK_DEFAULT;
}
// null on the server → renders the placeholder, no hydration mismatch
function getServerSnapshot(): ThemeName | null {
  return null;
}

/**
 * Colorscheme picker: click lists every scheme with a swatch — the mouse
 * path to what `:theme <name>` does in the command line.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  // click-outside / Escape close
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isLight = theme === LIGHT;

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Choose colorscheme"
        aria-haspopup="listbox"
        aria-expanded={open}
        title="colorscheme — also :theme <name>"
        className="flex h-8 items-center gap-1.5 rounded-md border border-[var(--amber)] bg-[color-mix(in_srgb,var(--amber)_12%,transparent)] px-2.5 font-mono text-[15px] text-[var(--amber)] transition-all duration-200 hover:-translate-y-px hover:bg-[color-mix(in_srgb,var(--amber)_22%,transparent)]"
      >
        {theme && (isLight ? <SunIcon size={14} /> : <MoonIcon size={14} />)}
        <span className="hidden sm:inline">{theme ?? "···"}</span>
        <ChevronDownIcon
          size={12}
          className={cn("transition-transform", open && "rotate-180")}
        />
      </button>

      <AnimatePresence>
        {open && (
          <m.ul
            role="listbox"
            aria-label="Colorschemes"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.14 }}
            className="panel absolute right-0 top-10 z-50 w-44 overflow-hidden py-1 shadow-[var(--shadow)]"
          >
            {themes.map((t) => {
              const [bg, accent] = SWATCHES[t];
              const active = t === theme;
              return (
                <li key={t}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={active}
                    onClick={() => {
                      setTheme(t);
                      setOpen(false);
                    }}
                    className={cn(
                      "flex w-full items-center gap-2.5 px-3 py-1.5 font-mono text-[15px] transition-colors",
                      active
                        ? "bg-[var(--panel-2)] text-[var(--amber)]"
                        : "text-[var(--text-2)] hover:bg-[var(--panel-2)] hover:text-[var(--text)]",
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-[3px] border border-[var(--border-strong)]"
                      style={{ background: bg }}
                    >
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ background: accent }}
                      />
                    </span>
                    {t}
                    {active && <span className="ml-auto">•</span>}
                  </button>
                </li>
              );
            })}
          </m.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
