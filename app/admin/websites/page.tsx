import type { Metadata } from 'next';
import { getAllWebsites, getCategories } from '@/lib/repository/websites';
import AdminWebsitesClient from './AdminWebsitesClient';

export const metadata: Metadata = { title: 'Websites' };

export default async function AdminWebsitesPage() {
  const [websites, categories] = await Promise.all([getAllWebsites(), getCategories()]);
  return <AdminWebsitesClient websites={websites} categories={categories} />;
}
