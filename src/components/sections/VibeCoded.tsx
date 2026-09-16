import { vibeCoded } from "@/data/content";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TerminalBadge } from "@/components/ui/TerminalBadge";
import { Reveal } from "@/components/ui/Reveal";
import { WindowChrome } from "@/components/ui/WindowChrome";
import { GithubIcon, ExternalLinkIcon } from "@/components/ui/icons";

/**
 * Its own section rather than a card in `projects`, because the interesting
 * claim is how it was built, not just what it does. Labelled honestly — the
 * agent did the typing; the constraints and the review did not come free.
 */
export function VibeCoded() {
  const p = vibeCoded;

  return (
    <section id="vibe-coded" className="mx-auto max-w-5xl px-5 py-20">
      <SectionLabel meta="01 public">vibe_coded</SectionLabel>

      <Reveal>
        <WindowChrome
          title={`~/${p.name}`}
          accent={p.accent}
          bodyClassName="p-5 sm:p-6"
        >
          <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
            <div>
              <h3 className="font-mono text-lg text-[var(--text)]">{p.name}</h3>
              <p className="mt-0.5 font-mono text-[15px] text-[var(--muted)]">
                {p.subtitle}
              </p>
            </div>
            <a
              href={p.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${p.name} on GitHub`}
              className="inline-flex shrink-0 items-center gap-1.5 font-mono text-[15px] text-[var(--text-2)] transition-colors hover:text-[var(--amber)]"
            >
              <GithubIcon size={16} />
              source
              <ExternalLinkIcon size={13} />
            </a>
          </div>

          <p className="mt-4 text-[15px] leading-relaxed text-[var(--text-2)]">
            {p.description}
          </p>

          {/* the honest note, set apart as a terminal aside */}
          <div
            className="mt-4 border-l-2 bg-[var(--inset)] px-4 py-3 text-[15px] leading-relaxed text-[var(--text-2)]"
            style={{ borderColor: `var(${p.accent})` }}
          >
            <span
              className="font-mono"
              style={{ color: `var(${p.accent})` }}
            >
              {"// built with an agent "}
            </span>
            {p.note}
          </div>

          <div className="mt-5 grid grid-cols-3 gap-2">
            {p.stats.map((s) => (
              <div
                key={s.label}
                className="rounded-md border border-[var(--border)] bg-[var(--inset)] px-2 py-2 text-center"
              >
                <div
                  className="font-mono text-[15px] font-semibold"
                  style={{ color: `var(${p.accent})` }}
                >
                  {s.value}
                </div>
                <div className="mt-0.5 text-[13px] uppercase tracking-wide text-[var(--muted)]">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-1.5">
            {p.tags.map((t) => (
              <TerminalBadge key={t} accent={p.accent}>
                {t}
              </TerminalBadge>
            ))}
          </div>
        </WindowChrome>
      </Reveal>
    </section>
  );
}
