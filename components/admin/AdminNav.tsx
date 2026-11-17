'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LINKS = [
  { href: '/admin', label: 'Overview' },
  { href: '/admin/websites', label: 'Websites' },
  { href: '/admin/research', label: 'Research Center' },
  { href: '/admin/submissions', label: 'Submissions' },
];

export default function AdminNav() {
  const pathname = usePathname();
  return (
    <div className="flex md:flex-col gap-0.5 md:sticky md:top-20 overflow-x-auto">
      {LINKS.map((l) => {
        const active = pathname === l.href;
        return (
          <Link
            key={l.href}
            href={l.href}
            className={`text-left px-3 py-2.5 rounded-lg text-[13.5px] font-medium whitespace-nowrap transition ${
              active ? 'bg-paper2 text-ink' : 'text-inksoft hover:bg-paper2 hover:text-ink'
            }`}
          >
            {l.label}
          </Link>
        );
      })}
    </div>
  );
}
