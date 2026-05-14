import Link from 'next/link';
import { CalendarDays, FileText, ImageIcon, LayoutDashboard, ListChecks, PlusCircle, Settings, Video } from 'lucide-react';
import { AdminChrome } from '@/components/admin-chrome';
import { BRAND } from '@/lib/content';

const quickActions = [
  {
    href: '/admin/content',
    icon: PlusCircle,
    title: 'Create daily wisdom',
    text: 'Write English, Hindi, and Marathi content, add media links, then save as draft or publish.',
    cta: 'Start writing',
    featured: true,
  },
  {
    href: '/admin/content#saved-posts',
    icon: ListChecks,
    title: 'Saved posts',
    text: 'Check recent drafts and published wisdom posts in one clear list.',
    cta: 'View list',
  },
  {
    href: '/admin/calendar',
    icon: CalendarDays,
    title: 'Calendar',
    text: 'See which dates already have content and where new wisdom needs to be added.',
    cta: 'Open calendar',
  },
  {
    href: '/admin/media',
    icon: Video,
    title: 'Media links',
    text: 'Videos, audio, PDFs, and resources are attached directly while creating a wisdom post.',
    cta: 'See media guide',
  },
];

const dailyFlow = [
  'Choose the content date and pillar.',
  'Write the English title first; add Hindi and Marathi whenever ready.',
  'Paste YouTube, audio, PDF, or resource links inside the same form.',
  'Save as draft first. Publish only after checking the public page.',
];

export default function AdminPage() {
  return (
    <AdminChrome title="Admin dashboard" eyebrow={<><LayoutDashboard size={15} /> Sampurna workspace</>}>
      <section className="admin-board single-board admin-home-board">
        <div className="admin-command-card">
          <div>
            <span className="section-kicker">Most used</span>
            <h2>Everything starts with one daily wisdom post.</h2>
            <p>No confusing tools. Use the button below, fill the content, save a draft, and review it from the saved list.</p>
          </div>
          <Link className="primary-action" href="/admin/content">+ Create wisdom</Link>
        </div>

        <div className="admin-action-grid">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link className={`admin-action-card ${action.featured ? 'featured' : ''}`} href={action.href} key={action.href}>
                <span><Icon size={24} /></span>
                <h3>{action.title}</h3>
                <p>{action.text}</p>
                <strong>{action.cta} →</strong>
              </Link>
            );
          })}
        </div>

        <div className="admin-two-column">
          <article className="admin-panel admin-guidance-card">
            <div className="panel-title"><FileText size={18} /><span>Simple daily workflow</span></div>
            {dailyFlow.map((item, index) => (
              <div className="flow-row" key={item}>
                <b>{index + 1}</b>
                <div><strong>{item}</strong></div>
              </div>
            ))}
          </article>

          <article className="admin-panel admin-guidance-card calm">
            <div className="panel-title"><ImageIcon size={18} /><span>What this admin controls</span></div>
            <h3>{BRAND.siteName} content only</h3>
            <p>This dashboard is for the new preview website. It does not change the old live website.</p>
            <Link className="secondary-action" href="/admin/settings"><Settings size={16} /> Site details</Link>
          </article>
        </div>
      </section>
    </AdminChrome>
  );
}
