'use client';

import Link from 'next/link';
import { NAV_GROUPS, categoryMeta, getCategoryColor } from '@/lib/nav-groups';

export default function MegaMenu({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="absolute top-[calc(100%+10px)] left-0 bg-card border border-line/10 rounded-2xl shadow-2xl shadow-ink/10 p-6 w-[min(820px,90vw)] grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-5 z-50">
      {NAV_GROUPS.map((group) => (
        <div key={group.label}>
          <h4 className="text-[11px] font-bold uppercase tracking-wide text-inksoft mb-2.5">{group.label}</h4>
          <div className="flex flex-col gap-0.5">
            {group.slugs.map((slug) => {
              const cat = categoryMeta(slug);
              const color = getCategoryColor(slug);
              return (
                <Link
                  key={slug}
                  href={`/category/${slug}`}
                  onClick={onNavigate}
                  className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 hover:bg-paper2 transition text-sm"
                >
                  <span className={`h-7 w-7 rounded-lg flex items-center justify-center text-[13px] flex-shrink-0 ${color.bg}`}>
                    {cat.icon}
                  </span>
                  <span className="truncate">{cat.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      ))}
      <div className="col-span-2 md:col-span-3 pt-3 mt-1 border-t border-line/10">
        <Link href="/categories" onClick={onNavigate} className="text-indigo text-sm font-semibold">
          View all categories →
        </Link>
      </div>
    </div>
  );
}
