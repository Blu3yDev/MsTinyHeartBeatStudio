import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth";
import { isBlobConfigured } from "@/lib/media";
import {
  applyProductEdits,
  createProduct,
  getProducts,
  removeProduct,
  setProductImage,
  SHOP_IMAGE_PREFIX,
} from "@/lib/shop";

async function guard(): Promise<NextResponse | null> {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Not authorized." }, { status: 401 });
  }
  if (!isBlobConfigured()) {
    return NextResponse.json(
      { error: "Media storage is not configured." },
      { status: 503 },
    );
  }
  return null;
}

/** Full catalogue, for the admin panel to render. */
export async function GET() {
  const blocked = await guard();
  if (blocked) return blocked;

  return NextResponse.json({ products: await getProducts() });
}

/** Create a new product. */
export async function POST(request: Request) {
  const blocked = await guard();
  if (blocked) return blocked;

  const body = (await request.json().catch(() => ({}))) as {
    name?: unknown;
    category?: unknown;
    price?: unknown;
    description?: unknown;
    link?: unknown;
  };

  const product = await createProduct({
    name: String(body.name ?? ""),
    category: String(body.category ?? ""),
    price: String(body.price ?? ""),
    description: String(body.description ?? ""),
    link: String(body.link ?? ""),
  });
  return NextResponse.json({ product });
}

/** Save text edits and ordering for the whole catalogue. */
export async function PUT(request: Request) {
  const blocked = await guard();
  if (blocked) return blocked;

  const body = (await request.json()) as { products?: unknown };
  if (!Array.isArray(body.products)) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const edits = body.products.map((raw) => {
    const p = raw as Record<string, unknown>;
    return {
      id: String(p.id ?? ""),
      name: String(p.name ?? ""),
      category: String(p.category ?? ""),
      price: String(p.price ?? ""),
      description: String(p.description ?? ""),
      link: String(p.link ?? ""),
    };
  });

  const products = await applyProductEdits(edits);
  return NextResponse.json({ products });
}

/** Attach a freshly uploaded photo to a product. */
export async function PATCH(request: Request) {
  const blocked = await guard();
  if (blocked) return blocked;

  const body = (await request.json()) as {
    id?: unknown;
    url?: unknown;
    pathname?: unknown;
  };

  if (
    typeof body.id !== "string" ||
    typeof body.url !== "string" ||
    typeof body.pathname !== "string" ||
    !body.pathname.startsWith(SHOP_IMAGE_PREFIX)
  ) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const product = await setProductImage(body.id, {
    url: body.url,
    pathname: body.pathname,
  });
  if (!product) {
    return NextResponse.json({ error: "Unknown product." }, { status: 404 });
  }
  return NextResponse.json({ product });
}

/** Delete one product. */
export async function DELETE(request: Request) {
  const blocked = await guard();
  if (blocked) return blocked;

  const body = (await request.json()) as { id?: unknown };
  if (typeof body.id !== "string") {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  await removeProduct(body.id);
  return NextResponse.json({ ok: true });
}
