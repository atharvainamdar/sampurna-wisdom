import { WisdomExperience } from '@/components/wisdom-experience';
import { getPublishedWisdomPosts } from '@/lib/cms/public-content';
import { requireLanguage } from '@/lib/i18n';

export default async function LanguagePage({ params, searchParams }: { params: Promise<{ lang: string }>; searchParams?: Promise<{ date?: string; mode?: string; month?: string }> }) {
  const { lang } = await params;
  const query = await searchParams;
  const posts = await getPublishedWisdomPosts();
  return <WisdomExperience focus="community" initialLanguage={requireLanguage(lang)} posts={posts} initialDate={query?.date} initialMode={query?.mode === 'read' || query?.mode === 'watch' || query?.mode === 'listen' || query?.mode === 'pdf' ? query.mode : undefined} initialMonth={query?.month} />;
}
