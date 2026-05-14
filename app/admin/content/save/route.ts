import { NextResponse } from 'next/server';
import { createWisdomPostFromForm } from '@/lib/cms/save-wisdom-post';

function bearerToken(request: Request) {
  const header = request.headers.get('authorization');
  return header?.startsWith('Bearer ') ? header.slice(7) : undefined;
}

export async function POST(request: Request) {
  const result = await createWisdomPostFromForm(await request.formData(), bearerToken(request));
  return NextResponse.json(result, { status: result.ok ? 200 : 400 });
}
