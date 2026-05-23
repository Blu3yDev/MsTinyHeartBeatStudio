import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Small uppercase label with a leading rule, used above headings.
 * Renders in the brand red.
 */
export function Eyebrow({
  children,
  center = false,
  className,
}: {
  children: ReactNode;
  center?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-brand",
        className,
      )}
    >
      <span aria-hidden="true" className="h-px w-7 bg-brand" />
      {children}
      {center && <span aria-hidden="true" className="h-px w-7 bg-brand" />}
    </span>
  );
}
