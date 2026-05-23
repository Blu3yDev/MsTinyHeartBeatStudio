import Image from "next/image";
import type { StaticImageData } from "next/image";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/ui/reveal";
import {
  aboutLineup,
  achievements,
  kidsRedDresses,
  preschoolArt,
  tutuGroup,
} from "@/content/images";

type Tile = {
  src: StaticImageData;
  alt: string;
  tag: string;
  caption: string;
};

/** Studio photography — real images from classes, camps, and competitions. */
const tiles: Tile[] = [
  {
    src: kidsRedDresses.src,
    alt: kidsRedDresses.alt,
    tag: "Studio",
    caption: "Young dancers in performance costume",
  },
  {
    src: achievements.src,
    alt: achievements.alt,
    tag: "Competition",
    caption: "Diplomas, medals & trophies",
  },
  {
    src: preschoolArt.src,
    alt: preschoolArt.alt,
    tag: "Holiday Camp",
    caption: "Creative arts at the holiday camp",
  },
  {
    src: tutuGroup.src,
    alt: tutuGroup.alt,
    tag: "Performance",
    caption: "A young group ready for the stage",
  },
];

export function GalleryGrid({ tone = "base" }: { tone?: "base" | "surface" }) {
  return (
    <Section tone={tone}>
      {/* Wide torn-edge feature of the studio's young competitors. */}
      <Reveal>
        <figure className="relative overflow-hidden border border-line bg-surface-2">
          <Image
            src={aboutLineup.src}
            alt={aboutLineup.alt}
            sizes="(max-width: 1152px) 92vw, 64rem"
            className="h-auto w-full"
          />
          <figcaption className="absolute bottom-0 left-0 flex items-center gap-3 bg-gradient-to-t from-base/90 to-transparent px-6 pt-12 pb-5 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-brand">
            <span aria-hidden="true" className="h-px w-7 bg-brand" />
            On the studio floor
          </figcaption>
        </figure>
      </Reveal>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {tiles.map((tile, index) => (
          <Reveal key={tile.caption} delay={(index % 2) * 90}>
            <figure className="group relative flex aspect-[4/3] flex-col justify-between overflow-hidden border border-line bg-surface-2">
              <Image
                src={tile.src}
                alt={tile.alt}
                fill
                sizes="(max-width: 640px) 92vw, 32rem"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Legibility wash + brand hover tint. */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-base/85 via-base/10 to-transparent"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand/15 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
              <span className="relative m-5 self-start bg-base/70 px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-brand backdrop-blur-sm">
                {tile.tag}
              </span>
              <figcaption className="relative m-5 mt-0 font-display text-xl font-medium tracking-tight text-cream">
                {tile.caption}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>

      <p className="mt-8 text-center text-xs text-faint">
        A selection of studio photography. More is added each season.
      </p>
    </Section>
  );
}
