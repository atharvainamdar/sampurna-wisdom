'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { parseResourceLines } from '@/lib/cms/resources';
import { createSupabaseBrowserClient } from '@/lib/supabase/browser';
import { LANGUAGES, PILLARS, type Language, type PillarSlug } from '@/lib/content';

type SaveWisdomState = { ok: boolean; message: string };

const initialState: SaveWisdomState = { ok: false, message: '' };
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

export function WisdomPostForm() {
  const router = useRouter();
  const [state, setState] = useState(initialState);
  const [pending, setPending] = useState(false);
  const today = new Date().toISOString().slice(0, 10);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setState(initialState);

    try {
      const form = event.currentTarget;
      const formData = new FormData(form);
      const supabase = createSupabaseBrowserClient();
      const { data: userData, error: userError } = await supabase.auth.getUser();
      const user = userData.user;

      if (userError || !user) throw new Error('Please sign in again before saving content.');

      const { data: adminRole } = await supabase
        .from('admin_roles')
        .select('user_id')
        .eq('user_id', user.id)
        .maybeSingle();

      if (!adminRole) throw new Error('Only approved admins can save content.');

      const contentDate = requireValue(text(formData, 'content_date'), 'Content date');
      const titleEn = requireValue(text(formData, 'title_en'), 'English title');
      const requestedSlug = text(formData, 'slug') || `${contentDate}-${titleEn}`;
      const slug = requireValue(slugify(requestedSlug), 'Slug');
      const pillar = text(formData, 'pillar') as PillarSlug;
      const status = text(formData, 'status') === 'published' ? 'published' : 'draft';

      if (!pillars.includes(pillar)) throw new Error('Please choose a valid pillar.');

      const now = new Date().toISOString();
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
          created_by: user.id,
          updated_by: user.id,
        })
        .select('id')
        .single();

      if (postError) throw new Error(postError.message);

      const translations = (LANGUAGES as Array<{ code: Language }>)
        .map(({ code }) => ({
          post_id: post.id,
          language: code,
          title: text(formData, `title_${code}`),
          excerpt: text(formData, `excerpt_${code}`),
          body: text(formData, `body_${code}`),
          reflection_prompt: text(formData, `reflection_${code}`),
          video_url: text(formData, `video_${code}`) || null,
          audio_url: text(formData, `audio_${code}`) || null,
          resources: parseResourceLines(formData.get(`resources_${code}`)),
        }))
        .filter((translation) => translation.title || translation.body || translation.video_url || translation.audio_url || translation.resources.length);

      if (!translations.length) throw new Error('Add at least one language version.');

      const { error: translationError } = await supabase.from('wisdom_translations').insert(translations);
      if (translationError) throw new Error(translationError.message);

      form.reset();
      setState({ ok: true, message: 'Saved. The list is refreshing now.' });
      router.refresh();
    } catch (error) {
      setState({ ok: false, message: error instanceof Error ? error.message : 'Could not save wisdom post.' });
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="admin-panel main-editor wisdom-form">
      <div className="editor-header-row">
        <div>
          <h2>Create daily wisdom</h2>
          <p>Save one date with separate English, Hindi, and Marathi content.</p>
        </div>
        <button type="submit" disabled={pending}>{pending ? 'Saving...' : 'Save wisdom'}</button>
      </div>

      {state.message ? <p className={state.ok ? 'save-message ok' : 'save-message'}>{state.message}</p> : null}

      <div className="field-grid">
        <label>Date <input name="content_date" type="date" defaultValue={today} required /></label>
        <label>Pillar
          <select name="pillar" defaultValue="sampatti">
            {PILLARS.map((pillar) => <option value={pillar.slug} key={pillar.slug}>{pillar.name.en} — {pillar.english}</option>)}
          </select>
        </label>
        <label>Status
          <select name="status" defaultValue="draft">
            <option value="draft">Draft — keep private</option>
            <option value="published">Publish — visible publicly</option>
          </select>
        </label>
        <label className="wide">Optional URL slug <input name="slug" placeholder="auto-created from date and English title" /></label>
        <label className="wide">Tags <input name="tags" placeholder="wealth, discipline, family" /></label>
        <label className="check-label"><input name="featured" type="checkbox" /> Feature on homepage later</label>
      </div>

      <div className="language-editor-grid connected-grid">
        {LANGUAGES.map((language) => (
          <article className="language-editor" key={language.code}>
            <strong>{language.code.toUpperCase()}</strong>
            <span>{language.native}</span>
            <input name={`title_${language.code}`} placeholder="Title" required={language.code === 'en'} />
            <textarea name={`excerpt_${language.code}`} placeholder="Short summary for library cards" />
            <textarea name={`body_${language.code}`} placeholder="Full blog / daily message" />
            <textarea name={`reflection_${language.code}`} placeholder="Reflection question or action step" />
            <input name={`video_${language.code}`} placeholder="YouTube video URL for this language" />
            <input name={`audio_${language.code}`} placeholder="Audio URL for this language" />
            <textarea name={`resources_${language.code}`} placeholder={'Resources, one per line\nLabel | https://example.com/file.pdf'} />
          </article>
        ))}
      </div>
    </form>
  );
}
