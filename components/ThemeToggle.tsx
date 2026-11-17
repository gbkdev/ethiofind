'use client';

import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const stored = window.localStorage.getItem('ethiofind:theme') as 'light' | 'dark' | null;
    const initial = stored || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(initial);
    document.documentElement.classList.toggle('dark', initial === 'dark');
  }, []);

  function toggle() {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.classList.toggle('dark', next === 'dark');
    window.localStorage.setItem('ethiofind:theme', next);
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle dark mode"
      className="h-9 w-9 rounded-lg border border-line/20 bg-card flex items-center justify-center text-sm hover:border-indigo transition"
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
}
