import type { Metadata } from 'next';
import AdminNav from '@/components/admin/AdminNav';

export const metadata: Metadata = { title: { default: 'Admin', template: '%s · Admin · EthioFind' } };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="py-10">
      <div className="max-w-[1180px] mx-auto px-5">
        <h1 className="font-display font-semibold text-2xl mb-6">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6 items-start">
          <AdminNav />
          <div>{children}</div>
        </div>
      </div>
    </section>
  );
}
