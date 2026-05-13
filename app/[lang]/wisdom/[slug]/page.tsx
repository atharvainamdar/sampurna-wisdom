import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ArrowLeft, Download, Headphones, Play, Share2 } from 'lucide-react';
import { BRAND, DEFAULT_POSTS, getPillar, LANGUAGES, Language } from '@/lib/content';

const detailCopy = {
  library: { en: 'Library', hi: 'लाइब्रेरी', mr: 'लायब्ररी' },
  reflection: { en: 'Reflection', hi: 'चिंतन', mr: 'चिंतन' },
  video: { en: 'Video', hi: 'वीडियो', mr: 'व्हिडिओ' },
  audio: { en: 'Audio', hi: 'ऑडियो', mr: 'ऑडिओ' },
  videoText: { en: 'wisdom video', hi: 'ज्ञान वीडियो', mr: 'ज्ञान व्हिडिओ' },
  audioText: { en: 'listening version', hi: 'सुनने का संस्करण', mr: 'ऐकण्याची आवृत्ती' },
  share: { en: 'Share with family', hi: 'परिवार के साथ साझा करें', mr: 'कुटुंबासोबत शेअर करा' },
} satisfies Record<string, Record<Language, string>>;
import { getPublishedWisdomPost, getShareText } from '@/lib/cms/public-content';

const isLanguage = (value: string): value is Language => LANGUAGES.some((language) => language.code === value);

export function generateStaticParams() {
  return LANGUAGES.flatMap((language) => DEFAULT_POSTS.map((post) => ({ lang: language.code, slug: post.id })));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { lang: rawLang, slug } = await params;
  const lang = isLanguage(rawLang) ? rawLang : 'en';
  const post = await getPublishedWisdomPost(slug);

  if (!post) return {};

  return {
    title: `${post.title[lang]} — ${BRAND.siteName}`,
    description: post.excerpt[lang],
    alternates: {
      canonical: `/${lang}/wisdom/${post.id}`,
      languages: Object.fromEntries(LANGUAGES.map((language) => [language.code, `/${language.code}/wisdom/${post.id}`])),
    },
    openGraph: {
      title: post.title[lang],
      description: post.excerpt[lang],
      type: 'article',
      publishedTime: post.date,
      locale: lang === 'en' ? 'en_IN' : lang === 'hi' ? 'hi_IN' : 'mr_IN',
    },
  };
}

export default async function WisdomDetailPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang: rawLang, slug } = await params;
  if (!isLanguage(rawLang)) notFound();

  const post = await getPublishedWisdomPost(slug);
  if (!post) notFound();

  const language = rawLang;
  const media = post.media[language];
  const pillar = getPillar(post.pillar);

  return (
    <main className="wisdom-detail-shell">
      <article className="wisdom-detail-card" style={{ '--pillar': pillar.tone } as React.CSSProperties}>
        <Link href={`/${language}/library`} className="detail-back"><ArrowLeft size={17} /> {detailCopy.library[language]}</Link>
        <div className="detail-language-switcher">
          {LANGUAGES.map((item) => (
            <Link className={item.code === language ? 'active' : ''} href={`/${item.code}/wisdom/${post.id}`} key={item.code}>{item.native}</Link>
          ))}
        </div>
        <span className="pillar-pill">{pillar.name[language]} • {pillar.english}</span>
        <h1>{post.title[language]}</h1>
        <p className="detail-excerpt">{post.excerpt[language]}</p>
        <div className="detail-body devanagari-aware">
          <p>{post.body[language]}</p>
          {post.reflection[language] ? (
            <aside>
              <strong>{detailCopy.reflection[language]}</strong>
              <span>{post.reflection[language]}</span>
            </aside>
          ) : null}
        </div>
        <section className="detail-media-grid">
          <a href={media.videoUrl || BRAND.youtube} target="_blank" rel="noreferrer"><Play size={19} /><strong>{detailCopy.video[language]}</strong><span>{language.toUpperCase()} {detailCopy.videoText[language]}</span></a>
          <a href={media.audioUrl || '#'}><Headphones size={19} /><strong>{detailCopy.audio[language]}</strong><span>{language.toUpperCase()} {detailCopy.audioText[language]}</span></a>
          {media.resources.map((resource) => (
            <a href={resource.url} key={resource.url}><Download size={19} /><strong>{resource.kind.toUpperCase()}</strong><span>{resource.label}</span></a>
          ))}
        </section>
        <a className="detail-share" href={`https://wa.me/?text=${encodeURIComponent(getShareText(post, language))}`} target="_blank" rel="noreferrer"><Share2 size={18} /> {detailCopy.share[language]}</a>
      </article>
    </main>
  );
}
