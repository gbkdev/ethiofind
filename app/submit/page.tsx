import type { Metadata } from 'next';
import { getAllWebsites, getCategories, getRegions } from '@/lib/repository/websites';
import SubmitForm from './SubmitForm';

export const metadata: Metadata = { title: 'Submit a Website' };

export default async function SubmitPage() {
  const [categories, regions, allWebsites] = await Promise.all([getCategories(), getRegions(), getAllWebsites()]);
  return (
    <section className="py-10">
      <div className="max-w-[1180px] mx-auto px-5">
        <h1 className="font-display font-semibold text-2xl mb-2">Submit a Website</h1>
        <p className="text-inksoft text-sm mb-6">
          Submissions are saved to a real moderation queue (Admin → Submissions) — they don&apos;t just disappear after this form.
        </p>
        <SubmitForm categories={categories} regions={regions} allWebsites={allWebsites} />
      </div>
    </section>
  );
}
