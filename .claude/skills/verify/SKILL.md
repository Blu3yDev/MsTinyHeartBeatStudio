---
name: verify
description: Build, run, and drive the Heartbeat studio site locally to verify changes.
---

# Verifying this site

Build and serve (production mode, any free port):

```bash
npm run build
npm run start -- -p 3459
```

`.env.local` provides `ADMIN_PASSWORD` (and Brevo keys) but **no
`BLOB_READ_WRITE_TOKEN`** — so gallery/events/shop content reads return
empty, public pages render their built-in fallback content, and admin
API mutations return 503 "Media storage is not configured." Blob CRUD
(uploads, product create/edit) can only be exercised against a project
with a connected Blob store (`vercel env pull` on the owner's account).

Flows worth driving:

- `GET /shop`, `/gallery`, `/events` — 200 with fallback/curated content
  when Blob is absent; owner content takes over when manifests exist.
- Admin login: `POST /api/admin/session` `{"password": "..."}` with the
  value from `.env.local` (strip `\r` — file may be CRLF). Wrong
  password → 401. Cookie jar (`-c/-b`) carries the `hb_admin` session.
- Authenticated `GET /admin` → dashboard HTML with Gallery/Events/Shop
  tabs; unauthenticated → login form ("Enter the studio password").
- Admin APIs `/api/admin/media`, `/api/admin/shop` — 401 unauthenticated,
  503 without Blob, JSON responses with it.

Gotcha: sign-out (`DELETE /api/admin/session`) clears the cookie but
tokens are stateless HMAC — a replayed old token stays valid until its
7-day expiry. Expected, not a regression.
