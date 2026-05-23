import type { ReactNode } from "react";
import { Section, SectionHeading } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";
import { medalGrades, professionalLevels } from "@/content/studio";

type Heading = { eyebrow: string; title: ReactNode; intro?: ReactNode };

/** Medal-test grades and professional examination levels. */
export function MedalTests({
  id,
  tone = "surface",
  heading,
}: {
  id?: string;
  tone?: "base" | "surface";
  heading?: Heading;
}) {
  return (
    <Section id={id} tone={tone}>
      {heading && <SectionHeading {...heading} className="mb-14" />}

      <div className="grid gap-5 sm:grid-cols-3">
        {medalGrades.map((grade, index) => (
          <Reveal key={grade.grade} delay={index * 90}>
            <article className="card-lift border border-line bg-base p-7 text-center">
              <h3 className="font-display text-2xl font-medium tracking-tight text-cream">
                {grade.grade}
              </h3>
              <p className="mt-2 text-sm text-muted">
                {grade.levels} progressive levels
              </p>
              <div className="mt-5 flex justify-center gap-1.5">
                {Array.from({ length: grade.levels }).map((_, pip) => (
                  <span key={pip} className="h-1.5 w-7 bg-brand/45" />
                ))}
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-10 border-t border-line pt-8">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-faint">
          Professional levels
        </p>
        <ul className="mt-4 flex flex-wrap gap-2.5">
          {professionalLevels.map((level) => (
            <li key={level}>
              <Badge>{level}</Badge>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
