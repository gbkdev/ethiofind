-- ============================================================================
-- EthioFind — Supabase PostgreSQL Schema
-- Run this in your Supabase project's SQL editor (or via `supabase db push`).
-- Requires: pgcrypto (for gen_random_uuid), pg_trgm (for fuzzy search)
-- ============================================================================

create extension if not exists pgcrypto;
create extension if not exists pg_trgm;

-- ----------------------------------------------------------------------------
-- ENUMS
-- ----------------------------------------------------------------------------

create type user_role as enum ('user', 'editor', 'admin');

create type verification_status as enum (
  'verified', 'official', 'community_submitted', 'needs_review', 'broken'
);

create type website_status as enum ('active', 'inactive', 'broken', 'archived');

create type submission_status as enum (
  'pending', 'approved', 'rejected', 'changes_requested'
);

create type report_reason as enum (
  'broken_link', 'wrong_information', 'duplicate_listing',
  'inappropriate_content', 'fake_website', 'incorrect_category', 'other'
);

create type report_status as enum ('open', 'reviewing', 'resolved', 'dismissed');

create type ethiopian_region as enum (
  'addis_ababa', 'oromia', 'amhara', 'tigray', 'somali', 'afar', 'harari',
  'dire_dawa', 'benishangul_gumuz', 'gambela', 'sidama', 'central_ethiopia',
  'south_ethiopia', 'south_west_ethiopia'
);

-- ----------------------------------------------------------------------------
-- TABLES
-- ----------------------------------------------------------------------------

create table profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  name text not null,
  avatar_url text,
  role user_role not null default 'user',
  created_at timestamptz not null default now()
);

create table categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  icon text,
  image_url text,
  parent_id uuid references categories(id) on delete set null,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table tags (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique
);

create table websites (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  url text not null,
  normalized_domain text not null, -- lowercased, no scheme/www, for duplicate detection
  description text not null,
  long_description text,
  organization_name text,
  category_id uuid references categories(id) on delete set null,
  subcategory_id uuid references categories(id) on delete set null,
  location text,
  region ethiopian_region,
  city text,
  logo_url text,
  cover_image_url text,
  social_links jsonb default '{}'::jsonb,       -- {twitter, facebook, instagram, linkedin, telegram, youtube}
  contact_email text,
  contact_phone text,
  verification_status verification_status not null default 'community_submitted',
  website_status website_status not null default 'active',
  featured boolean not null default false,
  completeness_score int not null default 0,     -- 0-100, computed
  rating numeric(2,1) not null default 0,
  review_count int not null default 0,
  view_count int not null default 0,
  favorite_count int not null default 0,
  http_status int,
  response_time_ms int,
  last_checked_at timestamptz,
  consecutive_failed_checks int not null default 0,
  claimed_by uuid references profiles(id) on delete set null,
  admin_notes text,
  created_by uuid references profiles(id) on delete set null,
  verified_at timestamptz,
  verified_by uuid references profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table website_tags (
  website_id uuid not null references websites(id) on delete cascade,
  tag_id uuid not null references tags(id) on delete cascade,
  primary key (website_id, tag_id)
);

create table website_relations (
  website_id uuid not null references websites(id) on delete cascade,
  related_website_id uuid not null references websites(id) on delete cascade,
  primary key (website_id, related_website_id)
);

create table submissions (
  id uuid primary key default gen_random_uuid(),
  submitted_by uuid references profiles(id) on delete set null,
  website_id uuid references websites(id) on delete set null, -- set once approved & created
  name text not null,
  url text not null,
  description text not null,
  category_id uuid references categories(id) on delete set null,
  subcategory_id uuid references categories(id) on delete set null,
  tags text[],
  organization_name text,
  location text,
  region ethiopian_region,
  city text,
  contact_email text,
  contact_phone text,
  social_links jsonb default '{}'::jsonb,
  logo_url text,
  additional_info text,
  status submission_status not null default 'pending',
  admin_notes text,
  created_at timestamptz not null default now(),
  reviewed_at timestamptz,
  reviewed_by uuid references profiles(id) on delete set null
);

create table reviews (
  id uuid primary key default gen_random_uuid(),
  website_id uuid not null references websites(id) on delete cascade,
  user_id uuid not null references profiles(id) on delete cascade,
  rating int not null check (rating between 1 and 5),
  comment text,
  status text not null default 'published', -- published | flagged | removed
  created_at timestamptz not null default now(),
  unique (website_id, user_id) -- one review per user per website
);

create table favorites (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  website_id uuid not null references websites(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (user_id, website_id)
);

create table reports (
  id uuid primary key default gen_random_uuid(),
  website_id uuid not null references websites(id) on delete cascade,
  reported_by uuid references profiles(id) on delete set null,
  reason report_reason not null,
  description text,
  status report_status not null default 'open',
  created_at timestamptz not null default now(),
  resolved_at timestamptz,
  resolved_by uuid references profiles(id) on delete set null
);

create table searches (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete set null,
  query text not null,
  result_count int,
  created_at timestamptz not null default now()
);

create table website_views (
  id uuid primary key default gen_random_uuid(),
  website_id uuid not null references websites(id) on delete cascade,
  user_id uuid references profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- INDEXES
-- ----------------------------------------------------------------------------

create index idx_websites_category on websites(category_id);
create index idx_websites_region on websites(region);
create index idx_websites_status on websites(website_status, verification_status);
create index idx_websites_featured on websites(featured) where featured = true;
create index idx_websites_domain on websites(normalized_domain);
create index idx_websites_name_trgm on websites using gin (name gin_trgm_ops);
create index idx_websites_desc_trgm on websites using gin (description gin_trgm_ops);
create index idx_submissions_status on submissions(status);
create index idx_reviews_website on reviews(website_id);
create index idx_favorites_user on favorites(user_id);
create index idx_reports_status on reports(status);
create index idx_website_views_website on website_views(website_id, created_at);
create index idx_searches_query_trgm on searches using gin (query gin_trgm_ops);

-- ----------------------------------------------------------------------------
-- ROW LEVEL SECURITY
-- ----------------------------------------------------------------------------

alter table profiles enable row level security;
alter table categories enable row level security;
alter table tags enable row level security;
alter table websites enable row level security;
alter table website_tags enable row level security;
alter table website_relations enable row level security;
alter table submissions enable row level security;
alter table reviews enable row level security;
alter table favorites enable row level security;
alter table reports enable row level security;
alter table searches enable row level security;
alter table website_views enable row level security;

-- Helper: is the current user an admin/editor?
create or replace function is_admin() returns boolean as $$
  select exists (
    select 1 from profiles where user_id = auth.uid() and role = 'admin'
  );
$$ language sql stable security definer;

create or replace function is_editor_or_admin() returns boolean as $$
  select exists (
    select 1 from profiles where user_id = auth.uid() and role in ('editor','admin')
  );
$$ language sql stable security definer;

-- profiles: users read/update their own row; admins read all
create policy "profiles_select_own_or_admin" on profiles
  for select using (user_id = auth.uid() or is_admin());
create policy "profiles_update_own" on profiles
  for update using (user_id = auth.uid());
create policy "profiles_insert_own" on profiles
  for insert with check (user_id = auth.uid());

-- categories: public read; admin write
create policy "categories_public_read" on categories for select using (true);
create policy "categories_admin_write" on categories for all using (is_admin()) with check (is_admin());

-- tags: public read; authenticated insert (new tag on submission), admin manage
create policy "tags_public_read" on tags for select using (true);
create policy "tags_authenticated_insert" on tags for insert with check (auth.role() = 'authenticated');
create policy "tags_admin_manage" on tags for update using (is_admin());
create policy "tags_admin_delete" on tags for delete using (is_admin());

-- websites: public reads approved/active listings; admins/editors manage all
create policy "websites_public_read_active" on websites
  for select using (website_status <> 'archived' or is_editor_or_admin());
create policy "websites_editor_admin_write" on websites
  for all using (is_editor_or_admin()) with check (is_editor_or_admin());

-- website_tags / relations: public read, editor/admin write
create policy "website_tags_public_read" on website_tags for select using (true);
create policy "website_tags_editor_write" on website_tags for all using (is_editor_or_admin()) with check (is_editor_or_admin());
create policy "website_relations_public_read" on website_relations for select using (true);
create policy "website_relations_editor_write" on website_relations for all using (is_editor_or_admin()) with check (is_editor_or_admin());

-- submissions: authenticated users create & read their own; admins read/manage all
create policy "submissions_insert_own" on submissions
  for insert with check (
    submitted_by in (select id from profiles where user_id = auth.uid())
  );
create policy "submissions_select_own_or_admin" on submissions
  for select using (
    submitted_by in (select id from profiles where user_id = auth.uid()) or is_editor_or_admin()
  );
create policy "submissions_admin_update" on submissions
  for update using (is_editor_or_admin());

-- reviews: public read published; authenticated users write/edit their own
create policy "reviews_public_read" on reviews
  for select using (status = 'published' or is_editor_or_admin());
create policy "reviews_insert_own" on reviews
  for insert with check (
    user_id in (select id from profiles where user_id = auth.uid())
  );
create policy "reviews_update_own_or_admin" on reviews
  for update using (
    user_id in (select id from profiles where user_id = auth.uid()) or is_editor_or_admin()
  );
create policy "reviews_delete_own_or_admin" on reviews
  for delete using (
    user_id in (select id from profiles where user_id = auth.uid()) or is_editor_or_admin()
  );

-- favorites: strictly private to the owning user
create policy "favorites_owner_all" on favorites
  for all using (
    user_id in (select id from profiles where user_id = auth.uid())
  ) with check (
    user_id in (select id from profiles where user_id = auth.uid())
  );

-- reports: authenticated users create; admins read/manage all; reporter can see own
create policy "reports_insert_authenticated" on reports
  for insert with check (auth.role() = 'authenticated');
create policy "reports_select_own_or_admin" on reports
  for select using (
    reported_by in (select id from profiles where user_id = auth.uid()) or is_editor_or_admin()
  );
create policy "reports_admin_update" on reports
  for update using (is_editor_or_admin());

-- searches / website_views: insert-only analytics, admin read
create policy "searches_insert_anyone" on searches for insert with check (true);
create policy "searches_admin_read" on searches for select using (is_admin());
create policy "website_views_insert_anyone" on website_views for insert with check (true);
create policy "website_views_admin_read" on website_views for select using (is_admin());

-- ----------------------------------------------------------------------------
-- TRIGGERS: updated_at, rating aggregation, view/favorite counters
-- ----------------------------------------------------------------------------

create or replace function set_updated_at() returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger trg_websites_updated_at
  before update on websites for each row execute function set_updated_at();

create or replace function recompute_website_rating() returns trigger as $$
begin
  update websites w set
    rating = coalesce((select round(avg(rating)::numeric,1) from reviews
                        where website_id = coalesce(new.website_id, old.website_id)
                        and status = 'published'), 0),
    review_count = (select count(*) from reviews
                     where website_id = coalesce(new.website_id, old.website_id)
                     and status = 'published')
  where w.id = coalesce(new.website_id, old.website_id);
  return null;
end;
$$ language plpgsql security definer;

create trigger trg_reviews_aggregate
  after insert or update or delete on reviews
  for each row execute function recompute_website_rating();

create or replace function recompute_favorite_count() returns trigger as $$
begin
  update websites set favorite_count = (
    select count(*) from favorites where website_id = coalesce(new.website_id, old.website_id)
  ) where id = coalesce(new.website_id, old.website_id);
  return null;
end;
$$ language plpgsql security definer;

create trigger trg_favorites_count
  after insert or delete on favorites
  for each row execute function recompute_favorite_count();

-- ----------------------------------------------------------------------------
-- NOTES
-- ----------------------------------------------------------------------------
-- * normalized_domain should be computed at the application layer (lowercase,
--   strip scheme/www/trailing slash) before insert/update, and checked against
--   existing rows to block duplicates.
-- * Website health checks (HTTP status / response time / last_checked_at) are
--   written by a scheduled job (Supabase Edge Function + pg_cron, or an
--   external cron) using the service_role key — RLS above does not grant
--   public write access to those columns.
-- * Full-text/semantic ("AI") search can be layered on later by adding a
--   `search_vector tsvector` generated column plus a `pgvector` embedding
--   column to `websites`, without changing this schema's shape.
