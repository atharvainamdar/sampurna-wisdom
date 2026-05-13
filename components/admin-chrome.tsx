import Link from 'next/link';
import { adminNav } from '@/lib/cms/admin-nav';
import { BRAND } from '@/lib/content';

export function AdminChrome({ title, eyebrow, children }: { title: string; eyebrow: string; children: React.ReactNode }) {
  return (
    <main className="admin-shell">
      <section className="admin-hero compact-admin-hero">
        <Link href="/" className="admin-back">← Public site</Link>
        <span className="section-kicker">{eyebrow}</span>
        <h1>{title}</h1>
        <p>Prototype workspace for {BRAND.founder}. Final version will be protected by admin login.</p>
        <nav className="admin-tabs" aria-label="Admin sections">
          {adminNav.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}
        </nav>
      </section>
      {children}
    </main>
  );
}
