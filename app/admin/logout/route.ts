import { NextResponse } from 'next/server';
import { ADMIN_TOKEN_COOKIE, createSupabaseServerClient, hasSupabaseEnv } from '@/lib/supabase/server';

export async function GET(request: Request) {
  if (hasSupabaseEnv()) {
    const supabase = await createSupabaseServerClient();
    await supabase.auth.signOut();
  }

  const response = NextResponse.redirect(new URL('/admin/login', request.url));
  response.cookies.delete(ADMIN_TOKEN_COOKIE);
  return response;
}
