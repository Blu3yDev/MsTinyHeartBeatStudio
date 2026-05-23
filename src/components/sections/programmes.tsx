import type { ReactNode } from "react";
import { Section, SectionHeading } from "@/components/layout/section";
import { Reveal } from "@/components/ui/reveal";
import { programmes } from "@/content/programs";

type Heading = { eyebrow: string; title: ReactNode; intro?: ReactNode };

/** Additional programmes beyond the weekly class styles. */
export function Programmes({
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
      {heading && <SectionHeading {...heading} className="mb-12" />}
      <Reveal>
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3">
          {programmes.map((programme, index) => (
            <li
              key={programme}
              className="flex items-baseline gap-5 border-t border-line py-5"
            >
              <span className="font-display text-sm text-faint">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-cream">{programme}</span>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
