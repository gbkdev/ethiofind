import { CATEGORIES } from '@/lib/seed-data';

/**
 * Client components can't import lib/repository/websites.ts (it's marked
 * 'server-only'). For the small amount of category metadata client
 * components need for display, read directly from the static list —
 * counts aren't needed client-side, only name/icon.
 */
export function getCategoryMeta(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug);
}

/**
 * Deterministic color chip per category — the visual language borrowed
 * from tool-directory products like TinyWow, where every tool category
 * gets its own accent color so a grid of mixed cards stays scannable at a
 * glance instead of reading as one flat gray wall.
 */
const PALETTE = [
  { bg: 'bg-violet-100 dark:bg-violet-500/15', text: 'text-violet-600 dark:text-violet-300' },
  { bg: 'bg-blue-100 dark:bg-blue-500/15', text: 'text-blue-600 dark:text-blue-300' },
  { bg: 'bg-emerald-100 dark:bg-emerald-500/15', text: 'text-emerald-600 dark:text-emerald-300' },
  { bg: 'bg-amber-100 dark:bg-amber-500/15', text: 'text-amber-600 dark:text-amber-300' },
  { bg: 'bg-rose-100 dark:bg-rose-500/15', text: 'text-rose-600 dark:text-rose-300' },
  { bg: 'bg-cyan-100 dark:bg-cyan-500/15', text: 'text-cyan-600 dark:text-cyan-300' },
  { bg: 'bg-fuchsia-100 dark:bg-fuchsia-500/15', text: 'text-fuchsia-600 dark:text-fuchsia-300' },
  { bg: 'bg-orange-100 dark:bg-orange-500/15', text: 'text-orange-600 dark:text-orange-300' },
  { bg: 'bg-teal-100 dark:bg-teal-500/15', text: 'text-teal-600 dark:text-teal-300' },
  { bg: 'bg-indigo-100 dark:bg-indigo-500/15', text: 'text-indigo-600 dark:text-indigo-300' },
];

function hash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h;
}

export function getCategoryColor(slug: string) {
  return PALETTE[hash(slug) % PALETTE.length];
}
