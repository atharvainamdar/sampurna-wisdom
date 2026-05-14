import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { ADMIN_CLIENT_TOKEN_COOKIE, ADMIN_TOKEN_COOKIE } from '@/lib/supabase/server';

function loginRedirect(request: NextRequest, message?: string) {
  const url = request.nextUrl.clone();
  url.pathname = '/admin/login';
  if (message) url.searchParams.set('message', message);
  else url.searchParams.delete('message');
  return NextResponse.redirect(url, { status: 303 });
}

function safeJson(value: string) {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}

function loginCompleteResponse(request: NextRequest, token: string, maxAge: number) {
  const destination = new URL('/admin/content', request.url).toString();
  return new NextResponse(`<!doctype html>
<html><head><meta charset="utf-8"><meta name="robots" content="noindex"><title>Signing in…</title></head>
<body><p>Signing you in…</p><script>
const token = ${safeJson(token)};
const maxAge = ${Math.max(0, maxAge)};
try {
  localStorage.setItem('sw-admin-token', token);
  document.cookie = '${ADMIN_CLIENT_TOKEN_COOKIE}=' + token + '; Max-Age=' + maxAge + '; Path=/; SameSite=Lax; Secure';
} catch (error) {}
window.location.replace(${safeJson(destination)});
</script><noscript><a href="${destination}">Continue to admin</a></noscript></body></html>`, {
    headers: {
      'cache-control': 'no-store',
      'content-type': 'text/html; charset=utf-8',
    },
  });
}

export async function POST(request: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) return loginRedirect(request, 'Admin login is not configured yet.');

  const formData = await request.formData();
  const email = String(formData.get('email') || '').trim();
  const password = String(formData.get('password') || '');

  const response = NextResponse.next();
  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, { ...options, partitioned: true, path: '/', secure: true, sameSite: 'none' }));
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
    return loginRedirect(request, 'Only approved admins can sign in.');
  }

  if (!data.session?.access_token) return loginRedirect(request, 'Login failed.');

  const completeResponse = loginCompleteResponse(request, data.session.access_token, data.session.expires_in);
  response.cookies.getAll().forEach((cookie) => completeResponse.cookies.set(cookie));
  completeResponse.cookies.set(ADMIN_TOKEN_COOKIE, data.session.access_token, {
    httpOnly: true,
    maxAge: data.session.expires_in,
    partitioned: true,
    path: '/',
    sameSite: 'none',
    secure: true,
  });
  completeResponse.cookies.set(ADMIN_CLIENT_TOKEN_COOKIE, data.session.access_token, {
    maxAge: data.session.expires_in,
    path: '/',
    sameSite: 'lax',
    secure: true,
  });

  return completeResponse;
}
