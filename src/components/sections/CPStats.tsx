"use client";

import { useEffect, useState } from "react";
import { personal } from "@/data/content";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CodeforcesIcon, ExternalLinkIcon } from "@/components/ui/icons";
import { cfTier, sparklinePoints } from "@/lib/utils";

const CF_API = "https://codeforces.com/api";

type RatingChange = {
  contestName: string;
  rank: number;
  oldRating: number;
  newRating: number;
};

export function CPStats() {
  const [rating, setRating] = useState<number | null>(null);
  const [maxRating, setMaxRating] = useState<number | null>(null);
  const [history, setHistory] = useState<RatingChange[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const [info, ratingRes] = await Promise.all([
          fetch(`${CF_API}/user.info?handles=${personal.codeforcesHandle}`).then(
            (r) => r.json(),
          ),
          fetch(`${CF_API}/user.rating?handle=${personal.codeforcesHandle}`).then(
            (r) => r.json(),
          ),
        ]);
        if (cancelled) return;
        if (info.status !== "OK" || ratingRes.status !== "OK") {
          throw new Error("CF API error");
        }
        const u = info.result[0];
        setRating(u.rating ?? null);
        setMaxRating(u.maxRating ?? null);
        setHistory((ratingRes.result as RatingChange[]).slice(-20));
      } catch {
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const tier = rating != null ? cfTier(rating) : null;
  const sparkVals = history.map((h) => h.newRating);
  const recent = [...history].slice(-6).reverse();

  return (
    <section id="stats" className="mx-auto max-w-5xl scroll-mt-16 px-5 py-20">
      <SectionLabel meta="live">competitive_programming</SectionLabel>

      <div className="panel panel-hover p-5 sm:p-6">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2 font-mono text-sm text-[var(--text-2)]">
            <CodeforcesIcon size={18} className="text-[var(--coral)]" />
            Codeforces
          </div>
          <a
            href={personal.codeforces}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-[var(--muted)] transition-colors hover:text-[var(--amber)]"
          >
            @{personal.codeforcesHandle}{" "}
            <ExternalLinkIcon size={12} className="inline" />
          </a>
        </div>

        {loading && <Skeleton />}

        {!loading && error && (
          <div className="py-6 font-mono text-sm text-[var(--muted)]">
            <span className="text-[var(--amber)]">!</span> live stats unavailable —
            rating <span className="text-[var(--mint)]">1612</span> (Expert).
          </div>
        )}

        {!loading && !error && (
          <div className="grid gap-6 md:grid-cols-[200px_1fr] md:gap-8">
            {/* rating block */}
            <div className="flex flex-row items-end gap-5 md:flex-col md:items-start md:gap-2">
              <div>
                <div
                  className="font-mono text-5xl font-bold leading-none"
                  style={{ color: tier?.color }}
                >
                  {rating}
                </div>
                <div
                  className="mt-1 font-mono text-xs"
                  style={{ color: tier?.color }}
                >
                  {tier?.name}
                </div>
              </div>
              {maxRating != null && (
                <div className="pb-1 font-mono text-xs text-[var(--muted)] md:pb-0 md:pt-2">
                  peak{" "}
                  <span className="text-[var(--text-2)]">{maxRating}</span>
                  <span className="mx-2 text-[var(--border-strong)]">·</span>
                  {history.length} rated
                </div>
              )}
            </div>

            {/* sparkline + contests */}
            <div className="md:border-l md:border-[var(--border)] md:pl-8">
              {sparkVals.length > 1 && (
                <svg
                  viewBox="0 0 200 48"
                  preserveAspectRatio="none"
                  className="h-20 w-full"
                  aria-label="Codeforces rating history"
                >
                  <defs>
                    <linearGradient id="cfFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--mint)" stopOpacity="0.28" />
                      <stop offset="100%" stopColor="var(--mint)" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <polygon
                    fill="url(#cfFill)"
                    points={`0,48 ${sparklinePoints(sparkVals, 200, 48)} 200,48`}
                  />
                  <polyline
                    fill="none"
                    stroke="var(--mint)"
                    strokeWidth="1.5"
                    vectorEffect="non-scaling-stroke"
                    points={sparklinePoints(sparkVals, 200, 48)}
                  />
                </svg>
              )}

              <div className="mt-4 grid gap-x-6 gap-y-1.5 font-mono text-[12px] sm:grid-cols-2">
                {recent.map((c, i) => {
                  const delta = c.newRating - c.oldRating;
                  return (
                    <div
                      key={`${c.contestName}-${i}`}
                      className="flex items-center justify-between gap-3 border-t border-[var(--border)] pt-1.5"
                    >
                      <span className="truncate text-[var(--text-2)]">
                        {c.contestName}
                      </span>
                      <span className="flex shrink-0 items-center gap-2.5">
                        <span className="text-[var(--muted)]">#{c.rank}</span>
                        <span
                          className="w-10 text-right tabular-nums"
                          style={{
                            color: delta >= 0 ? "var(--mint)" : "var(--coral)",
                          }}
                        >
                          {delta >= 0 ? "+" : ""}
                          {delta}
                        </span>
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function Skeleton() {
  return (
    <div className="grid animate-pulse gap-6 md:grid-cols-[200px_1fr]">
      <div className="space-y-3">
        <div className="h-12 w-28 rounded bg-[var(--inset)]" />
        <div className="h-3 w-20 rounded bg-[var(--inset)]" />
      </div>
      <div className="space-y-3">
        <div className="h-20 w-full rounded bg-[var(--inset)]" />
        <div className="h-3 w-full rounded bg-[var(--inset)]" />
        <div className="h-3 w-5/6 rounded bg-[var(--inset)]" />
      </div>
    </div>
  );
}
