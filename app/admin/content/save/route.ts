import { NextResponse } from 'next/server';
import { createWisdomPostFromForm } from '@/lib/cms/save-wisdom-post';

function bearerToken(request: Request) {
  const header = request.headers.get('authorization');
  return header?.startsWith('Bearer ') ? header.slice(7) : undefined;
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const formToken = formData.get('admin_token');
  const result = await createWisdomPostFromForm(formData, bearerToken(request) || (typeof formToken === 'string' ? formToken : undefined));
  return NextResponse.json(result, { status: result.ok ? 200 : 400 });
}
