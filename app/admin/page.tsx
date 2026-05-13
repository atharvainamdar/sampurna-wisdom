import Link from 'next/link';
import { CalendarDays, FileAudio, FileText, ImageIcon, Languages, LayoutDashboard, UploadCloud, Video } from 'lucide-react';
import { BRAND, PILLARS } from '@/lib/content';

const workflow = [
  { label: 'Draft', detail: 'Write message in EN / HI / MR' },
  { label: 'Media', detail: 'Attach YouTube, audio, PPT, PDF' },
  { label: 'Preview', detail: 'Check mobile reading experience' },
  { label: 'Publish', detail: 'Schedule for 6:00 AM' },
];

export default function AdminPage() {
  return (
    <main className="admin-shell">
      <section className="admin-hero">
        <Link href="/" className="admin-back">← Public site</Link>
        <span className="section-kicker"><LayoutDashboard size={15} /> Admin concept</span>
        <h1>Daily wisdom CMS for {BRAND.founder}</h1>
        <p>
          This page is a prototype of the admin experience: one calm place to create, translate, upload, preview, and schedule free daily content.
        </p>
      </section>

      <section className="admin-board">
        <div className="admin-panel main-editor">
          <div className="panel-title">
            <CalendarDays size={18} />
            <span>14 May 2026</span>
          </div>
          <h2>Create tomorrow&apos;s wisdom</h2>
          <div className="field-grid">
            <label>Title English <input defaultValue="The discipline of one small promise" /></label>
            <label>शीर्षक हिन्दी <input defaultValue="एक छोटे वचन का अनुशासन" /></label>
            <label>शीर्षक मराठी <input defaultValue="एका छोट्या वचनाची शिस्त" /></label>
            <label className="wide">Daily message <textarea defaultValue="Write the wisdom message here. The editor will support clean formatting, reflection prompts, and language tabs." /></label>
          </div>
        </div>

        <div className="admin-panel media-manager">
          <div className="panel-title"><UploadCloud size={18} /><span>Media library</span></div>
          <div className="media-grid">
            <button><Video /> YouTube link</button>
            <button><FileAudio /> Audio / MP3</button>
            <button><FileText /> PPT / PDF</button>
            <button><ImageIcon /> Thumbnail</button>
          </div>
          <p>All uploads will go to private admin-managed storage with public read-only URLs only for published content.</p>
        </div>

        <div className="admin-panel publish-flow">
          <div className="panel-title"><Languages size={18} /><span>Publishing workflow</span></div>
          {workflow.map((item, index) => (
            <div className="flow-row" key={item.label}>
              <b>{index + 1}</b>
              <div><strong>{item.label}</strong><span>{item.detail}</span></div>
            </div>
          ))}
        </div>

        <div className="admin-panel pillars-picker">
          <div className="panel-title"><span>Five-pillar tagging</span></div>
          <div className="tiny-pillars">
            {PILLARS.map((pillar) => <span key={pillar.slug} style={{ '--tone': pillar.tone } as React.CSSProperties}>{pillar.name.en}</span>)}
          </div>
        </div>
      </section>
    </main>
  );
}
