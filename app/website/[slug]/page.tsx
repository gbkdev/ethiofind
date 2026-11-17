import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllWebsites, getCategory, getRelatedWebsites, getWebsiteBySlug } from '@/lib/repository/websites';
import WebsiteDetailClient from './WebsiteDetailClient';

export async function generateStaticParams() {
  const websites = await getAllWebsites();
  return websites.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const website = await getWebsiteBySlug(params.slug);
  if (!website) return {};
  return {
    title: website.name,
    description: website.description,
    alternates: { canonical: `/website/${website.slug}` },
    openGraph: { title: website.name, description: website.description, type: 'website' },
  };
}

export default async function WebsiteDetailPage({ params }: { params: { slug: string } }) {
  const website = await getWebsiteBySlug(params.slug);
  if (!website) notFound();
  const [related, category] = await Promise.all([getRelatedWebsites(website), getCategory(website.category)]);

  return <WebsiteDetailClient website={website} related={related} category={category} />;
}
