'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import type { Website } from '@/types';
import { getCategoryMeta } from '@/lib/categories-client';

export default function SearchBar({
  initialValue = '',
  allWebsites,
  large = false,
}: {
  initialValue?: string;
  allWebsites: Website[];
  large?: boolean;
}) {
  const [value, setValue] = useState(initialValue);
  const [suggestions, setSuggestions] = useState<Website[]>([]);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('click', onClickOutside);
    return () => document.removeEventListener('click', onClickOutside);
  }, []);

  function handleChange(v: string) {
    setValue(v);
    const q = v.trim().toLowerCase();
    if (!q) {
      setSuggestions([]);
      setOpen(false);
      return;
    }
    const matches = allWebsites
      .filter((w) => w.name.toLowerCase().includes(q) || w.category.includes(q))
      .slice(0, 6);
    setSuggestions(matches);
    setOpen(matches.length > 0);
  }

  function submit(q?: string) {
    setOpen(false);
    router.push(`/search?q=${encodeURIComponent(q ?? value)}`);
  }

  return (
    <div ref={boxRef} className="relative" style={{ maxWidth: large ? 640 : '100%' }}>
      <div className="flex items-center gap-2.5 bg-card border-2 border-line/10 focus-within:border-indigo rounded-full pl-5 pr-2 py-2 shadow-xl shadow-indigo/[0.06]">
        <span className="text-inksoft">🔍</span>
        <input
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && submit()}
          onFocus={() => suggestions.length > 0 && setOpen(true)}
          type="text"
          placeholder="Search Ethiopian websites... e.g. banks, universities, jobs"
          className="flex-1 bg-transparent outline-none text-[16px] py-2.5"
        />
        <button onClick={() => submit()} className="bg-indigo hover:bg-indigo/90 text-white dark:text-[#0D1117] rounded-full px-6 py-2.5 text-sm font-bold transition">
          Search
        </button>
      </div>
      {open && (
        <div className="absolute top-[calc(100%+8px)] left-0 right-0 bg-card border border-line/20 rounded-2xl shadow-lg overflow-hidden z-30">
          {suggestions.map((w) => (
            <Link
              key={w.slug}
              href={`/website/${w.slug}`}
              onClick={() => setOpen(false)}
              className="block px-[18px] py-3 text-sm hover:bg-paper2"
            >
              {w.name}
              <span className="float-right text-inksoft text-xs">{getCategoryMeta(w.category)?.name}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
