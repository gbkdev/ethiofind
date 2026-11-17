'use client';

import type { Review } from '@/types';

/** Real reviews only — no seeded/fake reviews ship with this build. */

function key(slug: string) {
  return `ethiofind:reviews:${slug}`;
}

export function getReviews(slug: string): Review[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(key(slug));
    return raw ? (JSON.parse(raw) as Review[]) : [];
  } catch {
    return [];
  }
}

export function addReview(slug: string, rating: number, comment: string): Review[] {
  const list = getReviews(slug);
  const review: Review = {
    id: `r_${Date.now()}`,
    websiteSlug: slug,
    rating,
    comment: comment.trim() || undefined,
    createdAt: new Date().toISOString().slice(0, 10),
  };
  const next = [review, ...list];
  window.localStorage.setItem(key(slug), JSON.stringify(next));
  return next;
}

export function averageRating(list: Review[]): number | null {
  if (!list.length) return null;
  return Math.round((list.reduce((sum, r) => sum + r.rating, 0) / list.length) * 10) / 10;
}
