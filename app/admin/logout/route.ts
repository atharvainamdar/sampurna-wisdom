import { redirect } from 'next/navigation';
import { createSupabaseServerClient, hasSupabaseEnv } from '@/lib/supabase/server';

export async function GET() {
  if (hasSupabaseEnv()) {
    const supabase = await createSupabaseServerClient();
    await supabase.auth.signOut();
  }

  redirect('/admin/login');
}
