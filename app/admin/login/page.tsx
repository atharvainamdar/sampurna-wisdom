import Link from 'next/link';
import { LoginForm } from '@/components/admin/login-form';

type AdminLoginPageProps = {
  searchParams?: Promise<{ message?: string }>;
};

export default async function AdminLoginPage({ searchParams }: AdminLoginPageProps) {
  const params = await searchParams;

  return (
    <main className="admin-shell login-shell">
      <section className="admin-hero compact-admin-hero login-hero">
        <Link href="/" className="admin-back">← Public site</Link>
        <span className="section-kicker">Private CMS</span>
        <h1>Admin login</h1>
        <p>Only approved Sampurna Wisdom admins can create, edit, schedule, and publish daily content.</p>
        <LoginForm message={params?.message} />
      </section>
    </main>
  );
}
