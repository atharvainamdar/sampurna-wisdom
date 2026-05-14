import { NextRequest, NextResponse } from 'next/server';
import { getAdminGate } from '@/lib/cms/auth';
import { ADMIN_CLIENT_TOKEN_COOKIE, ADMIN_TOKEN_COOKIE } from '@/lib/supabase/server';

function tokenMaxAge(token: string) {
  try {
    const [, payload] = token.split('.');
    const decoded = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as { exp?: number };
    if (!decoded.exp) return 60 * 60;
    return Math.max(60, Math.min(decoded.exp - Math.floor(Date.now() / 1000), 60 * 60 * 24 * 7));
  } catch {
    return 60 * 60;
  }
}

async function requestToken(request: NextRequest) {
  const auth = request.headers.get('authorization');
  if (auth?.toLowerCase().startsWith('bearer ')) return auth.slice(7).trim();

  const formData = await request.formData().catch(() => null);
  const token = formData?.get('admin_token');
  return typeof token === 'string' ? token.trim() : '';
}

export async function POST(request: NextRequest) {
  const token = await requestToken(request);
  if (!token) return NextResponse.json({ ok: false, message: 'Please sign in again.' }, { status: 401 });

  const gate = await getAdminGate(token);
  if (gate.status !== 'admin') return NextResponse.json({ ok: false, message: 'Please sign in again.' }, { status: 401 });

  const maxAge = tokenMaxAge(token);
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_TOKEN_COOKIE, token, {
    httpOnly: true,
    maxAge,
    path: '/',
    sameSite: 'lax',
    secure: true,
  });
  response.cookies.set(ADMIN_CLIENT_TOKEN_COOKIE, token, {
    maxAge,
    path: '/',
    sameSite: 'lax',
    secure: true,
  });

  return response;
}
