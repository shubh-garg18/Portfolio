"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { nav, personal } from "@/data/content";
import { EnterIcon } from "@/components/ui/icons";

const ANCHORS = ["top", ...nav.map((n) => n.id)];

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

function scrollToId(id: string) {
  const el = id === "top" ? document.body : document.getElementById(id);
  if (!el) return;
  if (id === "top") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function currentIndex(): number {
  const y = window.scrollY + 80;
  let idx = 0;
  ANCHORS.forEach((id, i) => {
    const el = id === "top" ? document.body : document.getElementById(id);
    if (el && (el as HTMLElement).offsetTop <= y) idx = i;
  });
  return idx;
}

export function VimNav() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [hint, setHint] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const lastG = useRef(0);

  const run = useCallback((raw: string) => {
    const q = raw.trim().toLowerCase().replace(/^:/, "");
    if (!q) return;
    if (ANCHORS.includes(q)) return scrollToId(q);
    if (q === "home") return scrollToId("top");
    if (COMMANDS[q]) return COMMANDS[q]();
    // fuzzy: first anchor that starts with q
    const hit = ANCHORS.find((a) => a.startsWith(q));
    if (hit) return scrollToId(hit);
    setHint(`E492: not a command: ${q}`);
    setTimeout(() => setHint(null), 1600);
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (open) {
        if (e.key === "Escape") {
          setOpen(false);
          setQuery("");
        }
        return;
      }
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (isTypingTarget(e.target)) return;

      switch (e.key) {
        case ":":
          e.preventDefault();
          setOpen(true);
          setQuery("");
          break;
        case "j":
          e.preventDefault();
          scrollToId(ANCHORS[Math.min(currentIndex() + 1, ANCHORS.length - 1)]);
          break;
        case "k":
          e.preventDefault();
          scrollToId(ANCHORS[Math.max(currentIndex() - 1, 0)]);
          break;
        case "G":
          e.preventDefault();
          scrollToId(ANCHORS[ANCHORS.length - 1]);
          break;
        case "g": {
          const now = Date.now();
          if (now - lastG.current < 400) scrollToId("top");
          lastG.current = now;
          break;
        }
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  return (
    <>
      {/* discoverability hint */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-12 right-3 z-40 hidden items-center gap-1.5 rounded-md border border-[var(--border)] bg-[var(--panel)]/90 px-2.5 py-1.5 font-mono text-[11px] text-[var(--muted)] backdrop-blur transition-colors hover:border-[var(--amber)] hover:text-[var(--amber)] md:flex"
        aria-label="Open command palette"
      >
        <kbd className="text-[var(--amber)]">:</kbd> cmd
        <span className="text-[var(--border-strong)]">·</span>
        <kbd>j</kbd>
        <kbd>k</kbd> nav
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-start justify-center bg-black/40 px-4 pt-[18vh]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="panel w-full max-w-md overflow-hidden"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={(e) => e.stopPropagation()}
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  run(query);
                  setOpen(false);
                  setQuery("");
                }}
                className="flex items-center gap-2 px-3 py-2.5"
              >
                <span className="font-mono text-[var(--amber)]">:</span>
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="projects · resume · github · gg/G"
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
                        setOpen(false);
                        setQuery("");
                      }}
                      className="rounded border border-[var(--border)] px-2 py-0.5 font-mono text-[11px] text-[var(--text-2)] transition-colors hover:border-[var(--amber)] hover:text-[var(--amber)]"
                    >
                      {c}
                    </button>
                  ),
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {hint && (
        <div className="fixed bottom-12 left-3 z-40 rounded border border-[var(--coral)]/50 bg-[var(--panel)] px-2.5 py-1.5 font-mono text-[11px] text-[var(--coral)]">
          {hint}
        </div>
      )}
    </>
  );
}
