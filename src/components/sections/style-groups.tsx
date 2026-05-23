import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Section, SectionHeading } from "@/components/layout/section";
import { Reveal } from "@/components/ui/reveal";
import { ArrowLink } from "@/components/ui/arrow-link";
import { styleGroups } from "@/content/programs";

type Heading = { eyebrow: string; title: ReactNode; intro?: ReactNode };

/** The three dance families taught at the studio. */
export function StyleGroups({
  id,
  tone = "base",
  heading,
  cta,
}: {
  id?: string;
  tone?: "base" | "surface";
  heading?: Heading;
  cta?: { label: string; href: string };
}) {
  return (
    <Section id={id} tone={tone}>
      {heading && (
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading {...heading} />
          {cta && (
            <ArrowLink href={cta.href} className="shrink-0">
              {cta.label}
            </ArrowLink>
          )}
        </div>
      )}
      <div className={cn("grid gap-5 lg:grid-cols-3", heading && "mt-14")}>
        {styleGroups.map((group, index) => (
          <Reveal
            key={group.name}
            delay={(index % 3) * 90}
            direction={index === 0 ? "left" : index === 2 ? "right" : "scale"}
          >
            <article className="card-lift flex h-full flex-col border border-line bg-surface-2 p-7 md:p-8">
              <span className="font-display text-sm text-faint">
                0{index + 1}
              </span>
              <h3 className="mt-5 font-display text-2xl font-medium tracking-tight text-cream">
                {group.name}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                {group.blurb}
              </p>
              <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2.5 border-t border-line pt-6">
                {group.styles.map((style) => (
                  <li
                    key={style}
                    className="flex items-center gap-2 text-sm text-cream"
                  >
                    <span
                      aria-hidden="true"
                      className="h-1 w-1 rotate-45 bg-brand"
                    />
                    {style}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
