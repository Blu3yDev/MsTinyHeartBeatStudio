import type { ReactNode } from "react";
import { Section, SectionHeading } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";
import { classFormats, classLevels } from "@/content/programs";

type Heading = { eyebrow: string; title: ReactNode; intro?: ReactNode };

/** Class formats and levels — how training is structured. */
export function ClassFormats({
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
      {heading && <SectionHeading {...heading} className="mb-12" />}
      <Reveal>
        <div className="grid gap-10 border-t border-line pt-10 sm:grid-cols-2 sm:gap-16">
          <div>
            <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-brand">
              Class formats
            </h3>
            <ul className="mt-5 flex flex-wrap gap-2.5">
              {classFormats.map((format) => (
                <li key={format}>
                  <Badge>{format}</Badge>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-brand">
              Levels
            </h3>
            <ul className="mt-5 flex flex-wrap gap-2.5">
              {classLevels.map((level) => (
                <li key={level}>
                  <Badge>{level}</Badge>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
