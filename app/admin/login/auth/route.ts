import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    return NextResponse.json({ ok: false, message: 'Admin login is not configured yet.' }, { status: 500 });
  }

  let response = NextResponse.json({ ok: true, message: 'Signed in.' });
  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error || !data.user) {
    return NextResponse.json({ ok: false, message: error?.message || 'Login failed.' }, { status: 401 });
  }

  const { data: adminRole } = await supabase
    .from('admin_roles')
    .select('user_id')
    .eq('user_id', data.user.id)
    .maybeSingle();

  if (!adminRole) {
    await supabase.auth.signOut();
    response = NextResponse.json({ ok: false, message: 'Only approved admins can sign in.' }, { status: 403 });
  }

  return response;
}
