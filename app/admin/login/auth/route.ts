import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';

function loginRedirect(request: NextRequest, message?: string) {
  const url = request.nextUrl.clone();
  url.pathname = '/admin/login';
  if (message) url.searchParams.set('message', message);
  else url.searchParams.delete('message');
  return NextResponse.redirect(url, { status: 303 });
}

export async function POST(request: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) return loginRedirect(request, 'Admin login is not configured yet.');

  const formData = await request.formData();
  const email = String(formData.get('email') || '').trim();
  const password = String(formData.get('password') || '');

  let response = NextResponse.redirect(new URL('/admin/content', request.url), { status: 303 });
  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, { ...options, path: '/', secure: true, sameSite: 'lax' }));
      },
    },
  });

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error || !data.user) return loginRedirect(request, error?.message || 'Login failed.');

  const { data: adminRole } = await supabase
    .from('admin_roles')
    .select('user_id')
    .eq('user_id', data.user.id)
    .maybeSingle();

  if (!adminRole) {
    await supabase.auth.signOut();
    response = loginRedirect(request, 'Only approved admins can sign in.');
  }

  return response;
}
