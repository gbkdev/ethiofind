'use client';

import { useMemo, useState } from 'react';
import type { Website } from '@/types';
import WebsiteCard from '@/components/WebsiteCard';
import { getCategoryMeta } from '@/lib/categories-client';

export default function PopularTabs({ websites }: { websites: Website[] }) {
  const usedCategories = useMemo(() => Array.from(new Set(websites.map((w) => w.category))), [websites]);
  const [active, setActive] = useState<string>('all');

  const filtered = active === 'all' ? websites : websites.filter((w) => w.category === active);

  return (
    <div>
      <div className="flex gap-2 overflow-x-auto pb-1 mb-5 -mx-1 px-1">
        <TabPill active={active === 'all'} onClick={() => setActive('all')}>
          All
        </TabPill>
        {usedCategories.map((slug) => (
          <TabPill key={slug} active={active === slug} onClick={() => setActive(slug)}>
            {getCategoryMeta(slug)?.icon} {getCategoryMeta(slug)?.name}
          </TabPill>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filtered.map((w) => (
          <WebsiteCard key={w.slug} website={w} />
        ))}
      </div>
    </div>
  );
}

function TabPill({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`whitespace-nowrap px-4 py-2 rounded-full text-[13px] font-semibold border transition ${
        active ? 'bg-indigo text-white border-indigo' : 'bg-card text-inksoft border-line/10 hover:border-indigo hover:text-ink'
      }`}
    >
      {children}
    </button>
  );
}
