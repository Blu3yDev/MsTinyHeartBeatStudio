import { NextResponse } from "next/server";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { isAuthed } from "@/lib/auth";
import { ALLOWED_CONTENT_TYPES, MAX_UPLOAD_BYTES } from "@/lib/media";

/**
 * Issues short-lived client tokens so the browser can upload files
 * directly to Vercel Blob. Uploading client-side (rather than streaming
 * through this function) avoids the serverless request-body size limit,
 * so large photos and videos work.
 *
 * Authorization happens inside `onBeforeGenerateToken`, which only runs
 * for token requests — the separate `blob.upload-completed` webhook from
 * Vercel carries no session cookie and must not be gated.
 */
export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const result = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => {
        if (!(await isAuthed())) {
          throw new Error("Not authorized");
        }
        return {
          allowedContentTypes: ALLOWED_CONTENT_TYPES,
          maximumSizeInBytes: MAX_UPLOAD_BYTES,
          addRandomSuffix: true,
        };
      },
      // We register the uploaded blob into the collection manifest via a
      // direct client call, so nothing is needed here.
      onUploadCompleted: async () => {},
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 },
    );
  }
}
