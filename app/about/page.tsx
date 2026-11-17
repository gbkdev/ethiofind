import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'About' };

export default function AboutPage() {
  return (
    <section className="py-10">
      <div className="max-w-[720px] mx-auto px-5">
        <h1 className="font-display font-semibold text-3xl mb-4">About EthioFind</h1>
        <p className="text-inksoft leading-relaxed">
          EthioFind is a directory for discovering Ethiopian websites, organizations and digital resources — built so
          people don&apos;t have to search randomly to find what&apos;s real and useful.
        </p>

        <h3 className="font-display text-xl mt-7 mb-2">How listings are sourced</h3>
        <p className="text-inksoft leading-relaxed">
          Every listing carries a <strong>Research source</strong> — the reference used to confirm the
          organization&apos;s real official domain (Wikipedia infobox fields, official government pages, or the
          organization&apos;s own site). We do not invent phone numbers, addresses, ratings or descriptions: where
          information can&apos;t be confirmed, it&apos;s left blank rather than guessed. Statuses:{' '}
          <strong>Researched</strong> (cross-checked by this process), <strong>Community Submitted</strong> (added by
          a user, not yet cross-checked), <strong>Needs Review</strong>, and <strong>Broken</strong>. &quot;Featured&quot;
          and any future sponsorship are always separate from verification — money can never buy a verification
          badge.
        </p>

        <h3 className="font-display text-xl mt-7 mb-2">What&apos;s real vs. what&apos;s a placeholder in this build</h3>
        <p className="text-inksoft leading-relaxed">
          Search, filters, favorites, reviews, submissions, and admin moderation actions are genuinely functional and
          persist to your browser&apos;s storage. What this build does <em>not</em> have is a live Supabase database
          or real user accounts — those require cloud credentials this environment doesn&apos;t have. The
          <code className="mx-1 px-1.5 py-0.5 bg-paper2 rounded text-[13px]">schema.sql</code> file shipped with this
          project is the real Postgres/RLS schema for that step, and the repository layer in{' '}
          <code className="mx-1 px-1.5 py-0.5 bg-paper2 rounded text-[13px]">lib/repository</code> and{' '}
          <code className="mx-1 px-1.5 py-0.5 bg-paper2 rounded text-[13px]">lib/store</code> is written specifically
          so those calls can be swapped for real Supabase queries without touching any page or component.
        </p>

        <h3 className="font-display text-xl mt-7 mb-2">Contribute</h3>
        <p className="text-inksoft leading-relaxed">
          Anyone can{' '}
          <Link href="/submit" className="text-indigo font-semibold">
            submit a website
          </Link>{' '}
          — it enters a real moderation queue reviewable in Admin → Submissions.
        </p>
      </div>
    </section>
  );
}
