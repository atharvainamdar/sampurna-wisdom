'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { ArrowUpRight, BookOpen, CalendarDays, CheckCircle2, Download, Headphones, Library, Menu, Mic2, Play, Search, Settings2, Share2, Sparkles, UploadCloud, Youtube, type LucideIcon } from 'lucide-react';
import { BRAND, HERITAGE_COPY, LANGUAGES, Language, LEGACY_ASSETS, PILLARS, TRUST_STATS, WisdomPost, getPillar } from '@/lib/content';
import { localizedPath } from '@/lib/i18n';

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

const uiCopy = {
  freeForever: { en: 'Free forever', hi: 'हमेशा निःशुल्क', mr: 'कायम मोफत' },
  heroTitleA: { en: 'Daily wisdom for', hi: 'संपूर्ण समृद्धि के लिए', mr: 'संपूर्ण समृद्धीसाठी' },
  heroTitleB: { en: 'complete prosperity', hi: 'दैनिक ज्ञान', mr: 'दैनिक ज्ञान' },
  heroTitleC: { en: 'delivered with ease.', hi: 'सहज रूप से।', mr: 'सहजतेने.' },
  openToday: { en: "Open today's wisdom", hi: 'आज का ज्ञान खोलें', mr: 'आजचे ज्ञान उघडा' },
  youtube: { en: 'YouTube channel', hi: 'यूट्यूब चैनल', mr: 'यूट्यूब चॅनल' },
  daysFree: { en: 'days of free wisdom', hi: 'दिनों का निःशुल्क ज्ञान', mr: 'दिवसांचे मोफत ज्ञान' },
  heritageKicker: { en: '20 years of Sampurna Samruddhi wisdom', hi: 'संपूर्ण समृद्धि ज्ञान के २० वर्ष', mr: 'संपूर्ण समृद्धी ज्ञानाची २० वर्षे' },
  todayKicker: { en: "Today's free wisdom", hi: 'आज का निःशुल्क ज्ञान', mr: 'आजचे मोफत ज्ञान' },
  reflection: { en: "Today's reflection", hi: 'आज का चिंतन', mr: 'आजचे चिंतन' },
  videoTitle: { en: 'Video wisdom connects here', hi: 'वीडियो ज्ञान यहाँ जुड़ता है', mr: 'व्हिडिओ ज्ञान येथे जोडले जाते' },
  videoText: { en: 'Dad can paste separate YouTube links for English, Hindi, and Marathi. Users only see the video for their selected language.', hi: 'पिताजी अंग्रेज़ी, हिन्दी और मराठी के लिए अलग-अलग यूट्यूब लिंक जोड़ सकते हैं। उपयोगकर्ता केवल अपनी चुनी हुई भाषा का वीडियो देखेंगे।', mr: 'बाबा इंग्रजी, हिन्दी आणि मराठीसाठी वेगवेगळे यूट्यूब लिंक जोडू शकतात. वापरकर्त्यांना त्यांच्या निवडलेल्या भाषेचाच व्हिडिओ दिसेल.' },
  openVideo: { en: 'Open video', hi: 'वीडियो खोलें', mr: 'व्हिडिओ उघडा' },
  audioTitle: { en: 'Audio pravachan-ready', hi: 'ऑडियो प्रवचन के लिए तैयार', mr: 'ऑडिओ प्रवचनासाठी तयार' },
  audioText: { en: 'Admin uploads separate audio for each language, so Marathi users hear Marathi, Hindi users hear Hindi, and English users hear English.', hi: 'एडमिन हर भाषा के लिए अलग ऑडियो जोड़ सकता है, इसलिए हिन्दी उपयोगकर्ता हिन्दी, मराठी उपयोगकर्ता मराठी और अंग्रेज़ी उपयोगकर्ता अंग्रेज़ी सुनेंगे।', mr: 'अ‍ॅडमिन प्रत्येक भाषेसाठी वेगळा ऑडिओ जोडू शकतो, त्यामुळे मराठी वापरकर्ते मराठी, हिन्दी वापरकर्ते हिन्दी आणि इंग्रजी वापरकर्ते इंग्रजी ऐकतील.' },
  uploadSlots: { en: 'Separate PPT/PDF/audio upload slots per language', hi: 'हर भाषा के लिए अलग PPT/PDF/ऑडियो अपलोड स्थान', mr: 'प्रत्येक भाषेसाठी वेगळे PPT/PDF/ऑडिओ अपलोड स्थान' },
  share: { en: 'Share on WhatsApp', hi: 'व्हाट्सऐप पर साझा करें', mr: 'व्हॉट्सअ‍ॅपवर शेअर करा' },
  markRead: { en: 'Mark as read', hi: 'पढ़ा हुआ चिह्नित करें', mr: 'वाचले म्हणून चिन्हांकित करा' },
  libraryKicker: { en: 'Wisdom library', hi: 'ज्ञान लाइब्रेरी', mr: 'ज्ञान लायब्ररी' },
  libraryTitle: { en: 'Every message stays free and searchable.', hi: 'हर संदेश निःशुल्क और खोजने योग्य रहेगा।', mr: 'प्रत्येक संदेश मोफत आणि शोधता येण्यासारखा राहील.' },
  searchPlaceholder: { en: 'Search wealth, health, family, source...', hi: 'धन, स्वास्थ्य, परिवार, स्रोत खोजें...', mr: 'संपत्ती, आरोग्य, कुटुंब, स्रोत शोधा...' },
  pillarKicker: { en: 'The 5-pillar framework', hi: '५ स्तंभों का फ्रेमवर्क', mr: '५ स्तंभांचे फ्रेमवर्क' },
  pillarTitle: { en: 'Indian wisdom, organized for daily life.', hi: 'भारतीय ज्ञान, दैनिक जीवन के लिए व्यवस्थित।', mr: 'भारतीय ज्ञान, दैनंदिन जीवनासाठी व्यवस्थित.' },
  adminCms: { en: 'Admin CMS', hi: 'एडमिन CMS', mr: 'अ‍ॅडमिन CMS' },
  createTomorrow: { en: "Create tomorrow's wisdom", hi: 'कल का ज्ञान बनाएँ', mr: 'उद्याचे ज्ञान तयार करा' },
  date: { en: 'Date', hi: 'तारीख', mr: 'तारीख' },
  contentModes: { en: 'Content modes', hi: 'सामग्री प्रकार', mr: 'सामग्री प्रकार' },
  publishStatus: { en: 'Publish status', hi: 'प्रकाशन स्थिति', mr: 'प्रकाशन स्थिती' },
  draft: { en: 'Draft', hi: 'ड्राफ्ट', mr: 'मसुदा' },
  schedule: { en: 'Schedule for 6:00 AM', hi: 'सुबह ६:०० बजे के लिए शेड्यूल करें', mr: 'सकाळी ६:०० वाजता शेड्यूल करा' },
  builtForDad: { en: 'Built for your dad', hi: 'पिताजी के लिए बनाया गया', mr: 'बाबांसाठी बनवलेले' },
  noDeveloper: { en: 'No developer required for daily updates.', hi: 'दैनिक अपडेट के लिए डेवलपर की ज़रूरत नहीं।', mr: 'दैनिक अपडेटसाठी डेव्हलपरची गरज नाही.' },
  adminText: { en: 'The admin panel lets him add blogs, YouTube links, audio, PPT/PDF, language versions, thumbnails, and scheduling from a simple mobile-friendly dashboard.', hi: 'एडमिन पैनल से वे सरल मोबाइल-फ्रेंडली डैशबोर्ड में ब्लॉग, यूट्यूब लिंक, ऑडियो, PPT/PDF, भाषा संस्करण, थंबनेल और शेड्यूलिंग जोड़ सकते हैं।', mr: 'अ‍ॅडमिन पॅनेलमधून ते सोप्या मोबाइल-फ्रेंडली डॅशबोर्डवर ब्लॉग, यूट्यूब लिंक, ऑडिओ, PPT/PDF, भाषा आवृत्ती, थंबनेल आणि शेड्यूलिंग जोडू शकतात.' },
  workflow: { en: 'Draft → preview → publish workflow', hi: 'ड्राफ्ट → प्रीव्यू → प्रकाशित प्रक्रिया', mr: 'मसुदा → पूर्वावलोकन → प्रकाशित प्रक्रिया' },
  calendar: { en: 'Calendar view for daily wisdom', hi: 'दैनिक ज्ञान के लिए कैलेंडर दृश्य', mr: 'दैनिक ज्ञानासाठी कॅलेंडर दृश्य' },
  mediaLibrary: { en: 'Media library for audio, PPT, PDF, and images', hi: 'ऑडियो, PPT, PDF और चित्रों के लिए मीडिया लाइब्रेरी', mr: 'ऑडिओ, PPT, PDF आणि चित्रांसाठी मीडिया लायब्ररी' },
  policies: { en: 'Admin-only Supabase policies from day one', hi: 'पहले दिन से केवल एडमिन के लिए Supabase सुरक्षा नियम', mr: 'पहिल्या दिवसापासून फक्त अ‍ॅडमिनसाठी Supabase सुरक्षा नियम' },
  footerExtra: { en: 'Built mobile-first for Indian families.', hi: 'भारतीय परिवारों के लिए मोबाइल-फर्स्ट बनाया गया।', mr: 'भारतीय कुटुंबांसाठी मोबाइल-फर्स्ट बनवलेले.' },
} satisfies Record<string, Record<Language, string>>;


export function WisdomExperience({ focus, initialLanguage = 'en', posts }: { focus: Focus; initialLanguage?: Language; posts: WisdomPost[] }) {
  const [language, setLanguage] = useState<Language>(initialLanguage);
  const [activeMode, setActiveMode] = useState<Mode>('read');
  const [query, setQuery] = useState('');
  const todayPost = posts[0];
  const pillar = getPillar(todayPost.pillar);
  const currentMedia = todayPost.media[language];
  const filteredPosts = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter((post) =>
      [post.title[language], post.excerpt[language], post.body[language], ...post.tags].join(' ').toLowerCase().includes(q)
    );
  }, [language, posts, query]);

  return (
    <main className="site-shell">
      <div className="aura aura-one" />
      <div className="aura aura-two" />
      <Header focus={focus} language={language} setLanguage={setLanguage} />

      <section className="hero-grid section-pad" id="today">
        <div className="hero-copy reveal">
          <div className="eyebrow"><Sparkles size={16} /> {HERITAGE_COPY.heroBadge[language]} • {uiCopy.freeForever[language]}</div>
          <h1>
            {uiCopy.heroTitleA[language]} <span>{uiCopy.heroTitleB[language]}</span>, {uiCopy.heroTitleC[language]}
          </h1>
          <p>{HERITAGE_COPY.heroDescription[language]}</p>
          <p className="founder-line">{HERITAGE_COPY.founderIntro[language]}</p>
          <div className="hero-actions">
            <Link className="primary-action" href={`/${language}/wisdom/${todayPost.id}`}>{uiCopy.openToday[language]} <ArrowUpRight size={18} /></Link>
            <a className="secondary-action" href={BRAND.youtube} target="_blank" rel="noreferrer">{uiCopy.youtube[language]}</a>
          </div>
          <div className="legacy-stats" aria-label="Sampurna Samruddhi history">
            {TRUST_STATS.map((stat) => (
              <div key={stat.value}>
                <strong>{stat.value}</strong>
                <span>{stat.label[language]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-orbit reveal delay-1" aria-hidden="true">
          <div className="orbit-ring" />
          <div className="daily-seal">
            <span>{BRAND.siteNameDevanagari}</span>
            <strong>365</strong>
            <small>{uiCopy.daysFree[language]}</small>
          </div>
          {PILLARS.map((item, index) => (
            <div className={`orbit-chip chip-${index}`} key={item.slug} style={{ '--tone': item.tone } as React.CSSProperties}>
              <b>{item.symbol}</b>
              <span>{item.name[language]}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="heritage-stage section-pad">
        <div className="founder-card reveal">
          <Image src={LEGACY_ASSETS.founder} alt={`${BRAND.founder} - Sampurna Samruddhi founder`} width={260} height={260} />
          <div>
            <span className="section-kicker">{uiCopy.heritageKicker[language]}</span>
            <h2>{BRAND.founder}</h2>
            <p>{HERITAGE_COPY.mission[language]}</p>
            <p>{HERITAGE_COPY.dailyGift[language]}</p>
          </div>
        </div>
      </section>

      <section className="today-stage section-pad" id="wisdom-card">
        <div className="section-heading reveal">
          <span className="section-kicker"><CalendarDays size={15} /> {uiCopy.todayKicker[language]}</span>
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
                    <span>{uiCopy.reflection[language]}</span>
                    <strong>{todayPost.reflection[language]}</strong>
                  </div>
                </div>
              </div>
            )}
            {activeMode === 'watch' && (
              <div className="media-panel">
                <Youtube size={34} />
                <h4>{uiCopy.videoTitle[language]}</h4>
                <p>{uiCopy.videoText[language]}</p>
                <a href={currentMedia.videoUrl || BRAND.youtube} target="_blank" rel="noreferrer">{uiCopy.openVideo[language]} <ArrowUpRight size={16} /></a>
              </div>
            )}
            {activeMode === 'listen' && (
              <div className="media-panel audio-wave">
                <Headphones size={34} />
                <h4>{uiCopy.audioTitle[language]}</h4>
                <p>{uiCopy.audioText[language]}</p>
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
                <div className="download-tile muted"><UploadCloud size={20} /><span>{language.toUpperCase()} Admin</span><strong>{uiCopy.uploadSlots[language]}</strong></div>
              </div>
            )}
          </div>

          <div className="wisdom-actions">
            <a href={`https://wa.me/?text=${encodeURIComponent(todayPost.title[language] + ' — ' + BRAND.siteName)}`} target="_blank" rel="noreferrer"><Share2 size={17} /> {uiCopy.share[language]}</a>
            <button><CheckCircle2 size={17} /> {uiCopy.markRead[language]}</button>
          </div>
        </article>
      </section>

      <section className="library-stage section-pad" id="library">
        <div className="section-heading compact reveal">
          <span className="section-kicker"><Library size={15} /> {uiCopy.libraryKicker[language]}</span>
          <h2>{uiCopy.libraryTitle[language]}</h2>
        </div>
        <div className="search-card reveal delay-1">
          <Search size={18} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={uiCopy.searchPlaceholder[language]} />
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
          <span className="section-kicker">{uiCopy.pillarKicker[language]}</span>
          <h2>{uiCopy.pillarTitle[language]}</h2>
        </div>
        <div className="pillar-grid">
          {PILLARS.map((item) => (
            <div className="pillar-card reveal legacy-pillar-card" key={item.slug} style={{ '--tone': item.tone, background: item.gradient } as React.CSSProperties}>
              <Image src={LEGACY_ASSETS[item.slug]} alt={`${item.name[language]} pillar`} width={480} height={240} />
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
          <span>{uiCopy.adminCms[language]}</span>
          <h3>{uiCopy.createTomorrow[language]}</h3>
          <label>{uiCopy.date[language]}</label>
          <div className="fake-input">14 May 2026</div>
          <label>{uiCopy.contentModes[language]}</label>
          <div className="admin-toggles"><button>Blog</button><button>Video</button><button>Audio</button><button>PPT</button></div>
          <label>{uiCopy.publishStatus[language]}</label>
          <div className="publish-row"><span>{uiCopy.draft[language]}</span><strong>{uiCopy.schedule[language]}</strong></div>
        </div>
        <div className="admin-copy reveal delay-1">
          <span className="section-kicker">{uiCopy.builtForDad[language]}</span>
          <h2>{uiCopy.noDeveloper[language]}</h2>
          <p>{uiCopy.adminText[language]}</p>
          <ul>
            <li>{uiCopy.workflow[language]}</li>
            <li>{uiCopy.calendar[language]}</li>
            <li>{uiCopy.mediaLibrary[language]}</li>
            <li>{uiCopy.policies[language]}</li>
          </ul>
        </div>
      </section>

      <MobileDock focus={focus} language={language} />
      <Footer language={language} />
    </main>
  );
}

function Header({ focus, language, setLanguage }: { focus: Focus; language: Language; setLanguage: (language: Language) => void }) {
  const router = useRouter();

  return (
    <header className="top-nav">
      <Link href="/" className="brand-mark">
        <span>ॐ</span>
        <div><strong>{BRAND.siteName}</strong><small>{BRAND.suffix}</small></div>
      </Link>
      <nav>
        {nav.map((item) => <Link className={focus === item.key ? 'active' : ''} href={localizedPath(language, item.key)} key={item.key}>{item.label[language]}</Link>)}
      </nav>
      <div className="nav-actions">
        <select value={language} onChange={(event) => { const nextLanguage = event.target.value as Language; setLanguage(nextLanguage); router.push(localizedPath(nextLanguage, focus)); }} aria-label="Language">
          {LANGUAGES.map((item) => <option value={item.code} key={item.code}>{item.native}</option>)}
        </select>
        <button className="menu-button" aria-label="Open menu"><Menu size={19} /></button>
      </div>
    </header>
  );
}


function MobileDock({ focus, language }: { focus: Focus; language: Language }) {
  return (
    <nav className="mobile-dock" aria-label="Mobile navigation">
      {nav.slice(0, 4).map((item) => (
        <Link className={focus === item.key ? 'active' : ''} href={localizedPath(language, item.key)} key={item.key}>
          {item.label[language]}
        </Link>
      ))}
    </nav>
  );
}

function Footer({ language }: { language: Language }) {
  return (
    <footer className="site-footer">
      <div>
        <strong>{BRAND.siteName}</strong>
        <p>{HERITAGE_COPY.footerTagline[language]} {uiCopy.footerExtra[language]}</p>
      </div>
      <div>
        <a href={BRAND.youtube} target="_blank" rel="noreferrer">YouTube</a>
        <a href={`mailto:${BRAND.email}`}>Email</a>
        <a href={`https://wa.me/${BRAND.whatsapp}`} target="_blank" rel="noreferrer">WhatsApp</a>
      </div>
    </footer>
  );
}
