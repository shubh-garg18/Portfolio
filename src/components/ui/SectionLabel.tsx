import { cn } from "@/lib/utils";

type Props = {
  /** e.g. "about.me" → renders `// about.me` */
  children: string;
  /** Right-aligned count, e.g. "05 repos" — leading number is highlighted. */
  meta?: string;
  className?: string;
};

/** `// section_name` comment header with a uniform count badge on the right. */
export function SectionLabel({ children, meta, className }: Props) {
  let badge = null;
  if (meta) {
    const [lead, ...rest] = meta.split(" ");
    const numeric = /^\d/.test(lead);
    badge = (
      <span className="shrink-0 rounded border border-[var(--border)] bg-[var(--panel)] px-2 py-0.5 font-mono text-[14px] text-[var(--muted)]">
        {numeric ? (
          <>
            <span className="text-[var(--amber)]">{lead}</span>
            {rest.length > 0 ? ` ${rest.join(" ")}` : ""}
          </>
        ) : (
          meta
        )}
      </span>
    );
  }

  return (
    <div
      className={cn(
        "mb-8 flex items-center justify-between gap-4 border-b border-[var(--border)] pb-3 font-mono",
        className,
      )}
    >
      <h2 className="text-sm tracking-wide text-[var(--text-2)]">
        <span className="text-[var(--amber)]">{"// "}</span>
        {children}
      </h2>
      {badge}
    </div>
  );
}
