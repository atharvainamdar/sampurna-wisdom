'use client';

import { useActionState } from 'react';
import { createWisdomPost, type SaveWisdomState } from '@/lib/cms/actions';
import { LANGUAGES, PILLARS } from '@/lib/content';

const initialState: SaveWisdomState = { ok: false, message: '' };

export function WisdomPostForm() {
  const [state, formAction, pending] = useActionState(createWisdomPost, initialState);
  const today = new Date().toISOString().slice(0, 10);

  return (
    <form action={formAction} className="admin-panel main-editor wisdom-form">
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
