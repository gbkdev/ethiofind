import type { Metadata } from 'next';
import { getAllWebsites } from '@/lib/repository/websites';

export const metadata: Metadata = { title: 'Research Center' };

export default async function AdminResearchPage() {
  const websites = await getAllWebsites();

  return (
    <div>
      <p className="text-inksoft text-[13px] mb-3.5 max-w-[640px]">
        Every listing&apos;s research/source record — this is the transparency trail behind the &quot;Researched&quot;
        badge shown to visitors.
      </p>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-[13px]">
          <thead>
            <tr>
              {['Website', 'Source', 'Domain'].map((h) => (
                <th key={h} className="text-left text-[11px] uppercase tracking-wide text-inksoft px-3 py-2.5 border-b border-line/20">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {websites.map((w) => (
              <tr key={w.slug} className="hover:bg-paper2">
                <td className="px-3 py-2.5 border-b border-line/20 font-semibold">{w.name}</td>
                <td className="px-3 py-2.5 border-b border-line/20 max-w-[320px]">{w.source.name}</td>
                <td className="px-3 py-2.5 border-b border-line/20 font-mono text-[11.5px]">{new URL(w.url).hostname}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
