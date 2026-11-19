"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { nav, personal, themes, type ThemeName } from "@/data/content";
import { setTheme, toggleCrt } from "@/lib/theme";
import { EnterIcon } from "@/components/ui/icons";

const ANCHORS = ["top", ...nav.map((n) => n.id)];

// Anchor landing offset comes from `scroll-padding-top: 64px` on <html>.
// The current-section probe must sit just below it or j/k re-target the
// section they're already on (the offsets are cumulative — keep in sync).
const PROBE_OFFSET = 72;

/** Broadcast to the statusline (showcmd + mode cells). */
function emit(name: "bw:key" | "bw:mode" | "bw:theme", detail: string) {
  window.dispatchEvent(new CustomEvent(name, { detail }));
}

// :commands → action
const COMMANDS: Record<string, () => void> = {
  resume: () => window.open(personal.resumePdf, "_blank"),
  github: () => window.open(personal.github, "_blank"),
  gh: () => window.open(personal.github, "_blank"),
  linkedin: () => window.open(personal.linkedin, "_blank"),
  in: () => window.open(personal.linkedin, "_blank"),
  email: () => (window.location.href = `mailto:${personal.email}`),
  mail: () => (window.location.href = `mailto:${personal.email}`),
  cf: () => window.open(personal.codeforces, "_blank"),
  leetcode: () => window.open(personal.leetcode, "_blank"),
  lc: () => window.open(personal.leetcode, "_blank"),
};

const KEYMAP: [string, string][] = [
  ["j / k", "next / previous section"],
  ["gg / G", "top / bottom"],
  [`1–${nav.length}`, "jump to workspace"],
  [":", "command line"],
  [":theme <name>", themes.join(" · ")],
  [":crt", "phosphor scanlines"],
  ["?", "toggle this keymap"],
];

function isTypingTarget(el: EventTarget | null): boolean {
  const node = el as HTMLElement | null;
  if (!node) return false;
  const tag = node.tagName;
  return (
    tag === "INPUT" ||
    tag === "TEXTAREA" ||
    tag === "SELECT" ||
    node.isContentEditable
  );
}

/** Vim motions are instant; only :commands glide. */
function scrollToId(id: string, smooth = false) {
  const behavior: ScrollBehavior = smooth ? "smooth" : "instant";
  if (id === "top") {
    window.scrollTo({ top: 0, behavior });
    return;
  }
  document.getElementById(id)?.scrollIntoView({ behavior, block: "start" });
}

function currentIndex(): number {
  const y = window.scrollY + PROBE_OFFSET;
  let idx = 0;
  ANCHORS.forEach((id, i) => {
    const el = id === "top" ? document.body : document.getElementById(id);
    if (el && (el as HTMLElement).offsetTop <= y) idx = i;
  });
  return idx;
}

export function VimNav() {
  const [open, setOpen] = useState(false);
  const [keymapOpen, setKeymapOpen] = useState(false);
  const [navHint, setNavHint] = useState(false);
  const [query, setQuery] = useState("");
  const [hint, setHint] = useState<{ msg: string; error: boolean } | null>(
    null,
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const prevFocus = useRef<HTMLElement | null>(null);
  const hintTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastG = useRef(0);

  const flash = useCallback((msg: string, error = false) => {
    setHint({ msg, error });
    if (hintTimer.current) clearTimeout(hintTimer.current);
    hintTimer.current = setTimeout(() => setHint(null), 1800);
  }, []);

  useEffect(() => {
    return () => {
      if (hintTimer.current) clearTimeout(hintTimer.current);
    };
  }, []);

  // one-time discoverability toast: keyboard-first visitors don't know the
  // site speaks vim until told. Shown once (localStorage), desktop only,
  // after the boot sequence has cleared; any keypress dismisses it.
  useEffect(() => {
    try {
      if (localStorage.getItem("nav-hint-seen")) return;
    } catch {
      return;
    }
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const t = setTimeout(() => {
      setNavHint(true);
      try {
        localStorage.setItem("nav-hint-seen", "1");
      } catch {
        /* ignore */
      }
    }, 2400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!navHint) return;
    const dismiss = () => setNavHint(false);
    const t = setTimeout(dismiss, 9000);
    window.addEventListener("keydown", dismiss);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", dismiss);
    };
  }, [navHint]);

  // dmesg-style hello for anyone who opens devtools
  useEffect(() => {
    const mono = "font-family:monospace";
    console.log("%c[  0.000000] bitwise: devtools user detected, welcome", `color:#ffb454;${mono}`);
    console.log(`%c[  0.000042] try j/k · gg/G · ? · :theme gruvbox`, `color:#8a8599;${mono}`);
    console.log(`%c[  0.000108] source at ${personal.github}`, `color:#8a8599;${mono}`);
  }, []);

  const openCmd = useCallback(() => {
    prevFocus.current = document.activeElement as HTMLElement | null;
    setOpen(true);
    setQuery("");
    emit("bw:mode", "COMMAND");
  }, []);

  const closeCmd = useCallback(() => {
    setOpen(false);
    setQuery("");
    emit("bw:mode", "NORMAL");
    prevFocus.current?.focus?.();
  }, []);

  const run = useCallback(
    (raw: string) => {
      const q = raw.trim().toLowerCase().replace(/^:/, "");
      if (!q) return;
      if (ANCHORS.includes(q)) return scrollToId(q, true);
      if (q === "home") return scrollToId("top", true);
      if (COMMANDS[q]) return COMMANDS[q]();
      if (q === "help" || q === "keys" || q === "map") {
        setKeymapOpen(true);
        return;
      }
      if (q === "q" || q === "q!" || q === "wq") {
        return flash(
          "E37: no write since last change (this is a website)",
          true,
        );
      }
      if (q === "crt") {
        return flash(`crt ${toggleCrt() ? "on" : "off"}`);
      }
      // :theme gruvbox · :colorscheme nord · or the bare scheme name
      const themeArg = q.startsWith("theme ")
        ? q.slice(6).trim()
        : q.startsWith("colorscheme ")
          ? q.slice(12).trim()
          : q;
      if ((themes as readonly string[]).includes(themeArg)) {
        setTheme(themeArg as ThemeName);
        return flash(`colorscheme ${themeArg}`);
      }
      if (q === "theme" || q === "colorscheme") {
        return flash(`themes: ${themes.join(" · ")}`);
      }
      // fuzzy: first anchor that starts with q
      const hit = ANCHORS.find((a) => a.startsWith(q));
      if (hit) return scrollToId(hit, true);
      flash(`E492: not a command: ${q}`, true);
    },
    [flash],
  );

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (open) {
        if (e.key === "Escape") closeCmd();
        return;
      }
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (isTypingTarget(e.target)) return;

      if (keymapOpen && (e.key === "Escape" || e.key === "?" || e.key === "q")) {
        e.preventDefault();
        setKeymapOpen(false);
        return;
      }

      if (/^[1-9]$/.test(e.key)) {
        const ws = nav[Number(e.key) - 1];
        if (ws) {
          scrollToId(ws.id);
          emit("bw:key", e.key);
        }
        return;
      }

      switch (e.key) {
        case ":":
          e.preventDefault();
          openCmd();
          emit("bw:key", ":");
          break;
        case "?":
          e.preventDefault();
          setKeymapOpen(true);
          emit("bw:key", "?");
          break;
        case "j":
          e.preventDefault();
          scrollToId(ANCHORS[Math.min(currentIndex() + 1, ANCHORS.length - 1)]);
          emit("bw:key", "j");
          break;
        case "k":
          e.preventDefault();
          scrollToId(ANCHORS[Math.max(currentIndex() - 1, 0)]);
          emit("bw:key", "k");
          break;
        case "G":
          e.preventDefault();
          scrollToId(ANCHORS[ANCHORS.length - 1]);
          emit("bw:key", "G");
          break;
        case "g": {
          const now = Date.now();
          if (now - lastG.current < 400) {
            scrollToId("top");
            emit("bw:key", "gg");
          } else {
            emit("bw:key", "g");
          }
          lastG.current = now;
          break;
        }
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, keymapOpen, openCmd, closeCmd]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  // minimal focus trap for the command line
  function trapTab(e: React.KeyboardEvent) {
    if (e.key !== "Tab") return;
    const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
      "input, button",
    );
    if (!focusables || focusables.length === 0) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  return (
    <>
      {/* discoverability hint */}
      <button
        type="button"
        onClick={openCmd}
        aria-label="Open command palette"
        aria-haspopup="dialog"
        aria-expanded={open}
        className="fixed bottom-12 right-3 z-40 hidden items-center gap-1.5 rounded-md border border-[var(--border-strong)] bg-[var(--panel)] px-3 py-2 font-mono text-[15px] text-[var(--text-2)] shadow-[var(--shadow-sm)] transition-colors hover:border-[var(--amber)] hover:text-[var(--amber)] md:flex"
      >
        <kbd className="text-[var(--amber)]">:</kbd> cmd
        <span className="text-[var(--border-strong)]">·</span>
        <kbd className="text-[var(--amber)]">j k</kbd> nav
        <span className="text-[var(--border-strong)]">·</span>
        <kbd className="text-[var(--amber)]">?</kbd> keys
      </button>

      {/* first-visit vim hint */}
      <AnimatePresence>
        {navHint && (
          <m.div
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.25 }}
            className="panel fixed bottom-12 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 border-[color-mix(in_srgb,var(--amber)_45%,transparent)] px-4 py-2.5 font-mono text-[15px] text-[var(--text-2)]"
          >
            <span className="text-[var(--amber)]">tip:</span>
            you can use vim keys here.
            <kbd className="rounded border border-[var(--border-strong)] bg-[var(--inset)] px-1.5 py-0.5 text-[var(--amber)]">j</kbd>
            <kbd className="rounded border border-[var(--border-strong)] bg-[var(--inset)] px-1.5 py-0.5 text-[var(--amber)]">k</kbd>
            to move ·
            <kbd className="rounded border border-[var(--border-strong)] bg-[var(--inset)] px-1.5 py-0.5 text-[var(--amber)]">?</kbd>
            for keys
          </m.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <m.div
            className="fixed inset-0 z-[60] flex items-start justify-center bg-black/40 px-4 pt-[18vh]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={closeCmd}
          >
            <m.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-label="Command line"
              className="panel w-full max-w-md overflow-hidden"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={(e) => e.stopPropagation()}
              onKeyDown={trapTab}
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  run(query);
                  closeCmd();
                }}
                className="flex items-center gap-2 px-3 py-2.5"
              >
                <span className="font-mono text-[var(--amber)]">:</span>
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="projects · resume · theme gruvbox · help"
                  className="flex-1 bg-transparent font-mono text-sm text-[var(--text)] outline-none placeholder:text-[var(--muted)]"
                  autoComplete="off"
                  spellCheck={false}
                />
                <EnterIcon size={15} className="text-[var(--muted)]" />
              </form>
              <div className="flex flex-wrap gap-1.5 border-t border-[var(--border)] px-3 py-2">
                {["about", "projects", "stats", "contact", "resume", "github"].map(
                  (c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => {
                        run(c);
                        closeCmd();
                      }}
                      className="rounded border border-[var(--border)] px-2 py-0.5 font-mono text-[14px] text-[var(--text-2)] transition-colors hover:border-[var(--amber)] hover:text-[var(--amber)]"
                    >
                      {c}
                    </button>
                  ),
                )}
              </div>
              <div className="flex flex-wrap items-center gap-1.5 border-t border-[var(--border)] px-3 py-2">
                <span className="font-mono text-[13px] uppercase tracking-wider text-[var(--muted)]">
                  colorscheme
                </span>
                {themes.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => {
                      run(t);
                      closeCmd();
                    }}
                    className="rounded border border-[var(--border)] px-2 py-0.5 font-mono text-[14px] text-[var(--text-2)] transition-colors hover:border-[var(--amber)] hover:text-[var(--amber)]"
                  >
                    {t}
                  </button>
                ))}
              </div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>

      {/* which-key style keymap panel */}
      <AnimatePresence>
        {keymapOpen && (
          <m.div
            role="dialog"
            aria-label="Keymap"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.15 }}
            className="panel fixed bottom-12 right-3 z-50 w-[19rem] overflow-hidden"
          >
            <div className="winbar">
              <span className="font-mono text-[15px] text-[var(--amber)]">
                keymap
              </span>
              <button
                type="button"
                onClick={() => setKeymapOpen(false)}
                className="ml-auto font-mono text-[14px] text-[var(--muted)] transition-colors hover:text-[var(--amber)]"
              >
                q to close
              </button>
            </div>
            <dl className="space-y-1.5 p-3 font-mono text-[14px]">
              {KEYMAP.map(([keys, what]) => (
                <div key={keys} className="flex items-baseline gap-3">
                  <dt className="w-24 shrink-0 text-[var(--amber)]">{keys}</dt>
                  <dd className="text-[var(--text-2)]">{what}</dd>
                </div>
              ))}
            </dl>
          </m.div>
        )}
      </AnimatePresence>

      {hint && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-12 left-3 z-40 rounded border bg-[var(--panel)] px-2.5 py-1.5 font-mono text-[14px]"
          style={{
            color: hint.error ? "var(--coral)" : "var(--mint)",
            borderColor: `color-mix(in srgb, ${hint.error ? "var(--coral)" : "var(--mint)"} 50%, transparent)`,
          }}
        >
          {hint.msg}
        </div>
      )}
    </>
  );
}
