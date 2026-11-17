import Link from 'next/link';
import type { Category } from '@/types';
import { getCategoryColor } from '@/lib/categories-client';

export default function CategoryCard({ category }: { category: Category }) {
  const color = getCategoryColor(category.slug);
  return (
    <Link
      href={`/category/${category.slug}`}
      className="bg-card border border-line/10 rounded-2xl p-4 flex flex-col gap-2.5 transition hover:-translate-y-1.5 hover:shadow-xl hover:shadow-ink/5"
    >
      <div className={`h-10 w-10 rounded-xl flex items-center justify-center text-lg ${color.bg}`}>{category.icon}</div>
      <div className="font-semibold text-[13.5px] leading-snug">{category.name}</div>
      <div className={`text-[11px] font-bold ${color.text}`}>
        {category.count ?? 0} site{category.count === 1 ? '' : 's'}
      </div>
    </Link>
  );
}
