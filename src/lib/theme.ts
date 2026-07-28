import type { ThemeName } from "@/data/content";

/**
 * Single write path for the colorscheme: sets <html data-theme>, persists,
 * and announces via the bw:theme event (StatusLine/ThemeToggle subscribe).
 *
 * Wrapped in a View Transition where supported so the whole page cross-fades
 * instead of every token snapping independently. Skipped under
 * prefers-reduced-motion (the reduced-motion CSS also clamps the animation).
 */
export function setTheme(name: ThemeName) {
  const apply = () => {
    document.documentElement.setAttribute("data-theme", name);
    try {
      localStorage.setItem("theme", name);
    } catch {
      /* ignore */
    }
    window.dispatchEvent(new CustomEvent("bw:theme", { detail: name }));
  };

  const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  if (!reduce && document.startViewTransition) {
    document.startViewTransition(apply);
  } else {
    apply();
  }
}

/**
 * Toggle the CRT scanline overlay (`:crt` / header button). Session-only by
 * design — it's an easter egg, not a setting. Announces via bw:crt so the
 * header button stays in sync however it was flipped. Returns the new state.
 */
export function toggleCrt(): boolean {
  const el = document.documentElement;
  const next = el.getAttribute("data-crt") !== "on";
  if (next) el.setAttribute("data-crt", "on");
  else el.removeAttribute("data-crt");
  window.dispatchEvent(new CustomEvent("bw:crt", { detail: next ? "on" : "off" }));
  return next;
}
