'use client';

import { useEffect, useState } from 'react';
import type { Category, Website } from '@/types';
import Badge from '@/components/Badge';
import { getViewCounts } from '@/lib/store/analytics';
import { formatCount } from '@/lib/utils';

export default function AdminWebsitesClient({ websites, categories }: { websites: Website[]; categories: Category[] }) {
  const [views, setViews] = useState<Record<string, number>>({});
  const [favCounts, setFavCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    setViews(getViewCounts());
    try {
      const raw = window.localStorage.getItem('ethiofind:favcounts');
      setFavCounts(raw ? JSON.parse(raw) : {});
    } catch {
      setFavCounts({});
    }
  }, []);

  function catName(slug: string) {
    return categories.find((c) => c.slug === slug)?.name || slug;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-[13px]">
        <thead>
          <tr>
            {['Name', 'Category', 'Status', 'Views', 'Saved'].map((h) => (
              <th key={h} className="text-left text-[11px] uppercase tracking-wide text-inksoft px-3 py-2.5 border-b border-line/20">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {websites.map((w) => (
            <tr key={w.slug} className="hover:bg-paper2">
              <td className="px-3 py-2.5 border-b border-line/20 font-semibold">{w.name}</td>
              <td className="px-3 py-2.5 border-b border-line/20">{catName(w.category)}</td>
              <td className="px-3 py-2.5 border-b border-line/20">
                <Badge status={w.verification} />
              </td>
              <td className="px-3 py-2.5 border-b border-line/20 font-mono">{formatCount(views[w.slug] || 0)}</td>
              <td className="px-3 py-2.5 border-b border-line/20 font-mono">{formatCount(favCounts[w.slug] || 0)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
