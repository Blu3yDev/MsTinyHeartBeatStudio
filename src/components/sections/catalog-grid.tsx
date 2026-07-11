import Image from "next/image";
import { Section } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { siteConfig } from "@/content/site";
import type { CatalogProduct } from "@/lib/shop";

/**
 * Owner-managed boutique grid, shown once the studio has added products in
 * the admin panel (replacing the placeholder ShopGrid). A product with a
 * buy link gets a direct "Buy" button; otherwise cards lead to a WhatsApp
 * enquiry, matching the studio's pay-and-collect flow.
 */
export function CatalogGrid({
  products,
  tone = "base",
}: {
  products: CatalogProduct[];
  tone?: "base" | "surface";
}) {
  return (
    <Section tone={tone}>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product, index) => (
          <Reveal key={product.id} delay={(index % 3) * 80}>
            <ProductCard product={product} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function ProductCard({ product }: { product: CatalogProduct }) {
  return (
    <article className="group flex h-full flex-col border border-line bg-surface transition-colors duration-300 hover:border-brand/40">
      <div className="relative aspect-square overflow-hidden border-b border-line bg-surface-2">
        {product.image ? (
          <Image
            src={product.image.url}
            alt={product.name || "Product photo"}
            fill
            sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 24rem"
            className="object-cover transition-transform duration-500 ease-expo group-hover:scale-[1.03] motion-reduce:group-hover:scale-100"
          />
        ) : (
          <span className="grid h-full w-full place-items-center text-[0.62rem] font-medium uppercase tracking-[0.2em] text-faint">
            {product.name || "Product"}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        {product.category && <Badge>{product.category}</Badge>}
        <h3 className="mt-4 font-display text-xl font-medium tracking-tight text-cream">
          {product.name}
        </h3>
        {product.price && (
          <p className="mt-1 text-sm text-muted">{product.price}</p>
        )}
        {product.description && (
          <p className="mt-3 text-sm leading-relaxed text-faint">
            {product.description}
          </p>
        )}
        <div className="flex-1" />
        <Button
          href={product.link || siteConfig.contact.whatsappHref}
          variant="outline"
          size="md"
          className="mt-5 w-full"
        >
          {product.link ? "Buy Now" : "Enquire to Buy"}
        </Button>
      </div>
    </article>
  );
}
