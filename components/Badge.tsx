import { cx } from '@/lib/utils';
import type { VerificationStatus } from '@/types';

const STYLES: Record<VerificationStatus, { label: string; className: string }> = {
  researched: { label: 'Researched', className: 'bg-indigo/10 text-indigo' },
  community_submitted: { label: 'Community', className: 'bg-inksoft/10 text-inksoft' },
  needs_review: { label: 'Needs Review', className: 'bg-rust/10 text-rust' },
  broken: { label: '⚠ Broken', className: 'bg-rust/10 text-rust' },
};

export default function Badge({ status }: { status: VerificationStatus }) {
  const s = STYLES[status] ?? STYLES.community_submitted;
  return (
    <span className={cx('text-[10.5px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap tracking-wide', s.className)}>
      {s.label}
    </span>
  );
}
