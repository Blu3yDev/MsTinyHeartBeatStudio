import { list, put, del } from "@vercel/blob";

/**
 * Media store for the admin-managed Gallery and Events collections.
 *
 * Files themselves are uploaded directly to Vercel Blob from the browser
 * (see the client `upload()` flow), which sidesteps the serverless request
 * body limit so large photos and videos work. This module owns the
 * *manifest* for each collection: a small JSON document, also stored in
 * Blob, that records which items belong to the collection and in what
 * order, plus their captions and tags.
 *
 * When Blob is not configured (e.g. local dev without a token) every read
 * returns an empty collection and the public pages fall back to their
 * built-in curated content.
 */

export type MediaCollection = "gallery" | "events";

export const MEDIA_COLLECTIONS: readonly MediaCollection[] = [
  "gallery",
  "events",
] as const;

export type MediaType = "image" | "video";

export type MediaItem = {
  /** Stable id, used as the React key and for delete/reorder. */
  id: string;
  /** Public Blob URL for display. */
  url: string;
  /** Blob pathname — needed to delete the underlying file. */
  pathname: string;
  type: MediaType;
  caption: string;
  /** Short category label shown on the tile, e.g. "Competition". */
  tag: string;
};

/** Content types accepted by the uploader. */
export const ALLOWED_CONTENT_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
  "image/gif",
  "video/mp4",
  "video/webm",
  "video/quicktime",
];

/** 200 MB ceiling — generous for short studio clips, sane as a guard. */
export const MAX_UPLOAD_BYTES = 200 * 1024 * 1024;

export function isBlobConfigured(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

export function isValidCollection(value: unknown): value is MediaCollection {
  return (
    typeof value === "string" &&
    (MEDIA_COLLECTIONS as readonly string[]).includes(value)
  );
}

export function mediaTypeFor(contentType: string): MediaType {
  return contentType.startsWith("video/") ? "video" : "image";
}

function manifestPath(collection: MediaCollection): string {
  return `media/${collection}/manifest.json`;
}

/**
 * Read an ordered-items manifest from Blob. Returns `[]` when Blob is not
 * configured or the manifest does not exist yet. Shared by the media
 * collections here and the shop catalogue (`@/lib/shop`).
 */
export async function readManifest<T>(pathname: string): Promise<T[]> {
  if (!isBlobConfigured()) return [];

  try {
    const { blobs } = await list({ prefix: pathname, limit: 1 });
    const manifest = blobs[0];
    if (!manifest) return [];

    // Bypass any caching layer so admin edits are reflected immediately.
    const res = await fetch(manifest.url, { cache: "no-store" });
    if (!res.ok) return [];

    const data = (await res.json()) as unknown;
    return Array.isArray(data) ? (data as T[]) : [];
  } catch (error) {
    console.error(`Failed to read manifest ${pathname}:`, error);
    return [];
  }
}

/** Overwrite a manifest with the given ordered items. */
export async function writeManifest(
  pathname: string,
  items: unknown[],
): Promise<void> {
  await put(pathname, JSON.stringify(items), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
    // The manifest changes whenever the owner edits a collection, so it
    // must never be served stale.
    cacheControlMaxAge: 0,
  });
}

/**
 * Read a collection's ordered items. Returns `[]` when Blob is not
 * configured or the manifest does not exist yet.
 */
export async function getCollection(
  collection: MediaCollection,
): Promise<MediaItem[]> {
  return readManifest<MediaItem>(manifestPath(collection));
}

/** Overwrite a collection's manifest with the given ordered items. */
export async function saveCollection(
  collection: MediaCollection,
  items: MediaItem[],
): Promise<void> {
  await writeManifest(manifestPath(collection), items);
}

/**
 * Append a freshly uploaded blob to a collection. Called after the browser
 * has uploaded the file directly to Blob.
 */
export async function addItem(
  collection: MediaCollection,
  input: { url: string; pathname: string; contentType: string },
): Promise<MediaItem> {
  const items = await getCollection(collection);
  const item: MediaItem = {
    id: crypto.randomUUID(),
    url: input.url,
    pathname: input.pathname,
    type: mediaTypeFor(input.contentType),
    caption: "",
    tag: "",
  };
  // Newest first feels natural in the admin list; the owner can reorder.
  await saveCollection(collection, [item, ...items]);
  return item;
}

/** Remove an item by id, deleting its underlying blob too. */
export async function removeItem(
  collection: MediaCollection,
  id: string,
): Promise<void> {
  const items = await getCollection(collection);
  const target = items.find((item) => item.id === id);
  if (!target) return;

  try {
    await del(target.url);
  } catch (error) {
    // Don't block manifest cleanup if the file is already gone.
    console.error("Failed to delete blob:", error);
  }
  await saveCollection(
    collection,
    items.filter((item) => item.id !== id),
  );
}

/**
 * Apply caption/tag/order edits. The client sends the full desired order;
 * we merge editable fields onto the trusted server records (matched by id)
 * so callers can't inject arbitrary urls.
 */
export async function applyEdits(
  collection: MediaCollection,
  edits: { id: string; caption: string; tag: string }[],
): Promise<MediaItem[]> {
  const current = await getCollection(collection);
  const byId = new Map(current.map((item) => [item.id, item]));

  const next: MediaItem[] = [];
  for (const edit of edits) {
    const base = byId.get(edit.id);
    if (!base) continue;
    next.push({
      ...base,
      caption: String(edit.caption ?? "").slice(0, 200),
      tag: String(edit.tag ?? "").slice(0, 40),
    });
  }

  await saveCollection(collection, next);
  return next;
}
