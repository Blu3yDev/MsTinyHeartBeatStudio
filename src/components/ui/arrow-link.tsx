import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { ArrowRight } from "@/components/ui/icons";

/** Inline uppercase text link with a nudging arrow. */
export function ArrowLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-2.5 text-xs font-medium uppercase tracking-[0.16em] text-cream transition-colors hover:text-brand",
        className,
      )}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-expo group-hover:translate-x-1" />
    </Link>
  );
}
