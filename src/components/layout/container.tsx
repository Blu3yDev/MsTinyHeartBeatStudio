import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Centered content column with consistent max-width and responsive
 * gutters. Wrap section content in this so every band lines up.
 */
export function Container({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8", className)}>
      {children}
    </div>
  );
}
