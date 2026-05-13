'use server';

import { createWisdomPostFromForm, type SaveWisdomState } from '@/lib/cms/save-wisdom-post';

export type { SaveWisdomState };

export async function createWisdomPost(_previousState: SaveWisdomState, formData: FormData): Promise<SaveWisdomState> {
  return createWisdomPostFromForm(formData);
}
