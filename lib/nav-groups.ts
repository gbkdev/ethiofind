import { CATEGORIES } from '@/lib/seed-data';
import { getCategoryColor } from '@/lib/categories-client';

/** Grouped the way TinyWow clusters its tool categories into a few nav
 * items (PDF / Image / Write / Video / File) instead of listing everything
 * flat — makes a 24-category taxonomy scannable in one mega-menu. */
export const NAV_GROUPS: { label: string; slugs: string[] }[] = [
  { label: 'Government & Finance', slugs: ['government', 'finance-banking', 'insurance', 'legal'] },
  { label: 'Education & Jobs', slugs: ['education', 'jobs-careers', 'research'] },
  { label: 'Business & Tech', slugs: ['business', 'technology', 'shopping', 'real-estate', 'agriculture', 'telecommunications'] },
  { label: 'Travel & Life', slugs: ['travel-tourism', 'hotels', 'food-restaurants', 'transportation', 'entertainment', 'sports'] },
  { label: 'Community', slugs: ['healthcare', 'news-media', 'ngos', 'diaspora', 'other'] },
];

export function categoryMeta(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug)!;
}

export { getCategoryColor };
