import type { Metadata } from 'next';
import { getAllWebsites } from '@/lib/repository/websites';
import FavoritesClient from './FavoritesClient';

export const metadata: Metadata = { title: 'Saved Websites' };

export default async function FavoritesPage() {
  const allWebsites = await getAllWebsites();
  return <FavoritesClient allWebsites={allWebsites} />;
}
