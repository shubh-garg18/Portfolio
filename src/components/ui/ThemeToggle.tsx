"use client";

import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "./icons";

type Theme = "dark" | "light";

export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => {
      const current =
        (document.documentElement.getAttribute("data-theme") as Theme) || "dark";
      setTheme(current);
      setMounted(true);
    }, 0);
    return () => clearTimeout(id);
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* ignore */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      title={`theme: ${theme}`}
      className={`flex h-7 items-center gap-1.5 rounded border border-[var(--border)] px-2 font-mono text-[11px] text-[var(--text-2)] transition-colors hover:border-[var(--amber)] hover:text-[var(--amber)] ${className ?? ""}`}
    >
      {/* render icon only after mount to avoid SSR/theme mismatch */}
      {mounted &&
        (theme === "dark" ? <MoonIcon size={13} /> : <SunIcon size={13} />)}
      <span className="hidden sm:inline">{mounted ? theme : "···"}</span>
    </button>
  );
}
