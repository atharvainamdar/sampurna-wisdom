import Link from 'next/link';
import { CalendarDays } from 'lucide-react';
import { AdminFrame } from '@/components/admin/admin-frame';
import { AdminGateCard } from '@/components/admin/admin-gate-card';
import { getAdminGate } from '@/lib/cms/auth';
import { createSupabaseServerClient } from '@/lib/supabase/server';

type CalendarPost = {
  slug: string;
  content_date: string;
  pillar: string;
  status: string;
  wisdom_translations: Array<{ language: string; title: string | null }> | null;
};

function monthDays(date = new Date()) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const first = new Date(year, month, 1);
  const total = new Date(year, month + 1, 0).getDate();
  const leading = (first.getDay() + 6) % 7;
  return [
    ...Array.from({ length: leading }, () => null),
    ...Array.from({ length: total }, (_, index) => new Date(year, month, index + 1)),
  ];
}

function dateKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

async function getCalendarPosts() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from('wisdom_posts')
    .select('slug, content_date, pillar, status, wisdom_translations(language, title)')
    .order('content_date', { ascending: true });

  if (error) return [];
  return (data ?? []) as CalendarPost[];
}

export default async function AdminCalendarPage() {
  const gate = await getAdminGate();
  if (gate.status !== 'admin') return <AdminGateCard gate={gate} />;

  const posts = await getCalendarPosts();
  const postsByDate = new Map(posts.map((post) => [post.content_date, post]));
  const days = monthDays();
  const monthLabel = new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });

  return (
    <AdminFrame title="Content calendar" eyebrow={<><CalendarDays size={15} /> Plan daily wisdom</>} email={gate.email}>
      <section className="admin-board single-board">
        <div className="admin-command-card calendar-summary-card">
          <div>
            <span className="section-kicker">This month</span>
            <h2>{monthLabel}</h2>
            <p>Green dates are published, purple dates are drafts, and empty dates are ready for new content.</p>
          </div>
          <Link className="primary-action" href="/admin/content">+ Add wisdom</Link>
        </div>

        <div className="admin-panel">
          <div className="calendar-grid">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => <b key={day}>{day}</b>)}
            {days.map((day, index) => {
              if (!day) return <span className="calendar-day empty" aria-hidden="true" key={`blank-${index}`} />;
              const key = dateKey(day);
              const post = postsByDate.get(key);
              const title = post?.wisdom_translations?.find((item) => item.language === 'en')?.title || post?.wisdom_translations?.[0]?.title || 'Add wisdom';
              return (
                <Link className={`calendar-day ${post?.status ?? 'empty'}`} href={post ? '/admin/content#saved-posts' : '/admin/content'} key={key}>
                  <span>{day.getDate()}</span>
                  <small>{post ? title : 'Add wisdom'}</small>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </AdminFrame>
  );
}
