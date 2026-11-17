import type { Metadata } from 'next';
import { getCategories } from '@/lib/repository/websites';
import CategoryCard from '@/components/CategoryCard';

export const metadata: Metadata = { title: 'All Categories' };

export default async function CategoriesPage() {
  const categories = await getCategories();
  const emptyCount = categories.filter((c) => (c.count ?? 0) === 0).length;

  return (
    <section className="py-10">
      <div className="max-w-[1180px] mx-auto px-5">
        <h1 className="font-display font-semibold text-2xl mb-2">All Categories</h1>
        <p className="text-inksoft text-sm mb-6">
          {emptyCount} categories have no listings yet —{' '}
          <a href="/submit" className="text-indigo font-semibold">
            submit a website
          </a>{' '}
          to help fill them in.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {categories.map((c) => (
            <CategoryCard key={c.slug} category={c} />
          ))}
        </div>
      </div>
    </section>
  );
}
