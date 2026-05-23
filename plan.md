# Heartbeat Latin & Ballroom Dance Studio — Website

Marketing website for a Seychelles dance studio. Built to the client's
design reference (dark, editorial) and the business information pack.

## Tech stack

| Concern       | Choice                               |
| ------------- | ------------------------------------ |
| Framework     | Next.js 16 (App Router, Turbopack)   |
| Language      | TypeScript (strict)                  |
| UI            | React 19                             |
| Styling       | Tailwind CSS v4 (CSS-first `@theme`) |
| Display font  | Playfair Display (`next/font`)       |
| Body font     | Geist (`next/font`)                  |

## Design

Dark editorial aesthetic matching the client reference: a near-black
stage (`base`/`surface`), warm cream type, and a single vivid red brand
accent. High-contrast serif (Playfair Display) for display type; clean
sans (Geist) for UI and body. Rectangular, uppercase buttons.

## Structure

```
src/
  app/            home + studio, classes, membership, events,
                  gallery, shop, contact, register · sitemap/robots/OG/404
  components/
    layout/       Header, Footer, Logo, Container, Section, PageHeader
    ui/           Button, Eyebrow, Badge, ArrowLink, Reveal, icons
    sections/     Hero, Marquee, StyleGroups, Programmes, AgeGroups,
                  ScheduleTable, FounderQuote, MembershipPackages,
                  EventsGrid, MedalTests, Faq, GalleryGrid,
                  RegisterForm, ClosingCta
  content/        site, programs, schedule, membership, events,
                  studio, faqs  (all real business data)
  lib/            cn, metadata helpers
```

Navigation: Studio · Classes · Membership · Events · Gallery · Shop ·
Contact, plus a Register call-to-action.

## Confirm with the client before launch

The information pack flags several items as uncertain. The site uses the
pack's recommended values; verify these before going live:

- **Business name** — using "Heartbeat Latin & Ballroom Dance Studio".
- **Address** — using "Orion Mall, 2nd Floor, Victoria, Mahé"; the room
  number (212 vs 215) is omitted until confirmed.
- **Packages & prices** — using SCR 500 / 800 / 1,250 (the most recent
  figures); the pack lists conflicting numbers. A note on the membership
  page already says prices are indicative.
- **Timetable** — sourced from the pack; the schedule page notes it is
  indicative.
- **WADF / SDSA affiliation** — shown on the Studio page with a caution
  note; confirm current membership status.
- **Founder bio & the named partner** — kept minimal; the partner and
  detailed credentials from older profiles were intentionally omitted.
- **Establishment year** — using 2018 (from the design reference).
- Botswana contact/address from older material was intentionally excluded.

## Known follow-ups

- **Photography** — the design is photo-ready but no images were
  supplied. The hero, gallery tiles, and shop product cards use dark
  placeholders; drop in real photos when available. No AI imagery is
  used, by request.
- **Shop** — `/shop` is a placeholder catalogue. Replace the entries in
  `content/shop.ts` with the studio's real hair and beauty products,
  prices, and photos. Purchasing is enquiry-based (WhatsApp) to match the
  studio's direct-contact model; a full cart/checkout would be a separate
  phase if online payment is wanted.
- **Booking** — the registration form includes a membership package
  field, and the membership cards pre-select it via `?package=`.
  Submission is still client-side only — wire the form to email,
  WhatsApp, or a route handler before launch.
- `node_modules` lives on C: (npm deletes directory junctions on install).
