import { BRAND, DEFAULT_POSTS, LANGUAGES, Language, PillarSlug, WisdomPost } from '@/lib/content';
import legacyDailyContent from '@/data/legacy-daily-content.json';
import { createSupabaseServerClient, hasSupabaseEnv } from '@/lib/supabase/server';

type ResourceKind = 'ppt' | 'pdf' | 'image' | 'link';

type TranslationRow = {
  language: Language;
  title: string | null;
  excerpt: string | null;
  body: string | null;
  reflection_prompt: string | null;
  video_url: string | null;
  audio_url: string | null;
  resources: Array<{ label?: string; url?: string; kind?: ResourceKind }> | null;
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

type LegacyDailyRow = {
  id: string;
  content_date: string;
  day_of_year: number | null;
  title_en: string;
  title_hi: string | null;
  title_mr: string | null;
  content_en: string | null;
  content_hi: string | null;
  content_mr: string | null;
  audio_url_en: string | null;
  audio_url_hi: string | null;
  audio_url_mr: string | null;
  video_url_en: string | null;
  video_url_hi: string | null;
  video_url_mr: string | null;
  youtube_url_en: string | null;
  youtube_url_hi: string | null;
  youtube_url_mr: string | null;
  pdf_url_en: string | null;
  pdf_url_hi: string | null;
  pdf_url_mr: string | null;
  allow_pdf_download: boolean | null;
  pillar: { slug?: string | null; name_en?: string | null } | null;
};

const fallbackPosts = sortPosts([...mapLegacyRowsToPosts(legacyDailyContent as LegacyDailyRow[]), ...DEFAULT_POSTS]);

function blankRecord(defaultValue = ''): Record<Language, string> {
  return { en: defaultValue, hi: defaultValue, mr: defaultValue };
}

function normalizePillar(slug?: string | null): PillarSlug {
  return slug === 'arogya' || slug === 'sampatti' || slug === 'sambandh' || slug === 'karya' || slug === 'adhyatma' ? slug : 'arogya';
}

function createSlug(date: string, title: string) {
  const clean = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 70);
  return `${date}-${clean || 'wisdom'}`;
}

function excerptFrom(value: string | null) {
  if (!value) return '';
  return value.replace(/\s+/g, ' ').trim().slice(0, 185);
}

function pdfResource(label: string, url: string | null): Array<{ label: string; url: string; kind: ResourceKind }> {
  return url ? [{ label, url, kind: 'pdf' }] : [];
}

function mapLegacyRowsToPosts(rows: LegacyDailyRow[]): WisdomPost[] {
  return rows.map((row) => {
    const title = {
      en: row.title_en,
      hi: row.title_hi || row.title_en,
      mr: row.title_mr || row.title_hi || row.title_en,
    };
    const body = {
      en: row.content_en || '',
      hi: row.content_hi || row.content_en || '',
      mr: row.content_mr || row.content_hi || row.content_en || '',
    };
    const excerpt = {
      en: excerptFrom(row.content_en),
      hi: excerptFrom(row.content_hi || row.content_en),
      mr: excerptFrom(row.content_mr || row.content_hi || row.content_en),
    };
    const pillar = normalizePillar(row.pillar?.slug);

    return {
      id: createSlug(row.content_date, row.title_en),
      date: row.content_date,
      pillar,
      status: 'published',
      featured: false,
      tags: [pillar, row.pillar?.name_en || 'daily wisdom'].filter(Boolean) as string[],
      title,
      excerpt,
      body,
      reflection: { en: '', hi: '', mr: '' },
      media: {
        en: {
          videoUrl: row.youtube_url_en || row.video_url_en || undefined,
          audioUrl: row.audio_url_en || undefined,
          resources: pdfResource('PDF', row.pdf_url_en),
        },
        hi: {
          videoUrl: row.youtube_url_hi || row.video_url_hi || row.youtube_url_en || row.video_url_en || undefined,
          audioUrl: row.audio_url_hi || row.audio_url_en || undefined,
          resources: pdfResource('PDF', row.pdf_url_hi || row.pdf_url_en),
        },
        mr: {
          videoUrl: row.youtube_url_mr || row.video_url_mr || row.youtube_url_en || row.video_url_en || undefined,
          audioUrl: row.audio_url_mr || row.audio_url_hi || row.audio_url_en || undefined,
          resources: pdfResource('PDF', row.pdf_url_mr || row.pdf_url_hi || row.pdf_url_en),
        },
      },
    };
  });
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

function sortPosts(posts: WisdomPost[]) {
  return [...posts].sort((a, b) => b.date.localeCompare(a.date));
}

function mergePosts(primary: WisdomPost[], archive: WisdomPost[]) {
  const seen = new Set<string>();
  return sortPosts([...primary, ...archive].filter((post) => {
    if (seen.has(post.id)) return false;
    seen.add(post.id);
    return true;
  }));
}

export async function getPublishedWisdomPosts() {
  if (!hasSupabaseEnv()) return fallbackPosts;

  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from('wisdom_posts')
      .select('slug, content_date, pillar, status, featured, tags, wisdom_translations(language, title, excerpt, body, reflection_prompt, video_url, audio_url, resources)')
      .eq('status', 'published')
      .lte('published_at', new Date().toISOString())
      .order('content_date', { ascending: false })
      .limit(120);

    if (error || !data?.length) return fallbackPosts;
    return mergePosts((data as PostRow[]).map(mapRowToPost), fallbackPosts);
  } catch {
    return fallbackPosts;
  }
}

export async function getPublishedWisdomPost(slug: string) {
  const posts = await getPublishedWisdomPosts();
  return posts.find((post) => post.id === slug) || null;
}

export function getTodayFromPosts(posts: WisdomPost[]) {
  return posts[0] || fallbackPosts[0];
}

export function getShareText(post: WisdomPost, language: Language) {
  return `${post.title[language]} — ${BRAND.siteName}`;
}
