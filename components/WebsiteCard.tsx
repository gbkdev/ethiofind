'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { Website } from '@/types';
import Badge from '@/components/Badge';
import FavoriteButton from '@/components/FavoriteButton';
import { getCategoryMeta, getCategoryColor } from '@/lib/categories-client';
import { getViewCount } from '@/lib/store/analytics';
import { formatCount } from '@/lib/utils';

export default function WebsiteCard({ website }: { website: Website }) {
  const [views, setViews] = useState(0);
  const cat = getCategoryMeta(website.category);
  const color = getCategoryColor(website.category);

  useEffect(() => {
    setViews(getViewCount(website.slug));
    function onChange() {
      setViews(getViewCount(website.slug));
    }
    window.addEventListener('ethiofind:views-changed', onChange);
    return () => window.removeEventListener('ethiofind:views-changed', onChange);
  }, [website.slug]);

  return (
    <div className="group relative bg-card border border-line/10 rounded-2xl overflow-hidden flex flex-col transition hover:-translate-y-1.5 hover:shadow-xl hover:shadow-ink/5">
      <Link href={`/website/${website.slug}`} className="flex-1 flex flex-col">
        <div className="p-5 pb-3 flex gap-3">
          <div className={`h-12 w-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0 ${color.bg}`}>
            {cat?.icon}
          </div>
          <div className="min-w-0 flex-1">
            <div className="font-semibold text-[15px] leading-snug">{website.name}</div>
            <div className={`inline-block mt-1 text-[10.5px] font-bold px-2 py-0.5 rounded-full ${color.bg} ${color.text}`}>
              {cat?.name}
            </div>
          </div>
        </div>
        <p className="px-5 text-[13.5px] text-inksoft leading-relaxed line-clamp-2">{website.description}</p>
        <div className="px-5 mt-3 flex flex-wrap items-center gap-2.5 text-[11.5px] text-inksoft">
          <Badge status={website.verification} />
          <span>📍 {website.city || website.region}</span>
          {views > 0 && <span>👁 {formatCount(views)}</span>}
        </div>
      </Link>
      <div className="mt-auto p-4 pt-3.5 flex items-center gap-2">
        <FavoriteButton slug={website.slug} />
        <a
          href={website.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-center rounded-full border border-line/15 py-2 text-[13px] font-semibold hover:border-indigo hover:text-indigo transition"
        >
          Visit ↗
        </a>
        <Link
          href={`/website/${website.slug}`}
          className="flex-1 text-center rounded-full bg-ink text-paper dark:bg-paper2 dark:text-ink py-2 text-[13px] font-semibold hover:opacity-85 transition"
        >
          Details
        </Link>
      </div>
    </div>
  );
}
