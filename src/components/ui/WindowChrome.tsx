import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  /** Title shown in the header bar, e.g. "~/whoami". */
  title: string;
  /** Optional accent CSS var for the title glyph. */
  accent?: string;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
};

/**
 * A GTK/Linux-style window: header bar with title + square window controls
 * (no macOS traffic lights), wrapping arbitrary content.
 */
export function WindowChrome({
  title,
  accent = "--amber",
  children,
  className,
  bodyClassName,
}: Props) {
  return (
    <div className={cn("panel overflow-hidden", className)}>
      <div className="winbar">
        <span
          className="font-mono text-xs"
          style={{ color: `var(${accent})` }}
        >
          {title}
        </span>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="winctl" aria-hidden="true" />
          <span className="winctl" aria-hidden="true" />
          <span className="winctl" aria-hidden="true" />
        </div>
      </div>
      <div className={bodyClassName}>{children}</div>
    </div>
  );
}
