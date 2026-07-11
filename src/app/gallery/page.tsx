import { PageHeader } from "@/components/layout/page-header";
import { GalleryGrid } from "@/components/sections/gallery-grid";
import { MediaGallery } from "@/components/sections/media-gallery";
import { ClosingCta } from "@/components/sections/closing-cta";
import { getCollection } from "@/lib/media";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta(
  "Gallery",
  "A look inside Heartbeat Latin & Ballroom Dance Studio: classes, showcases, camps, and competitions on Mahé, Seychelles.",
);

// Rendered per request so owner uploads appear immediately, without a rebuild.
export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  // Owner-managed photos and videos take over once any are uploaded;
  // until then the curated default grid is shown.
  const items = await getCollection("gallery");

  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title="Moments from the floor"
        intro="Classes, showcases, camps, and competition days at Heartbeat. New photography is added each season."
      />
      {items.length > 0 ? (
        <MediaGallery items={items} tone="base" />
      ) : (
        <GalleryGrid tone="base" />
      )}
      <ClosingCta />
    </>
  );
}
