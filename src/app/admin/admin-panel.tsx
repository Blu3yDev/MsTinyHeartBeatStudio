"use client";

import { useRouter } from "next/navigation";
import { type FormEvent, type ReactNode, useRef, useState } from "react";
import { upload } from "@vercel/blob/client";
import { cn } from "@/lib/cn";
import {
  MEDIA_COLLECTIONS,
  type MediaCollection,
  type MediaItem,
} from "@/lib/media";
import type { CatalogProduct } from "@/lib/shop";
import { ShopEditor } from "./shop-editor";

type Collections = Record<MediaCollection, MediaItem[]>;

/** Dashboard tabs: the two media collections plus the shop catalogue. */
type AdminTab = MediaCollection | "shop";

export function AdminPanel({
  configured,
  authed,
  blobConfigured,
  collections,
  products,
}: {
  configured: boolean;
  authed: boolean;
  blobConfigured: boolean;
  collections: Collections;
  products: CatalogProduct[];
}) {
  if (!configured) {
    return (
      <Shell>
        <Notice title="Admin panel not configured">
          Set an <Code>ADMIN_PASSWORD</Code> environment variable in your
          Vercel project settings, then redeploy. That password is what you
          enter here to sign in.
        </Notice>
      </Shell>
    );
  }

  if (!authed) {
    return (
      <Shell>
        <LoginForm />
      </Shell>
    );
  }

  return (
    <Shell wide>
      <Dashboard
        initial={collections}
        initialProducts={products}
        blobConfigured={blobConfigured}
      />
    </Shell>
  );
}

/* --------------------------------------------------------------------- */
/* Layout primitives                                                     */
/* --------------------------------------------------------------------- */

function Shell({
  children,
  wide,
}: {
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <div className="min-h-dvh bg-base px-5 py-12 sm:px-8">
      <div className={cn("mx-auto", wide ? "max-w-4xl" : "max-w-md")}>
        <div className="mb-8 flex items-center gap-2.5">
          <span className="font-display text-2xl font-semibold tracking-tight text-cream">
            Heartbeat
          </span>
          <span className="text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-brand">
            Studio Admin
          </span>
        </div>
        {children}
      </div>
    </div>
  );
}

function Notice({
  title,
  tone = "muted",
  children,
}: {
  title: string;
  tone?: "muted" | "error";
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "border bg-surface-2 p-6",
        tone === "error" ? "border-brand/50" : "border-line",
      )}
    >
      <p className="font-display text-lg font-medium text-cream">{title}</p>
      <p className="mt-2 text-sm leading-relaxed text-muted">{children}</p>
    </div>
  );
}

function Code({ children }: { children: ReactNode }) {
  return (
    <span className="rounded bg-base px-1.5 py-0.5 font-mono text-[0.8em] text-cream">
      {children}
    </span>
  );
}

/* --------------------------------------------------------------------- */
/* Login                                                                 */
/* --------------------------------------------------------------------- */

function LoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/session", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as {
          error?: string;
        };
        setError(data.error ?? "Sign in failed.");
        return;
      }
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="border border-line bg-surface-2 p-6">
      <p className="font-display text-xl font-medium text-cream">Sign in</p>
      <p className="mt-1.5 text-sm text-muted">
        Enter the studio password to manage your gallery, events, and shop.
      </p>

      <label className="mt-6 block text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-faint">
        Password
      </label>
      <input
        type="password"
        autoFocus
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mt-2 w-full border border-line bg-base px-3.5 py-2.5 text-sm text-cream outline-none transition-colors focus:border-brand"
      />

      {error && <p className="mt-3 text-sm text-brand-bright">{error}</p>}

      <button
        type="submit"
        disabled={busy || !password}
        className="mt-5 inline-flex h-11 w-full items-center justify-center bg-brand px-6 text-[0.7rem] font-medium uppercase tracking-[0.16em] text-cream transition-colors hover:bg-brand-bright disabled:opacity-50"
      >
        {busy ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}

/* --------------------------------------------------------------------- */
/* Dashboard                                                             */
/* --------------------------------------------------------------------- */

const TAB_LABELS: Record<AdminTab, string> = {
  gallery: "Gallery",
  events: "Events",
  shop: "Shop",
};

const TABS: readonly AdminTab[] = [...MEDIA_COLLECTIONS, "shop"];

function Dashboard({
  initial,
  initialProducts,
  blobConfigured,
}: {
  initial: Collections;
  initialProducts: CatalogProduct[];
  blobConfigured: boolean;
}) {
  const router = useRouter();
  const [active, setActive] = useState<AdminTab>("gallery");
  const [collections, setCollections] = useState<Collections>(initial);
  const [products, setProducts] = useState<CatalogProduct[]>(initialProducts);
  const [dirty, setDirty] = useState<Record<AdminTab, boolean>>({
    gallery: false,
    events: false,
    shop: false,
  });

  const counts: Record<AdminTab, number> = {
    gallery: collections.gallery.length,
    events: collections.events.length,
    shop: products.length,
  };

  function setItems(
    collection: MediaCollection,
    next: MediaItem[] | ((prev: MediaItem[]) => MediaItem[]),
    markDirty = true,
  ) {
    setCollections((prev) => ({
      ...prev,
      [collection]: typeof next === "function" ? next(prev[collection]) : next,
    }));
    if (markDirty) setDirty((prev) => ({ ...prev, [collection]: true }));
  }

  function setShop(
    next: CatalogProduct[] | ((prev: CatalogProduct[]) => CatalogProduct[]),
    markDirty = true,
  ) {
    setProducts(next);
    if (markDirty) setDirty((prev) => ({ ...prev, shop: true }));
  }

  async function signOut() {
    await fetch("/api/admin/session", { method: "DELETE" });
    router.refresh();
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <p className="text-sm text-muted">
          Upload and arrange the media on your{" "}
          <span className="text-cream">Gallery</span> and{" "}
          <span className="text-cream">Events</span> pages, and manage the
          products in your <span className="text-cream">Shop</span>.
        </p>
        <button
          onClick={signOut}
          className="shrink-0 border border-line px-3.5 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-muted transition-colors hover:border-cream hover:text-cream"
        >
          Sign out
        </button>
      </div>

      {!blobConfigured && (
        <div className="mb-6">
          <Notice title="Storage not connected" tone="error">
            Connect a <Code>Blob</Code> store to this project in Vercel (Storage
            tab) so uploads have somewhere to live. The{" "}
            <Code>BLOB_READ_WRITE_TOKEN</Code> it adds is required.
          </Notice>
        </div>
      )}

      {/* Section tabs */}
      <div className="flex gap-2 border-b border-line">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={cn(
              "relative -mb-px border-b-2 px-4 py-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.16em] transition-colors",
              active === tab
                ? "border-brand text-cream"
                : "border-transparent text-muted hover:text-cream",
            )}
          >
            {TAB_LABELS[tab]}
            <span className="ml-2 text-faint">{counts[tab]}</span>
            {dirty[tab] && (
              <span className="ml-1.5 inline-block h-1.5 w-1.5 rounded-full bg-brand align-middle" />
            )}
          </button>
        ))}
      </div>

      {active === "shop" ? (
        <ShopEditor
          products={products}
          disabled={!blobConfigured}
          dirty={dirty.shop}
          onProducts={setShop}
          onSaved={(saved) => setProducts(saved)}
          clearDirty={() => setDirty((prev) => ({ ...prev, shop: false }))}
        />
      ) : (
        <CollectionEditor
          key={active}
          collection={active}
          items={collections[active]}
          disabled={!blobConfigured}
          dirty={dirty[active]}
          onItems={(next, markDirty) => setItems(active, next, markDirty)}
          onSaved={(saved) =>
            setCollections((prev) => ({ ...prev, [active]: saved }))
          }
          clearDirty={() =>
            setDirty((prev) => ({ ...prev, [active]: false }))
          }
        />
      )}
    </div>
  );
}

/* --------------------------------------------------------------------- */
/* Per-collection editor                                                 */
/* --------------------------------------------------------------------- */

type UploadState = { name: string; progress: number };

function CollectionEditor({
  collection,
  items,
  disabled,
  dirty,
  onItems,
  onSaved,
  clearDirty,
}: {
  collection: MediaCollection;
  items: MediaItem[];
  disabled: boolean;
  dirty: boolean;
  onItems: (
    next: MediaItem[] | ((prev: MediaItem[]) => MediaItem[]),
    markDirty?: boolean,
  ) => void;
  onSaved: (items: MediaItem[]) => void;
  clearDirty: () => void;
}) {
  const fileInput = useRef<HTMLInputElement>(null);
  const [uploads, setUploads] = useState<UploadState[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function onFilesChosen(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return;
    setError(null);
    const files = Array.from(fileList);

    for (const file of files) {
      const tracker: UploadState = { name: file.name, progress: 0 };
      setUploads((prev) => [...prev, tracker]);
      try {
        const blob = await upload(`media/${collection}/${file.name}`, file, {
          access: "public",
          handleUploadUrl: "/api/admin/upload",
          contentType: file.type,
          onUploadProgress: ({ percentage }) =>
            setUploads((prev) =>
              prev.map((u) =>
                u === tracker ? { ...u, progress: percentage } : u,
              ),
            ),
        });

        const res = await fetch("/api/admin/media", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            collection,
            url: blob.url,
            pathname: blob.pathname,
            contentType: blob.contentType,
          }),
        });
        if (!res.ok) throw new Error("Could not save upload.");
        const { item } = (await res.json()) as { item: MediaItem };
        // Prepend onto current state (not the batch-start snapshot), and
        // don't mark dirty — the item is already persisted server-side.
        onItems((prev) => [item, ...prev], false);
      } catch (err) {
        setError(`Upload failed for ${file.name}: ${(err as Error).message}`);
      } finally {
        setUploads((prev) => prev.filter((u) => u !== tracker));
      }
    }

    if (fileInput.current) fileInput.current.value = "";
  }

  function move(index: number, delta: number) {
    const target = index + delta;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    [next[index], next[target]] = [next[target], next[index]];
    onItems(next);
  }

  function edit(id: string, patch: Partial<Pick<MediaItem, "caption" | "tag">>) {
    onItems(items.map((it) => (it.id === id ? { ...it, ...patch } : it)));
  }

  async function remove(item: MediaItem) {
    if (!confirm("Delete this item permanently?")) return;
    const previous = items;
    onItems(
      items.filter((it) => it.id !== item.id),
      false,
    );
    const res = await fetch("/api/admin/media", {
      method: "DELETE",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ collection, id: item.id }),
    });
    if (!res.ok) {
      setError("Could not delete. Restoring.");
      onItems(previous, false);
    }
  }

  async function save() {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/media", {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          collection,
          items: items.map(({ id, caption, tag }) => ({ id, caption, tag })),
        }),
      });
      if (!res.ok) throw new Error("Save failed.");
      const { items: saved } = (await res.json()) as { items: MediaItem[] };
      onSaved(saved);
      clearDirty();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="pt-6">
      {/* Upload dropzone */}
      <div
        onClick={() => !disabled && fileInput.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          if (!disabled) onFilesChosen(e.dataTransfer.files);
        }}
        className={cn(
          "flex flex-col items-center justify-center border border-dashed border-line bg-surface px-6 py-10 text-center transition-colors",
          disabled
            ? "cursor-not-allowed opacity-50"
            : "cursor-pointer hover:border-brand/60 hover:bg-surface-2",
        )}
      >
        <p className="text-sm font-medium text-cream">
          Drop photos or videos here, or click to choose
        </p>
        <p className="mt-1 text-xs text-faint">
          JPG, PNG, WebP, GIF · MP4, WebM, MOV
        </p>
        <input
          ref={fileInput}
          type="file"
          multiple
          accept="image/*,video/*"
          className="hidden"
          onChange={(e) => onFilesChosen(e.target.files)}
        />
      </div>

      {uploads.length > 0 && (
        <ul className="mt-3 space-y-1.5">
          {uploads.map((u, i) => (
            <li key={i} className="text-xs text-muted">
              <span className="text-cream">{u.name}</span> · uploading{" "}
              {Math.round(u.progress)}%
            </li>
          ))}
        </ul>
      )}

      {error && <p className="mt-3 text-sm text-brand-bright">{error}</p>}

      {/* Save bar */}
      <div className="mt-6 flex items-center justify-between gap-4">
        <p className="text-xs text-faint">
          {items.length} item{items.length === 1 ? "" : "s"}
          {dirty && " · unsaved changes"}
        </p>
        <button
          onClick={save}
          disabled={!dirty || saving}
          className="inline-flex h-10 items-center justify-center bg-brand px-5 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-cream transition-colors hover:bg-brand-bright disabled:opacity-40"
        >
          {saving ? "Saving…" : "Save changes"}
        </button>
      </div>

      {/* Item list */}
      {items.length === 0 ? (
        <p className="mt-8 border border-line bg-surface-2 px-6 py-10 text-center text-sm text-muted">
          Nothing here yet. Uploaded media will appear in this list and on the{" "}
          {TAB_LABELS[collection]} page.
        </p>
      ) : (
        <ul className="mt-5 space-y-3">
          {items.map((item, index) => (
            <li
              key={item.id}
              className="flex gap-4 border border-line bg-surface-2 p-3"
            >
              <div className="relative h-24 w-24 shrink-0 overflow-hidden bg-base">
                {item.type === "video" ? (
                  <video
                    src={item.url}
                    preload="metadata"
                    muted
                    playsInline
                    className="h-full w-full object-cover"
                  />
                ) : (
                  // Plain <img>: the admin list doesn't need next/image.
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.url}
                    alt={item.caption || "Uploaded media"}
                    className="h-full w-full object-cover"
                  />
                )}
                <span className="absolute left-1 top-1 bg-base/80 px-1.5 py-0.5 text-[0.55rem] font-semibold uppercase tracking-wider text-brand">
                  {item.type}
                </span>
              </div>

              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <input
                  value={item.caption}
                  placeholder="Caption"
                  onChange={(e) => edit(item.id, { caption: e.target.value })}
                  className="w-full border border-line bg-base px-3 py-2 text-sm text-cream outline-none transition-colors focus:border-brand"
                />
                <input
                  value={item.tag}
                  placeholder="Tag (e.g. Competition, Holiday Camp)"
                  onChange={(e) => edit(item.id, { tag: e.target.value })}
                  className="w-full border border-line bg-base px-3 py-2 text-xs text-muted outline-none transition-colors focus:border-brand"
                />
              </div>

              <div className="flex shrink-0 flex-col items-center justify-between">
                <div className="flex flex-col gap-1">
                  <ReorderBtn
                    label="Move up"
                    disabled={index === 0}
                    onClick={() => move(index, -1)}
                  >
                    ↑
                  </ReorderBtn>
                  <ReorderBtn
                    label="Move down"
                    disabled={index === items.length - 1}
                    onClick={() => move(index, 1)}
                  >
                    ↓
                  </ReorderBtn>
                </div>
                <button
                  onClick={() => remove(item)}
                  aria-label="Delete"
                  className="text-[0.62rem] font-semibold uppercase tracking-wider text-faint transition-colors hover:text-brand-bright"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function ReorderBtn({
  children,
  label,
  disabled,
  onClick,
}: {
  children: ReactNode;
  label: string;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="grid h-7 w-7 place-items-center border border-line text-cream transition-colors hover:border-cream disabled:opacity-30"
    >
      {children}
    </button>
  );
}
