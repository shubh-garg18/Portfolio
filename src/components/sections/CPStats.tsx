import { personal } from "@/data/content";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CodeforcesIcon, ExternalLinkIcon } from "@/components/ui/icons";
import { cfTier, brailleSparkline } from "@/lib/utils";

const CF_API = "https://codeforces.com/api";

type RatingChange = {
  contestName: string;
  rank: number;
  oldRating: number;
  newRating: number;
};

type CFData = {
  rating: number | null;
  maxRating: number | null;
  history: RatingChange[];
};

// Server-side with hourly ISR: real data baked into the HTML, no client
// fetch, no skeleton, and Codeforces downtime can't break a visit.
async function getCFData(): Promise<CFData | null> {
  try {
    const [infoRes, ratingRes] = await Promise.all([
      fetch(`${CF_API}/user.info?handles=${personal.codeforcesHandle}`, {
        next: { revalidate: 3600 },
      }),
      fetch(`${CF_API}/user.rating?handle=${personal.codeforcesHandle}`, {
        next: { revalidate: 3600 },
      }),
    ]);
    const [info, rating] = await Promise.all([infoRes.json(), ratingRes.json()]);
    if (info.status !== "OK" || rating.status !== "OK") return null;
    const u = info.result[0];
    return {
      rating: u.rating ?? null,
      maxRating: u.maxRating ?? null,
      history: (rating.result as RatingChange[]).slice(-20),
    };
  } catch {
    return null;
  }
}

export async function CPStats() {
  const data = await getCFData();
  const rating = data?.rating ?? null;
  const tier = rating != null ? cfTier(rating) : null;
  const sparkVals = data?.history.map((h) => h.newRating) ?? [];
  const recent = data ? [...data.history].slice(-6).reverse() : [];
  const syncedAt = data
    ? `${new Date().toISOString().slice(0, 16).replace("T", " ")} UTC`
    : null;

  return (
    <section id="stats" className="mx-auto max-w-5xl px-5 py-20">
      <SectionLabel meta={data ? "live · 1h sync" : "cached"}>
        competitive_programming
      </SectionLabel>

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
            className="font-mono text-[15px] text-[var(--muted)] transition-colors hover:text-[var(--amber)]"
          >
            @{personal.codeforcesHandle}{" "}
            <ExternalLinkIcon size={12} className="inline" />
          </a>
        </div>

        {!data && (
          <div className="py-6 font-mono text-sm text-[var(--muted)]">
            <span className="text-[var(--amber)]">!</span> couldn&apos;t
            reach Codeforces just now. Last rating I saw:{" "}
            <span className="text-[var(--mint)]">
              {personal.codeforcesRating}
            </span>{" "}
            ({cfTier(personal.codeforcesRating).name}).
          </div>
        )}

        {data && (
          <div className="grid gap-6 md:grid-cols-[200px_1fr] md:gap-8">
            {/* rating block — tier color only on the large number (3:1) */}
            <div className="flex flex-row items-end gap-5 md:flex-col md:items-start md:gap-2">
              <div>
                <div
                  className="font-mono text-5xl font-bold leading-none"
                  style={{ color: tier?.color }}
                >
                  {rating}
                </div>
                <div className="mt-1 font-mono text-[15px] text-[var(--text-2)]">
                  {tier?.name}
                </div>
              </div>
              {data.maxRating != null && (
                <div className="pb-1 font-mono text-[15px] text-[var(--muted)] md:pb-0 md:pt-2">
                  peak{" "}
                  <span className="text-[var(--text-2)]">{data.maxRating}</span>
                  <span className="mx-2 text-[var(--border-strong)]">·</span>
                  {data.history.length} rated
                </div>
              )}
            </div>

            {/* braille sparkline + contests */}
            <div className="md:border-l md:border-[var(--border)] md:pl-8">
              {sparkVals.length > 1 && (
                <div>
                  <div
                    className="font-mono text-3xl leading-none tracking-[0.1em] text-[var(--mint)]"
                    aria-hidden="true"
                  >
                    {brailleSparkline(sparkVals)}
                  </div>
                  <p className="sr-only">
                    Codeforces rating over the last {sparkVals.length}{" "}
                    contests, from {Math.min(...sparkVals)} to{" "}
                    {Math.max(...sparkVals)}.
                  </p>
                  <div className="mt-1.5 font-mono text-[13px] text-[var(--muted)]">
                    last {sparkVals.length} contests ·{" "}
                    {Math.min(...sparkVals)}–{Math.max(...sparkVals)}
                  </div>
                </div>
              )}

              <div className="mt-4 grid gap-x-6 gap-y-1.5 font-mono text-[15px] sm:grid-cols-2">
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

              {syncedAt && (
                <div className="mt-3 text-right font-mono text-[13px] text-[var(--muted)]">
                  synced {syncedAt}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
