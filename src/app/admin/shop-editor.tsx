"use client";

import { type ReactNode, useRef, useState } from "react";
import { upload } from "@vercel/blob/client";
import type { CatalogProduct } from "@/lib/shop";

/**
 * Admin editor for the shop catalogue. Follows the same interaction
 * pattern as the media CollectionEditor: adding and deleting products (and
 * uploading photos) persist immediately; text edits and reordering are
 * batched behind the "Save changes" button.
 */
export function ShopEditor({
  products,
  disabled,
  dirty,
  onProducts,
  onSaved,
  clearDirty,
}: {
  products: CatalogProduct[];
  disabled: boolean;
  dirty: boolean;
  onProducts: (
    next: CatalogProduct[] | ((prev: CatalogProduct[]) => CatalogProduct[]),
    markDirty?: boolean,
  ) => void;
  onSaved: (products: CatalogProduct[]) => void;
  clearDirty: () => void;
}) {
  const [error, setError] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [saving, setSaving] = useState(false);

  async function addProduct() {
    setAdding(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/shop", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({}),
      });
      if (!res.ok) throw new Error("Could not add a product.");
      const { product } = (await res.json()) as { product: CatalogProduct };
      // Already persisted server-side, so don't mark dirty.
      onProducts((prev) => [product, ...prev], false);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setAdding(false);
    }
  }

  function move(index: number, delta: number) {
    const target = index + delta;
    if (target < 0 || target >= products.length) return;
    const next = [...products];
    [next[index], next[target]] = [next[target], next[index]];
    onProducts(next);
  }

  function edit(
    id: string,
    patch: Partial<
      Pick<CatalogProduct, "name" | "category" | "price" | "description" | "link">
    >,
  ) {
    onProducts(
      products.map((p) => (p.id === id ? { ...p, ...patch } : p)),
    );
  }

  async function remove(product: CatalogProduct) {
    if (!confirm("Delete this product permanently?")) return;
    const previous = products;
    onProducts(
      products.filter((p) => p.id !== product.id),
      false,
    );
    const res = await fetch("/api/admin/shop", {
      method: "DELETE",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ id: product.id }),
    });
    if (!res.ok) {
      setError("Could not delete. Restoring.");
      onProducts(previous, false);
    }
  }

  async function attachPhoto(product: CatalogProduct, file: File) {
    if (!file.type.startsWith("image/")) {
      setError("Product photos must be images.");
      return;
    }
    setError(null);
    try {
      const blob = await upload(`media/shop/${file.name}`, file, {
        access: "public",
        handleUploadUrl: "/api/admin/upload",
        contentType: file.type,
      });
      const res = await fetch("/api/admin/shop", {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          id: product.id,
          url: blob.url,
          pathname: blob.pathname,
        }),
      });
      if (!res.ok) throw new Error("Could not save the photo.");
      const { product: updated } = (await res.json()) as {
        product: CatalogProduct;
      };
      // Merge only the image onto current state so unsaved text edits made
      // while the upload was in flight are kept.
      onProducts(
        (prev) =>
          prev.map((p) =>
            p.id === product.id ? { ...p, image: updated.image } : p,
          ),
        false,
      );
    } catch (err) {
      setError(`Photo upload failed: ${(err as Error).message}`);
    }
  }

  async function save() {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/shop", {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          products: products.map(
            ({ id, name, category, price, description, link }) => ({
              id,
              name,
              category,
              price,
              description,
              link,
            }),
          ),
        }),
      });
      if (!res.ok) throw new Error("Save failed.");
      const { products: saved } = (await res.json()) as {
        products: CatalogProduct[];
      };
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
      <button
        onClick={addProduct}
        disabled={disabled || adding}
        className="inline-flex h-11 w-full items-center justify-center border border-dashed border-line bg-surface text-sm font-medium text-cream transition-colors hover:border-brand/60 hover:bg-surface-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {adding ? "Adding…" : "+ Add a product"}
      </button>

      {error && <p className="mt-3 text-sm text-brand-bright">{error}</p>}

      {/* Save bar */}
      <div className="mt-6 flex items-center justify-between gap-4">
        <p className="text-xs text-faint">
          {products.length} product{products.length === 1 ? "" : "s"}
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

      {/* Product list */}
      {products.length === 0 ? (
        <p className="mt-8 border border-line bg-surface-2 px-6 py-10 text-center text-sm text-muted">
          No products yet. Products you add here appear on the Shop page in
          this order; until then the page shows its placeholder catalogue.
        </p>
      ) : (
        <ul className="mt-5 space-y-3">
          {products.map((product, index) => (
            <ProductRow
              key={product.id}
              product={product}
              first={index === 0}
              last={index === products.length - 1}
              onEdit={(patch) => edit(product.id, patch)}
              onMove={(delta) => move(index, delta)}
              onDelete={() => remove(product)}
              onPhoto={(file) => attachPhoto(product, file)}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

function ProductRow({
  product,
  first,
  last,
  onEdit,
  onMove,
  onDelete,
  onPhoto,
}: {
  product: CatalogProduct;
  first: boolean;
  last: boolean;
  onEdit: (
    patch: Partial<
      Pick<CatalogProduct, "name" | "category" | "price" | "description" | "link">
    >,
  ) => void;
  onMove: (delta: number) => void;
  onDelete: () => void;
  onPhoto: (file: File) => Promise<void>;
}) {
  const fileInput = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  async function onFileChosen(files: FileList | null) {
    const file = files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      await onPhoto(file);
    } finally {
      setUploading(false);
      if (fileInput.current) fileInput.current.value = "";
    }
  }

  return (
    <li className="flex flex-col gap-4 border border-line bg-surface-2 p-3 sm:flex-row">
      {/* Photo */}
      <button
        type="button"
        onClick={() => fileInput.current?.click()}
        className="group relative h-32 w-32 shrink-0 overflow-hidden border border-line bg-base"
        aria-label={product.image ? "Replace photo" : "Add photo"}
      >
        {product.image ? (
          // Plain <img>: the admin list doesn't need next/image.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.image.url}
            alt={product.name || "Product photo"}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="grid h-full w-full place-items-center px-2 text-center text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-faint">
            {uploading ? "Uploading…" : "Add photo"}
          </span>
        )}
        {product.image && (
          <span className="absolute inset-x-0 bottom-0 bg-base/80 py-1 text-center text-[0.55rem] font-semibold uppercase tracking-wider text-cream opacity-0 transition-opacity group-hover:opacity-100">
            {uploading ? "Uploading…" : "Replace"}
          </span>
        )}
      </button>
      <input
        ref={fileInput}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => onFileChosen(e.target.files)}
      />

      {/* Fields */}
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="grid gap-2 sm:grid-cols-2">
          <Field
            value={product.name}
            placeholder="Product name"
            onChange={(name) => onEdit({ name })}
          />
          <Field
            value={product.category}
            placeholder="Category (e.g. Hair Care)"
            onChange={(category) => onEdit({ category })}
          />
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          <Field
            value={product.price}
            placeholder="Price (e.g. SCR 250)"
            onChange={(price) => onEdit({ price })}
          />
          <Field
            value={product.link}
            placeholder="Buy link (optional — WhatsApp used if empty)"
            onChange={(link) => onEdit({ link })}
          />
        </div>
        <textarea
          value={product.description}
          placeholder="Short description (optional)"
          rows={2}
          onChange={(e) => onEdit({ description: e.target.value })}
          className="w-full resize-y border border-line bg-base px-3 py-2 text-xs text-muted outline-none transition-colors focus:border-brand"
        />
      </div>

      {/* Reorder + delete */}
      <div className="flex shrink-0 flex-row items-center justify-between gap-2 sm:flex-col">
        <div className="flex flex-row gap-1 sm:flex-col">
          <RowBtn label="Move up" disabled={first} onClick={() => onMove(-1)}>
            ↑
          </RowBtn>
          <RowBtn label="Move down" disabled={last} onClick={() => onMove(1)}>
            ↓
          </RowBtn>
        </div>
        <button
          onClick={onDelete}
          aria-label="Delete"
          className="text-[0.62rem] font-semibold uppercase tracking-wider text-faint transition-colors hover:text-brand-bright"
        >
          Delete
        </button>
      </div>
    </li>
  );
}

function Field({
  value,
  placeholder,
  onChange,
}: {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}) {
  return (
    <input
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border border-line bg-base px-3 py-2 text-sm text-cream outline-none transition-colors focus:border-brand"
    />
  );
}

function RowBtn({
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
