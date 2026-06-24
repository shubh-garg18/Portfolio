import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  /** CSS var exposed to children as --accent (e.g. for an accent rule). */
  accent?: string;
  /** Disable the hover-lift (for static containers). */
  static?: boolean;
  className?: string;
  style?: CSSProperties;
};

/** Soft surface panel with a gentle hover-lift. */
export function GlowCard({
  children,
  accent,
  static: isStatic,
  className,
  style,
}: Props) {
  return (
    <div
      className={cn("panel", !isStatic && "panel-hover", className)}
      style={{
        ...(accent ? ({ ["--accent" as string]: `var(${accent})` } as CSSProperties) : {}),
        ...style,
      }}
    >
      {children}
    </div>
  );
}
