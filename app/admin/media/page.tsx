import Link from 'next/link';
import { FileAudio, FileText, ImageIcon, Video } from 'lucide-react';
import { AdminChrome } from '@/components/admin-chrome';

const cards = [
  { icon: Video, title: 'YouTube video', text: 'Paste one video URL per language inside the Create Wisdom form.' },
  { icon: FileAudio, title: 'Audio link', text: 'Add MP3/audio links per language in the same content form.' },
  { icon: FileText, title: 'PDF / PPT resources', text: 'Use the Resources box: Label | https://example.com/file.pdf' },
  { icon: ImageIcon, title: 'Thumbnails', text: 'Public video thumbnails come from YouTube automatically for now.' },
];

export default function AdminMediaPage() {
  return (
    <AdminChrome title="Media links" eyebrow="Video • Audio • PDF">
      <section className="admin-board single-board">
        <div className="admin-command-card">
          <div>
            <span className="section-kicker">Simple media system</span>
            <h2>Add media while creating wisdom.</h2>
            <p>No separate confusing upload panel. Paste video, audio, and PDF links in the post form for English, Hindi, and Marathi.</p>
          </div>
          <Link className="primary-action" href="/admin/content">Open content form</Link>
        </div>
        <div className="admin-action-grid">
          {cards.map((card) => {
            const Icon = card.icon;
            return <article className="admin-action-card" key={card.title}><span><Icon size={24} /></span><h3>{card.title}</h3><p>{card.text}</p></article>;
          })}
        </div>
      </section>
    </AdminChrome>
  );
}
