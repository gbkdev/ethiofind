'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { Website } from '@/types';
import Badge from '@/components/Badge';
import FavoriteButton from '@/components/FavoriteButton';
import WebsiteCard from '@/components/WebsiteCard';
import EmptyState from '@/components/EmptyState';
import { recordView, getViewCount } from '@/lib/store/analytics';
import { addReview, averageRating, getReviews } from '@/lib/store/reviews';
import { starString, formatCount, initials } from '@/lib/utils';
import { toast } from '@/components/Toaster';
import type { Category } from '@/types';

type Tab = 'about' | 'reviews' | 'related';

export default function WebsiteDetailClient({
  website,
  related,
  category,
}: {
  website: Website;
  related: Website[];
  category?: Category;
}) {
  const [tab, setTab] = useState<Tab>('about');
  const [views, setViews] = useState(0);
  const [reviews, setReviews] = useState(getReviews(website.slug));
  const [favCount, setFavCount] = useState(0);
  const [selectedStars, setSelectedStars] = useState(0);
  const [comment, setComment] = useState('');

  useEffect(() => {
    recordView(website.slug);
    setViews(getViewCount(website.slug));
    setReviews(getReviews(website.slug));
    try {
      const raw = window.localStorage.getItem('ethiofind:favcounts');
      const counts = raw ? JSON.parse(raw) : {};
      setFavCount(counts[website.slug] || 0);
    } catch {
      setFavCount(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [website.slug]);

  function handlePostReview() {
    if (!selectedStars) {
      toast('Please select a star rating');
      return;
    }
    const next = addReview(website.slug, selectedStars, comment);
    setReviews(next);
    setSelectedStars(0);
    setComment('');
    toast('Review posted — thank you!');
  }

  const avg = averageRating(reviews);

  return (
    <section className="py-10">
      <div className="max-w-[1180px] mx-auto px-5">
        <div className="text-[13px] text-inksoft mb-4">
          <Link href="/">Home</Link> / <Link href={`/category/${website.category}`}>{category?.name || website.category}</Link> /{' '}
          {website.name}
        </div>

        <div className="bg-card border border-line/20 rounded-2xl p-7 flex gap-5 flex-wrap items-start">
          <div className="h-16 w-16 rounded-2xl bg-paper2 flex items-center justify-center font-display font-bold text-2xl text-indigo flex-shrink-0">
            {initials(website.name)}
          </div>
          <div className="flex-1 min-w-[220px]">
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="font-display font-semibold text-2xl">{website.name}</h1>
              <Badge status={website.verification} />
            </div>
            <p className="text-inksoft mt-2 mb-3.5 max-w-[560px]">{website.description}</p>
            <div className="flex gap-2 flex-wrap">
              <a
                href={website.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-indigo text-white dark:text-[#0D1117] rounded-lg px-4 py-2 text-sm font-semibold"
              >
                Visit Official Website ↗
              </a>
              <FavoriteButton slug={website.slug} variant="labeled" />
              <ShareButton name={website.name} />
              <ReportButton slug={website.slug} />
            </div>
            <div className="mt-3.5 flex gap-4 flex-wrap text-[13px] text-inksoft">
              <span>
                📍 {website.city}, {website.region}
              </span>
              <span>
                {category?.icon} {category?.name || website.category}
              </span>
            </div>
            <div className="text-xs text-inksoft bg-paper2 border border-line/20 rounded-xl px-3.5 py-2.5 mt-3.5 flex gap-2 items-start">
              <span>📋</span>
              <span>
                <strong>Research source:</strong> {website.source.name}.{' '}
                {website.source.url && (
                  <a href={website.source.url} target="_blank" rel="noopener noreferrer" className="text-indigo font-semibold">
                    View source
                  </a>
                )}{' '}
                — see Admin → Research Center for the full source log.
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-line/20 border border-line/20 rounded-xl overflow-hidden mt-4.5">
          <Stat value={formatCount(views)} label="Views this session+" />
          <Stat value={formatCount(favCount)} label="Saved by users" />
          <Stat value={avg ?? '—'} label="Avg. rating" />
          <Stat value={reviews.length} label="Reviews" />
        </div>

        <div className="flex gap-1 border-b border-line/20 mt-7 mb-5 overflow-x-auto">
          {(['about', 'reviews', 'related'] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-3.5 py-2.5 text-sm font-semibold border-b-2 -mb-px whitespace-nowrap transition ${
                tab === t ? 'text-indigo border-indigo' : 'text-inksoft border-transparent'
              }`}
            >
              {t === 'about' ? 'About' : t === 'reviews' ? `Reviews (${reviews.length})` : 'Related'}
            </button>
          ))}
        </div>

        {tab === 'about' && (
          <div>
            <p className="max-w-[680px] leading-relaxed">{website.longDescription || website.description}</p>
            <div className="mt-5">
              <h4 className="font-semibold mb-2">Tags</h4>
              <div className="flex flex-wrap gap-2">
                {website.tags.map((t) => (
                  <span key={t} className="text-[12.5px] px-3 py-1.5 rounded-full border border-line/20 text-inksoft bg-card">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-5 text-[13.5px] text-inksoft space-y-1">
              <div>
                Organization: <strong className="text-ink">{website.organization}</strong>
              </div>
              <div>
                Website status: <strong className="text-ink">{website.status}</strong>
              </div>
              <div>
                Phone / email: <strong className="text-ink">Not publicly confirmed — left blank rather than guessed</strong>
              </div>
            </div>
          </div>
        )}

        {tab === 'reviews' && (
          <div>
            <div className="bg-card border border-line/20 rounded-card p-4.5 max-w-[520px] mb-5">
              <label className="block text-sm font-semibold mb-1.5">Your rating</label>
              <div className="flex gap-1 text-2xl mb-3.5">
                {[1, 2, 3, 4, 5].map((n) => (
                  <span
                    key={n}
                    onClick={() => setSelectedStars(n)}
                    className="cursor-pointer"
                    style={{ color: n <= selectedStars ? 'rgb(var(--ochre))' : 'rgb(var(--line) / 0.3)' }}
                  >
                    ★
                  </span>
                ))}
              </div>
              <label className="block text-sm font-semibold mb-1.5">Comment</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your real experience with this website..."
                className="w-full border border-line/20 rounded-lg bg-paper px-3 py-2.5 text-sm mb-3.5 min-h-[90px]"
              />
              <button onClick={handlePostReview} className="bg-indigo text-white dark:text-[#0D1117] rounded-lg px-4 py-2 text-sm font-semibold">
                Post Review
              </button>
            </div>
            {reviews.length ? (
              <div>
                {reviews.map((r) => (
                  <div key={r.id} className="border-b border-line/20 py-3.5">
                    <div className="flex justify-between">
                      <span className="text-ochre font-semibold text-sm">{starString(r.rating)}</span>
                      <span className="font-mono text-[11.5px] text-inksoft">{r.createdAt}</span>
                    </div>
                    {r.comment && <p className="text-inksoft text-[13.5px] mt-1.5">{r.comment}</p>}
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState icon="💬" title="No reviews yet." description="Be the first to review — real reviews only." />
            )}
          </div>
        )}

        {tab === 'related' &&
          (related.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {related.map((w) => (
                <WebsiteCard key={w.slug} website={w} />
              ))}
            </div>
          ) : (
            <EmptyState title="No related websites in this category yet." />
          ))}
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string | number; label: string }) {
  return (
    <div className="bg-card px-4 py-3.5">
      <div className="font-mono text-lg font-semibold">{value}</div>
      <div className="text-[11.5px] text-inksoft mt-0.5">{label}</div>
    </div>
  );
}

function ShareButton({ name }: { name: string }) {
  return (
    <button
      onClick={() => {
        if (navigator.share) navigator.share({ title: name, url: window.location.href });
        else {
          navigator.clipboard.writeText(window.location.href);
          toast('Link copied');
        }
      }}
      className="border border-line/20 bg-card rounded-lg px-4 py-2 text-sm font-semibold hover:border-indigo transition"
    >
      Share
    </button>
  );
}

function ReportButton({ slug }: { slug: string }) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState('Broken link');
  const [details, setDetails] = useState('');

  function submit() {
    try {
      const raw = window.localStorage.getItem('ethiofind:reports');
      const reports = raw ? JSON.parse(raw) : [];
      reports.unshift({ id: `rep_${Date.now()}`, websiteSlug: slug, reason, details, status: 'open', createdAt: new Date().toISOString().slice(0, 10) });
      window.localStorage.setItem('ethiofind:reports', JSON.stringify(reports));
    } catch {}
    setOpen(false);
    setDetails('');
    toast('Report submitted — our team will review it.');
  }

  return (
    <>
      <button onClick={() => setOpen(true)} className="border border-line/20 bg-card rounded-lg px-4 py-2 text-sm font-semibold hover:border-indigo transition">
        Report
      </button>
      {open && (
        <div className="fixed inset-0 bg-black/50 z-[90] flex items-center justify-center p-5" onClick={() => setOpen(false)}>
          <div className="bg-card rounded-2xl max-w-[440px] w-full p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-display text-lg mb-4">Report this website</h3>
            <label className="block text-sm font-semibold mb-1.5">Reason</label>
            <select value={reason} onChange={(e) => setReason(e.target.value)} className="w-full border border-line/20 rounded-lg bg-paper px-3 py-2.5 text-sm mb-3.5">
              {['Broken link', 'Wrong information', 'Duplicate listing', 'Inappropriate content', 'Fake website', 'Incorrect category'].map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
            <label className="block text-sm font-semibold mb-1.5">Details (optional)</label>
            <textarea value={details} onChange={(e) => setDetails(e.target.value)} className="w-full border border-line/20 rounded-lg bg-paper px-3 py-2.5 text-sm mb-4 min-h-[80px]" />
            <div className="flex gap-2 justify-end">
              <button onClick={() => setOpen(false)} className="border border-line/20 rounded-lg px-4 py-2 text-sm font-semibold">
                Cancel
              </button>
              <button onClick={submit} className="bg-indigo text-white dark:text-[#0D1117] rounded-lg px-4 py-2 text-sm font-semibold">
                Submit Report
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
