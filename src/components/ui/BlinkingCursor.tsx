import { cn } from "@/lib/utils";

/** Amber block cursor that blinks. ▮ */
export function BlinkingCursor({ className }: { className?: string }) {
  return (
    <span aria-hidden="true" className={cn("cursor-blink", className)}>
      ▮
    </span>
  );
}
