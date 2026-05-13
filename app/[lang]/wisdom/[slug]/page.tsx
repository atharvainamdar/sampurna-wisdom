import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ArrowLeft, Download, Headphones, Play, Share2 } from 'lucide-react';
import { BRAND, DEFAULT_POSTS, getPillar, LANGUAGES, Language } from '@/lib/content';

const isLanguage = (value: string): value is Language => LANGUAGES.some((language) => language.code === value);

export function generateStaticParams() {
  return LANGUAGES.flatMap((language) => DEFAULT_POSTS.map((post) => ({ lang: language.code, slug: post.id })));
}

export function generateMetadata({ params }: { params: { lang: string; slug: string } }): Metadata {
  const post = DEFAULT_POSTS.find((item) => item.id === params.slug);
  const lang = isLanguage(params.lang) ? params.lang : 'en';

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

export default function WisdomDetailPage({ params }: { params: { lang: string; slug: string } }) {
  if (!isLanguage(params.lang)) notFound();

  const post = DEFAULT_POSTS.find((item) => item.id === params.slug);
  if (!post) notFound();

  const language = params.lang;
  const media = post.media[language];
  const pillar = getPillar(post.pillar);

  return (
    <main className="wisdom-detail-shell">
      <article className="wisdom-detail-card" style={{ '--pillar': pillar.tone } as React.CSSProperties}>
        <Link href="/library" className="detail-back"><ArrowLeft size={17} /> Library</Link>
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
          <aside>
            <strong>Reflection</strong>
            <span>{post.reflection[language]}</span>
          </aside>
        </div>
        <section className="detail-media-grid">
          <a href={media.videoUrl || BRAND.youtube} target="_blank" rel="noreferrer"><Play size={19} /><strong>Video</strong><span>{language.toUpperCase()} wisdom video</span></a>
          <a href={media.audioUrl || '#'}><Headphones size={19} /><strong>Audio</strong><span>{language.toUpperCase()} listening version</span></a>
          {media.resources.map((resource) => (
            <a href={resource.url} key={resource.url}><Download size={19} /><strong>{resource.kind.toUpperCase()}</strong><span>{resource.label}</span></a>
          ))}
        </section>
        <a className="detail-share" href={`https://wa.me/?text=${encodeURIComponent(post.title[language] + ' — ' + BRAND.siteName)}`} target="_blank" rel="noreferrer"><Share2 size={18} /> Share with family</a>
      </article>
    </main>
  );
}
