import { AdminFrame } from '@/components/admin/admin-frame';
import { AdminGateCard } from '@/components/admin/admin-gate-card';
import { WisdomPostForm } from '@/components/admin/wisdom-post-form';
import { WisdomPostList } from '@/components/admin/wisdom-post-list';
import { getAdminGate } from '@/lib/cms/auth';
import { createSupabaseServerClient } from '@/lib/supabase/server';

type WisdomRow = {
  id: string;
  slug: string;
  content_date: string;
  pillar: string;
  status: string;
  published_at: string | null;
  wisdom_translations: Array<{
    language: string;
    title: string | null;
    video_url: string | null;
    audio_url: string | null;
    resources: unknown;
  }> | null;
};

async function getPosts() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from('wisdom_posts')
    .select('id, slug, content_date, pillar, status, published_at, wisdom_translations(language, title, video_url, audio_url, resources)')
    .order('content_date', { ascending: false })
    .limit(20);

  if (error) return [];
  return (data ?? []) as WisdomRow[];
}

export default async function AdminContentPage() {
  const gate = await getAdminGate();
  if (gate.status !== 'admin') return <AdminGateCard gate={gate} />;

  const posts = await getPosts();

  return (
    <AdminFrame title="Daily wisdom editor" eyebrow="Create / edit content" email={gate.email}>
      <section className="admin-board single-board content-editor-board">
        <WisdomPostForm />
        <WisdomPostList posts={posts} />
      </section>
    </AdminFrame>
  );
}
