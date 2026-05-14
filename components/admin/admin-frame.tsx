import Link from 'next/link';
import { adminNav } from '@/lib/cms/admin-nav';
import { BRAND } from '@/lib/content';

export function AdminFrame({ title, eyebrow, email, children }: { title: string; eyebrow: React.ReactNode; email?: string; children: React.ReactNode }) {
  return (
    <main className="admin-shell admin-workspace">
      <header className="admin-topbar">
        <Link href="/" className="admin-brand-lockup" aria-label="Back to public website">
          <span>{BRAND.siteNameDevanagari.slice(0, 1)}</span>
          <div>
            <strong>{BRAND.siteName}</strong>
            <small>Admin workspace</small>
          </div>
        </Link>

        <nav className="admin-primary-nav" aria-label="Admin sections">
          {adminNav.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}
        </nav>

        <div className="admin-account-area">
          <div className="admin-user-chip">
            <span>Signed in</span>
            <strong>{email ?? 'Admin'}</strong>
          </div>
          <Link className="admin-signout" href="/admin/logout">Sign out</Link>
        </div>
      </header>

      <section className="admin-hero compact-admin-hero admin-page-heading">
        <Link href="/" className="admin-back">← Public site</Link>
        <span className="section-kicker">{eyebrow}</span>
        <h1>{title}</h1>
        <p>Simple daily content management for {BRAND.siteName}: write, save drafts, publish, and review recent wisdom posts.</p>
      </section>

      {children}
    </main>
  );
}
