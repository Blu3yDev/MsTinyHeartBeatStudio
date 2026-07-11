import type { Metadata } from "next";
import { isAdminConfigured, isAuthed } from "@/lib/auth";
import {
  getCollection,
  isBlobConfigured,
  MEDIA_COLLECTIONS,
  type MediaCollection,
  type MediaItem,
} from "@/lib/media";
import { type CatalogProduct, getProducts } from "@/lib/shop";
import { AdminPanel } from "./admin-panel";

// Hidden management page — never indexed, always rendered per-request.
export const metadata: Metadata = {
  title: "Studio Admin",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const configured = isAdminConfigured();
  const authed = await isAuthed();
  const blobConfigured = isBlobConfigured();

  // Only load content once the request is authenticated.
  let collections: Record<MediaCollection, MediaItem[]> = {
    gallery: [],
    events: [],
  };
  let products: CatalogProduct[] = [];
  if (authed && blobConfigured) {
    const [entries, loadedProducts] = await Promise.all([
      Promise.all(
        MEDIA_COLLECTIONS.map(
          async (c) => [c, await getCollection(c)] as const,
        ),
      ),
      getProducts(),
    ]);
    collections = Object.fromEntries(entries) as typeof collections;
    products = loadedProducts;
  }

  return (
    <AdminPanel
      configured={configured}
      authed={authed}
      blobConfigured={blobConfigured}
      collections={collections}
      products={products}
    />
  );
}
