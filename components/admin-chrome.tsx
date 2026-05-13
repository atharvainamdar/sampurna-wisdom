import { AdminGateCard } from '@/components/admin/admin-gate-card';
import { AdminFrame } from '@/components/admin/admin-frame';
import { getAdminGate } from '@/lib/cms/auth';

export async function AdminChrome({ title, eyebrow, children }: { title: string; eyebrow: string; children: React.ReactNode }) {
  const gate = await getAdminGate();

  if (gate.status !== 'admin') return <AdminGateCard gate={gate} />;

  return <AdminFrame title={title} eyebrow={eyebrow} email={gate.email}>{children}</AdminFrame>;
}
