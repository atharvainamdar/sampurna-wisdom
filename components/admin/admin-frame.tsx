import Link from 'next/link';
import { adminNav } from '@/lib/cms/admin-nav';
import { BRAND } from '@/lib/content';

export function AdminFrame({ title, eyebrow, email, children }: { title: string; eyebrow: string; email?: string; children: React.ReactNode }) {
  return (
    <main className="admin-shell">
      <section className="admin-hero compact-admin-hero">
        <Link href="/" className="admin-back">← Public site</Link>
        <span className="section-kicker">{eyebrow}</span>
        <h1>{title}</h1>
        <p>Protected workspace for {BRAND.founder}. Signed in as {email ?? 'admin'}.</p>
        <nav className="admin-tabs" aria-label="Admin sections">
          {adminNav.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}
        </nav>
        <Link className="admin-signout" href="/admin/logout">Sign out</Link>
      </section>
      {children}
    </main>
  );
}
