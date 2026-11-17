'use client';

import { useEffect, useState } from 'react';
import { isFavorite, toggleFavorite } from '@/lib/store/favorites';
import { toast } from '@/components/Toaster';
import { cx } from '@/lib/utils';

export default function FavoriteButton({ slug, variant = 'icon' }: { slug: string; variant?: 'icon' | 'labeled' }) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(isFavorite(slug));
  }, [slug]);

  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(slug);
    const next = !saved;
    setSaved(next);
    toast(next ? 'Saved to your favorites' : 'Removed from Saved');
  }

  if (variant === 'labeled') {
    return (
      <button
        onClick={handleClick}
        className="btn border border-line/20 bg-card hover:border-indigo rounded-lg px-4 py-2 text-sm font-semibold inline-flex items-center gap-2"
      >
        {saved ? '♥ Saved' : '♡ Save'}
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      aria-label={saved ? 'Remove from favorites' : 'Save to favorites'}
      className={cx(
        'h-9 w-9 rounded-lg border flex items-center justify-center text-sm flex-shrink-0 transition',
        saved ? 'border-rust text-rust bg-rust/10' : 'border-line/20 bg-card'
      )}
    >
      {saved ? '♥' : '♡'}
    </button>
  );
}
