import Image from "next/image";
import { PageHeader } from "@/components/layout/page-header";
import { Section, SectionHeading } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";
import { EventsGrid } from "@/components/sections/events-grid";
import { ClosingCta } from "@/components/sections/closing-cta";
import { campActivities, showcaseThemes } from "@/content/events";
import { achievements, kidsRedDresses, preschoolArt } from "@/content/images";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta(
  "Events",
  "Showcases, theatre productions, holiday camps, and WADF-sanctioned competitions with Heartbeat Latin & Ballroom Dance Studio in Seychelles.",
);

export default function EventsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Events"
        title="From the studio to the stage"
        intro="Every season of training builds towards something, whether that is a recital, a production at the International Conference Centre, a medal test, or a competition."
      />
      <EventsGrid tone="base" />

      <Section tone="surface">
        <Reveal>
          <figure className="overflow-hidden border border-line bg-surface-2">
            <div className="relative aspect-[16/9] md:aspect-[21/9]">
              <Image
                src={achievements.src}
                alt={achievements.alt}
                fill
                sizes="(max-width: 1152px) 92vw, 64rem"
                className="object-cover"
              />
            </div>
            <figcaption className="border-t border-line px-6 py-4 text-xs leading-relaxed text-faint">
              Heartbeat students with the diplomas, medals, and trophies earned
              on the competition floor.
            </figcaption>
          </figure>
        </Reveal>

        <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="Holiday camps"
              title="More than dance"
            />
            <p className="mt-5 leading-relaxed text-muted">
              During school holidays, camp days mix dance training with sport,
              swimming, and creative arts, building confidence on and off the
              floor.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2.5">
              {campActivities.map((activity) => (
                <li key={activity}>
                  <Badge>{activity}</Badge>
                </li>
              ))}
            </ul>
            <div className="relative mt-8 aspect-[4/3] overflow-hidden border border-line bg-surface-2">
              <Image
                src={preschoolArt.src}
                alt={preschoolArt.alt}
                fill
                sizes="(max-width: 1024px) 92vw, 32rem"
                className="object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={120}>
            <SectionHeading
              eyebrow="On stage"
              title="Past production themes"
            />
            <p className="mt-5 leading-relaxed text-muted">
              Each showcase season is built around a theme and staged for a
              live audience. Here are a few of the productions we have brought
              to the floor.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2.5">
              {showcaseThemes.map((theme) => (
                <li key={theme}>
                  <Badge>{theme}</Badge>
                </li>
              ))}
            </ul>
            <div className="relative mt-8 aspect-[4/3] overflow-hidden border border-line bg-surface-2">
              <Image
                src={kidsRedDresses.src}
                alt={kidsRedDresses.alt}
                fill
                sizes="(max-width: 1024px) 92vw, 32rem"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </Section>

      <ClosingCta />
    </>
  );
}
