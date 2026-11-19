"use client";

import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { AnimatePresence, m } from "framer-motion";
import {
  projects,
  projectGroups,
  type Project,
  type ProjectGroup,
} from "@/data/content";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TerminalBadge } from "@/components/ui/TerminalBadge";
import {
  ChevronRightIcon,
  ExternalLinkIcon,
  GithubIcon,
  LockIcon,
  TrophyIcon,
} from "@/components/ui/icons";
import { cn } from "@/lib/utils";

// Same parts, same order, fixed-size stat blocks: cards in a row line up.
function ProjectCard({ p, tab }: { p: Project; tab: ProjectGroup }) {
  const accent = `var(${p.accent})`;
  const context = p.context?.[tab];

  return (
    <m.article
      layout
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.3 }}
      className="panel panel-hover group flex flex-col overflow-hidden p-5 sm:p-6"
      style={{ borderTop: `2px solid ${accent}` }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-mono text-lg text-[var(--text)]">
            {p.name}
          </h3>
          <p className="mt-0.5 font-mono text-[15px] text-[var(--muted)]">
            {p.subtitle}
          </p>
        </div>
        <span
          className="chip shrink-0"
          style={{ ["--chip" as string]: accent } as CSSProperties}
        >
          {p.lang}
        </span>
      </div>

      {context && (
        <p
          className="mt-3 flex items-baseline gap-1.5 font-mono text-[14px]"
          style={{ color: p.won ? "var(--amber)" : "var(--muted)" }}
        >
          {p.won ? (
            <TrophyIcon size={14} className="shrink-0 self-center" />
          ) : (
            <span className="shrink-0" style={{ color: accent }}>
              {"//"}
            </span>
          )}
          <span>{context}</span>
        </p>
      )}

      <ul className="mt-4 space-y-2">
        {p.points.map((point) => (
          <li
            key={point}
            className="flex gap-2 text-[15px] leading-snug text-[var(--text-2)]"
          >
            <ChevronRightIcon
              size={14}
              className="mt-[3px] shrink-0"
              style={{ color: accent }}
            />
            <span>{point}</span>
          </li>
        ))}
      </ul>

      {/* pinned to the bottom so neighbouring cards line up here */}
      <div className="mt-auto pt-5">
        <div className="grid grid-cols-3 gap-2">
          {p.stats.map((s) => (
            <div
              key={s.label}
              className="flex h-[4.5rem] flex-col items-center justify-center rounded-md border border-[var(--border)] bg-[var(--inset)] px-1.5 text-center"
            >
              <div
                className="font-mono text-xl font-semibold leading-none"
                style={{ color: accent }}
              >
                {s.value}
              </div>
              <div className="mt-1.5 text-[12px] uppercase leading-tight tracking-wide text-[var(--muted)]">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {p.tags.map((t) => (
            <TerminalBadge key={t} accent={p.accent}>
              {t}
            </TerminalBadge>
          ))}
        </div>

        <div className="mt-4 border-t border-[var(--border)] pt-3">
          {p.github ? (
            <a
              href={p.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Read the code for ${p.name} on GitHub`}
              className="inline-flex items-center gap-2 font-mono text-[15px] text-[var(--text-2)] transition-colors hover:text-[var(--amber)]"
            >
              <GithubIcon size={17} />
              read the code
              <ExternalLinkIcon size={13} />
            </a>
          ) : (
            <span className="inline-flex items-center gap-2 font-mono text-[15px] text-[var(--muted)]">
              <LockIcon size={16} />
              private repo
            </span>
          )}
        </div>
      </div>
    </m.article>
  );
}

export function Projects() {
  const [filter, setFilter] = useState<ProjectGroup>(projectGroups[0]);

  const shown = useMemo(
    () => projects.filter((p) => p.groups.includes(filter)),
    [filter],
  );

  return (
    <section id="projects" className="mx-auto max-w-5xl px-5 py-20">
      <SectionLabel meta={`${String(shown.length).padStart(2, "0")} repos`}>
        projects
      </SectionLabel>

      <div className="mb-8 flex flex-wrap gap-2 font-mono text-[15px]">
        {projectGroups.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            className={cn(
              "rounded-md border px-3 py-1.5 transition-colors duration-200",
              filter === f
                ? "border-[var(--amber)] bg-[color-mix(in_srgb,var(--amber)_14%,transparent)] text-[var(--amber)]"
                : "border-[var(--border)] text-[var(--text-2)] hover:border-[var(--border-strong)] hover:text-[var(--text)]",
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <m.div layout className="grid gap-5 sm:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {shown.map((p) => (
            <ProjectCard key={p.id} p={p} tab={filter} />
          ))}
        </AnimatePresence>
      </m.div>
    </section>
  );
}
