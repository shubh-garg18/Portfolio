"use client";

import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { AnimatePresence, m } from "framer-motion";
import { projects, type Project } from "@/data/content";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TerminalBadge } from "@/components/ui/TerminalBadge";
import { GithubIcon, ExternalLinkIcon, TrophyIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

const FILTERS = ["All", "Featured", "C++", "TypeScript", "Python"] as const;
type Filter = (typeof FILTERS)[number];

function matches(p: Project, f: Filter): boolean {
  if (f === "All") return true;
  if (f === "Featured") return p.featured;
  return p.lang === f;
}

function ProjectCard({ p }: { p: Project }) {
  return (
    <m.article
      layout
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.3 }}
      className="panel panel-hover group flex flex-col overflow-hidden p-5 sm:p-6"
      style={{ borderTop: `2px solid var(${p.accent})` }}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-mono text-lg text-[var(--text)]">{p.name}</h3>
          <p className="mt-0.5 font-mono text-[15px] text-[var(--muted)]">
            {p.subtitle}
          </p>
        </div>
        <span
          className="chip shrink-0"
          style={{ ["--chip" as string]: `var(${p.accent})` } as CSSProperties}
        >
          {p.lang}
        </span>
      </div>

      {p.award && (
        <div className="mt-3 flex items-center gap-1.5 font-mono text-[14px] text-[var(--amber)]">
          <TrophyIcon size={14} className="shrink-0" />
          {p.award}
        </div>
      )}

      <p className="mt-3 text-[15px] leading-relaxed text-[var(--text-2)]">
        {p.description}
      </p>

      {p.stats.length > 0 && (
        <div className="mt-4 grid grid-cols-3 gap-2">
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
      )}

      <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-5">
        <div className="flex flex-wrap gap-1.5">
          {p.tags.map((t) => (
            <TerminalBadge key={t} accent={p.accent}>
              {t}
            </TerminalBadge>
          ))}
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
    </m.article>
  );
}

export function Projects() {
  const [filter, setFilter] = useState<Filter>("All");

  const shown = useMemo(
    () => projects.filter((p) => matches(p, filter)),
    [filter],
  );

  return (
    <section id="projects" className="mx-auto max-w-5xl px-5 py-20">
      <SectionLabel meta={`${String(shown.length).padStart(2, "0")} repos`}>
        projects
      </SectionLabel>

      <div className="mb-8 flex flex-wrap gap-2 font-mono text-[15px]">
        {FILTERS.map((f) => (
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
            <ProjectCard key={p.id} p={p} />
          ))}
        </AnimatePresence>
      </m.div>
    </section>
  );
}
