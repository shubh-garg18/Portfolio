import { achievements } from "@/data/content";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { ExternalLinkIcon } from "@/components/ui/icons";

export function Achievements() {
  return (
    <section id="achievements" className="mx-auto max-w-5xl px-5 py-20">
      <SectionLabel
        meta={`${String(achievements.length).padStart(2, "0")} awards`}
      >
        achievements
      </SectionLabel>

      <div className="grid auto-rows-fr items-stretch gap-4 sm:grid-cols-2">
        {achievements.map((a, i) => {
          const inner = (
            <div className="panel panel-hover flex h-full items-start gap-3 p-5">
              <span
                aria-hidden="true"
                className="flex w-7 shrink-0 justify-center text-2xl leading-none"
              >
                {a.icon}
              </span>
              <div className="min-w-0">
                <h3 className="flex items-center gap-1.5 font-mono text-sm text-[var(--text)]">
                  {a.title}
                  {a.link && (
                    <ExternalLinkIcon size={13} className="text-[var(--muted)]" />
                  )}
                </h3>
                <p className="mt-1 text-[15px] leading-relaxed text-[var(--text-2)]">
                  {a.detail}
                </p>
              </div>
            </div>
          );

          return (
            <Reveal key={a.title} delay={(i % 2) * 0.05} className="h-full">
              {a.link ? (
                <a
                  href={a.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full"
                >
                  {inner}
                </a>
              ) : (
                inner
              )}
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
