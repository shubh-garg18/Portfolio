import { about } from "@/data/content";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { Neofetch } from "@/components/sections/Neofetch";

export function About() {
  const paragraphs = about.body.split("\n\n");

  return (
    <section id="about" className="mx-auto max-w-5xl scroll-mt-16 px-5 py-20">
      <SectionLabel meta="01 profile">about.me</SectionLabel>

      <div className="grid items-center gap-10 md:grid-cols-[1.25fr_1fr]">
        <Reveal className="space-y-4 text-[15px] leading-relaxed text-[var(--text-2)]">
          {paragraphs.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </Reveal>

        <Reveal delay={0.1}>
          <Neofetch />
        </Reveal>
      </div>
    </section>
  );
}
