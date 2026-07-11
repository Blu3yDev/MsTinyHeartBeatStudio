import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth";
import {
  addItem,
  applyEdits,
  getCollection,
  isBlobConfigured,
  isValidCollection,
  MEDIA_COLLECTIONS,
  removeItem,
} from "@/lib/media";

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

/** All collections, for the admin panel to render. */
export async function GET() {
  const blocked = await guard();
  if (blocked) return blocked;

  const entries = await Promise.all(
    MEDIA_COLLECTIONS.map(
      async (c) => [c, await getCollection(c)] as const,
    ),
  );
  return NextResponse.json(Object.fromEntries(entries));
}

/** Register a freshly uploaded blob into a collection. */
export async function POST(request: Request) {
  const blocked = await guard();
  if (blocked) return blocked;

  const body = (await request.json()) as {
    collection?: unknown;
    url?: unknown;
    pathname?: unknown;
    contentType?: unknown;
  };

  if (
    !isValidCollection(body.collection) ||
    typeof body.url !== "string" ||
    typeof body.pathname !== "string" ||
    typeof body.contentType !== "string"
  ) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const item = await addItem(body.collection, {
    url: body.url,
    pathname: body.pathname,
    contentType: body.contentType,
  });
  return NextResponse.json({ item });
}

/** Save caption/tag edits and ordering for a collection. */
export async function PUT(request: Request) {
  const blocked = await guard();
  if (blocked) return blocked;

  const body = (await request.json()) as {
    collection?: unknown;
    items?: unknown;
  };

  if (!isValidCollection(body.collection) || !Array.isArray(body.items)) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const edits = body.items.map((raw) => {
    const item = raw as { id?: unknown; caption?: unknown; tag?: unknown };
    return {
      id: String(item.id ?? ""),
      caption: String(item.caption ?? ""),
      tag: String(item.tag ?? ""),
    };
  });

  const items = await applyEdits(body.collection, edits);
  return NextResponse.json({ items });
}

/** Delete one item from a collection. */
export async function DELETE(request: Request) {
  const blocked = await guard();
  if (blocked) return blocked;

  const body = (await request.json()) as {
    collection?: unknown;
    id?: unknown;
  };

  if (!isValidCollection(body.collection) || typeof body.id !== "string") {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  await removeItem(body.collection, body.id);
  return NextResponse.json({ ok: true });
}
