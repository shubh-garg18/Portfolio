"use client";

import { useSyncExternalStore } from "react";
import { toggleCrt } from "@/lib/theme";
import { CrtIcon } from "./icons";
import { cn } from "@/lib/utils";

// <html data-crt> is the store; the :crt command and this button both write
// it through toggleCrt(), which announces changes via bw:crt.
function subscribe(onChange: () => void) {
  window.addEventListener("bw:crt", onChange);
  return () => window.removeEventListener("bw:crt", onChange);
}
function getSnapshot(): boolean {
  return document.documentElement.getAttribute("data-crt") === "on";
}
// never on at SSR (not persisted)
function getServerSnapshot(): boolean {
  return false;
}

/** Mouse path to the `:crt` scanline overlay. */
export function CrtToggle({ className }: { className?: string }) {
  const on = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <button
      type="button"
      onClick={() => toggleCrt()}
      aria-label="Toggle CRT scanlines"
      aria-pressed={on}
      title="crt scanlines — also :crt"
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-md border transition-all duration-200 hover:-translate-y-px",
        on
          ? "border-[var(--mint)] bg-[color-mix(in_srgb,var(--mint)_14%,transparent)] text-[var(--mint)]"
          : "border-[var(--border)] text-[var(--text-2)] hover:border-[var(--border-strong)] hover:text-[var(--text)]",
        className,
      )}
    >
      <CrtIcon size={15} />
    </button>
  );
}
