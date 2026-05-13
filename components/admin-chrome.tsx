import Link from 'next/link';
import { adminNav } from '@/lib/cms/admin-nav';
import { getAdminGate } from '@/lib/cms/auth';
import { BRAND } from '@/lib/content';
import { AdminGateCard } from '@/components/admin/admin-gate-card';

export async function AdminChrome({ title, eyebrow, children }: { title: string; eyebrow: string; children: React.ReactNode }) {
  const gate = await getAdminGate();

  if (gate.status !== 'admin') return <AdminGateCard gate={gate} />;

  return (
    <main className="admin-shell">
      <section className="admin-hero compact-admin-hero">
        <Link href="/" className="admin-back">← Public site</Link>
        <span className="section-kicker">{eyebrow}</span>
        <h1>{title}</h1>
        <p>Protected workspace for {BRAND.founder}. Signed in as {gate.email ?? 'admin'}.</p>
        <nav className="admin-tabs" aria-label="Admin sections">
          {adminNav.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}
        </nav>
        <Link className="admin-signout" href="/admin/logout">Sign out</Link>
      </section>
      {children}
    </main>
  );
}
