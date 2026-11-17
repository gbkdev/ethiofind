'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import type { Website } from '@/types';
import WebsiteCard from '@/components/WebsiteCard';
import SearchBar from '@/components/SearchBar';
import EmptyState from '@/components/EmptyState';
import { getViewCounts } from '@/lib/store/analytics';
import Link from 'next/link';

interface Props {
  allWebsites: Website[];
  categories: { slug: string; name: string }[];
  regions: string[];
}

export default function SearchClient({ allWebsites, categories, regions }: Props) {
  const router = useRouter();
  const params = useSearchParams();
  const q = params.get('q') || '';
  const initialCategory = params.get('category') || '';
  const initialRegion = params.get('region') || '';

  const [selectedCats, setSelectedCats] = useState<string[]>(initialCategory ? [initialCategory] : []);
  const [selectedRegion, setSelectedRegion] = useState(initialRegion);
  const [researchedOnly, setResearchedOnly] = useState(false);
  const [sort, setSort] = useState<'relevance' | 'popular' | 'newest'>('relevance');
  const [views, setViews] = useState<Record<string, number>>({});

  useEffect(() => {
    setViews(getViewCounts());
  }, []);

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    let list = allWebsites.filter((w) => {
      const matchesQ =
        !query ||
        [w.name, w.description, w.organization, w.category, ...w.tags, w.city, w.region].join(' ').toLowerCase().includes(query);
      const matchesCat = selectedCats.length === 0 || selectedCats.includes(w.category);
      const matchesRegion = !selectedRegion || w.region === selectedRegion;
      const matchesResearched = !researchedOnly || w.verification === 'researched';
      return matchesQ && matchesCat && matchesRegion && matchesResearched;
    });
    if (sort === 'popular') list = [...list].sort((a, b) => (views[b.slug] || 0) - (views[a.slug] || 0));
    else if (sort === 'newest') list = [...list].reverse();
    return list;
  }, [allWebsites, q, selectedCats, selectedRegion, researchedOnly, sort, views]);

  function toggleCat(slug: string) {
    setSelectedCats((prev) => (prev.includes(slug) ? prev.filter((c) => c !== slug) : [...prev, slug]));
  }

  return (
    <section className="py-10">
      <div className="max-w-[1180px] mx-auto px-5">
        <div className="mb-6">
          <SearchBar initialValue={q} allWebsites={allWebsites} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[230px_1fr] gap-6 items-start">
          <div className="bg-card border border-line/20 rounded-card p-4.5 md:sticky md:top-20">
            <FilterGroup title="Category">
              {Array.from(new Set(allWebsites.map((w) => w.category))).map((slug) => {
                const cat = categories.find((c) => c.slug === slug);
                return (
                  <label key={slug} className="flex items-center gap-2 text-[13.5px] py-1 cursor-pointer">
                    <input type="checkbox" checked={selectedCats.includes(slug)} onChange={() => toggleCat(slug)} className="accent-indigo" />
                    {cat?.name || slug}
                  </label>
                );
              })}
            </FilterGroup>
            <FilterGroup title="Region">
              {Array.from(new Set(allWebsites.map((w) => w.region))).map((r) => (
                <label key={r} className="flex items-center gap-2 text-[13.5px] py-1 cursor-pointer">
                  <input
                    type="radio"
                    name="region"
                    checked={selectedRegion === r}
                    onChange={() => setSelectedRegion(selectedRegion === r ? '' : r)}
                    className="accent-indigo"
                  />
                  {r}
                </label>
              ))}
            </FilterGroup>
            <FilterGroup title="Status">
              <label className="flex items-center gap-2 text-[13.5px] py-1 cursor-pointer">
                <input type="checkbox" checked={researchedOnly} onChange={(e) => setResearchedOnly(e.target.checked)} className="accent-indigo" />
                Researched only
              </label>
            </FilterGroup>
            <button
              onClick={() => {
                setSelectedCats([]);
                setSelectedRegion('');
                setResearchedOnly(false);
                router.push('/search' + (q ? `?q=${encodeURIComponent(q)}` : ''));
              }}
              className="w-full text-center border border-line/20 rounded-lg py-2 text-sm font-semibold hover:border-indigo transition"
            >
              Clear filters
            </button>
          </div>

          <div>
            <div className="flex items-center justify-between gap-2.5 flex-wrap mb-4">
              <div className="font-mono text-[13px] text-inksoft">
                {results.length} website{results.length !== 1 ? 's' : ''} found
              </div>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as typeof sort)}
                className="bg-card border border-line/20 rounded-lg px-2.5 py-2 text-[13px]"
              >
                <option value="relevance">Relevance</option>
                <option value="popular">Most viewed</option>
                <option value="newest">Newest</option>
              </select>
            </div>
            {results.length ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {results.map((w) => (
                  <WebsiteCard key={w.slug} website={w} />
                ))}
              </div>
            ) : (
              <EmptyState
                title="No websites found."
                description="Try a different search term, or submit one if you know a site that belongs here."
                action={
                  <Link href="/submit" className="text-indigo font-semibold text-sm">
                    Submit a website →
                  </Link>
                }
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-4.5">
      <h4 className="text-[12px] uppercase tracking-wide text-inksoft mb-2.5">{title}</h4>
      {children}
    </div>
  );
}
