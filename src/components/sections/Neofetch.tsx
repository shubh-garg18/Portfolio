import { WindowChrome } from "@/components/ui/WindowChrome";
import { profile, system } from "@/data/content";

const SWATCHES = ["--coral", "--amber", "--mint", "--cyan", "--indigo"] as const;

/** Arch-style mountain emblem — the "distro logo" slot of a neofetch card. */
function Emblem() {
  return (
    <svg
      viewBox="0 0 120 120"
      className="h-24 w-24 shrink-0 sm:h-28 sm:w-28"
      role="img"
      aria-label="bitwise logo"
    >
      <defs>
        <linearGradient id="emblem" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--amber)" />
          <stop offset="100%" stopColor="var(--coral)" />
        </linearGradient>
      </defs>
      <circle cx="60" cy="58" r="44" fill="none" stroke="var(--border-strong)" strokeWidth="1" strokeDasharray="2 7" />
      {/* stacked peaks */}
      <path d="M28 88 L60 34 L92 88" fill="none" stroke="url(#emblem)" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
      <path d="M42 96 L60 64 L78 96" fill="none" stroke="var(--amber)" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" opacity="0.6" />
      {/* apex pulse + prompt */}
      <circle className="glyph-pulse" cx="60" cy="34" r="4" fill="var(--amber)" />
      <text x="60" y="114" textAnchor="middle" className="font-mono" fontSize="11" fill="var(--muted)">
        &gt;_
      </text>
    </svg>
  );
}

export function Neofetch() {
  return (
    <WindowChrome title="neofetch" accent="--amber" bodyClassName="p-5 sm:p-6">
      <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start sm:gap-6">
        <Emblem />

        <div className="w-full min-w-0 font-mono text-[12.5px] leading-relaxed">
          {/* user@host */}
          <div>
            <span className="text-[var(--mint)]">{system.user}</span>
            <span className="text-[var(--muted)]">@</span>
            <span className="text-[var(--indigo)]">{system.host}</span>
          </div>
          <div className="my-1 text-[var(--border-strong)]">
            ──────────────────
          </div>

          {/* spec rows */}
          <dl className="space-y-[3px]">
            {profile.map((row) => (
              <div key={row.k} className="flex gap-2">
                <dt className="w-14 shrink-0" style={{ color: `var(${row.c})` }}>
                  {row.k}
                </dt>
                <dd className="truncate text-[var(--text-2)]">{row.v}</dd>
              </div>
            ))}
          </dl>

          {/* palette swatches */}
          <div className="mt-3 flex gap-1">
            {SWATCHES.map((c) => (
              <span
                key={c}
                className="h-3.5 w-6 rounded-[2px]"
                style={{ background: `var(${c})` }}
              />
            ))}
          </div>
        </div>
      </div>
    </WindowChrome>
  );
}
