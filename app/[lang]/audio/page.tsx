import { WisdomExperience } from '@/components/wisdom-experience';
import { getPublishedWisdomPosts } from '@/lib/cms/public-content';
import { requireLanguage } from '@/lib/i18n';

export default async function LanguagePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const posts = await getPublishedWisdomPosts();
  return <WisdomExperience focus="community" initialLanguage={requireLanguage(lang)} posts={posts} />;
}
