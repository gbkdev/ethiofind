'use client';

import { useEffect, useState } from 'react';
import type { Category, Website } from '@/types';
import { getSubmissions } from '@/lib/store/submissions';
import { getViewCounts } from '@/lib/store/analytics';
import { formatCount } from '@/lib/utils';

export default function AdminOverviewClient({ websites, categories }: { websites: Website[]; categories: Category[] }) {
  const [pending, setPending] = useState(0);
  const [totalViews, setTotalViews] = useState(0);

  useEffect(() => {
    setPending(getSubmissions().filter((s) => s.status === 'pending').length);
    setTotalViews(Object.values(getViewCounts()).reduce((a, b) => a + b, 0));
  }, []);

  const researched = websites.filter((w) => w.verification === 'researched').length;
  const emptyCategories = categories.filter((c) => (c.count ?? 0) === 0).length;

  const kpis = [
    { label: 'Total websites', value: websites.length },
    { label: 'Researched / sourced', value: researched },
    { label: 'Pending submissions', value: pending },
    { label: 'Categories', value: categories.length },
    { label: 'Empty categories', value: emptyCategories },
    { label: 'Recorded detail-page views', value: formatCount(totalViews) },
  ];

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 mb-6">
        {kpis.map((k) => (
          <div key={k.label} className="bg-card border border-line/20 rounded-xl p-4">
            <div className="font-mono text-2xl font-semibold">{k.value}</div>
            <div className="text-xs text-inksoft mt-0.5">{k.label}</div>
          </div>
        ))}
      </div>
      <p className="text-inksoft text-[13px] max-w-[560px]">
        Views and favorite counts are real, persisted counters (browser storage tied to this app) — they increment as
        people actually open detail pages and save sites, not simulated numbers. This dashboard reads directly from
        that storage on the client, the same way it would read from Supabase tables once connected.
      </p>
    </div>
  );
}
