"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const BOOT_LINES = [
  "Arch Linux 6.9.1-arch1 (tty1)",
  "",
  "arch login: bitwise",
  "password: ••••••••••",
  "Last login: just now on tty1",
] as const;

const PROMPT = "[bitwise@arch ~]$ ./portfolio --start";
const STORAGE_KEY = "crt-booted";

export function BootSequence() {
  const [phase, setPhase] = useState<"booting" | "done">("booting");
  const [visibleLines, setVisibleLines] = useState(0);
  const [typed, setTyped] = useState("");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

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
    if (booted) {
      const skip = setTimeout(() => setPhase("done"), 0);
      return () => clearTimeout(skip);
    }

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      const skip = setTimeout(finish, 0);
      return () => clearTimeout(skip);
    }

    const t = timers.current;
    BOOT_LINES.forEach((_, i) => {
      t.push(setTimeout(() => setVisibleLines(i + 1), 120 + i * 240));
    });

    const promptStart = 120 + BOOT_LINES.length * 240 + 250;
    PROMPT.split("").forEach((_, i) => {
      t.push(
        setTimeout(() => setTyped(PROMPT.slice(0, i + 1)), promptStart + i * 24),
      );
    });
    t.push(setTimeout(finish, promptStart + PROMPT.length * 24 + 650));

    return () => {
      t.forEach(clearTimeout);
    };
  }, []);

  return (
    <AnimatePresence>
      {phase === "booting" && (
        <motion.div
          key="boot"
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-[var(--bg)] px-6"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
          onClick={finish}
          role="status"
          aria-label="Booting"
        >
          <button
            type="button"
            onClick={finish}
            className="absolute right-5 top-4 font-mono text-[11px] text-[var(--muted)] transition-colors hover:text-[var(--amber)]"
          >
            [ skip &gt; ]
          </button>

          <pre className="w-full max-w-xl whitespace-pre-wrap font-mono text-[12px] leading-relaxed text-[var(--text-2)] sm:text-sm">
            {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
              <div key={i || line || "blank"}>
                {line.startsWith("arch login") || line.startsWith("password") ? (
                  <>
                    <span className="text-[var(--amber)]">
                      {line.split(":")[0]}:
                    </span>
                    {line.slice(line.indexOf(":") + 1)}
                  </>
                ) : (
                  <span className="text-[var(--muted)]">{line}</span>
                )}
              </div>
            ))}
            {visibleLines >= BOOT_LINES.length && (
              <div className="mt-3 text-[var(--text)]">
                <span className="text-[var(--mint)]">
                  {typed.slice(0, typed.indexOf("$") + 1)}
                </span>
                {typed.slice(typed.indexOf("$") + 1)}
                <span className="cursor-blink">▮</span>
              </div>
            )}
          </pre>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
