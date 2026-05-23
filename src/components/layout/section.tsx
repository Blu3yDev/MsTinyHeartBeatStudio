import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/ui/eyebrow";

type SectionTone = "base" | "surface";

const toneClasses: Record<SectionTone, string> = {
  base: "bg-base",
  surface: "bg-surface",
};

/** A full-width band with consistent vertical rhythm and a Container. */
export function Section({
  id,
  tone = "base",
  className,
  containerClassName,
  children,
}: {
  id?: string;
  tone?: SectionTone;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn("scroll-mt-24 py-24 md:py-32", toneClasses[tone], className)}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

/** Eyebrow + display heading + intro block. */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <Eyebrow center={align === "center"}>{eyebrow}</Eyebrow>
      <h2 className="mt-5 font-display text-3xl font-medium leading-[1.12] tracking-tight text-balance text-cream sm:text-4xl md:text-[2.85rem]">
        {title}
      </h2>
      {intro && (
        <p className="mt-5 text-base leading-relaxed text-pretty text-muted md:text-lg">
          {intro}
        </p>
      )}
    </div>
  );
}
