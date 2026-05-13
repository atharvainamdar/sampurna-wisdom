import { AdminChrome } from '@/components/admin-chrome';
import { PILLARS } from '@/lib/content';

const languages = [
  { code: 'EN', label: 'English' },
  { code: 'HI', label: 'हिन्दी' },
  { code: 'MR', label: 'मराठी' },
];

export default function AdminContentPage() {
  return (
    <AdminChrome title="Daily wisdom editor" eyebrow="Create / edit content">
      <section className="admin-board single-board">
        <div className="admin-panel main-editor">
          <h2>One post, three complete language versions</h2>
          <div className="language-editor-grid">
            {languages.map((language) => (
              <article className="language-editor" key={language.code}>
                <strong>{language.code}</strong>
                <span>{language.label}</span>
                <input placeholder="Title" />
                <textarea placeholder="Blog / message" />
                <input placeholder="YouTube video URL for this language" />
                <input placeholder="Audio file for this language" />
                <input placeholder="PPT/PDF resources for this language" />
              </article>
            ))}
          </div>
          <div className="tiny-pillars editor-pillars">
            {PILLARS.map((pillar) => <span key={pillar.slug} style={{ '--tone': pillar.tone } as React.CSSProperties}>{pillar.name.en}</span>)}
          </div>
        </div>
      </section>
    </AdminChrome>
  );
}
