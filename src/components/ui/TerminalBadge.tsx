import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  /** CSS var for the chip colour. Defaults to amber. */
  accent?: string;
  className?: string;
};

/** Bordered, color-coded monospace chip. */
export function TerminalBadge({
  children,
  accent = "--amber",
  className,
}: Props) {
  return (
    <span
      className={cn("chip", className)}
      style={{ ["--chip" as string]: `var(${accent})` } as CSSProperties}
    >
      {children}
    </span>
  );
}
