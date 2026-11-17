'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import ThemeToggle from '@/components/ThemeToggle';
import MegaMenu from '@/components/MegaMenu';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setMenuOpen(false);
    }
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return (
    <>
      <div className="tibeb" />
      <nav className="sticky top-0 z-40 backdrop-blur-md bg-paper/85 border-b border-line/10">
        <div className="max-w-[1180px] mx-auto px-5 h-[68px] flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 font-display font-extrabold text-xl whitespace-nowrap mr-2">
            <span className="h-8 w-8 rounded-xl bg-gradient-to-br from-indigo to-ochre flex items-center justify-center text-white text-sm">
              EF
            </span>
            EthioFind
          </Link>

          <div className="hidden md:flex items-center gap-1">
            <div ref={ref} className="relative">
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-semibold transition ${
                  menuOpen ? 'bg-indigo text-white' : 'text-inksoft hover:bg-paper2 hover:text-ink'
                }`}
              >
                Categories
                <svg width="10" height="6" viewBox="0 0 10 6" className={`transition-transform ${menuOpen ? 'rotate-180' : ''}`}>
                  <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" />
                </svg>
              </button>
              {menuOpen && <MegaMenu onNavigate={() => setMenuOpen(false)} />}
            </div>
            <NavPill href="/search">Search</NavPill>
            <NavPill href="/submit">Submit Website</NavPill>
            <NavPill href="/about">About</NavPill>
            <NavPill href="/admin">Admin</NavPill>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <ThemeToggle />
            <Link
              href="/favorites"
              aria-label="Saved websites"
              className="h-9 w-9 rounded-full border border-line/10 bg-card flex items-center justify-center hover:border-indigo transition text-rust"
            >
              ♥
            </Link>
            <Link
              href="/submit"
              className="hidden sm:inline-flex items-center bg-indigo hover:bg-indigo/90 text-white rounded-full px-4 py-2 text-sm font-semibold transition shadow-sm shadow-indigo/30"
            >
              Submit Website
            </Link>
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden h-9 w-9 rounded-full border border-line/10 bg-card flex items-center justify-center"
              aria-label="Menu"
            >
              {mobileOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-line/10 px-5 py-4 flex flex-col gap-1 bg-card">
            <Link href="/categories" onClick={() => setMobileOpen(false)} className="py-2 text-sm font-semibold">
              Categories
            </Link>
            <Link href="/search" onClick={() => setMobileOpen(false)} className="py-2 text-sm font-semibold">
              Search
            </Link>
            <Link href="/submit" onClick={() => setMobileOpen(false)} className="py-2 text-sm font-semibold">
              Submit Website
            </Link>
            <Link href="/about" onClick={() => setMobileOpen(false)} className="py-2 text-sm font-semibold">
              About
            </Link>
            <Link href="/admin" onClick={() => setMobileOpen(false)} className="py-2 text-sm font-semibold">
              Admin
            </Link>
          </div>
        )}
      </nav>
      <div className="bg-indigo/5 border-b border-indigo/10 text-indigo/90 text-[12px] text-center px-4 py-1.5">
        Real, researched Ethiopian listings — running on browser-persisted storage today, not a live database yet.{' '}
        <Link href="/about" className="underline font-semibold">
          Learn more
        </Link>
      </div>
    </>
  );
}

function NavPill({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="px-3.5 py-2 rounded-full text-sm font-semibold text-inksoft hover:bg-paper2 hover:text-ink transition">
      {children}
    </Link>
  );
}
