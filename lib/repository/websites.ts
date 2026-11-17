import 'server-only';
import { CATEGORIES, REGIONS, WEBSITES } from '@/lib/seed-data';
import type { Category, SearchFilters, Website } from '@/types';

/**
 * Data-access layer for websites & categories.
 *
 * Every function here is `async` and returns plain data, even though today
 * it just reads the in-memory seed array. That's deliberate: this is the
 * exact shape a real repository backed by Supabase would have —
 *
 *   export async function getAllWebsites() {
 *     const { data } = await supabase.from('websites').select('*').eq('website_status', 'active');
 *     return data;
 *   }
 *
 * — so swapping the implementation later does not require touching any
 * page or component that calls these functions.
 */

export async function getCategories(): Promise<Category[]> {
  return CATEGORIES.map((c) => ({ ...c, count: WEBSITES.filter((w) => w.category === c.slug).length }));
}

export async function getCategory(slug: string): Promise<Category | undefined> {
  const cats = await getCategories();
  return cats.find((c) => c.slug === slug);
}

export async function getRegions(): Promise<string[]> {
  return REGIONS;
}

export async function getAllWebsites(): Promise<Website[]> {
  return WEBSITES;
}

export async function getWebsiteBySlug(slug: string): Promise<Website | undefined> {
  return WEBSITES.find((w) => w.slug === slug);
}

export async function getFeaturedWebsites(): Promise<Website[]> {
  return WEBSITES.filter((w) => w.featured);
}

export async function getRecentlyAdded(limit = 4): Promise<Website[]> {
  return [...WEBSITES].slice(-limit).reverse();
}

export async function getRelatedWebsites(website: Website, limit = 3): Promise<Website[]> {
  return WEBSITES.filter((w) => w.category === website.category && w.slug !== website.slug).slice(0, limit);
}

export async function getWebsitesByCategory(categorySlug: string): Promise<Website[]> {
  return WEBSITES.filter((w) => w.category === categorySlug);
}

export async function getWebsitesByRegion(region: string): Promise<Website[]> {
  return WEBSITES.filter((w) => w.region === region);
}

/**
 * Ranked keyword search — mirrors the relevance ordering a real
 * `ILIKE`/`ts_rank` Postgres query would apply:
 *   1. exact name match  2. name starts-with  3. category/tag match
 *   4. description match  5. everything else
 */
export async function searchWebsites(filters: SearchFilters): Promise<Website[]> {
  const q = (filters.query || '').trim().toLowerCase();
  let results = WEBSITES.filter((w) => {
    const matchesCategory = !filters.category || w.category === filters.category;
    const matchesRegion = !filters.region || w.region === filters.region;
    const matchesResearched = !filters.researchedOnly || w.verification === 'researched';
    if (!matchesCategory || !matchesRegion || !matchesResearched) return false;
    if (!q) return true;
    const haystack = [w.name, w.description, w.organization, w.category, ...w.tags, w.city, w.region].join(' ').toLowerCase();
    return haystack.includes(q);
  });

  if (q) {
    results = results
      .map((w) => ({ w, score: relevanceScore(w, q) }))
      .sort((a, b) => b.score - a.score)
      .map((x) => x.w);
  }

  if (filters.sort === 'newest') {
    results = [...results].reverse();
  }
  // 'popular' sort needs client-side view counts (see lib/store/analytics) —
  // handled in the client component that has access to that data.

  return results;
}

function relevanceScore(w: Website, q: string): number {
  const name = w.name.toLowerCase();
  if (name === q) return 100;
  if (name.startsWith(q)) return 80;
  if (name.includes(q)) return 60;
  if (w.category.toLowerCase().includes(q) || w.tags.some((t) => t.toLowerCase().includes(q))) return 40;
  if (w.description.toLowerCase().includes(q)) return 20;
  return 10;
}

export function normalizeUrl(url: string): string {
  return url.toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/$/, '');
}

export async function isDuplicateUrl(url: string): Promise<boolean> {
  const target = normalizeUrl(url);
  return WEBSITES.some((w) => normalizeUrl(w.url) === target);
}
