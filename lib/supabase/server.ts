import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';

export const ADMIN_TOKEN_COOKIE = 'sw-admin-token';
export const ADMIN_CLIENT_TOKEN_COOKIE = 'sw-admin-token-client';

export function hasSupabaseEnv() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

export async function getAdminAccessToken() {
  const cookieStore = await cookies();
  return cookieStore.get(ADMIN_TOKEN_COOKIE)?.value || cookieStore.get(ADMIN_CLIENT_TOKEN_COOKIE)?.value;
}

export async function createSupabaseServerClient(accessToken?: string) {
  const cookieStore = await cookies();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const adminToken = accessToken || cookieStore.get(ADMIN_TOKEN_COOKIE)?.value || cookieStore.get(ADMIN_CLIENT_TOKEN_COOKIE)?.value;

  if (!url || !anonKey) {
    throw new Error('Supabase server client needs NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.');
  }

  return createServerClient(url, anonKey, {
    global: adminToken ? { headers: { Authorization: `Bearer ${adminToken}` } } : undefined,
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, { ...options, partitioned: true, path: '/', secure: true, sameSite: 'none' }));
        } catch {
          // Server Components cannot set cookies. Auth routes/server actions can.
        }
      },
    },
  });
}
