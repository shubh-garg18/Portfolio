import { personal } from "@/data/content";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { MailIcon, LinkedInIcon, GithubIcon, ExternalLinkIcon } from "@/components/ui/icons";

export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-5xl px-5 py-20">
      <SectionLabel meta="03 links">get_in_touch()</SectionLabel>

      <Reveal>
        <div className="panel p-7 sm:p-10">
          <p className="font-mono text-sm text-[var(--text-2)]">
            <span className="text-[var(--amber)]">$</span>{" "}
            <span className="text-[var(--text)]">
              I&apos;m looking for SDE, backend and ML roles. Email is the
              quickest way to reach me.
            </span>
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={`mailto:${personal.email}`}
              className="inline-flex items-center justify-center gap-2 rounded-md border border-[var(--amber)] bg-[color-mix(in_srgb,var(--amber)_14%,transparent)] px-5 py-2.5 font-mono text-sm text-[var(--amber)] transition-all hover:-translate-y-0.5 hover:bg-[color-mix(in_srgb,var(--amber)_22%,transparent)]"
            >
              <MailIcon size={16} />
              {personal.email}
            </a>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-[var(--border-strong)] px-5 py-2.5 font-mono text-sm text-[var(--text-2)] transition-all hover:-translate-y-0.5 hover:border-[var(--indigo)] hover:text-[var(--indigo)]"
            >
              <LinkedInIcon size={16} />
              LinkedIn
              <ExternalLinkIcon size={13} />
            </a>
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-[var(--border-strong)] px-5 py-2.5 font-mono text-sm text-[var(--text-2)] transition-all hover:-translate-y-0.5 hover:border-[var(--text)] hover:text-[var(--text)]"
            >
              <GithubIcon size={16} />
              GitHub
              <ExternalLinkIcon size={13} />
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
