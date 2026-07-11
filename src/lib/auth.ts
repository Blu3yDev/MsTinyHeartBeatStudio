import { cookies } from "next/headers";
import {
  createHmac,
  randomBytes,
  timingSafeEqual,
} from "node:crypto";

/**
 * Lightweight, dependency-free session auth for the single-owner admin
 * panel. The owner signs in with one shared password (`ADMIN_PASSWORD`,
 * a Vercel environment variable). On success we issue an HMAC-signed,
 * httpOnly cookie so subsequent requests stay authenticated without
 * resending the password.
 *
 * This is deliberately simple — one user, one secret. For multi-user or
 * higher-stakes auth, swap this for a real auth provider.
 */

export const SESSION_COOKIE = "hb_admin";

/** Cookie lifetime: 7 days. */
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7;

/** True when the admin panel has been configured with a password. */
export function isAdminConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD);
}

/**
 * The secret used to sign session tokens. Prefer a dedicated secret, but
 * fall back to the password itself so the panel works with a single env
 * var. (Changing the password therefore invalidates existing sessions.)
 */
function signingSecret(): string {
  return (
    process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || ""
  );
}

function base64url(input: Buffer | string): string {
  return Buffer.from(input)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function sign(payload: string): string {
  return base64url(createHmac("sha256", signingSecret()).update(payload).digest());
}

/** Constant-time string comparison that tolerates length differences. */
function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return timingSafeEqual(ab, bb);
}

/** Verify a submitted password against `ADMIN_PASSWORD`. */
export function verifyPassword(input: unknown): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || typeof input !== "string") return false;
  return safeEqual(input, expected);
}

/**
 * Create a signed session token of the form `payload.signature`, where
 * payload carries an expiry and a random nonce.
 */
export function createSessionToken(): string {
  const exp = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  const payload = base64url(
    JSON.stringify({ exp, n: randomBytes(8).toString("hex") }),
  );
  return `${payload}.${sign(payload)}`;
}

/** Validate a session token's signature and expiry. */
export function verifySessionToken(token: string | undefined): boolean {
  if (!token || !signingSecret()) return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;
  if (!safeEqual(signature, sign(payload))) return false;

  try {
    const decoded = JSON.parse(
      Buffer.from(payload, "base64").toString("utf8"),
    ) as { exp?: number };
    return typeof decoded.exp === "number" && decoded.exp > Date.now() / 1000;
  } catch {
    return false;
  }
}

/** Read the session cookie and report whether the current request is authed. */
export async function isAuthed(): Promise<boolean> {
  const store = await cookies();
  return verifySessionToken(store.get(SESSION_COOKIE)?.value);
}

export const sessionCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: SESSION_TTL_SECONDS,
};
