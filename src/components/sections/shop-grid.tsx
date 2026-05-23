import { Section } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { siteConfig } from "@/content/site";
import { type ShopProduct, products } from "@/content/shop";

/** Boutique product grid. Cards lead to a WhatsApp enquiry. */
export function ShopGrid({ tone = "base" }: { tone?: "base" | "surface" }) {
  return (
    <Section tone={tone}>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product, index) => (
          <Reveal key={product.name} delay={(index % 3) * 80}>
            <ProductCard product={product} />
          </Reveal>
        ))}
      </div>
      <p className="mt-8 text-center text-xs text-faint">
        This is a placeholder catalogue — the studio&apos;s real products,
        prices, and photos will appear here.
      </p>
    </Section>
  );
}

function ProductCard({ product }: { product: ShopProduct }) {
  return (
    <article className="group flex h-full flex-col border border-line bg-surface transition-colors duration-300 hover:border-brand/40">
      {/* Image placeholder — drop in real product photography here. */}
      <div className="grid aspect-square place-items-center border-b border-line bg-surface-2">
        <span className="text-[0.62rem] font-medium uppercase tracking-[0.2em] text-faint">
          Product photo
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <Badge>{product.category}</Badge>
        <h3 className="mt-4 font-display text-xl font-medium tracking-tight text-cream">
          {product.name}
        </h3>
        <p className="mt-1 flex-1 text-sm text-muted">{product.price}</p>
        <Button
          href={siteConfig.contact.whatsappHref}
          variant="outline"
          size="md"
          className="mt-5 w-full"
        >
          Enquire to Buy
        </Button>
      </div>
    </article>
  );
}
