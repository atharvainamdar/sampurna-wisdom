'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { BookOpen, CalendarDays, ChevronLeft, ChevronRight, Download, FileText, FlaskConical, Globe2, Headphones, Leaf, Lock, Mail, Menu, Phone, Play, Sprout, Video, type LucideIcon } from 'lucide-react';
import { BRAND, HERITAGE_COPY, LANGUAGES, Language, WisdomPost, getPillar } from '@/lib/content';
import { localizedPath } from '@/lib/i18n';

type Focus = 'today' | 'library' | 'pillars' | 'about' | 'community';
type Mode = 'read' | 'watch' | 'listen' | 'pdf';

const nav: Array<{ key: Focus; label: Record<Language, string> }> = [
  { key: 'today', label: { en: 'Daily Wisdom', hi: 'दैनिक ज्ञान', mr: 'दैनिक ज्ञान' } },
  { key: 'about', label: { en: 'About', hi: 'आमच्याबद्दल', mr: 'आमच्याबद्दल' } },
];

const copy = {
  eyebrow: { en: 'Health • Knowledge • Prosperity • Sadhana', hi: 'आरोग्य • ज्ञान • समृद्धि • साधना', mr: 'आरोग्य • ज्ञान • समृद्धी • साधना' },
  titleA: { en: 'Wisdom practice for a', hi: 'आरोग्यदायी जीवनासाठी', mr: 'आरोग्यदायी जीवनासाठी' },
  titleB: { en: 'healthy, prosperous life', hi: 'ज्ञानाची उपासना', mr: 'ज्ञानाची उपासना' },
  subtitle: { en: 'Every day unlocks one set of guidance: reading, video, audio, and resources for that day only.', hi: 'हर दिन केवल उसी दिन का मार्गदर्शन खुलता है: लेख, वीडियो, ऑडियो और संसाधन।', mr: 'दररोज फक्त त्या दिवसाचे मार्गदर्शन उघडते: लेख, व्हिडिओ, ऑडिओ आणि साधने.' },
  start: { en: 'Start today', hi: 'आज शुरू करें', mr: 'आज सुरू करा' },
  free: { en: 'Free daily content', hi: 'निःशुल्क दैनिक सामग्री', mr: 'मोफत दैनिक साहित्य' },
  read: { en: 'Blog', hi: 'ब्लॉग', mr: 'ब्लॉग' },
  readSub: { en: 'Read today’s article', hi: 'आज का लेख पढ़ें', mr: 'आजचा लेख वाचा' },
  watch: { en: 'Video', hi: 'व्हिडिओ', mr: 'व्हिडिओ' },
  watchSub: { en: 'Watch today’s video', hi: 'आज का वीडियो देखें', mr: 'आजचा व्हिडिओ पहा' },
  listen: { en: 'Audio', hi: 'ऑडिओ', mr: 'ऑडिओ' },
  listenSub: { en: 'Listen if available', hi: 'उपलब्ध हो तो सुनें', mr: 'उपलब्ध असल्यास ऐका' },
  pdf: { en: 'PDF', hi: 'PDF', mr: 'PDF' },
  pdfSub: { en: 'Daily resources', hi: 'दैनिक संसाधन', mr: 'दैनिक साधने' },
  founderOne: { en: 'Shri. Ramesh Inamdar', hi: 'श्री. रमेश इनामदार', mr: 'श्री. रमेश इनामदार' },
  founderOneRole: { en: 'Founder', hi: 'संस्थापक', mr: 'संस्थापक' },
  founderTwo: { en: 'Smt. Sujata Inamdar', hi: 'सौ. सुजाता इनामदार', mr: 'सौ. सुजाता इनामदार' },
  founderTwoRole: { en: 'Co-founder', hi: 'सह-संस्थापक', mr: 'सह-संस्थापक' },
  calendarTitle: { en: 'Content calendar', hi: 'सामग्री कैलेंडर', mr: 'साहित्य दिनदर्शिका' },
  unlockNote: { en: 'New content unlocks every morning at 6 AM. Future dates stay locked.', hi: 'नई सामग्री हर सुबह ६ बजे खुलती है। भविष्य की तारीखें लॉक रहती हैं।', mr: 'नवीन साहित्य दररोज सकाळी ६ वाजता उघडते. पुढील तारखा लॉक राहतात.' },
  locked: { en: 'This day is locked.', hi: 'यह दिन लॉक है।', mr: 'हा दिवस लॉक आहे.' },
  noContent: { en: 'No content is available for this day.', hi: 'इस दिन के लिए सामग्री उपलब्ध नहीं है।', mr: 'या दिवसासाठी साहित्य उपलब्ध नाही.' },
  noAudio: { en: 'Audio is not available for this day yet.', hi: 'इस दिन का ऑडियो अभी उपलब्ध नहीं है।', mr: 'या दिवसाचा ऑडिओ अद्याप उपलब्ध नाही.' },
  noPdf: { en: 'No downloadable resource for this day.', hi: 'इस दिन के लिए डाउनलोड संसाधन नहीं है।', mr: 'या दिवसासाठी डाउनलोड साधन नाही.' },
  openVideo: { en: 'Open video', hi: 'वीडियो खोलें', mr: 'व्हिडिओ उघडा' },
  fullPage: { en: 'Open full day page', hi: 'पूरा दिन पेज खोलें', mr: 'पूर्ण दिवसाचे पान उघडा' },
  aboutTitle: { en: 'About Sampurna Samruddhi Upasana', hi: 'संपूर्ण समृद्धि उपासना के बारे में', mr: 'संपूर्ण समृद्धी उपासना बद्दल' },
  aboutSubtitle: { en: 'A simple mission: make complete prosperity wisdom available to every family.', hi: 'एक सरल मिशन: संपूर्ण समृद्धि का ज्ञान हर परिवार तक पहुँचाना।', mr: 'एक साधे ध्येय: संपूर्ण समृद्धीचे ज्ञान प्रत्येक कुटुंबापर्यंत पोहोचवणे.' },
  features: { en: 'Our speciality', hi: 'हमारी विशेषताएँ', mr: 'आमची वैशिष्ट्ये' },
  featureScience: { en: 'Scientific and research-based information', hi: 'वैज्ञानिक और शोध-आधारित जानकारी', mr: 'वैज्ञानिक आणि संशोधनआधारित माहिती' },
  featureSimple: { en: 'Simple guidance in your own language', hi: 'सरल भाषा में मार्गदर्शन', mr: 'सोप्या भाषेत सखोल मार्गदर्शन' },
  featureFree: { en: '100% free and accessible to everyone', hi: '१००% निःशुल्क और सभी के लिए उपलब्ध', mr: '100% मोफत आणि सर्वांसाठी उपलब्ध' },
  featureCare: { en: 'Your health, your responsibility', hi: 'आपका स्वास्थ्य, आपकी ज़िम्मेदारी', mr: 'आपले आरोग्य, आपली जबाबदारी' },
  updates: { en: 'Get updates', hi: 'अपडेट प्राप्त करें', mr: 'अपडेट मिळवा' },
  website: { en: 'Website', hi: 'वेबसाइट', mr: 'वेबसाईट' },
  email: { en: 'Email', hi: 'ईमेल', mr: 'ईमेल' },
  contact: { en: 'Contact', hi: 'संपर्क', mr: 'संपर्क' },
} satisfies Record<string, Record<Language, string>>;

const modeMeta: Record<Mode, { icon: LucideIcon; label: keyof typeof copy; subtitle: keyof typeof copy }> = {
  read: { icon: BookOpen, label: 'read', subtitle: 'readSub' },
  watch: { icon: Video, label: 'watch', subtitle: 'watchSub' },
  listen: { icon: Headphones, label: 'listen', subtitle: 'listenSub' },
  pdf: { icon: FileText, label: 'pdf', subtitle: 'pdfSub' },
};

const featureIcons = [FlaskConical, BookOpen, Sprout, Leaf];

export function WisdomExperience({ focus, initialLanguage = 'mr', posts }: { focus: Focus; initialLanguage?: Language; posts: WisdomPost[] }) {
  const [language, setLanguage] = useState<Language>(initialLanguage);
  return (
    <main className="reference-shell daily-reference-shell">
      <ReferenceHeader focus={focus} language={language} setLanguage={setLanguage} />
      {focus === 'about' ? <AboutPage language={language} /> : <DailyContentPage language={language} posts={posts} />}
      <ReferenceFooter language={language} />
    </main>
  );
}

function DailyContentPage({ language, posts }: { language: Language; posts: WisdomPost[] }) {
  const sortedPosts = useMemo(() => [...posts].sort((a, b) => b.date.localeCompare(a.date)), [posts]);
  const postsByDate = useMemo(() => new Map(sortedPosts.map((post) => [post.date, post])), [sortedPosts]);
  const initialPost = useMemo(() => sortedPosts.find((post) => isUnlocked(post.date)) || sortedPosts[0], [sortedPosts]);
  const [selectedDate, setSelectedDate] = useState(initialPost?.date || todayKey());
  const [currentMonth, setCurrentMonth] = useState(() => monthStart(parseDate(initialPost?.date || todayKey())));
  const [activeMode, setActiveMode] = useState<Mode>('read');
  const selectedPost = postsByDate.get(selectedDate);
  const selectedUnlocked = selectedPost ? isUnlocked(selectedPost.date) : false;
  const availableModes = selectedPost && selectedUnlocked ? getAvailableModes(selectedPost, language) : [];
  const safeMode = availableModes.includes(activeMode) ? activeMode : availableModes[0] || 'read';

  return (
    <>
      <section className="reference-hero daily-hero">
        <div className="hero-leaf"><Leaf size={28} /> {copy.eyebrow[language]}</div>
        <div className="reference-hero-copy">
          <h1>{copy.titleA[language]} <span>{copy.titleB[language]}</span></h1>
          <p>{copy.subtitle[language]}</p>
          <div className="hero-mode-row">{(Object.keys(modeMeta) as Mode[]).map((mode) => <ModePill key={mode} mode={mode} language={language} />)}</div>
          <div className="hero-actions clean-actions"><a href="#daily-content" className="green-cta"><Play size={18} /> {copy.start[language]}</a><span className="outline-cta">{copy.free[language]}</span></div>
        </div>
        <FounderVisual language={language} />
      </section>

      <section className="daily-console" id="daily-content">
        <CalendarPanel language={language} postsByDate={postsByDate} selectedDate={selectedDate} currentMonth={currentMonth} onMonthChange={setCurrentMonth} onSelectDate={(date) => { setSelectedDate(date); setActiveMode('read'); }} />
        <article className="daily-content-card">
          {selectedPost && selectedUnlocked ? (
            <>
              <div className="daily-card-head" style={{ '--tone': getPillar(selectedPost.pillar).tone } as React.CSSProperties}>
                <span>{new Date(`${selectedPost.date}T00:00:00`).toLocaleDateString(localeFor(language), { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                <h2>{selectedPost.title[language]}</h2>
                <p>{selectedPost.excerpt[language]}</p>
              </div>
              <div className="daily-mode-tabs">
                {availableModes.map((mode) => {
                  const Icon = modeMeta[mode].icon;
                  return <button key={mode} className={safeMode === mode ? 'active' : ''} onClick={() => setActiveMode(mode)}><Icon size={18} /> {copy[modeMeta[mode].label][language]}</button>;
                })}
              </div>
              <ModePanel post={selectedPost} mode={safeMode} language={language} />
              <Link className="full-day-link" href={`/${language}/wisdom/${selectedPost.id}`}>{copy.fullPage[language]} →</Link>
            </>
          ) : <LockedPanel language={language} hasPost={Boolean(selectedPost)} />}
        </article>
      </section>
      <FeatureRow language={language} />
    </>
  );
}

function CalendarPanel({ language, postsByDate, selectedDate, currentMonth, onMonthChange, onSelectDate }: { language: Language; postsByDate: Map<string, WisdomPost>; selectedDate: string; currentMonth: Date; onMonthChange: (date: Date) => void; onSelectDate: (date: string) => void }) {
  const days = calendarDays(currentMonth);
  const label = currentMonth.toLocaleDateString(localeFor(language), { month: 'long', year: 'numeric' });
  const weekDays = language === 'en' ? ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] : language === 'hi' ? ['रवि', 'सोम', 'मंगल', 'बुध', 'गुरु', 'शुक्र', 'शनि'] : ['रवि', 'सोम', 'मंगळ', 'बुध', 'गुरु', 'शुक्र', 'शनि'];
  return (
    <aside className="daily-calendar-card">
      <div className="calendar-card-top"><div><strong>{copy.calendarTitle[language]}</strong><small>{copy.unlockNote[language]}</small></div><CalendarDays size={26} /></div>
      <div className="calendar-month-row"><button onClick={() => onMonthChange(addMonths(currentMonth, -1))} aria-label="Previous month"><ChevronLeft size={18} /></button><b>{label}</b><button onClick={() => onMonthChange(addMonths(currentMonth, 1))} aria-label="Next month"><ChevronRight size={18} /></button></div>
      <div className="calendar-grid-mini week-labels">{weekDays.map((day) => <span key={day}>{day}</span>)}</div>
      <div className="calendar-grid-mini">
        {days.map((date) => {
          const key = dateKey(date);
          const post = postsByDate.get(key);
          const unlocked = post ? isUnlocked(key) : false;
          return <button key={key} disabled={!post || !unlocked} onClick={() => onSelectDate(key)} className={`${key === selectedDate ? 'active' : ''} ${post ? 'has-post' : ''} ${unlocked ? 'unlocked' : 'locked'} ${date.getMonth() !== currentMonth.getMonth() ? 'muted' : ''}`}><span>{date.getDate()}</span>{post && !unlocked ? <Lock size={11} /> : null}</button>;
        })}
      </div>
    </aside>
  );
}

function ModePanel({ post, mode, language }: { post: WisdomPost; mode: Mode; language: Language }) {
  const media = post.media[language];
  if (mode === 'read') return <div className="daily-reader">{post.body[language].split('\n').filter(Boolean).map((line) => <p key={line.slice(0, 48)}>{line}</p>)}</div>;
  if (mode === 'watch') {
    const videoUrl = media.videoUrl || post.media.en.videoUrl;
    const embed = getYouTubeEmbedUrl(videoUrl);
    return <div className="daily-video-panel">{embed ? <iframe src={embed} title={post.title[language]} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen /> : null}<a href={videoUrl || BRAND.youtube} target="_blank" rel="noreferrer">{copy.openVideo[language]}</a></div>;
  }
  if (mode === 'listen') {
    const audio = media.audioUrl || post.media.en.audioUrl;
    return <div className="daily-audio-panel">{audio ? <audio controls src={audio} /> : <p>{copy.noAudio[language]}</p>}</div>;
  }
  return <div className="daily-resource-panel">{media.resources.length ? media.resources.map((resource) => <a href={resource.url} key={resource.url} target="_blank" rel="noreferrer"><Download size={18} /> {resource.label}</a>) : <p>{copy.noPdf[language]}</p>}</div>;
}

function LockedPanel({ language, hasPost }: { language: Language; hasPost: boolean }) {
  return <div className="locked-day-panel"><Lock size={42} /><h2>{hasPost ? copy.locked[language] : copy.noContent[language]}</h2><p>{copy.unlockNote[language]}</p></div>;
}

function AboutPage({ language }: { language: Language }) {
  return <section className="about-page-functional"><FounderVisual language={language} /><div><span className="hero-leaf compact"><Leaf size={22} /> {copy.eyebrow[language]}</span><h1>{copy.aboutTitle[language]}</h1><p>{copy.aboutSubtitle[language]}</p><p>{HERITAGE_COPY.founderIntro[language]}</p><p>{HERITAGE_COPY.mission[language]}</p></div><FeatureRow language={language} /></section>;
}

function FounderVisual({ language }: { language: Language }) {
  return <div className="reference-founder-visual"><div className="founder-photo-card"><Image src="/legacy-assets/dad_photo.jpg" alt={copy.founderOne[language]} width={520} height={620} priority /><Image src="/legacy-assets/mom_photo.jpg" alt={copy.founderTwo[language]} width={420} height={560} priority /></div><div className="founder-name-strip"><div><strong>{copy.founderOne[language]}</strong><span>({copy.founderOneRole[language]})</span></div><div><strong>{copy.founderTwo[language]}</strong><span>({copy.founderTwoRole[language]})</span></div></div></div>;
}

function ModePill({ mode, language }: { mode: Mode; language: Language }) {
  const Icon = modeMeta[mode].icon;
  return <div className="mode-pill"><span><Icon size={24} /></span><div><strong>{copy[modeMeta[mode].label][language]}</strong><small>{copy[modeMeta[mode].subtitle][language]}</small></div></div>;
}

function FeatureRow({ language }: { language: Language }) {
  return <section className="reference-trust-row" aria-label={copy.features[language]}>{[copy.featureScience, copy.featureSimple, copy.featureFree, copy.featureCare].map((item, index) => { const Icon = featureIcons[index]; return <div key={item[language]}><Icon size={34} /><span>{item[language]}</span></div>; })}</section>;
}

function ReferenceHeader({ focus, language, setLanguage }: { focus: Focus; language: Language; setLanguage: (language: Language) => void }) {
  const router = useRouter();
  return <header className="reference-header"><Link href={`/${language}`} className="reference-brand"><Image src="/legacy-assets/logo.jpeg" alt={BRAND.siteName} width={62} height={62} /><div><strong>Sampurna Samruddhi Upasana</strong><span>{BRAND.siteNameDevanagari}, समृद्ध आणि आनंदी जीवन</span></div></Link><nav>{nav.map((item) => <Link className={focus === item.key ? 'active' : ''} href={localizedPath(language, item.key)} key={item.key}>{item.label[language]}</Link>)}</nav><div className="reference-actions"><select value={language} onChange={(event) => { const next = event.target.value as Language; setLanguage(next); router.push(localizedPath(next, focus)); }} aria-label="Language">{LANGUAGES.map((item) => <option value={item.code} key={item.code}>{item.native}</option>)}</select><a href={`https://wa.me/${BRAND.whatsapp}`} target="_blank" rel="noreferrer"><Mail size={16} /> {copy.updates[language]}</a><button><Menu size={24} /></button></div></header>;
}

function ReferenceFooter({ language }: { language: Language }) {
  return <footer className="reference-footer"><a href="https://fabselfhelp.com" target="_blank" rel="noreferrer"><Globe2 size={24} /><span>{copy.website[language]}<small>fabselfhelp.com</small></span></a><a href={`mailto:${BRAND.email}`}><Mail size={24} /><span>{copy.email[language]}<small>{BRAND.email}</small></span></a><a href={`https://wa.me/${BRAND.whatsapp}`} target="_blank" rel="noreferrer"><Phone size={24} /><span>{copy.contact[language]}<small>{BRAND.phone}</small></span></a></footer>;
}

function getAvailableModes(post: WisdomPost, language: Language): Mode[] {
  const media = post.media[language];
  const modes: Mode[] = [];
  if (post.body[language]) modes.push('read');
  if (media.videoUrl || post.media.en.videoUrl) modes.push('watch');
  if (media.audioUrl || post.media.en.audioUrl) modes.push('listen');
  if (media.resources.length) modes.push('pdf');
  return modes.length ? modes : ['read'];
}

function getYouTubeEmbedUrl(url?: string) {
  if (!url) return null;
  const id = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([^&?/]+)/)?.[1];
  return id ? `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1` : null;
}

function isUnlocked(date: string) {
  const today = todayKey();
  if (date < today) return true;
  if (date > today) return false;
  return new Date().getHours() >= 6;
}

function todayKey() { return dateKey(new Date()); }
function dateKey(date: Date) { return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`; }
function parseDate(date: string) { return new Date(`${date}T00:00:00`); }
function monthStart(date: Date) { return new Date(date.getFullYear(), date.getMonth(), 1); }
function addMonths(date: Date, amount: number) { return new Date(date.getFullYear(), date.getMonth() + amount, 1); }
function calendarDays(month: Date) { const start = new Date(month.getFullYear(), month.getMonth(), 1); start.setDate(start.getDate() - start.getDay()); return Array.from({ length: 42 }, (_, index) => { const date = new Date(start); date.setDate(start.getDate() + index); return date; }); }
function localeFor(language: Language) { return language === 'en' ? 'en-IN' : language === 'hi' ? 'hi-IN-u-nu-deva' : 'mr-IN'; }
