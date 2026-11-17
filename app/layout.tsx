import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Toaster from '@/components/Toaster';

// NOTE: this build environment has no network access to fonts.googleapis.com,
// so next/font/google (which fetches font files at build time) is swapped
// for plain CSS font stacks in globals.css. In a normal deployment with
// internet access, swap the `font-display` / `font-sans` / `font-mono`
// Tailwind families back to next/font/google (Fraunces / Inter / JetBrains
// Mono) for self-hosted, layout-shift-free web fonts — the class names in
// every component already assume those three families.

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: { default: 'EthioFind — Discover Ethiopia Online', template: '%s · EthioFind' },
  description:
    'A searchable, source-transparent directory of Ethiopian websites — banks, universities, government services, jobs, hospitals and more.',
  openGraph: {
    title: 'EthioFind — Discover Ethiopia Online',
    description: 'Find trusted Ethiopian websites, services, organizations and digital resources — all in one place.',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
