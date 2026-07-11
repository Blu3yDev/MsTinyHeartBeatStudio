import { del } from "@vercel/blob";
import { readManifest, writeManifest } from "./media";

/**
 * Owner-managed shop catalogue, stored as a single JSON manifest in Vercel
 * Blob (same pattern as the media collections in `@/lib/media`). Product
 * photos are uploaded directly from the browser to Blob and attached to a
 * product afterwards.
 *
 * While the catalogue is empty the public Shop page falls back to its
 * built-in placeholder grid.
 */

export type CatalogProduct = {
  /** Stable id, used as the React key and for edits/delete. */
  id: string;
  name: string;
  /** Short label shown as a badge, e.g. "Hair Care". */
  category: string;
  /** Free-form price text, e.g. "SCR 250" or "Enquire for price". */
  price: string;
  description: string;
  /**
   * Optional external purchase link (e.g. a Stripe or PayPal payment
   * link). When empty, the card falls back to a WhatsApp enquiry.
   */
  link: string;
  /** Product photo in Blob, if one has been uploaded. */
  image: { url: string; pathname: string } | null;
};

const MANIFEST_PATH = "media/shop/manifest.json";

/** Blob pathname prefix product photos must live under. */
export const SHOP_IMAGE_PREFIX = "media/shop/";

export type CatalogProductEdit = Pick<
  CatalogProduct,
  "id" | "name" | "category" | "price" | "description" | "link"
>;

function cleanLink(value: unknown): string {
  const link = String(value ?? "").trim();
  return /^https?:\/\//.test(link) ? link.slice(0, 300) : "";
}

function cleanFields(edit: Omit<CatalogProductEdit, "id">) {
  return {
    name: String(edit.name ?? "").slice(0, 80),
    category: String(edit.category ?? "").slice(0, 40),
    price: String(edit.price ?? "").slice(0, 40),
    description: String(edit.description ?? "").slice(0, 500),
    link: cleanLink(edit.link),
  };
}

/** Ordered catalogue; `[]` when Blob is unconfigured or nothing added yet. */
export async function getProducts(): Promise<CatalogProduct[]> {
  return readManifest<CatalogProduct>(MANIFEST_PATH);
}

async function saveProducts(products: CatalogProduct[]): Promise<void> {
  await writeManifest(MANIFEST_PATH, products);
}

/** Create a product and prepend it to the catalogue. */
export async function createProduct(
  fields: Omit<CatalogProductEdit, "id">,
): Promise<CatalogProduct> {
  const products = await getProducts();
  const product: CatalogProduct = {
    id: crypto.randomUUID(),
    ...cleanFields(fields),
    image: null,
  };
  await saveProducts([product, ...products]);
  return product;
}

/**
 * Apply text edits and ordering. The client sends the full desired order;
 * editable fields are merged onto the trusted server records (matched by
 * id) so callers can't tamper with image urls.
 */
export async function applyProductEdits(
  edits: CatalogProductEdit[],
): Promise<CatalogProduct[]> {
  const current = await getProducts();
  const byId = new Map(current.map((product) => [product.id, product]));

  const next: CatalogProduct[] = [];
  for (const edit of edits) {
    const base = byId.get(edit.id);
    if (!base) continue;
    next.push({ ...base, ...cleanFields(edit) });
  }

  await saveProducts(next);
  return next;
}

/**
 * Attach a freshly uploaded photo to a product, deleting the photo it
 * replaces. Returns the updated product, or null if the id is unknown.
 */
export async function setProductImage(
  id: string,
  image: { url: string; pathname: string },
): Promise<CatalogProduct | null> {
  const products = await getProducts();
  const target = products.find((product) => product.id === id);
  if (!target) return null;

  if (target.image) {
    try {
      await del(target.image.url);
    } catch (error) {
      console.error("Failed to delete replaced product photo:", error);
    }
  }

  const updated: CatalogProduct = { ...target, image };
  await saveProducts(
    products.map((product) => (product.id === id ? updated : product)),
  );
  return updated;
}

/** Remove a product, deleting its photo blob too. */
export async function removeProduct(id: string): Promise<void> {
  const products = await getProducts();
  const target = products.find((product) => product.id === id);
  if (!target) return;

  if (target.image) {
    try {
      await del(target.image.url);
    } catch (error) {
      // Don't block manifest cleanup if the file is already gone.
      console.error("Failed to delete product photo:", error);
    }
  }
  await saveProducts(products.filter((product) => product.id !== id));
}
