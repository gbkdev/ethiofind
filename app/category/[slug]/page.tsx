import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCategories, getCategory, getWebsitesByCategory } from '@/lib/repository/websites';
import WebsiteCard from '@/components/WebsiteCard';
import EmptyState from '@/components/EmptyState';
import Link from 'next/link';

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const category = await getCategory(params.slug);
  if (!category) return {};
  return {
    title: category.name,
    description: `Browse Ethiopian ${category.name.toLowerCase()} websites on EthioFind — ${category.count ?? 0} listed.`,
  };
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const category = await getCategory(params.slug);
  if (!category) notFound();
  const websites = await getWebsitesByCategory(params.slug);

  return (
    <section className="py-10">
      <div className="max-w-[1180px] mx-auto px-5">
        <div className="text-[13px] text-inksoft mb-4">
          <Link href="/">Home</Link> / <Link href="/categories">Categories</Link> / {category.name}
        </div>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{category.icon}</span>
          <h1 className="font-display font-semibold text-2xl">{category.name}</h1>
        </div>
        <p className="text-inksoft text-sm mb-6">
          {websites.length} website{websites.length !== 1 ? 's' : ''} in this category.
        </p>
        {websites.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {websites.map((w) => (
              <WebsiteCard key={w.slug} website={w} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon="🗂️"
            title="No websites in this category yet."
            description="Know a real Ethiopian organization that belongs here? Help us add it."
            action={
              <Link href="/submit" className="inline-block bg-indigo text-white dark:text-[#0D1117] rounded-lg px-4 py-2 text-sm font-semibold">
                Submit a website
              </Link>
            }
          />
        )}
      </div>
    </section>
  );
}
