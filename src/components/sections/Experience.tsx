import { experience } from "@/data/content";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TerminalBadge } from "@/components/ui/TerminalBadge";
import { Reveal } from "@/components/ui/Reveal";
import { ChevronRightIcon } from "@/components/ui/icons";

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-5xl scroll-mt-16 px-5 py-20">
      <SectionLabel
        meta={`${String(experience.length).padStart(2, "0")} role${experience.length === 1 ? "" : "s"}`}
      >
        experience
      </SectionLabel>

      <div className="relative ml-2 border-l border-[var(--border-strong)] pl-6 sm:pl-8">
        {experience.map((job, i) => (
          <Reveal key={job.company} delay={i * 0.05}>
            <article className="relative pb-2">
              <span className="absolute -left-[31px] top-2 h-3 w-3 rounded-full border-2 border-[var(--amber)] bg-[var(--bg)] sm:-left-[39px]">
                <span className="absolute inset-0 animate-ping rounded-full bg-[var(--amber)]/40" />
              </span>

              <div className="panel panel-hover p-5 sm:p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="font-mono text-lg text-[var(--text)]">
                    {job.company}
                  </h3>
                  <span className="font-mono text-xs text-[var(--amber)]">
                    {job.period}
                  </span>
                </div>
                <p className="mt-0.5 font-mono text-sm text-[var(--text-2)]">
                  {job.role}
                </p>

                <ul className="mt-4 space-y-2.5">
                  {job.bullets.map((b) => (
                    <li
                      key={b.slice(0, 28)}
                      className="flex gap-2 text-[14px] leading-relaxed text-[var(--text-2)]"
                    >
                      <ChevronRightIcon
                        size={15}
                        className="mt-1 shrink-0 text-[var(--mint)]"
                      />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex flex-wrap gap-2">
                  {job.tags.map((t) => (
                    <TerminalBadge key={t} accent="--indigo">
                      {t}
                    </TerminalBadge>
                  ))}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
