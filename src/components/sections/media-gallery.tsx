import Image from "next/image";
import type { ReactNode } from "react";
import { Section, SectionHeading } from "@/components/layout/section";
import { Reveal } from "@/components/ui/reveal";
import type { MediaItem } from "@/lib/media";

type Heading = { eyebrow: string; title: ReactNode; intro?: ReactNode };

/**
 * Renders an owner-managed collection (photos and videos uploaded through
 * the admin panel) as a responsive grid of tiles. Each tile shows the
 * optional category tag and caption set in the panel.
 */
export function MediaGallery({
  items,
  tone = "base",
  heading,
}: {
  items: MediaItem[];
  tone?: "base" | "surface";
  heading?: Heading;
}) {
  if (items.length === 0) return null;

  return (
    <Section tone={tone}>
      {heading && <SectionHeading {...heading} className="mb-12" />}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <Reveal key={item.id} delay={(index % 3) * 90}>
            <figure className="group relative flex aspect-[4/3] flex-col justify-between overflow-hidden border border-line bg-surface-2">
              {item.type === "video" ? (
                <video
                  src={item.url}
                  controls
                  playsInline
                  preload="metadata"
                  className="absolute inset-0 h-full w-full bg-base object-cover"
                />
              ) : (
                <Image
                  src={item.url}
                  alt={item.caption || "Heartbeat Dance Studio"}
                  fill
                  sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 22rem"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              )}

              {/* Legibility wash — only over images, so video controls stay
                  usable. */}
              {item.type === "image" && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-base/85 via-base/10 to-transparent"
                />
              )}

              {item.tag && (
                <span className="relative m-5 self-start bg-base/70 px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-brand backdrop-blur-sm">
                  {item.tag}
                </span>
              )}

              {item.caption && item.type === "image" && (
                <figcaption className="relative m-5 mt-auto font-display text-xl font-medium tracking-tight text-cream">
                  {item.caption}
                </figcaption>
              )}
            </figure>
            {item.caption && item.type === "video" && (
              <p className="mt-2 text-sm text-muted">{item.caption}</p>
            )}
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
