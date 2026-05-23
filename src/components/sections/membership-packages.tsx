import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Section, SectionHeading } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Check } from "@/components/ui/icons";
import { type Package, membershipNote, packages } from "@/content/membership";

type Heading = { eyebrow: string; title: ReactNode; intro?: ReactNode };

/** Membership package cards. */
export function MembershipPackages({
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
      {heading && (
        <SectionHeading {...heading} align="center" className="mb-14" />
      )}
      <div className="grid items-start gap-5 lg:grid-cols-3">
        {packages.map((pkg, index) => (
          <Reveal
            key={pkg.name}
            delay={index * 90}
            direction={index === 0 ? "left" : index === 2 ? "right" : "scale"}
          >
            <PackageCard pkg={pkg} />
          </Reveal>
        ))}
      </div>
      <p className="mx-auto mt-8 max-w-xl text-center text-xs leading-relaxed text-faint">
        {membershipNote}
      </p>
    </Section>
  );
}

function PackageCard({ pkg }: { pkg: Package }) {
  const { featured } = pkg;
  return (
    <article
      className={cn(
        "card-lift flex h-full flex-col border p-7 md:p-8",
        featured ? "border-brand bg-surface-2" : "border-line bg-surface",
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-display text-xl font-medium tracking-tight text-cream">
          {pkg.name}
        </h3>
        {featured && (
          <span className="bg-brand px-2.5 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-cream">
            Most popular
          </span>
        )}
      </div>

      <div className="mt-6 flex items-baseline gap-2">
        <span className="font-display text-4xl font-semibold tracking-tight text-cream">
          {pkg.price}
        </span>
        <span className="text-sm text-muted">{pkg.cadence}</span>
      </div>
      <p className="mt-2 text-sm text-muted">{pkg.detail}</p>

      <ul className="mt-7 flex flex-1 flex-col gap-3 border-t border-line pt-7">
        {pkg.features.map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-3 text-sm text-cream"
          >
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <Button
        href={`/register?package=${encodeURIComponent(pkg.name)}`}
        variant={featured ? "solid" : "outline"}
        className="mt-8 w-full"
      >
        Register
      </Button>
    </article>
  );
}
