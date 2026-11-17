'use client';

/**
 * Favorites store.
 *
 * This persists to localStorage today because there is no live Supabase
 * project (and therefore no real authenticated user) wired into this
 * build. Every function is written against the same shape a Supabase
 * version would use:
 *
 *   export async function getFavorites(userId: string) {
 *     const { data } = await supabase.from('favorites').select('website_id').eq('user_id', userId);
 *     return data.map(r => r.website_id);
 *   }
 *
 * so the call sites in components/hooks do not need to change when this
 * is swapped for the real table + RLS policy in schema.sql.
 */

const KEY = 'ethiofind:favorites';

export function getFavorites(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function isFavorite(slug: string): boolean {
  return getFavorites().includes(slug);
}

export function toggleFavorite(slug: string): string[] {
  const current = getFavorites();
  const idx = current.indexOf(slug);
  if (idx > -1) current.splice(idx, 1);
  else current.push(slug);
  window.localStorage.setItem(KEY, JSON.stringify(current));
  window.dispatchEvent(new CustomEvent('ethiofind:favorites-changed'));
  return current;
}
