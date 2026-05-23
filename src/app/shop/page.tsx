import { PageHeader } from "@/components/layout/page-header";
import { ShopGrid } from "@/components/sections/shop-grid";
import { ClosingCta } from "@/components/sections/closing-cta";
import { shopIntro } from "@/content/shop";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta(
  "Shop",
  "The Heartbeat boutique — hair and beauty care products chosen by the studio team, available to enquire and purchase directly.",
);

export default function ShopPage() {
  return (
    <>
      <PageHeader
        eyebrow="Boutique"
        title="Hair & beauty, from the studio"
        intro={shopIntro}
      />
      <ShopGrid tone="base" />
      <ClosingCta />
    </>
  );
}
