import Image from "next/image";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { founder as founderInfo } from "@/content/studio";
import { founder as founderImage } from "@/content/images";

/** The founder's vision, set as a dramatic dark quote band. */
export function FounderQuote({
  id,
  tone = "surface",
}: {
  id?: string;
  tone?: "base" | "surface";
}) {
  return (
    <Section id={id} tone={tone}>
      <Reveal className="mx-auto max-w-3xl text-center">
        <Eyebrow center>From the founder</Eyebrow>
        <p
          aria-hidden="true"
          className="mt-6 font-display text-6xl leading-[0.5] text-brand"
        >
          &ldquo;
        </p>
        <blockquote className="mt-6 font-display text-2xl leading-[1.4] font-medium text-balance text-cream italic md:text-[2.1rem]">
          {founderInfo.quote}
        </blockquote>
        <div className="mt-10 flex flex-col items-center">
          <div className="relative h-24 w-24 overflow-hidden rounded-full border border-line bg-surface-2">
            <Image
              src={founderImage.src}
              alt={founderImage.alt}
              fill
              sizes="96px"
              className="object-cover object-[50%_15%]"
            />
          </div>
          <p className="mt-5 font-display text-lg text-cream">
            {founderInfo.name}
          </p>
          <p className="mt-1.5 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-muted">
            {founderInfo.role}
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
