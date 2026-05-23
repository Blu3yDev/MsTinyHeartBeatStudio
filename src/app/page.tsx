import { Hero } from "@/components/sections/hero";
import { Marquee } from "@/components/sections/marquee";
import { StyleGroups } from "@/components/sections/style-groups";
import { FounderQuote } from "@/components/sections/founder-quote";
import { MembershipPackages } from "@/components/sections/membership-packages";
import { EventsGrid } from "@/components/sections/events-grid";
import { ClosingCta } from "@/components/sections/closing-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <StyleGroups
        tone="base"
        heading={{
          eyebrow: "What we teach",
          title: "Three families of dance, one studio",
          intro:
            "From the competitive Latin and Ballroom syllabus to Caribbean social dance and modern performance, every style starts with a beginner class.",
        }}
        cta={{ label: "All classes", href: "/classes" }}
      />
      <FounderQuote tone="surface" />
      <MembershipPackages
        tone="base"
        heading={{
          eyebrow: "Membership",
          title: "Find a package that fits",
          intro:
            "Train twice a week, three times a week, or take the full studio.",
        }}
      />
      <EventsGrid
        tone="surface"
        heading={{
          eyebrow: "Beyond the studio",
          title: "Showcases, camps & competitions",
          intro:
            "Training at Heartbeat leads to the stage, and for those who want it, the competition floor.",
        }}
      />
      <ClosingCta />
    </>
  );
}
