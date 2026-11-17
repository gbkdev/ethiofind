import type { MetadataRoute } from 'next';
import { getAllWebsites, getCategories } from '@/lib/repository/websites';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const [websites, categories] = await Promise.all([getAllWebsites(), getCategories()]);

  const staticRoutes: MetadataRoute.Sitemap = ['', '/categories', '/search', '/submit', '/about', '/favorites'].map((path) => ({
    url: `${base}${path}`,
    changeFrequency: 'weekly',
    priority: path === '' ? 1 : 0.6,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${base}/category/${c.slug}`,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const websiteRoutes: MetadataRoute.Sitemap = websites.map((w) => ({
    url: `${base}/website/${w.slug}`,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...categoryRoutes, ...websiteRoutes];
}
