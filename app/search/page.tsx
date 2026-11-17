import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getAllWebsites, getCategories, getRegions } from '@/lib/repository/websites';
import SearchClient from './SearchClient';

export const metadata: Metadata = { title: 'Search' };

export default async function SearchPage() {
  const [allWebsites, categories, regions] = await Promise.all([getAllWebsites(), getCategories(), getRegions()]);
  return (
    <Suspense fallback={<div className="max-w-[1180px] mx-auto px-5 py-10 text-inksoft">Loading…</div>}>
      <SearchClient allWebsites={allWebsites} categories={categories} regions={regions} />
    </Suspense>
  );
}
