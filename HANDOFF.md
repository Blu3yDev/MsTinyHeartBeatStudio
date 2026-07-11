# Client handoff checklist

Everything to do, in order, at the in-person setup meeting on the owner's
laptop. Nothing needs to be installed on her machine — it's all done in the
browser (GitHub + Vercel dashboards). She never clones or runs the code.

## Before the meeting (your side)

- [ ] Push this repo to GitHub. Best long-term: create it **under her GitHub
      account** with you added as a collaborator (Settings → Collaborators),
      so she owns the code and you can still push updates. (A repo under your
      account also works — Vercel just needs her to authorize access to it.)
- [ ] Pick the admin password with her, or generate one to give her.

## At the meeting (her laptop, in the browser)

### 1. Accounts

- [ ] Sign in to her GitHub account (create one if needed — she only needs
      it to own the repo and connect Vercel).
- [ ] Sign in to her Vercel account.

### 2. Create the Vercel project

- [ ] Vercel dashboard → **Add New… → Project** → **Import Git Repository**
      → connect GitHub when prompted → select this repo → **Import**.
- [ ] Leave all build settings at their defaults (Next.js is auto-detected)
      → **Deploy**. Wait for the first deployment to finish.

### 3. Connect storage (this is where her uploads live)

- [ ] In the project: **Storage** tab → **Create Database / Store** →
      **Blob** → create and **Connect** it to the project.
      This automatically adds the `BLOB_READ_WRITE_TOKEN` environment
      variable. Files she uploads live in this store permanently — they
      survive redeploys and code updates; only she can delete them (via the
      admin panel or the Storage tab).

### 4. Environment variables

Project → **Settings → Environment Variables**, add for **all environments**:

- [ ] `ADMIN_PASSWORD` — her login password for `/admin`.
- [ ] `BREVO_API_KEY`, `BREVO_SENDER`, `STUDIO_INBOX` — copy the values from
      your `.env.local` (registration emails won't send without them).

### 5. Redeploy so the new variables take effect

- [ ] **Deployments** tab → latest deployment → ⋯ menu → **Redeploy**.

### 6. Domain

- [ ] Settings → **Domains** → add her domain and follow the DNS
      instructions there (if the domain was bought through Vercel it's
      automatic).

### 7. Test everything with her (on the live site)

- [ ] Open `https://her-domain/admin` → sign in with the password.
- [ ] Upload one photo in **Gallery** → check it appears on the Gallery page.
- [ ] Add one product in **Shop** (name, price, photo) → **Save changes** →
      check the Shop page now shows her product instead of the placeholders.
- [ ] Show her: reorder arrows, captions/tags, **Save changes** (the red dot
      means unsaved edits), Delete, and Sign out.
- [ ] Bookmark `/admin` in her browser.

### 8. Leave her with

- [ ] The admin password written down somewhere safe. (To change it later:
      Vercel → Settings → Environment Variables → edit `ADMIN_PASSWORD` →
      redeploy. Changing it signs out existing sessions.)
- [ ] The rule of thumb: **content changes = admin panel, no developer
      needed; design/text changes = ask you**, and your git pushes
      auto-deploy through GitHub.

## Notes

- Shop products have an optional **Buy link** field. Empty = the button is a
  WhatsApp enquiry (current flow). If she later wants direct payments, create
  Stripe/PayPal payment links and paste one per product — no code changes.
- Vercel's free Hobby plan covers this site comfortably (Blob free tier is
  multiple GB). If she ever exceeds it, Vercel will email her.
