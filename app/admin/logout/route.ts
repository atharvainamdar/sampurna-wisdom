import { NextResponse } from 'next/server';
import { ADMIN_CLIENT_TOKEN_COOKIE, ADMIN_TOKEN_COOKIE, createSupabaseServerClient, hasSupabaseEnv } from '@/lib/supabase/server';

export async function GET(request: Request) {
  if (hasSupabaseEnv()) {
    const supabase = await createSupabaseServerClient();
    await supabase.auth.signOut();
  }

  const destination = new URL('/admin/login', request.url).toString();
  const response = new NextResponse(`<!doctype html>
<html><head><meta charset="utf-8"><meta name="robots" content="noindex"><title>Signing out…</title></head>
<body><p>Signing you out…</p><script>
try { localStorage.removeItem('sw-admin-token'); sessionStorage.removeItem('sw-admin-restored'); } catch (error) {}
document.cookie = '${ADMIN_CLIENT_TOKEN_COOKIE}=; Max-Age=0; Path=/; SameSite=Lax; Secure';
window.location.replace(${JSON.stringify(destination)});
</script><noscript><a href="${destination}">Return to login</a></noscript></body></html>`, {
    headers: {
      'cache-control': 'no-store',
      'content-type': 'text/html; charset=utf-8',
    },
  });
  response.cookies.delete(ADMIN_TOKEN_COOKIE);
  response.cookies.delete(ADMIN_CLIENT_TOKEN_COOKIE);
  return response;
}
