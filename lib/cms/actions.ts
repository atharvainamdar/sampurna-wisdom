'use server';

import { revalidatePath } from 'next/cache';
import { getAdminGate } from '@/lib/cms/auth';
import { parseResourceLines } from '@/lib/cms/resources';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import type { Language, PillarSlug } from '@/lib/content';

export type SaveWisdomState = { ok: boolean; message: string };

const languages: Language[] = ['en', 'hi', 'mr'];
const pillars: PillarSlug[] = ['arogya', 'sampatti', 'sambandh', 'karya', 'adhyatma'];

function text(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === 'string' ? value.trim() : '';
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 90);
}

function requireValue(value: string, label: string) {
  if (!value) throw new Error(`${label} is required.`);
  return value;
}

export async function createWisdomPost(_previousState: SaveWisdomState, formData: FormData): Promise<SaveWisdomState> {
  try {
    const gate = await getAdminGate();
    if (gate.status !== 'admin') throw new Error('Only approved admins can save content.');

    const contentDate = requireValue(text(formData, 'content_date'), 'Content date');
    const titleEn = requireValue(text(formData, 'title_en'), 'English title');
    const requestedSlug = text(formData, 'slug') || `${contentDate}-${titleEn}`;
    const slug = requireValue(slugify(requestedSlug), 'Slug');
    const pillar = text(formData, 'pillar') as PillarSlug;
    const status = text(formData, 'status') === 'published' ? 'published' : 'draft';

    if (!pillars.includes(pillar)) throw new Error('Please choose a valid pillar.');

    const now = new Date().toISOString();
    const supabase = await createSupabaseServerClient();
    const { data: post, error: postError } = await supabase
      .from('wisdom_posts')
      .insert({
        slug,
        content_date: contentDate,
        pillar,
        status,
        published_at: status === 'published' ? now : null,
        tags: text(formData, 'tags').split(',').map((tag) => tag.trim()).filter(Boolean),
        featured: formData.get('featured') === 'on',
        created_by: gate.userId,
        updated_by: gate.userId,
      })
      .select('id')
      .single();

    if (postError) throw new Error(postError.message);

    const translations = languages
      .map((language) => ({
        post_id: post.id,
        language,
        title: text(formData, `title_${language}`),
        excerpt: text(formData, `excerpt_${language}`),
        body: text(formData, `body_${language}`),
        reflection_prompt: text(formData, `reflection_${language}`),
        video_url: text(formData, `video_${language}`) || null,
        audio_url: text(formData, `audio_${language}`) || null,
        resources: parseResourceLines(formData.get(`resources_${language}`)),
      }))
      .filter((translation) => translation.title || translation.body || translation.video_url || translation.audio_url || translation.resources.length);

    if (!translations.length) throw new Error('Add at least one language version.');

    const { error: translationError } = await supabase.from('wisdom_translations').insert(translations);
    if (translationError) throw new Error(translationError.message);

    revalidatePath('/admin/content');
    revalidatePath('/admin/calendar');
    revalidatePath('/library');

    return { ok: true, message: 'Saved. Refreshing the list now.' };
  } catch (error) {
    return { ok: false, message: error instanceof Error ? error.message : 'Could not save wisdom post.' };
  }
}
