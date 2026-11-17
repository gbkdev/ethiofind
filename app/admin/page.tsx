import type { Metadata } from 'next';
import { getAllWebsites, getCategories } from '@/lib/repository/websites';
import AdminOverviewClient from './AdminOverviewClient';

export const metadata: Metadata = { title: 'Overview' };

export default async function AdminOverviewPage() {
  const [websites, categories] = await Promise.all([getAllWebsites(), getCategories()]);
  return <AdminOverviewClient websites={websites} categories={categories} />;
}
