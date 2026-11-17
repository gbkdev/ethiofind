import type { Metadata } from 'next';
import { getCategories } from '@/lib/repository/websites';
import AdminSubmissionsClient from './AdminSubmissionsClient';

export const metadata: Metadata = { title: 'Submissions' };

export default async function AdminSubmissionsPage() {
  const categories = await getCategories();
  return <AdminSubmissionsClient categories={categories} />;
}
