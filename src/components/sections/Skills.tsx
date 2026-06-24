import { skills, langAccent, categoryAccent } from "@/data/content";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-5xl scroll-mt-16 px-5 py-20">
      <SectionLabel meta={`${String(skills.length).padStart(2, "0")} stacks`}>
        skills
      </SectionLabel>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((cat, i) => {
          const catAccent = categoryAccent[cat.label] ?? "--amber";
          return (
            <Reveal key={cat.label} delay={(i % 3) * 0.06}>
              <div className="panel panel-hover h-full p-5">
                <h3 className="mb-3 font-mono text-xs uppercase tracking-wider text-[var(--muted)]">
                  <span style={{ color: `var(${catAccent})` }}>#</span>{" "}
                  {cat.label}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((item) => {
                    const accent = langAccent[item] ?? catAccent;
                    return (
                      <span
                        key={item}
                        className="chip"
                        style={{ ["--chip" as string]: `var(${accent})` }}
                      >
                        {item}
                      </span>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
