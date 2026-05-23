import type { ReactNode } from "react";
import { Section, SectionHeading } from "@/components/layout/section";
import { Reveal } from "@/components/ui/reveal";
import { ageGroups } from "@/content/programs";

type Heading = { eyebrow: string; title: ReactNode; intro?: ReactNode };

/** Weekly class groups by age. */
export function AgeGroups({
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
        <ul className="border-t border-line">
          {ageGroups.map((group) => (
            <li
              key={group.name}
              className="flex items-center justify-between gap-6 border-b border-line py-6"
            >
              <div>
                <h3 className="font-display text-xl font-medium tracking-tight text-cream md:text-2xl">
                  {group.name}
                </h3>
                <p className="mt-1 text-sm text-muted">{group.type}</p>
              </div>
              <span className="shrink-0 font-display text-lg text-brand md:text-xl">
                {group.age}
              </span>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
