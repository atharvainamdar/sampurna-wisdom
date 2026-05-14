import { createSupabaseServerClient, getAdminAccessToken, hasSupabaseEnv } from '@/lib/supabase/server';

export type AdminGate =
  | { status: 'missing-env' }
  | { status: 'signed-out' }
  | { status: 'not-admin'; email?: string }
  | { status: 'admin'; email?: string; userId: string };

export async function getAdminGate(token?: string): Promise<AdminGate> {
  if (!hasSupabaseEnv()) return { status: 'missing-env' };

  const adminToken = token || await getAdminAccessToken();
  const supabase = await createSupabaseServerClient(adminToken);
  const { data: userData } = adminToken ? await supabase.auth.getUser(adminToken) : await supabase.auth.getUser();
  const user = userData.user;

  if (!user) return { status: 'signed-out' };

  const { data: adminRole } = await supabase
    .from('admin_roles')
    .select('user_id')
    .eq('user_id', user.id)
    .maybeSingle();

  if (!adminRole) return { status: 'not-admin', email: user.email ?? undefined };

  return { status: 'admin', email: user.email ?? undefined, userId: user.id };
}
