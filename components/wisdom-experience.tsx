'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ArrowUpRight, BookOpen, CalendarDays, CheckCircle2, Download, Headphones, Library, Menu, Mic2, Play, Search, Settings2, Share2, Sparkles, UploadCloud, Youtube, type LucideIcon } from 'lucide-react';
import { BRAND, DEFAULT_POSTS, LANGUAGES, Language, PILLARS, getPillar, todayPost } from '@/lib/content';

type Focus = 'today' | 'library' | 'pillars' | 'about' | 'community';
type Mode = 'read' | 'watch' | 'listen' | 'download';

const nav: Array<{ href: string; key: Focus; label: Record<Language, string> }> = [
  { href: '/today', key: 'today', label: { en: 'Today', hi: 'आज', mr: 'आज' } },
  { href: '/library', key: 'library', label: { en: 'Library', hi: 'लाइब्रेरी', mr: 'लायब्ररी' } },
  { href: '/pillars', key: 'pillars', label: { en: 'Pillars', hi: 'स्तंभ', mr: 'स्तंभ' } },
  { href: '/about', key: 'about', label: { en: 'About', hi: 'परिचय', mr: 'परिचय' } },
  { href: '/community', key: 'community', label: { en: 'Community', hi: 'समुदाय', mr: 'समुदाय' } },
];

const modeCopy: Record<Mode, { label: Record<Language, string>; icon: LucideIcon }> = {
  read: { label: { en: 'Read', hi: 'पढ़ें', mr: 'वाचा' }, icon: BookOpen },
  watch: { label: { en: 'Watch', hi: 'देखें', mr: 'पाहा' }, icon: Play },
  listen: { label: { en: 'Listen', hi: 'सुनें', mr: 'ऐका' }, icon: Headphones },
  download: { label: { en: 'Download', hi: 'डाउनलोड', mr: 'डाउनलोड' }, icon: Download },
};

export function WisdomExperience({ focus }: { focus: Focus }) {
  const [language, setLanguage] = useState<Language>('en');
  const [activeMode, setActiveMode] = useState<Mode>('read');
  const [query, setQuery] = useState('');
  const pillar = getPillar(todayPost.pillar);
  const currentMedia = todayPost.media[language];
  const filteredPosts = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return DEFAULT_POSTS;
    return DEFAULT_POSTS.filter((post) =>
      [post.title[language], post.excerpt[language], post.body[language], ...post.tags].join(' ').toLowerCase().includes(q)
    );
  }, [language, query]);

  return (
    <main className="site-shell">
      <div className="aura aura-one" />
      <div className="aura aura-two" />
      <Header focus={focus} language={language} setLanguage={setLanguage} />

      <section className="hero-grid section-pad" id="today">
        <div className="hero-copy reveal">
          <div className="eyebrow"><Sparkles size={16} /> Free forever • Daily at 6 AM • English / हिन्दी / मराठी</div>
          <h1>
            Daily wisdom for <span>complete prosperity</span>, delivered with ease.
          </h1>
          <p>
            A mobile-first wisdom library by {BRAND.team}. Read, watch, listen, and download your father&apos;s daily guidance without login walls or subscriptions.
          </p>
          <div className="hero-actions">
            <a className="primary-action" href="#wisdom-card">Open today&apos;s wisdom <ArrowUpRight size={18} /></a>
            <a className="secondary-action" href={BRAND.youtube} target="_blank" rel="noreferrer">YouTube channel</a>
          </div>
        </div>

        <div className="hero-orbit reveal delay-1" aria-hidden="true">
          <div className="orbit-ring" />
          <div className="daily-seal">
            <span>{BRAND.siteNameDevanagari}</span>
            <strong>365</strong>
            <small>days of free wisdom</small>
          </div>
          {PILLARS.map((item, index) => (
            <div className={`orbit-chip chip-${index}`} key={item.slug} style={{ '--tone': item.tone } as React.CSSProperties}>
              <b>{item.symbol}</b>
              <span>{item.name[language]}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="today-stage section-pad" id="wisdom-card">
        <div className="section-heading reveal">
          <span className="section-kicker"><CalendarDays size={15} /> Today&apos;s free wisdom</span>
          <h2>{todayPost.title[language]}</h2>
          <p>{todayPost.excerpt[language]}</p>
        </div>

        <article className="wisdom-card reveal delay-1">
          <div className="wisdom-top" style={{ '--pillar': pillar.tone } as React.CSSProperties}>
            <div>
              <span className="pillar-pill">{pillar.name[language]} • {pillar.english}</span>
              <h3>{todayPost.title[language]}</h3>
            </div>
            <div className="date-block">
              <span>May</span>
              <strong>13</strong>
            </div>
          </div>

          <div className="mode-tabs" role="tablist" aria-label="Content modes">
            {(Object.keys(modeCopy) as Mode[]).map((mode) => {
              const Icon = modeCopy[mode].icon;
              return (
                <button key={mode} className={activeMode === mode ? 'active' : ''} onClick={() => setActiveMode(mode)}>
                  <Icon size={17} /> {modeCopy[mode].label[language]}
                </button>
              );
            })}
          </div>

          <div className="wisdom-body">
            {activeMode === 'read' && (
              <div className="reader-panel devanagari-aware">
                <p>{todayPost.body[language]}</p>
                <div className="reflection-box">
                  <Mic2 size={18} />
                  <div>
                    <span>Today&apos;s reflection</span>
                    <strong>{todayPost.reflection[language]}</strong>
                  </div>
                </div>
              </div>
            )}
            {activeMode === 'watch' && (
              <div className="media-panel">
                <Youtube size={34} />
                <h4>Video wisdom connects here</h4>
                <p>Dad can paste separate YouTube links for English, Hindi, and Marathi. Users only see the video for their selected language.</p>
                <a href={currentMedia.videoUrl || BRAND.youtube} target="_blank" rel="noreferrer">Open {language.toUpperCase()} video <ArrowUpRight size={16} /></a>
              </div>
            )}
            {activeMode === 'listen' && (
              <div className="media-panel audio-wave">
                <Headphones size={34} />
                <h4>Audio pravachan-ready</h4>
                <p>Admin uploads separate audio for each language, so Marathi users hear Marathi, Hindi users hear Hindi, and English users hear English.</p>
                <div className="wave-bars">{Array.from({ length: 22 }).map((_, i) => <span key={i} style={{ '--i': i } as React.CSSProperties} />)}</div>
              </div>
            )}
            {activeMode === 'download' && (
              <div className="download-grid">
                {currentMedia.resources.map((resource) => (
                  <a href={resource.url} key={resource.label} className="download-tile">
                    <Download size={20} />
                    <span>{resource.kind.toUpperCase()}</span>
                    <strong>{resource.label}</strong>
                  </a>
                ))}
                <div className="download-tile muted"><UploadCloud size={20} /><span>{language.toUpperCase()} Admin</span><strong>Separate PPT/PDF/audio upload slots per language</strong></div>
              </div>
            )}
          </div>

          <div className="wisdom-actions">
            <a href={`https://wa.me/?text=${encodeURIComponent(todayPost.title[language] + ' — ' + BRAND.siteName)}`} target="_blank" rel="noreferrer"><Share2 size={17} /> Share on WhatsApp</a>
            <button><CheckCircle2 size={17} /> Mark as read</button>
          </div>
        </article>
      </section>

      <section className="library-stage section-pad" id="library">
        <div className="section-heading compact reveal">
          <span className="section-kicker"><Library size={15} /> Wisdom library</span>
          <h2>Every message stays free and searchable.</h2>
        </div>
        <div className="search-card reveal delay-1">
          <Search size={18} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search wealth, health, family, source..." />
          <Settings2 size={18} />
        </div>
        <div className="post-strip">
          {filteredPosts.map((post, index) => {
            const itemPillar = getPillar(post.pillar);
            return (
              <Link className="post-card reveal" href={`/${language}/wisdom/${post.id}`} style={{ '--delay': `${index * 80}ms`, '--pillar': itemPillar.tone } as React.CSSProperties} key={post.id}>
                <span>{itemPillar.name[language]}</span>
                <h3>{post.title[language]}</h3>
                <p>{post.excerpt[language]}</p>
                <small>{new Date(post.date).toLocaleDateString(language === 'en' ? 'en-IN' : language === 'hi' ? 'hi-IN-u-nu-deva' : 'mr-IN')}</small>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="pillar-stage section-pad" id="pillars">
        <div className="section-heading reveal">
          <span className="section-kicker">The 5-pillar framework</span>
          <h2>Indian wisdom, organized for daily life.</h2>
        </div>
        <div className="pillar-grid">
          {PILLARS.map((item) => (
            <div className="pillar-card reveal" key={item.slug} style={{ '--tone': item.tone, background: item.gradient } as React.CSSProperties}>
              <b>{item.symbol}</b>
              <h3>{item.name[language]}</h3>
              <span>{item.english}</span>
              <p>{item.description[language]}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="admin-preview section-pad" id="admin">
        <div className="admin-phone reveal">
          <div className="phone-top" />
          <span>Admin CMS</span>
          <h3>Create tomorrow&apos;s wisdom</h3>
          <label>Date</label>
          <div className="fake-input">14 May 2026</div>
          <label>Content modes</label>
          <div className="admin-toggles"><button>Blog</button><button>Video</button><button>Audio</button><button>PPT</button></div>
          <label>Publish status</label>
          <div className="publish-row"><span>Draft</span><strong>Schedule for 6:00 AM</strong></div>
        </div>
        <div className="admin-copy reveal delay-1">
          <span className="section-kicker">Built for your dad</span>
          <h2>No developer required for daily updates.</h2>
          <p>The admin panel will let him add blogs, YouTube links, audio, PPT/PDF, language versions, thumbnails, and scheduling from a simple mobile-friendly dashboard.</p>
          <ul>
            <li>Draft → preview → publish workflow</li>
            <li>Calendar view for daily wisdom</li>
            <li>Media library for audio, PPT, PDF, and images</li>
            <li>Admin-only Supabase policies from day one</li>
          </ul>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function Header({ focus, language, setLanguage }: { focus: Focus; language: Language; setLanguage: (language: Language) => void }) {
  return (
    <header className="top-nav">
      <Link href="/" className="brand-mark">
        <span>ॐ</span>
        <div><strong>{BRAND.siteName}</strong><small>{BRAND.suffix}</small></div>
      </Link>
      <nav>
        {nav.map((item) => <Link className={focus === item.key ? 'active' : ''} href={item.href} key={item.key}>{item.label[language]}</Link>)}
      </nav>
      <div className="nav-actions">
        <select value={language} onChange={(event) => setLanguage(event.target.value as Language)} aria-label="Language">
          {LANGUAGES.map((item) => <option value={item.code} key={item.code}>{item.native}</option>)}
        </select>
        <button className="menu-button" aria-label="Open menu"><Menu size={19} /></button>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <strong>{BRAND.siteName}</strong>
        <p>Free daily wisdom by {BRAND.team}. Built mobile-first for Indian families.</p>
      </div>
      <div>
        <a href={BRAND.youtube} target="_blank" rel="noreferrer">YouTube</a>
        <a href={`mailto:${BRAND.email}`}>Email</a>
        <a href={`https://wa.me/${BRAND.whatsapp}`} target="_blank" rel="noreferrer">WhatsApp</a>
      </div>
    </footer>
  );
}
