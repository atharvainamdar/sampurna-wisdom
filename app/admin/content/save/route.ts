import { NextResponse } from 'next/server';
import { createWisdomPostFromForm } from '@/lib/cms/save-wisdom-post';

export async function POST(request: Request) {
  const result = await createWisdomPostFromForm(await request.formData());
  return NextResponse.json(result, { status: result.ok ? 200 : 400 });
}
