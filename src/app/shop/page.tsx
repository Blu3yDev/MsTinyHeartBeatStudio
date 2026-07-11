import { PageHeader } from "@/components/layout/page-header";
import { CatalogGrid } from "@/components/sections/catalog-grid";
import { ShopGrid } from "@/components/sections/shop-grid";
import { ClosingCta } from "@/components/sections/closing-cta";
import { shopIntro } from "@/content/shop";
import { pageMeta } from "@/lib/metadata";
import { getProducts } from "@/lib/shop";

export const metadata = pageMeta(
  "Shop",
  "The Heartbeat boutique — hair and beauty care products chosen by the studio team, available to enquire and purchase directly.",
);

// Rendered per request so owner catalogue edits appear immediately.
export const dynamic = "force-dynamic";

export default async function ShopPage() {
  // Owner-managed products take over once any are added in the admin
  // panel; until then the placeholder catalogue is shown.
  const products = await getProducts();

  return (
    <>
      <PageHeader
        eyebrow="Boutique"
        title="Hair & beauty, from the studio"
        intro={shopIntro}
      />
      {products.length > 0 ? (
        <CatalogGrid products={products} tone="base" />
      ) : (
        <ShopGrid tone="base" />
      )}
      <ClosingCta />
    </>
  );
}
