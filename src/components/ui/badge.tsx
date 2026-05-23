import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type BadgeTone = "default" | "brand";

const toneClasses: Record<BadgeTone, string> = {
  default: "border-line text-muted",
  brand: "border-brand/40 text-brand-bright",
};

/** Small outlined label for levels, tags, and metadata. */
export function Badge({
  children,
  tone = "default",
  className,
}: {
  children: ReactNode;
  tone?: BadgeTone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-[0.68rem] font-medium uppercase tracking-[0.12em]",
        toneClasses[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
