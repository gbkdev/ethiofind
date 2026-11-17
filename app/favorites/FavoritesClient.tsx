'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { Website } from '@/types';
import WebsiteCard from '@/components/WebsiteCard';
import EmptyState from '@/components/EmptyState';
import { getFavorites } from '@/lib/store/favorites';

export default function FavoritesClient({ allWebsites }: { allWebsites: Website[] }) {
  const [favSlugs, setFavSlugs] = useState<string[]>([]);

  useEffect(() => {
    setFavSlugs(getFavorites());
    function onChange() {
      setFavSlugs(getFavorites());
    }
    window.addEventListener('ethiofind:favorites-changed', onChange);
    return () => window.removeEventListener('ethiofind:favorites-changed', onChange);
  }, []);

  const favorites = allWebsites.filter((w) => favSlugs.includes(w.slug));

  return (
    <section className="py-10">
      <div className="max-w-[1180px] mx-auto px-5">
        <h1 className="font-display font-semibold text-2xl mb-6">Saved Websites</h1>
        {favorites.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {favorites.map((w) => (
              <WebsiteCard key={w.slug} website={w} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon="♡"
            title="Nothing saved yet."
            description="Tap the heart on any website card to save it here — it stays saved on this browser."
            action={
              <Link href="/" className="inline-block bg-indigo text-white dark:text-[#0D1117] rounded-lg px-4 py-2 text-sm font-semibold">
                Browse websites
              </Link>
            }
          />
        )}
      </div>
    </section>
  );
}
