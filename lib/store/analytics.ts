'use client';

/**
 * Real, persisted counters — incremented only when someone actually opens
 * a detail page or saves a favorite. In production this maps directly to
 * the `website_views` table (insert-only, RLS: anyone can insert) plus the
 * `favorite_count` column maintained by the trigger in schema.sql.
 */

const VIEWS_KEY = 'ethiofind:views';

export function getViewCounts(): Record<string, number> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(VIEWS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function recordView(slug: string): void {
  if (typeof window === 'undefined') return;
  const counts = getViewCounts();
  counts[slug] = (counts[slug] || 0) + 1;
  window.localStorage.setItem(VIEWS_KEY, JSON.stringify(counts));
  window.dispatchEvent(new CustomEvent('ethiofind:views-changed'));
}

export function getViewCount(slug: string): number {
  return getViewCounts()[slug] || 0;
}
