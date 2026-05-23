import { PageHeader } from "@/components/layout/page-header";
import { GalleryGrid } from "@/components/sections/gallery-grid";
import { ClosingCta } from "@/components/sections/closing-cta";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta(
  "Gallery",
  "A look inside Heartbeat Latin & Ballroom Dance Studio: classes, showcases, camps, and competitions on Mahé, Seychelles.",
);

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title="Moments from the floor"
        intro="Classes, showcases, camps, and competition days at Heartbeat. New photography is added each season."
      />
      <GalleryGrid tone="base" />
      <ClosingCta />
    </>
  );
}
