import Image from "next/image";
import { PageHeader } from "@/components/layout/page-header";
import { Section, SectionHeading } from "@/components/layout/section";
import { Reveal } from "@/components/ui/reveal";
import { FounderQuote } from "@/components/sections/founder-quote";
import { MedalTests } from "@/components/sections/medal-tests";
import { ClosingCta } from "@/components/sections/closing-cta";
import { affiliations, founder, vision } from "@/content/studio";
import { founder as founderImage, wadfCertificate } from "@/content/images";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta(
  "Studio",
  "Heartbeat Latin & Ballroom Dance Studio brings international artistic dance to Seychelles. Meet our founder and explore our vision and examination pathway.",
);

export default function StudioPage() {
  return (
    <>
      <PageHeader
        eyebrow="The Studio"
        title="International dance, rooted in Seychelles"
        intro="Since 2018, Heartbeat has trained dancers on Mahé through structured classes, performance opportunities, and competition experience."
      />

      <Section tone="base">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="Our vision"
              title="Bringing artistic dance to the islands"
            />
            <p className="mt-6 text-lg leading-relaxed text-pretty text-muted">
              {vision}
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div className="overflow-hidden border border-line bg-surface-2">
              <div className="flex justify-center bg-gradient-to-b from-brand/12 to-transparent px-8 pt-8">
                <Image
                  src={founderImage.src}
                  alt={founderImage.alt}
                  sizes="(max-width: 1024px) 80vw, 22rem"
                  className="h-72 w-auto"
                />
              </div>
              <div className="border-t border-line p-8">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-brand">
                  {founder.role}
                </p>
                <h2 className="mt-4 font-display text-2xl tracking-tight text-cream">
                  {founder.name}
                </h2>
                <p className="mt-2 text-sm text-muted">{founder.origin}</p>
                <p className="mt-5 border-t border-line pt-5 text-sm leading-relaxed text-muted">
                  Tiny founded Heartbeat to give Seychellois dancers a
                  structured path from their very first class to the
                  competition floor, and continues to lead the studio&apos;s
                  training, showcases, and camps.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <FounderQuote tone="surface" />

      <Section tone="base">
        <SectionHeading
          eyebrow="Affiliations"
          title="Recognised training & examinations"
          intro="Heartbeat is the first studio in Seychelles affiliated with the World Artistic Dance Federation, and connects local dancers to internationally recognised dance bodies and sanctioned events."
          className="mb-12"
        />
        <div className="grid gap-10 lg:grid-cols-[1fr_minmax(0,21rem)] lg:items-start lg:gap-14">
          <Reveal>
            <div className="grid gap-5">
              {affiliations.map((affiliation) => (
                <div
                  key={affiliation.abbr}
                  className="card-lift flex items-center gap-6 border border-line bg-surface-2 p-7"
                >
                  <span className="font-display text-3xl font-semibold text-brand">
                    {affiliation.abbr}
                  </span>
                  <span className="text-sm leading-relaxed text-cream">
                    {affiliation.name}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-6 text-xs text-faint">
              Affiliation details are being confirmed. Please verify current
              membership status with the studio before relying on it.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <figure className="border border-line bg-surface-2 p-3">
              <Image
                src={wadfCertificate.src}
                alt={wadfCertificate.alt}
                sizes="(max-width: 1024px) 90vw, 21rem"
                className="h-auto w-full"
              />
              <figcaption className="px-2 pt-3 pb-1 text-xs leading-relaxed text-faint">
                WADF membership certificate issued to the Seychelles studio.
                Confirm the current renewal status before launch.
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </Section>

      <MedalTests
        tone="surface"
        heading={{
          eyebrow: "Examinations",
          title: "A clear path through the grades",
          intro:
            "Students can work towards internationally recognised medal grades and, in time, professional dance levels.",
        }}
      />

      <ClosingCta />
    </>
  );
}
