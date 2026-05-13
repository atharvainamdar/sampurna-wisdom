'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { BookOpen, FlaskConical, Globe2, Headphones, Leaf, Mail, Menu, Phone, Play, Sprout, Video, type LucideIcon } from 'lucide-react';
import { BRAND, HERITAGE_COPY, LANGUAGES, Language, LEGACY_ASSETS, PILLARS, TRUST_STATS, WisdomPost, getPillar } from '@/lib/content';
import { localizedPath } from '@/lib/i18n';

type Focus = 'today' | 'library' | 'pillars' | 'about' | 'community';

const nav: Array<{ key: Focus; label: Record<Language, string> }> = [
  { key: 'today', label: { en: 'Home', hi: 'मुख्यपृष्ठ', mr: 'मुख्यपृष्ठ' } },
  { key: 'about', label: { en: 'About', hi: 'आमच्याबद्दल', mr: 'आमच्याबद्दल' } },
  { key: 'library', label: { en: 'Videos', hi: 'व्हिडिओ', mr: 'व्हिडिओ' } },
  { key: 'community', label: { en: 'Audio', hi: 'ऑडिओ', mr: 'ऑडिओ' } },
  { key: 'pillars', label: { en: 'Blog', hi: 'ब्लॉग', mr: 'ब्लॉग' } },
];

const copy = {
  eyebrow: { en: 'Health • Knowledge • Prosperity • Sadhana', hi: 'आरोग्य • ज्ञान • समृद्धि • साधना', mr: 'आरोग्य • ज्ञान • समृद्धी • साधना' },
  titleA: { en: 'Wisdom practice for a', hi: 'आरोग्यदायी जीवनासाठी', mr: 'आरोग्यदायी जीवनासाठी' },
  titleB: { en: 'healthy, prosperous life', hi: 'ज्ञानाची उपासना', mr: 'ज्ञानाची उपासना' },
  subtitle: {
    en: 'Free guidance for health, longevity, mental peace, and prosperous living through a scientific and spiritual lens.',
    hi: 'आरोग्य, दीर्घायुष्य, मानसिक शांति और समृद्ध जीवन के लिए वैज्ञानिक और साधना-आधारित निःशुल्क मार्गदर्शन।',
    mr: 'वैज्ञानिक दृष्टिकोनातून आरोग्य, दीर्घायुष्य, मानसिक शांतता आणि समृद्ध जीवनासाठी मोफत मार्गदर्शन.',
  },
  start: { en: 'Start listening now', hi: 'अभी सुनना शुरू करें', mr: 'आत्ताच सुरुवात करा' },
  free: { en: 'All content is free', hi: 'सभी सामग्री निःशुल्क है', mr: 'सर्व साहित्य मोफत आहे' },
  video: { en: 'Video', hi: 'व्हिडिओ', mr: 'व्हिडिओ' },
  videoSub: { en: 'Knowledge videos', hi: 'ज्ञानवर्धी व्हिडिओ', mr: 'ज्ञानवर्धी व्हिडिओ' },
  audio: { en: 'Audio', hi: 'ऑडिओ', mr: 'ऑडिओ' },
  audioSub: { en: 'Listen and learn', hi: 'सुनें और सीखें', mr: 'ऐका आणि शिका' },
  blog: { en: 'Blog', hi: 'ब्लॉग', mr: 'ब्लॉग' },
  blogSub: { en: 'Simple articles and notes', hi: 'सरल लेख और जानकारी', mr: 'सखोल लेख व माहिती' },
  founderOne: { en: 'Shri. Ramesh Inamdar', hi: 'श्री. रमेश इनामदार', mr: 'श्री. रमेश इनामदार' },
  founderOneRole: { en: 'Founder', hi: 'संस्थापक', mr: 'संस्थापक' },
  founderTwo: { en: 'Smt. Sujata Inamdar', hi: 'सौ. सुजाता इनामदार', mr: 'सौ. सुजाता इनामदार' },
  founderTwoRole: { en: 'Co-founder', hi: 'सह-संस्थापक', mr: 'सह-संस्थापक' },
  freeContent: { en: 'Our free content', hi: 'हमारी निःशुल्क सामग्री', mr: 'आमचे मोफत साहित्य' },
  freeContentSub: { en: 'Selected topics for a healthy and joyful life', hi: 'स्वस्थ और आनंदमय जीवन के लिए चुने हुए विषय', mr: 'तुमच्या आरोग्यदायी आणि आनंदी जीवनासाठी निवडक विषय' },
  allVideos: { en: 'View all videos', hi: 'सभी वीडियो देखें', mr: 'सर्व व्हिडिओ पहा' },
  allAudio: { en: 'Listen to all audio', hi: 'सभी ऑडियो सुनें', mr: 'सर्व ऑडिओ ऐका' },
  allArticles: { en: 'Read all articles', hi: 'सभी लेख पढ़ें', mr: 'सर्व लेख वाचा' },
  features: { en: 'Our speciality', hi: 'हमारी विशेषताएँ', mr: 'आमची वैशिष्ट्ये' },
  featureScience: { en: 'Scientific and research-based information', hi: 'वैज्ञानिक और शोध-आधारित जानकारी', mr: 'वैज्ञानिक आणि संशोधनआधारित माहिती' },
  featureSimple: { en: 'Simple guidance in your own language', hi: 'सरल भाषा में मार्गदर्शन', mr: 'सोप्या भाषेत सखोल मार्गदर्शन' },
  featureFree: { en: '100% free and accessible to everyone', hi: '१००% निःशुल्क और सभी के लिए उपलब्ध', mr: '100% मोफत आणि सर्वांसाठी उपलब्ध' },
  featureCare: { en: 'Your health, your responsibility', hi: 'आपका स्वास्थ्य, आपकी ज़िम्मेदारी', mr: 'आपले आरोग्य, आपली जबाबदारी' },
  newsletter: { en: 'Get membership / updates', hi: 'सदस्यता / अपडेट प्राप्त करें', mr: 'सदस्यता घ्या / अपडेट मिळवा' },
  website: { en: 'Website', hi: 'वेबसाइट', mr: 'वेबसाईट' },
  email: { en: 'Email', hi: 'ईमेल', mr: 'ईमेल' },
  contact: { en: 'Contact', hi: 'संपर्क', mr: 'संपर्क' },
} satisfies Record<string, Record<Language, string>>;

const featureIcons = [FlaskConical, BookOpen, Sprout, Leaf];

export function WisdomExperience({ focus, initialLanguage = 'mr', posts }: { focus: Focus; initialLanguage?: Language; posts: WisdomPost[] }) {
  const [language, setLanguage] = useState<Language>(initialLanguage);
  const todayPost = posts[0];
  const videoPost = posts[0];
  const audioPost = posts[1] || posts[0];
  const blogPost = posts[2] || posts[0];

  return (
    <main className="reference-shell">
      <ReferenceHeader focus={focus} language={language} setLanguage={setLanguage} />
      <section className="reference-hero">
        <div className="hero-leaf"><Leaf size={28} /> {copy.eyebrow[language]}</div>
        <div className="reference-hero-copy">
          <h1>{copy.titleA[language]} <span>{copy.titleB[language]}</span></h1>
          <p>{copy.subtitle[language]}</p>
          <div className="hero-mode-row">
            <ModePill icon={Video} title={copy.video[language]} subtitle={copy.videoSub[language]} />
            <ModePill icon={Headphones} title={copy.audio[language]} subtitle={copy.audioSub[language]} />
            <ModePill icon={BookOpen} title={copy.blog[language]} subtitle={copy.blogSub[language]} />
          </div>
          <div className="hero-actions clean-actions">
            <Link href={`/${language}/wisdom/${todayPost.id}`} className="green-cta"><Play size={18} /> {copy.start[language]}</Link>
            <Link href={`/${language}/library`} className="outline-cta">{copy.free[language]}</Link>
          </div>
        </div>
        <div className="reference-founder-visual">
          <div className="founder-photo-card">
            <Image src="/legacy-assets/dad_photo.jpg" alt={copy.founderOne[language]} width={520} height={620} priority />
            <Image src="/legacy-assets/mom_photo.jpg" alt={copy.founderTwo[language]} width={420} height={560} priority />
          </div>
          <div className="founder-name-strip">
            <div><strong>{copy.founderOne[language]}</strong><span>({copy.founderOneRole[language]})</span></div>
            <div><strong>{copy.founderTwo[language]}</strong><span>({copy.founderTwoRole[language]})</span></div>
          </div>
        </div>
      </section>

      <section className="reference-free-section">
        <div className="ornament-heading">
          <span />
          <div><h2>{copy.freeContent[language]}</h2><p>{copy.freeContentSub[language]}</p></div>
          <span />
        </div>
        <div className="content-category-grid">
          <ContentCategory kind="video" icon={Video} language={language} title={copy.video[language]} subtitle={copy.videoSub[language]} post={videoPost} cta={copy.allVideos[language]} />
          <ContentCategory kind="audio" icon={Headphones} language={language} title={copy.audio[language]} subtitle={copy.audioSub[language]} post={audioPost} cta={copy.allAudio[language]} />
          <ContentCategory kind="blog" icon={BookOpen} language={language} title={copy.blog[language]} subtitle={copy.blogSub[language]} post={blogPost} cta={copy.allArticles[language]} />
        </div>
      </section>

      <section className="reference-trust-row" aria-label={copy.features[language]}>
        {[copy.featureScience, copy.featureSimple, copy.featureFree, copy.featureCare].map((item, index) => {
          const Icon = featureIcons[index];
          return <div key={item[language]}><Icon size={34} /><span>{item[language]}</span></div>;
        })}
      </section>

      <section className="reference-pillars">
        {PILLARS.map((pillar) => (
          <Link href={`/${language}/pillars`} key={pillar.slug} style={{ '--tone': pillar.tone } as React.CSSProperties}>
            <Image src={LEGACY_ASSETS[pillar.slug]} alt={pillar.name[language]} width={180} height={100} />
            <strong>{pillar.name[language]}</strong>
            <span>{pillar.description[language]}</span>
          </Link>
        ))}
      </section>

      <section className="reference-legacy-stats">
        {TRUST_STATS.map((stat) => <div key={stat.value}><strong>{stat.value}</strong><span>{stat.label[language]}</span></div>)}
      </section>

      <ReferenceFooter language={language} />
    </main>
  );
}

function ModePill({ icon: Icon, title, subtitle }: { icon: LucideIcon; title: string; subtitle: string }) {
  return <div className="mode-pill"><span><Icon size={24} /></span><div><strong>{title}</strong><small>{subtitle}</small></div></div>;
}

function ContentCategory({ kind, icon: Icon, title, subtitle, post, cta, language }: { kind: 'video' | 'audio' | 'blog'; icon: LucideIcon; title: string; subtitle: string; post: WisdomPost; cta: string; language: Language }) {
  const pillar = getPillar(post.pillar);
  return (
    <article className={`category-card ${kind}`} style={{ '--tone': pillar.tone } as React.CSSProperties}>
      <div className="category-icon"><Icon size={42} /></div>
      <div className="category-copy">
        <h3>{title}</h3>
        <strong>{subtitle}</strong>
        <p>{post.excerpt[language] || HERITAGE_COPY.dailyGift[language]}</p>
      </div>
      <div className="category-preview">
        {kind === 'audio' ? <div className="audio-widget"><Play size={18} /><span /><small>00:00 / 24:30</small></div> : <Image src={LEGACY_ASSETS[post.pillar]} alt={post.title[language]} width={280} height={150} />}
      </div>
      <Link href={`/${language}/wisdom/${post.id}`}>{cta} →</Link>
    </article>
  );
}

function ReferenceHeader({ focus, language, setLanguage }: { focus: Focus; language: Language; setLanguage: (language: Language) => void }) {
  const router = useRouter();
  return (
    <header className="reference-header">
      <Link href={`/${language}`} className="reference-brand">
        <Image src="/legacy-assets/logo.jpeg" alt={BRAND.siteName} width={62} height={62} />
        <div><strong>Sampurna Samruddhi Upasana</strong><span>{BRAND.siteNameDevanagari}, समृद्ध आणि आनंदी जीवन</span></div>
      </Link>
      <nav>
        {nav.map((item) => <Link className={focus === item.key ? 'active' : ''} href={localizedPath(language, item.key)} key={item.key}>{item.label[language]}</Link>)}
      </nav>
      <div className="reference-actions">
        <select value={language} onChange={(event) => { const next = event.target.value as Language; setLanguage(next); router.push(localizedPath(next, focus)); }} aria-label="Language">
          {LANGUAGES.map((item) => <option value={item.code} key={item.code}>{item.native}</option>)}
        </select>
        <a href={`https://wa.me/${BRAND.whatsapp}`} target="_blank" rel="noreferrer"><Mail size={16} /> {copy.newsletter[language]}</a>
        <button><Menu size={24} /></button>
      </div>
    </header>
  );
}

function ReferenceFooter({ language }: { language: Language }) {
  return (
    <footer className="reference-footer">
      <a href="https://fabselfhelp.com" target="_blank" rel="noreferrer"><Globe2 size={24} /><span>{copy.website[language]}<small>fabselfhelp.com</small></span></a>
      <a href={`mailto:${BRAND.email}`}><Mail size={24} /><span>{copy.email[language]}<small>{BRAND.email}</small></span></a>
      <a href={`https://wa.me/${BRAND.whatsapp}`} target="_blank" rel="noreferrer"><Phone size={24} /><span>{copy.contact[language]}<small>{BRAND.phone}</small></span></a>
    </footer>
  );
}
