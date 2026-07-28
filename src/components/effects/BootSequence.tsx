"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { BlinkingCursor } from "@/components/ui/BlinkingCursor";

// A true-log boot: every line states something real about this build.
// (Timestamps are stylized — everything after them is accurate.)
function bootLines(nextVersion: string): string[] {
  return [
    "[  0.000000] booting bitwise@arch (tty1)",
    `[  0.021847] next ${nextVersion} · react 19 · turbopack`,
    "[  0.038102] fonts: ibm plex mono + sans, self-hosted",
    "[  0.052774] colorscheme restored · vim keys armed",
    "arch login: bitwise (automatic login)",
  ];
}

const PROMPT = "[bitwise@arch ~]$ ./portfolio --start";
const STORAGE_KEY = "crt-booted";

// budget: ~1.4s total — charming once, never expensive
const LINE_MS = 100;
const CHAR_MS = 12;
const END_PAUSE_MS = 320;

export function BootSequence({ nextVersion }: { nextVersion: string }) {
  const [phase, setPhase] = useState<"booting" | "done">("booting");
  const [visibleLines, setVisibleLines] = useState(0);
  const [typed, setTyped] = useState("");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const lines = bootLines(nextVersion);

  function finish() {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    setPhase("done");
  }

  useEffect(() => {
    let booted = false;
    try {
      booted = sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      booted = false;
    }
    const reduce = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (booted || reduce) {
      const skip = setTimeout(() => setPhase("done"), 0);
      return () => clearTimeout(skip);
    }

    const t = timers.current;
    lines.forEach((_, i) => {
      t.push(setTimeout(() => setVisibleLines(i + 1), 100 + i * LINE_MS));
    });

    const promptStart = 100 + lines.length * LINE_MS + 160;
    PROMPT.split("").forEach((_, i) => {
      t.push(
        setTimeout(
          () => setTyped(PROMPT.slice(0, i + 1)),
          promptStart + i * CHAR_MS,
        ),
      );
    });
    t.push(
      setTimeout(finish, promptStart + PROMPT.length * CHAR_MS + END_PAUSE_MS),
    );

    return () => {
      t.forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence>
      {phase === "booting" && (
        <m.div
          key="boot"
          data-boot
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-[var(--bg)] px-6"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          onClick={finish}
          role="status"
          aria-label="Booting"
        >
          <button
            type="button"
            onClick={finish}
            className="absolute right-5 top-4 font-mono text-[14px] text-[var(--muted)] transition-colors hover:text-[var(--amber)]"
          >
            [ skip &gt; ]
          </button>

          <pre className="w-full max-w-xl whitespace-pre-wrap font-mono text-[15px] leading-relaxed text-[var(--text-2)] sm:text-sm">
            {lines.slice(0, visibleLines).map((line, i) => (
              <div key={i}>
                {line.startsWith("[") ? (
                  <>
                    <span className="text-[var(--muted)]">
                      {line.slice(0, line.indexOf("]") + 1)}
                    </span>
                    {line.slice(line.indexOf("]") + 1)}
                  </>
                ) : (
                  <>
                    <span className="text-[var(--amber)]">
                      {line.split(":")[0]}:
                    </span>
                    {line.slice(line.indexOf(":") + 1)}
                  </>
                )}
              </div>
            ))}
            {visibleLines >= lines.length && (
              <div className="mt-3 text-[var(--text)]">
                <span className="text-[var(--mint)]">
                  {typed.slice(0, typed.indexOf("$") + 1)}
                </span>
                {typed.slice(typed.indexOf("$") + 1)}
                <BlinkingCursor />
              </div>
            )}
          </pre>
        </m.div>
      )}
    </AnimatePresence>
  );
}
