# EthioFind

Discover Ethiopia Online 🇪🇹 — a searchable, source-transparent directory of
Ethiopian websites: banks, universities, government services, jobs,
hospitals and more.

This is a real Next.js 14 (App Router) + TypeScript + Tailwind project —
not a static mockup. It builds cleanly (`npm run build`), type-checks, and
statically generates a real page per category and per website.

## What's genuinely functional right now

- **Search** — ranked keyword search across name/description/category/tags/location (`lib/repository/websites.ts`)
- **Filtering & sorting** — by category, region, verification status, on `/search`
- **Category & website detail pages** — dynamically generated, real SEO metadata, `sitemap.xml` / `robots.txt`
- **Favorites** — persist to `localStorage`, survive a reload
- **Reviews** — real 1–5 star + comment, persisted per website, average computed from actual data (no seeded fake reviews)
- **Submit Website** — real validation (URL format, required fields, duplicate-URL detection against both live listings and pending submissions) and a real moderation queue
- **Admin dashboard** (`/admin`) — KPIs computed from real stored data, a websites table, a **Research Center** showing the source citation behind every listing, and a submissions queue with working Approve/Reject actions
- **Dark/light mode** with persistence
- **32 real, researched Ethiopian websites** seeded in `lib/seed-data.ts` — every entry has a `source` field citing what was used to confirm its real domain (Wikipedia, official government pages, etc.). No invented phone numbers, ratings, or descriptions.

## What is *not* live yet — and why

This build has **no Supabase project connected** (no cloud credentials are
available in the environment it was built in), so:

- There's no real Supabase Postgres database — `lib/seed-data.ts` stands in for the `websites`/`categories` tables.
- There's no real Supabase Auth — favorites/reviews/submissions are scoped to your browser via `localStorage`, not to a logged-in account.
- There's no scheduled health-check job hitting listed URLs.

**`schema.sql`** in this repo is the real, production Postgres schema —
tables, enums, indexes, full Row Level Security policies, and triggers for
rating/favorite aggregation — ready to run against a real Supabase project.

### The architecture is built so connecting Supabase is a swap, not a rewrite

- `lib/repository/websites.ts` — every function is already `async` and
  returns the same shape a Supabase query would (`getAllWebsites()`,
  `searchWebsites()`, `getWebsiteBySlug()`, …). Replace the array reads
  inside with `supabase.from('websites').select(...)` calls; no page or
  component needs to change.
- `lib/store/favorites.ts`, `reviews.ts`, `submissions.ts`, `analytics.ts`
  — same idea, documented inline with the exact Supabase call each
  function becomes once Auth is wired up.
- `lib/supabase/client.ts` — the client factory stub; uncomment once you've
  run `npm install @supabase/supabase-js @supabase/ssr`.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

### Connecting a real Supabase backend

1. Create a project at [supabase.com](https://supabase.com).
2. Run `schema.sql` in the Supabase SQL editor.
3. Copy `.env.example` to `.env.local` and fill in your project URL/anon key.
4. `npm install @supabase/supabase-js @supabase/ssr`.
5. Implement `lib/supabase/client.ts` (commented example included), then
   swap the bodies of `lib/repository/websites.ts` and `lib/store/*` to
   query Supabase instead of the seed array / localStorage — the function
   signatures are already correct.
6. Add Supabase Auth (email/password to start) and scope favorites/reviews/
   submissions to `auth.uid()` per the RLS policies in `schema.sql`.

### Fonts

`next/font/google` (Fraunces / Inter / JetBrains Mono) needs network access
to Google Fonts at build time, which wasn't available in the sandbox this
was built in. `app/layout.tsx` currently uses system font fallbacks defined
in `app/globals.css`. With normal internet access, swap back to
`next/font/google` for self-hosted, layout-shift-free fonts — every
component already assumes those three font families via the Tailwind
`font-display` / `font-sans` / `font-mono` classes.

## Project structure

```
app/                  Next.js App Router pages
  category/[slug]/    Dynamic category pages
  website/[slug]/     Dynamic website detail pages
  search/              Search results (client component for live filtering)
  submit/              Submission form
  favorites/           Saved websites
  admin/               Admin dashboard (overview, websites, research, submissions)
  sitemap.ts, robots.ts
components/           Reusable UI (WebsiteCard, Badge, SearchBar, ...)
components/admin/     Admin-only components
lib/
  repository/          Server-only data-access layer (Supabase swap point)
  store/               Client-side persistence (favorites/reviews/submissions/analytics)
  seed-data.ts          Real researched website + category data
  supabase/client.ts    Supabase client stub
types/                 Shared TypeScript types
schema.sql             Production Postgres + RLS schema for Supabase
```
