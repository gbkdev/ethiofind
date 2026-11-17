import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-line/20 mt-16 pt-11 pb-8">
      <div className="max-w-[1180px] mx-auto px-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 font-display font-semibold text-lg mb-2.5">
              <span className="h-2.5 w-2.5 rounded-sm bg-ochre rotate-45 inline-block" />
              EthioFind
            </div>
            <p className="text-inksoft text-[13.5px] max-w-[280px] leading-relaxed">
              Discover Ethiopia Online. A searchable directory of Ethiopian websites, businesses, organizations and
              digital resources.
            </p>
          </div>
          <div>
            <h5 className="text-[12px] uppercase tracking-wide text-inksoft mb-3">Platform</h5>
            <FooterLink href="/about">About</FooterLink>
            <FooterLink href="/categories">Categories</FooterLink>
            <FooterLink href="/submit">Submit Website</FooterLink>
          </div>
          <div>
            <h5 className="text-[12px] uppercase tracking-wide text-inksoft mb-3">Legal</h5>
            <FooterLink href="/">Privacy</FooterLink>
            <FooterLink href="/">Terms</FooterLink>
            <FooterLink href="/">Report a Website</FooterLink>
          </div>
          <div>
            <h5 className="text-[12px] uppercase tracking-wide text-inksoft mb-3">Follow</h5>
            <FooterLink href="/">Twitter / X</FooterLink>
            <FooterLink href="/">Telegram</FooterLink>
            <FooterLink href="/">LinkedIn</FooterLink>
          </div>
        </div>
        <div className="flex justify-between mt-8 pt-5 border-t border-line/20 text-[12.5px] text-inksoft flex-wrap gap-2.5">
          <span>© 2026 EthioFind. Not affiliated with the Government of Ethiopia.</span>
          <span>Data layer: browser-persisted storage today — schema.sql is the real Postgres/RLS schema for Supabase.</span>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="block text-[13.5px] py-1 text-inksoft hover:text-indigo transition">
      {children}
    </Link>
  );
}
