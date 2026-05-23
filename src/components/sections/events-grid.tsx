import type { ReactNode } from "react";
import { Section, SectionHeading } from "@/components/layout/section";
import { Reveal } from "@/components/ui/reveal";
import { eventCategories } from "@/content/events";

type Heading = { eyebrow: string; title: ReactNode; intro?: ReactNode };

/** Competitions, showcases, examinations, and camps. */
export function EventsGrid({
  id,
  tone = "base",
  heading,
}: {
  id?: string;
  tone?: "base" | "surface";
  heading?: Heading;
}) {
  return (
    <Section id={id} tone={tone}>
      {heading && <SectionHeading {...heading} className="mb-14" />}
      <div className="grid gap-5 md:grid-cols-2">
        {eventCategories.map((category, index) => (
          <Reveal
            key={category.title}
            delay={(index % 2) * 90}
            direction={index % 2 === 0 ? "left" : "right"}
          >
            <article className="card-lift flex h-full flex-col border border-line bg-surface-2 p-7 md:p-8">
              <h3 className="font-display text-2xl font-medium tracking-tight text-cream">
                {category.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {category.blurb}
              </p>
              <ul className="mt-6 flex flex-col gap-2.5 border-t border-line pt-6">
                {category.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm text-cream"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-1.5 h-1 w-1 shrink-0 rotate-45 bg-brand"
                    />
                    {item}
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
