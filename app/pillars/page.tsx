import { WisdomExperience } from '@/components/wisdom-experience';
import { getPublishedWisdomPosts } from '@/lib/cms/public-content';

export default async function Page() {
  const posts = await getPublishedWisdomPosts();
  return <WisdomExperience focus="pillars" posts={posts} />;
}
