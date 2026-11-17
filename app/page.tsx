import Link from 'next/link';
import { getAllWebsites, getCategories, getFeaturedWebsites, getRecentlyAdded, getRegions } from '@/lib/repository/websites';
import WebsiteCard from '@/components/WebsiteCard';
import CategoryCard from '@/components/CategoryCard';
import SearchBar from '@/components/SearchBar';
import HeroBlob from '@/components/HeroBlob';
import PopularTabs from '@/components/PopularTabs';

const CHIPS = ['Ethiopian banks', 'Universities', 'Jobs', 'Government services', 'Airlines', 'Telecom'];

export default async function HomePage() {
  const [categories, featured, recent, regions, allWebsites] = await Promise.all([
    getCategories(),
    getFeaturedWebsites(),
    getRecentlyAdded(4),
    getRegions(),
    getAllWebsites(),
  ]);

  const stats = [
    { value: `${allWebsites.length}+`, label: 'Websites Listed' },
    { value: `${categories.length}`, label: 'Categories' },
    { value: `${new Set(allWebsites.map((w) => w.region)).size}`, label: 'Regions Covered' },
    { value: `${allWebsites.filter((w) => w.verification === 'researched').length}`, label: 'Source-Verified' },
  ];

  return (
    <>
      <section className="relative overflow-hidden pt-16 pb-14">
        <HeroBlob className="absolute -top-32 -right-40 opacity-90" />
        <HeroBlob className="absolute -bottom-48 -left-52 opacity-60 hidden md:block" />
        <div className="relative max-w-[1180px] mx-auto px-5 text-center">
          <div className="inline-flex items-center gap-1.5 bg-card border border-line/10 rounded-full px-3.5 py-1.5 text-[12.5px] font-semibold text-inksoft mb-6 shadow-sm">
            🇪🇹 Discover Ethiopia Online
          </div>
          <h1 className="font-display font-extrabold text-[clamp(34px,6vw,62px)] leading-[1.05] mb-5">
            Find useful Ethiopian
            <br />
            <span className="bg-gradient-to-r from-indigo via-ochre to-rust bg-clip-text text-transparent">websites, fast.</span>
          </h1>
          <p className="text-inksoft text-[17px] max-w-[560px] mx-auto mb-8 leading-relaxed">
            Banks, universities, government services, hospitals, jobs and more — a searchable, source-transparent
            directory of the Ethiopian internet.
          </p>
          <div className="flex justify-center">
            <SearchBar allWebsites={allWebsites} large />
          </div>
          <div className="flex flex-wrap justify-center gap-2 mt-5">
            {CHIPS.map((c) => (
              <Link
                key={c}
                href={`/search?q=${encodeURIComponent(c)}`}
                className="text-[12.5px] px-3.5 py-1.5 rounded-full border border-line/10 text-inksoft bg-card hover:border-ochre hover:text-ink transition"
              >
                {c}
              </Link>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-3 mt-12">
            {stats.map((s) => (
              <div key={s.label} className="bg-card border border-line/10 rounded-2xl px-6 py-4 min-w-[130px]">
                <div className="font-display font-extrabold text-2xl">{s.value}</div>
                <div className="text-[11.5px] text-inksoft mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Section title="Explore Categories" href="/categories" subtitle="Solve your Ethiopian search problem — pick a category">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {categories.slice(0, 12).map((c) => (
            <CategoryCard key={c.slug} category={c} />
          ))}
        </div>
      </Section>

      <Section title="Our Most Popular Websites" subtitle="Real, researched listings — all free to visit, no catch">
        <PopularTabs websites={[...featured, ...allWebsites.filter((w) => !featured.includes(w))].slice(0, 12)} />
      </Section>

      <Section title="Recently Added">
        <Grid websites={recent} />
      </Section>

      <Section title="Browse by Region">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {regions.map((r) => {
            const count = allWebsites.filter((w) => w.region === r).length;
            return (
              <Link
                key={r}
                href={`/search?region=${encodeURIComponent(r)}`}
                className="bg-card border border-line/10 rounded-2xl p-4 flex flex-col gap-2 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-ink/5 transition"
              >
                <div className="h-10 w-10 rounded-xl bg-indigo/10 flex items-center justify-center text-lg">📍</div>
                <div className="font-semibold text-[13.5px]">{r}</div>
                <div className="text-[11px] font-bold text-indigo">
                  {count} website{count !== 1 ? 's' : ''}
                </div>
              </Link>
            );
          })}
        </div>
      </Section>

      <section className="py-14">
        <div className="max-w-[1180px] mx-auto px-5">
          <div className="bg-gradient-to-br from-indigo to-indigo/80 rounded-3xl px-8 py-12 text-center text-white relative overflow-hidden">
            <div className="relative">
              <h2 className="font-display font-extrabold text-3xl mb-3">Know a real Ethiopian website we&apos;re missing?</h2>
              <p className="text-white/80 max-w-[480px] mx-auto mb-6">
                Help grow a trustworthy directory of the Ethiopian internet — submissions are reviewed before going
                live.
              </p>
              <Link href="/submit" className="inline-flex bg-white text-indigo rounded-full px-6 py-3 font-bold text-sm hover:opacity-90 transition">
                Submit a Website →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Section({ title, subtitle, href, children }: { title: string; subtitle?: string; href?: string; children: React.ReactNode }) {
  return (
    <section className="py-10">
      <div className="max-w-[1180px] mx-auto px-5">
        <div className="flex items-end justify-between gap-4 flex-wrap mb-6">
          <div>
            <h2 className="font-display font-extrabold text-[26px]">{title}</h2>
            {subtitle && <p className="text-inksoft text-sm mt-1">{subtitle}</p>}
          </div>
          {href && (
            <Link href={href} className="text-indigo text-sm font-bold">
              See all →
            </Link>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}

function Grid({ websites }: { websites: Awaited<ReturnType<typeof getFeaturedWebsites>> }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {websites.map((w) => (
        <WebsiteCard key={w.slug} website={w} />
      ))}
    </div>
  );
}
