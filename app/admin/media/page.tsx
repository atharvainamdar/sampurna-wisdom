import { AdminChrome } from '@/components/admin-chrome';
import { FileAudio, FileText, ImageIcon, Video } from 'lucide-react';

const cards = [
  { icon: Video, title: 'Language videos', text: 'Paste YouTube links separately for English, Hindi, and Marathi.' },
  { icon: FileAudio, title: 'Audio library', text: 'Upload pravachan/audio files per language for mobile listening.' },
  { icon: FileText, title: 'PPT / PDF', text: 'Attach downloadable study material and presentation decks.' },
  { icon: ImageIcon, title: 'Thumbnails', text: 'Manage visual covers for daily posts and library cards.' },
];

export default function AdminMediaPage() {
  return (
    <AdminChrome title="Media library" eyebrow="Upload once, reuse easily">
      <section className="admin-board single-board">
        <div className="media-grid expanded-media-grid">
          {cards.map((card) => {
            const Icon = card.icon;
            return <button key={card.title}><Icon /><strong>{card.title}</strong><span>{card.text}</span></button>;
          })}
        </div>
      </section>
    </AdminChrome>
  );
}
