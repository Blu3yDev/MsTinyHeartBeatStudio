import type { ReactNode } from "react";
import { Section, SectionHeading } from "@/components/layout/section";
import { Reveal } from "@/components/ui/reveal";
import { schedule } from "@/content/schedule";

type Heading = { eyebrow: string; title: ReactNode; intro?: ReactNode };

/** Weekly timetable. */
export function ScheduleTable({
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
        <div className="border-t border-line">
          <div className="hidden grid-cols-[1.7fr_1fr_1fr_1fr] gap-4 border-b border-line py-4 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-faint sm:grid">
            <span>Class group</span>
            <span>Age</span>
            <span>Days</span>
            <span>Time</span>
          </div>
          {schedule.map((row) => (
            <div
              key={row.group}
              className="grid grid-cols-2 gap-x-4 gap-y-1.5 border-b border-line py-5 sm:grid-cols-[1.7fr_1fr_1fr_1fr] sm:items-center sm:gap-y-0"
            >
              <span className="col-span-2 font-medium text-cream sm:col-span-1">
                {row.group}
              </span>
              <span className="text-sm text-muted">{row.age}</span>
              <span className="text-sm text-muted">{row.days}</span>
              <span className="text-sm font-medium text-brand">{row.time}</span>
            </div>
          ))}
        </div>
      </Reveal>
      <p className="mt-6 text-xs text-faint">
        Times shown are indicative, so please confirm the current timetable
        with the studio when you register.
      </p>
    </Section>
  );
}
