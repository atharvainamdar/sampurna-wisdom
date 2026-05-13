import { BRAND, DEFAULT_POSTS, LANGUAGES, Language, PillarSlug, WisdomPost } from '@/lib/content';
import { createSupabaseServerClient, hasSupabaseEnv } from '@/lib/supabase/server';

type TranslationRow = {
  language: Language;
  title: string | null;
  excerpt: string | null;
  body: string | null;
  reflection_prompt: string | null;
  video_url: string | null;
  audio_url: string | null;
  resources: Array<{ label?: string; url?: string; kind?: 'ppt' | 'pdf' | 'image' | 'link' }> | null;
};

type PostRow = {
  slug: string;
  content_date: string;
  pillar: PillarSlug;
  status: string;
  featured: boolean | null;
  tags: string[] | null;
  wisdom_translations: TranslationRow[] | null;
};

function blankRecord(defaultValue = ''): Record<Language, string> {
  return { en: defaultValue, hi: defaultValue, mr: defaultValue };
}

function mapRowToPost(row: PostRow): WisdomPost {
  const title = blankRecord('Untitled wisdom');
  const excerpt = blankRecord('');
  const body = blankRecord('');
  const reflection = blankRecord('');
  const media: WisdomPost['media'] = {
    en: { resources: [] },
    hi: { resources: [] },
    mr: { resources: [] },
  };

  row.wisdom_translations?.forEach((translation) => {
    title[translation.language] = translation.title || title.en;
    excerpt[translation.language] = translation.excerpt || '';
    body[translation.language] = translation.body || '';
    reflection[translation.language] = translation.reflection_prompt || '';
    media[translation.language] = {
      videoUrl: translation.video_url || undefined,
      audioUrl: translation.audio_url || undefined,
      resources: (translation.resources || [])
        .filter((resource) => resource.url)
        .map((resource) => ({
          label: resource.label || resource.url || 'Resource',
          url: resource.url || '#',
          kind: resource.kind || 'link',
        })),
    };
  });

  LANGUAGES.forEach((language) => {
    const code = language.code;
    title[code] ||= title.en || Object.values(title).find(Boolean) || 'Untitled wisdom';
    excerpt[code] ||= excerpt.en || Object.values(excerpt).find(Boolean) || '';
    body[code] ||= body.en || Object.values(body).find(Boolean) || '';
    reflection[code] ||= reflection.en || Object.values(reflection).find(Boolean) || '';
  });

  return {
    id: row.slug,
    date: row.content_date,
    pillar: row.pillar,
    status: 'published',
    featured: Boolean(row.featured),
    tags: row.tags || [],
    title,
    excerpt,
    body,
    reflection,
    media,
  };
}

export async function getPublishedWisdomPosts() {
  if (!hasSupabaseEnv()) return DEFAULT_POSTS;

  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from('wisdom_posts')
      .select('slug, content_date, pillar, status, featured, tags, wisdom_translations(language, title, excerpt, body, reflection_prompt, video_url, audio_url, resources)')
      .eq('status', 'published')
      .lte('published_at', new Date().toISOString())
      .order('content_date', { ascending: false })
      .limit(120);

    if (error || !data?.length) return DEFAULT_POSTS;
    return (data as PostRow[]).map(mapRowToPost);
  } catch {
    return DEFAULT_POSTS;
  }
}

export async function getPublishedWisdomPost(slug: string) {
  const supabasePosts = await getPublishedWisdomPosts();
  return supabasePosts.find((post) => post.id === slug) || DEFAULT_POSTS.find((post) => post.id === slug) || null;
}

export function getTodayFromPosts(posts: WisdomPost[]) {
  return posts[0] || DEFAULT_POSTS[0];
}

export function getShareText(post: WisdomPost, language: Language) {
  return `${post.title[language]} — ${BRAND.siteName}`;
}
