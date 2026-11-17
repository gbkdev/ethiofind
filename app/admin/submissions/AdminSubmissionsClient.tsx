'use client';

import { useEffect, useState } from 'react';
import type { Category, Submission } from '@/types';
import { getSubmissions, updateSubmissionStatus } from '@/lib/store/submissions';
import { toast } from '@/components/Toaster';

export default function AdminSubmissionsClient({ categories }: { categories: Category[] }) {
  const [submissions, setSubmissions] = useState<Submission[]>([]);

  useEffect(() => {
    setSubmissions(getSubmissions());
  }, []);

  function catName(slug: string) {
    return categories.find((c) => c.slug === slug)?.name || slug;
  }

  function act(id: string, status: Submission['status']) {
    const next = updateSubmissionStatus(id, status);
    setSubmissions(next);
    toast(`Submission ${status}`);
  }

  if (!submissions.length) {
    return <p className="text-inksoft text-sm">No submissions in the queue yet.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-[13px]">
        <thead>
          <tr>
            {['Website', 'URL', 'Category', 'Submitted', 'Status', 'Actions'].map((h) => (
              <th key={h} className="text-left text-[11px] uppercase tracking-wide text-inksoft px-3 py-2.5 border-b border-line/20">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {submissions.map((s) => (
            <tr key={s.id} className="hover:bg-paper2">
              <td className="px-3 py-2.5 border-b border-line/20 font-semibold">{s.name}</td>
              <td className="px-3 py-2.5 border-b border-line/20 font-mono text-[11.5px]">{s.url}</td>
              <td className="px-3 py-2.5 border-b border-line/20">{catName(s.category)}</td>
              <td className="px-3 py-2.5 border-b border-line/20 font-mono text-[11.5px]">{s.createdAt}</td>
              <td className="px-3 py-2.5 border-b border-line/20">{s.status}</td>
              <td className="px-3 py-2.5 border-b border-line/20">
                {s.status === 'pending' ? (
                  <div className="flex gap-1">
                    <button onClick={() => act(s.id, 'approved')} className="text-[12px] px-2.5 py-1.5 rounded-md border border-indigo text-indigo">
                      Approve
                    </button>
                    <button onClick={() => act(s.id, 'rejected')} className="text-[12px] px-2.5 py-1.5 rounded-md border border-rust text-rust">
                      Reject
                    </button>
                  </div>
                ) : (
                  '—'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
