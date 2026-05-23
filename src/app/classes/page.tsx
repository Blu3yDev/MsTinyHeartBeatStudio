import { PageHeader } from "@/components/layout/page-header";
import { StyleGroups } from "@/components/sections/style-groups";
import { AgeGroups } from "@/components/sections/age-groups";
import { ClassFormats } from "@/components/sections/class-formats";
import { ScheduleTable } from "@/components/sections/schedule-table";
import { Programmes } from "@/components/sections/programmes";
import { ClosingCta } from "@/components/sections/closing-cta";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta(
  "Classes",
  "Latin, Ballroom, Caribbean, and modern dance classes in Victoria, Mahé, for ages four and up at beginner, intermediate, and advanced levels.",
);

export default function ClassesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Classes"
        title="Find the style that moves you"
        intro="Weekly classes run in age groups across three families of dance, with a true beginner's entry point in every style."
      />
      <StyleGroups
        tone="base"
        heading={{
          eyebrow: "Dance styles",
          title: "Three families of dance",
        }}
      />
      <AgeGroups
        tone="surface"
        heading={{
          eyebrow: "By age",
          title: "A class group for every age",
          intro:
            "Children join the group that matches their age; youth and adults train together from sixteen.",
        }}
      />
      <ClassFormats
        tone="base"
        heading={{
          eyebrow: "How classes run",
          title: "Formats and levels for every dancer",
          intro:
            "Train privately or in a group, and progress at a pace that matches your level.",
        }}
      />
      <ScheduleTable
        tone="surface"
        heading={{ eyebrow: "Timetable", title: "The weekly schedule" }}
      />
      <Programmes
        tone="base"
        heading={{
          eyebrow: "More ways to train",
          title: "Programmes beyond the weekly class",
        }}
      />
      <ClosingCta />
    </>
  );
}
