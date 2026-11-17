import type { ReactNode } from 'react';

export default function EmptyState({
  icon = '🔎',
  title,
  description,
  action,
}: {
  icon?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="text-center py-16 px-5 text-inksoft">
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="text-ink font-display text-lg mb-1">{title}</h3>
      {description && <p className="max-w-md mx-auto">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
