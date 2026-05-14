'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CalendarDays, Link2, Save } from 'lucide-react';
import { LANGUAGES, PILLARS, type Language } from '@/lib/content';

type SaveWisdomState = { ok: boolean; message: string };

const initialState: SaveWisdomState = { ok: false, message: '' };

const languageHelp: Record<Language, { note: string; body: string }> = {
  en: { note: 'Required first. This creates the main title and URL.', body: 'Write the full English blog / daily message.' },
  hi: { note: 'Optional now. Add when Hindi content is ready.', body: 'हिन्दी ब्लॉग / दैनिक संदेश लिखें।' },
  mr: { note: 'Optional now. Add when Marathi content is ready.', body: 'मराठी ब्लॉग / दैनिक संदेश लिहा.' },
};

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
      const token = localStorage.getItem('sw-admin-token');
      if (token) formData.set('admin_token', token);
      const response = await fetch('/admin/content/save', {
        method: 'POST',
        body: formData,
        credentials: 'same-origin',
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      const result = (await response.json()) as SaveWisdomState;

      if (!response.ok || !result.ok) throw new Error(result.message || 'Could not save wisdom post.');

      form.reset();
      setState(result);
      router.refresh();
    } catch (error) {
      setState({ ok: false, message: error instanceof Error ? error.message : 'Could not save wisdom post.' });
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="admin-panel main-editor wisdom-form redesigned-wisdom-form">
      <div className="editor-header-row admin-form-header">
        <div>
          <span className="section-kicker"><Save size={15} /> Main tool</span>
          <h2>Create daily wisdom</h2>
          <p>One clean form: date, pillar, language content, media links, then save.</p>
        </div>
        <button className="admin-save-button" type="submit" disabled={pending}>{pending ? 'Saving...' : 'Save wisdom'}</button>
      </div>

      {state.message ? <p className={state.ok ? 'save-message ok' : 'save-message'}>{state.message}</p> : null}

      <div className="admin-form-steps" aria-label="Content creation steps">
        <span><b>1</b> Date and pillar</span>
        <span><b>2</b> Write content</span>
        <span><b>3</b> Add media links</span>
        <span><b>4</b> Save draft / publish</span>
      </div>

      <section className="admin-step-card">
        <div className="admin-step-heading">
          <b>1</b>
          <div>
            <h3>Choose where this wisdom belongs</h3>
            <p>Start with the date. Each date can have one daily wisdom entry.</p>
          </div>
        </div>
        <div className="field-grid admin-basics-grid">
          <label><CalendarDays size={16} /> Date <input name="content_date" type="date" defaultValue={today} required /></label>
          <label>Pillar
            <select name="pillar" defaultValue="sampatti">
              {PILLARS.map((pillar) => <option value={pillar.slug} key={pillar.slug}>{pillar.name.en} — {pillar.english}</option>)}
            </select>
          </label>
          <label>Status
            <select name="status" defaultValue="draft">
              <option value="draft">Draft — private</option>
              <option value="published">Publish — visible publicly</option>
            </select>
          </label>
        </div>
        <details className="advanced-fields">
          <summary>Advanced options: slug, tags, homepage feature</summary>
          <div className="field-grid admin-basics-grid">
            <label className="wide">Optional URL slug <input name="slug" placeholder="auto-created from date and English title" /></label>
            <label className="wide">Tags <input name="tags" placeholder="wealth, discipline, family" /></label>
            <label className="check-label"><input name="featured" type="checkbox" /> <span>Feature on homepage later</span></label>
          </div>
        </details>
      </section>

      <section className="admin-step-card">
        <div className="admin-step-heading">
          <b>2</b>
          <div>
            <h3>Write in three languages</h3>
            <p>English title is required. Hindi and Marathi can be filled now or later.</p>
          </div>
        </div>
        <div className="language-editor-grid connected-grid">
          {LANGUAGES.map((language) => (
            <article className="language-editor" key={language.code}>
              <div className="language-editor-heading">
                <div>
                  <strong>{language.label}</strong>
                  <span>{language.native}</span>
                </div>
                <em>{language.code === 'en' ? 'Required' : 'Optional'}</em>
              </div>
              <p>{languageHelp[language.code].note}</p>
              <label>Title <input name={`title_${language.code}`} placeholder={`${language.label} title`} required={language.code === 'en'} /></label>
              <label>Short summary <textarea name={`excerpt_${language.code}`} placeholder="Short summary for library cards" /></label>
              <label>Main message <textarea name={`body_${language.code}`} placeholder={languageHelp[language.code].body} /></label>
              <label>Reflection / action step <textarea name={`reflection_${language.code}`} placeholder="One question or one action for the reader" /></label>
              <details className="language-media-fields">
                <summary><Link2 size={16} /> Add video, audio, PDF/resources</summary>
                <label>YouTube video URL <input name={`video_${language.code}`} placeholder="https://youtube.com/..." /></label>
                <label>Audio URL <input name={`audio_${language.code}`} placeholder="https://.../audio.mp3" /></label>
                <label>Resources <textarea name={`resources_${language.code}`} placeholder={'One per line\nLabel | https://example.com/file.pdf'} /></label>
              </details>
            </article>
          ))}
        </div>
      </section>
    </form>
  );
}
