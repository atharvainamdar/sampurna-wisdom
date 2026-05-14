import Link from 'next/link';
import { AdminSessionFallbackEditor } from '@/components/admin/admin-session-fallback-editor';
import type { AdminGate } from '@/lib/cms/auth';

export function AdminGateCard({ gate }: { gate: Exclude<AdminGate, { status: 'admin' }> }) {
  const copy = {
    'missing-env': {
      title: 'Supabase is ready, website env keys are pending',
      body: 'The database has been created. Next, add the Supabase URL and anon key to the website environment before admin login can work.',
      action: null,
    },
    'signed-out': {
      title: 'Admin login required',
      body: 'This workspace is private. Please sign in with an approved admin email to manage daily wisdom content.',
      action: { href: '/admin/login', label: 'Go to admin login' },
    },
    'not-admin': {
      title: 'You are signed in, but not approved as admin',
      body: 'Ask the project owner to add this account to the admin_roles table in Supabase.',
      action: { href: '/admin/logout', label: 'Sign out' },
    },
  }[gate.status];

  return (
    <main className="admin-shell">
      <section className="admin-hero compact-admin-hero">
        <Link href="/" className="admin-back">← Public site</Link>
        <span className="section-kicker">Protected admin area</span>
        <h1>{copy.title}</h1>
        <p>{copy.body}</p>
        {gate.status === 'not-admin' && gate.email ? <p className="admin-note">Signed in as {gate.email}</p> : null}
        {copy.action ? <Link className="primary-action" href={copy.action.href}>{copy.action.label}</Link> : null}
      </section>
      {gate.status === 'signed-out' ? <AdminSessionFallbackEditor /> : null}
    </main>
  );
}
