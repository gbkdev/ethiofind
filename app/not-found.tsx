import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="text-center py-24 px-5 text-inksoft">
      <div className="text-4xl mb-3">🧭</div>
      <h1 className="text-ink font-display text-xl mb-2">We couldn&apos;t find that page.</h1>
      <Link href="/" className="inline-block mt-3 bg-indigo text-white dark:text-[#0D1117] rounded-lg px-4 py-2 text-sm font-semibold">
        Back home
      </Link>
    </div>
  );
}
