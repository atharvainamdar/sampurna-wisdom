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
  subtitle: { en: 'Every day unlocks one simple guidance set: a readable blog and a video for that day only.', hi: 'हर दिन केवल उसी दिन का सरल मार्गदर्शन खुलता है: लेख और वीडियो।', mr: 'दररोज फक्त त्या दिवसाचे सोपे मार्गदर्शन उघडते: लेख आणि व्हिडिओ.' },
  start: { en: 'Start today', hi: 'आज शुरू करें', mr: 'आज सुरू करा' },
  free: { en: 'Free daily content', hi: 'निःशुल्क दैनिक सामग्री', mr: 'मोफत दैनिक साहित्य' },
  read: { en: 'Blog', hi: 'ब्लॉग', mr: 'ब्लॉग' },
  readSub: { en: 'Read today’s article', hi: 'आज का लेख पढ़ें', mr: 'आजचा लेख वाचा' },
  watch: { en: 'Video', hi: 'व्हिडिओ', mr: 'व्हिडिओ' },
  watchSub: { en: 'Watch today’s video', hi: 'आज का वीडियो देखें', mr: 'आजचा व्हिडिओ पहा' },
  listen: { en: 'Audio', hi: 'ऑडिओ', mr: 'ऑडिओ' },
  listenSub: { en: 'Listen if available', hi: 'उपलब्ध हो तो सुनें', mr: 'उपलब्ध असल्यास ऐका' },
  pdf: { en: 'PDF', hi: 'PDF', mr: 'PDF' },
  pdfSub: { en: 'Download the PDF', hi: 'PDF डाउनलोड करें', mr: 'PDF डाउनलोड करा' },
  readNow: { en: 'Read now', hi: 'अभी पढ़ें', mr: 'आता वाचा' },
  watchNow: { en: 'Watch now', hi: 'अभी देखें', mr: 'आता पहा' },
  listenNow: { en: 'Listen now', hi: 'अभी सुनें', mr: 'आता ऐका' },
  downloadNow: { en: 'Download', hi: 'डाउनलोड', mr: 'डाउनलोड' },
  founderOne: { en: 'Shri. Ramesh Inamdar', hi: 'श्री. रमेश इनामदार', mr: 'श्री. रमेश इनामदार' },
  founderOneRole: { en: 'Founder', hi: 'संस्थापक', mr: 'संस्थापक' },
  founderTwo: { en: 'Smt. Sujata Inamdar', hi: 'सौ. सुजाता इनामदार', mr: 'सौ. सुजाता इनामदार' },
  founderTwoRole: { en: 'Co-founder', hi: 'सह-संस्थापक', mr: 'सह-संस्थापक' },
  calendarTitle: { en: 'Content calendar', hi: 'सामग्री कैलेंडर', mr: 'साहित्य दिनदर्शिका' },
  todayContent: { en: 'Today’s free content', hi: 'आज की निःशुल्क सामग्री', mr: 'आजचे मोफत साहित्य' },
  unlockNote: { en: 'New content unlocks every morning at 6 AM. Future dates stay locked.', hi: 'नई सामग्री हर सुबह ६ बजे खुलती है। भविष्य की तारीखें लॉक रहती हैं।', mr: 'नवीन साहित्य दररोज सकाळी ६ वाजता उघडते. पुढील तारखा लॉक राहतात.' },
  chooseDay: { en: 'Choose an unlocked day', hi: 'खुला हुआ दिन चुनें', mr: 'उघडलेला दिवस निवडा' },
  selectedDay: { en: 'Selected day', hi: 'चुना हुआ दिन', mr: 'निवडलेला दिवस' },
  locked: { en: 'This day is locked.', hi: 'यह दिन लॉक है।', mr: 'हा दिवस लॉक आहे.' },
  noContent: { en: 'No content is available for this day.', hi: 'इस दिन के लिए सामग्री उपलब्ध नहीं है।', mr: 'या दिवसासाठी साहित्य उपलब्ध नाही.' },
  noAudio: { en: 'Audio is not available for this day yet.', hi: 'इस दिन का ऑडियो अभी उपलब्ध नहीं है।', mr: 'या दिवसाचा ऑडिओ अद्याप उपलब्ध नाही.' },
  noPdf: { en: 'No downloadable resource for this day.', hi: 'इस दिन के लिए डाउनलोड संसाधन नहीं है।', mr: 'या दिवसासाठी डाउनलोड साधन नाही.' },
  openVideo: { en: 'Open video', hi: 'वीडियो खोलें', mr: 'व्हिडिओ उघडा' },
  fullPage: { en: 'Open full day page', hi: 'पूरा दिन पेज खोलें', mr: 'पूर्ण दिवसाचे पान उघडा' },
  aboutTitle: { en: 'About Sampurna Samruddhi Upasana', hi: 'संपूर्ण समृद्धि उपासना के बारे में', mr: 'संपूर्ण समृद्धी उपासना बद्दल' },
  aboutHeroA: { en: 'Self Help.', hi: 'स्व-सहायता।', mr: 'स्व-मदत.' },
  aboutHeroB: { en: 'Real Change.', hi: 'वास्तविक परिवर्तन।', mr: 'खरा बदल.' },
  aboutHeroC: { en: 'Complete Prosperity.', hi: 'संपूर्ण समृद्धि।', mr: 'संपूर्ण समृद्धी.' },
  birthright: { en: 'Complete prosperity is your birthright.', hi: 'संपूर्ण समृद्धि आपका जन्मसिद्ध अधिकार है।', mr: 'संपूर्ण समृद्धी हा तुमचा जन्मसिद्ध हक्क आहे.' },
  aboutSubtitle: { en: 'A simple mission: make complete prosperity wisdom available to every family.', hi: 'एक सरल मिशन: संपूर्ण समृद्धि का ज्ञान हर परिवार तक पहुँचाना।', mr: 'एक साधे ध्येय: संपूर्ण समृद्धीचे ज्ञान प्रत्येक कुटुंबापर्यंत पोहोचवणे.' },
  founderStory: { en: 'Sampurna Samruddhi Upasana brings health, knowledge, prosperity and sadhana together in simple daily guidance.', hi: 'संपूर्ण समृद्धि उपासना स्वास्थ्य, ज्ञान, समृद्धि और साधना को सरल दैनिक मार्गदर्शन में जोड़ती है।', mr: 'संपूर्ण समृद्धी उपासना आरोग्य, ज्ञान, समृद्धी आणि साधना यांना सोप्या दैनिक मार्गदर्शनात एकत्र आणते.' },
  founderGuidance: { en: 'Guidance rooted in study, lived experience and a desire to help families grow with clarity.', hi: 'अध्ययन, अनुभव और परिवारों की स्पष्ट प्रगति की भावना पर आधारित मार्गदर्शन।', mr: 'अभ्यास, अनुभव आणि कुटुंबांना स्पष्टतेने वाढण्यासाठी मदत करण्याच्या भावनेवर आधारित मार्गदर्शन.' },
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

const modeMeta: Record<Mode, { icon: LucideIcon; label: keyof typeof copy; subtitle: keyof typeof copy; action: keyof typeof copy }> = {
  read: { icon: FileText, label: 'read', subtitle: 'readSub', action: 'readNow' },
  watch: { icon: Video, label: 'watch', subtitle: 'watchSub', action: 'watchNow' },
  listen: { icon: Headphones, label: 'listen', subtitle: 'listenSub', action: 'listenNow' },
  pdf: { icon: FileText, label: 'pdf', subtitle: 'pdfSub', action: 'downloadNow' },
};

const featureIcons = [FlaskConical, BookOpen, Sprout, Leaf];

export function WisdomExperience({ focus, initialLanguage = 'en', posts, initialDate, initialMode, initialMonth, initialExpandedMode }: { focus: Focus; initialLanguage?: Language; posts: WisdomPost[]; initialDate?: string; initialMode?: Mode; initialMonth?: string; initialExpandedMode?: Mode }) {
  const [language, setLanguage] = useState<Language>(initialLanguage);
  return (
    <main className="reference-shell daily-reference-shell" lang={language}>
      <ReferenceHeader focus={focus} language={language} setLanguage={setLanguage} />
      {focus === 'about' ? <AboutPage language={language} /> : <DailyContentPage language={language} posts={posts} initialDate={initialDate} initialMode={initialMode} initialMonth={initialMonth} initialExpandedMode={initialExpandedMode} />}
      <ReferenceFooter language={language} />
    </main>
  );
}

function DailyContentPage({ language, posts, initialDate, initialMode, initialMonth, initialExpandedMode }: { language: Language; posts: WisdomPost[]; initialDate?: string; initialMode?: Mode; initialMonth?: string; initialExpandedMode?: Mode }) {
  const sortedPosts = useMemo(() => [...posts].sort((a, b) => b.date.localeCompare(a.date)), [posts]);
  const postsByDate = useMemo(() => new Map(sortedPosts.map((post) => [post.date, post])), [sortedPosts]);
  const initialPost = useMemo(() => sortedPosts.find((post) => isUnlocked(post.date)) || sortedPosts[0], [sortedPosts]);
  const fallbackDate = initialPost?.date || todayKey();
  const selectedDate = initialDate && postsByDate.has(initialDate) ? initialDate : fallbackDate;
  const selectedPost = postsByDate.get(selectedDate);
  const selectedUnlocked = selectedPost ? isUnlocked(selectedPost.date) : false;
  const modes: Mode[] = ['read', 'watch'];
  const activeMode = initialMode && modes.includes(initialMode) ? initialMode : 'read';
  const currentMonth = monthStart(parseMonth(initialMonth) || parseDate(selectedDate));
  const selectedMode = initialExpandedMode || activeMode;
  const [hoverMode, setHoverMode] = useState<Mode | null>(null);

  return (
    <>
      <section className="daily-home-hero">
        <div className="daily-home-copy">
          <div className="about-kicker"><Leaf size={18} /> {copy.eyebrow[language]}</div>
          <h1>{copy.titleA[language]} <span>{copy.titleB[language]}</span></h1>
          <p>{copy.subtitle[language]}</p>
        </div>
      </section>

      <section className="daily-section-shell daily-home-content" id="daily-content">
        <div className="daily-home-content-card">
          <div className="daily-section-heading"><div className="heading-ornament"><span /></div><h2>{copy.todayContent[language]}</h2>{selectedPost ? <p><CalendarDays size={15} /> {new Date(`${selectedPost.date}T00:00:00`).toLocaleDateString(localeFor(language), { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p> : null}</div>
          <article className="daily-content-card">
            {selectedPost && selectedUnlocked ? (
              <>
                <div className="daily-card-head" style={{ '--tone': getPillar(selectedPost.pillar).tone } as React.CSSProperties}>
                  <span className="date-pill"><CalendarDays size={14} /> {new Date(`${selectedPost.date}T00:00:00`).toLocaleDateString(localeFor(language), { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  <h2>{selectedPost.title[language]}</h2>
                  <p>{selectedPost.excerpt[language]}</p>
                </div>
                <div className="daily-mode-stack">
                  {modes.map((mode) => {
                    const meta = modeMeta[mode];
                    const Icon = meta.icon;
                    return (
                      <section
                        key={mode}
                        className={`daily-mode-block daily-mode-block-${mode} ${selectedMode === mode ? 'active' : ''}`}
                        onMouseEnter={() => setHoverMode(mode)}
                        onMouseLeave={() => setHoverMode(null)}
                        onFocus={() => setHoverMode(mode)}
                        onBlur={() => setHoverMode(null)}
                      >
                        <div className="daily-mode-block-head">
                          <span className="daily-mode-icon"><Icon size={26} /></span>
                          <span className="daily-mode-copy"><strong>{copy[meta.label][language]}</strong><small>{copy[meta.subtitle][language]}</small></span>
                        </div>
                        <ModePanel post={selectedPost} mode={mode} language={language} autoplay={hoverMode === 'watch' && mode === 'watch'} />
                      </section>
                    );
                  })}
                </div>
              </>
            ) : <LockedPanel language={language} hasPost={Boolean(selectedPost)} />}
          </article>
        </div>
      </section>

      <FeatureRow language={language} />
      <section className="daily-calendar-secondary" id="daily-calendar-secondary" aria-label={copy.calendarTitle[language]}>
        <a className="calendar-close" href="#daily-content">× Close</a>
        <div className="daily-calendar-secondary-head"><span>{copy.unlockNote[language]}</span><h2>{copy.calendarTitle[language]}</h2><p className="calendar-selected-date"><CalendarDays size={18} /> {new Date(`${selectedDate}T00:00:00`).toLocaleDateString(localeFor(language), { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p><p>{copy.chooseDay[language]}</p></div>
        <CalendarPanel language={language} postsByDate={postsByDate} selectedDate={selectedDate} currentMonth={currentMonth} activeMode={selectedMode} />
      </section>
    </>
  );
}

function CalendarPanel({ language, postsByDate, selectedDate, currentMonth, activeMode }: { language: Language; postsByDate: Map<string, WisdomPost>; selectedDate: string; currentMonth: Date; activeMode: Mode }) {
  const days = calendarDays(currentMonth);
  const label = currentMonth.toLocaleDateString(localeFor(language), { month: 'long', year: 'numeric' });
  const weekDays = language === 'en' ? ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] : language === 'hi' ? ['रवि', 'सोम', 'मंगल', 'बुध', 'गुरु', 'शुक्र', 'शनि'] : ['रवि', 'सोम', 'मंगळ', 'बुध', 'गुरु', 'शुक्र', 'शनि'];
  return (
    <aside className="daily-calendar-card">
      <div className="calendar-card-top"><div><strong>{copy.calendarTitle[language]}</strong><small>{copy.chooseDay[language]}</small></div><CalendarDays size={26} /></div>
      <div className="calendar-month-row"><Link href={calendarMonthHref(language, selectedDate, activeMode, monthKey(addMonths(currentMonth, -1)))} aria-label="Previous month"><ChevronLeft size={18} /></Link><b>{label}</b><Link href={calendarMonthHref(language, selectedDate, activeMode, monthKey(addMonths(currentMonth, 1)))} aria-label="Next month"><ChevronRight size={18} /></Link></div>
      <div className="calendar-grid-mini week-labels">{weekDays.map((day) => <span key={day}>{day}</span>)}</div>
      <div className="calendar-grid-mini">
        {days.map((date) => {
          const key = dateKey(date);
          const post = postsByDate.get(key);
          const unlocked = post ? isUnlocked(key) : false;
          const className = `${key === selectedDate ? 'active' : ''} ${post ? 'has-post' : ''} ${unlocked ? 'unlocked' : 'locked'} ${date.getMonth() !== currentMonth.getMonth() ? 'muted' : ''}`;
          return post && unlocked ? <Link key={key} href={dailyHref(language, key, activeMode, monthKey(currentMonth))} className={className}><span>{date.getDate()}</span></Link> : <span key={key} className={className}><span>{date.getDate()}</span>{post ? <Lock size={11} /> : null}</span>;
        })}
      </div>
    </aside>
  );
}

function ModePanel({ post, mode, language, autoplay = false }: { post: WisdomPost; mode: Mode; language: Language; autoplay?: boolean }) {
  const media = post.media[language];
  if (mode === 'read') {
    const body = post.body[language];
    return <div className="daily-reader daily-inline-player"><h3>{post.title[language]}</h3>{body ? body.split('\n').filter(Boolean).map((line) => <p key={line.slice(0, 48)}>{line}</p>) : <p>{copy.noContent[language]}</p>}</div>;
  }
  if (mode === 'watch') {
    const videoUrl = media.videoUrl || post.media.en.videoUrl;
    const videoId = getYouTubeId(videoUrl);
    if (!videoId) return <div className="daily-video-panel daily-inline-player" />;
    const embed = getYouTubeEmbedUrl(videoId);
    return <div className="daily-video-panel daily-inline-player">{autoplay ? <iframe src={autoplayEmbed(embed, true)} title={post.title[language]} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen /> : <div className="daily-video-thumbnail" aria-label={post.title[language]}><Image src={getYouTubeThumbnailUrl(videoId)} alt={post.title[language]} width={1280} height={720} /><span className="daily-video-play"><Play size={34} fill="currentColor" /></span></div>}</div>;
  }
  if (mode === 'listen') {
    const audio = media.audioUrl || post.media.en.audioUrl;
    return <div className="daily-audio-panel daily-inline-player">{audio ? <audio controls autoPlay={autoplay} src={audio} /> : <p>{copy.noAudio[language]}</p>}</div>;
  }
  return <div className="daily-resource-panel daily-inline-player">{media.resources.length ? media.resources.map((resource) => <a href={resource.url} key={resource.url} target="_blank" rel="noreferrer"><Download size={18} /> {resource.label}</a>) : <p>{copy.noPdf[language]}</p>}</div>;
}

function ModeCardPreview({ post, mode, language, isHovering }: { post: WisdomPost; mode: Mode; language: Language; isHovering: boolean }) {
  const media = post.media[language];
  if (mode === 'watch') {
    const videoUrl = media.videoUrl || post.media.en.videoUrl;
    const videoId = getYouTubeId(videoUrl);
    const embed = videoId ? getYouTubeEmbedUrl(videoId) : null;
    return <span className="daily-card-preview daily-card-preview-video">{isHovering && embed ? <iframe src={autoplayEmbed(embed, true)} title={post.title[language]} allow="autoplay; encrypted-media; picture-in-picture" /> : videoId ? <><Image src={getYouTubeThumbnailUrl(videoId)} alt="" width={320} height={180} /><span className="preview-play"><Play size={18} fill="currentColor" /></span></> : null}</span>;
  }
  if (mode === 'listen') {
    return <span className={`daily-card-preview daily-card-preview-audio ${isHovering ? 'is-hovering' : ''}`}><span className="waveform">{Array.from({ length: 22 }, (_, index) => <i key={index} />)}</span><span className="audio-line"><Play size={13} fill="currentColor" /> <b /> <small>12:45</small></span></span>;
  }
  if (mode === 'pdf') {
    return <span className="daily-card-preview daily-card-preview-pdf"><span className="pdf-cover"><strong>{post.title[language]}</strong><small>PDF</small></span></span>;
  }
  return <span className={`daily-card-preview daily-card-preview-blog ${isHovering ? 'is-hovering' : ''}`}><span className="book-preview"><i /><b /></span></span>;
}

function LockedPanel({ language, hasPost }: { language: Language; hasPost: boolean }) {
  return <div className="locked-day-panel"><Lock size={42} /><h2>{hasPost ? copy.locked[language] : copy.noContent[language]}</h2><p>{copy.unlockNote[language]}</p></div>;
}

function AboutPage({ language }: { language: Language }) {
  return (
    <section className="about-premium-page">
      <div className="about-quote-bar">✧ — “{copy.birthright[language]}” — <strong>Sampurna Samruddhi Upasana</strong></div>
      <div className="about-premium-hero">
        <div className="about-photo-stage combined-founder-art">
          <Image src="/legacy-assets/sampurna-samruddhi-founders-light.png" alt={`${copy.founderOne[language]} and ${copy.founderTwo[language]}`} width={1195} height={768} priority />
        </div>
        <div className="about-story-panel">
          <div className="about-kicker"><Leaf size={18} /> {copy.eyebrow[language]}</div>
          <h1><span>{copy.aboutHeroA[language]}</span><span>{copy.aboutHeroB[language]}</span><em>{copy.aboutHeroC[language]}</em></h1>
          <p className="lead">{copy.aboutSubtitle[language]}</p>
          <p>{copy.founderStory[language]}</p>
          <p>{copy.founderGuidance[language]}</p>
          <p>{HERITAGE_COPY.mission[language]}</p>
          <div className="about-signature">— {copy.founderOne[language]} <small>Self Help Coach</small></div>
        </div>
      </div>
      <FeatureRow language={language} />
    </section>
  );
}

function FounderVisual({ language }: { language: Language }) {
  return <div className="reference-founder-visual"><div className="founder-photo-card"><Image src="/legacy-assets/dad_photo.jpg" alt={copy.founderOne[language]} width={520} height={620} priority /><Image src="/legacy-assets/mom_photo.jpg" alt={copy.founderTwo[language]} width={420} height={560} priority /></div><div className="founder-name-strip"><div><strong>{copy.founderOne[language]}</strong><span>({copy.founderOneRole[language]})</span></div><div><strong>{copy.founderTwo[language]}</strong><span>({copy.founderTwoRole[language]})</span></div></div></div>;
}

function ModePill({ mode, language, date, month }: { mode: Mode; language: Language; date: string; month: string }) {
  const Icon = modeMeta[mode].icon;
  return <Link className="mode-pill" href={dailyHref(language, date, mode, month)}><span><Icon size={24} /></span><div><strong>{copy[modeMeta[mode].label][language]}</strong><small>{copy[modeMeta[mode].subtitle][language]}</small></div></Link>;
}

function FeatureRow({ language }: { language: Language }) {
  return <section className="reference-trust-row" aria-label={copy.features[language]}>{[copy.featureScience, copy.featureSimple, copy.featureFree, copy.featureCare].map((item, index) => { const Icon = featureIcons[index]; return <div key={item[language]}><Icon size={34} /><span>{item[language]}</span></div>; })}</section>;
}

function ReferenceHeader({ focus, language, setLanguage }: { focus: Focus; language: Language; setLanguage: (language: Language) => void }) {
  const router = useRouter();
  const calendarHref = focus === 'today' ? '#daily-calendar-secondary' : `/${language}#daily-calendar-secondary`;
  return <header className="reference-header"><Link href={`/${language}`} className="reference-brand"><Image src="/legacy-assets/logo.jpeg" alt={BRAND.siteName} width={62} height={62} /><div><strong>Sampurna Samruddhi Upasana</strong><span>{BRAND.siteNameDevanagari}, समृद्ध आणि आनंदी जीवन</span></div></Link><nav>{nav.map((item) => <Link className={focus === item.key ? 'active' : ''} href={localizedPath(language, item.key)} key={item.key}>{item.label[language]}</Link>)}</nav><div className="reference-actions"><a className="toolbar-calendar-link" href={calendarHref}><CalendarDays size={16} /> <span>{copy.calendarTitle[language]}</span></a><select value={language} onChange={(event) => { const next = event.target.value as Language; setLanguage(next); router.push(localizedPath(next, focus)); }} aria-label="Language">{LANGUAGES.map((item) => <option value={item.code} key={item.code}>{item.native}</option>)}</select><a href={`https://wa.me/${BRAND.whatsapp}`} target="_blank" rel="noreferrer"><Mail size={16} /> {copy.updates[language]}</a><button><Menu size={24} /></button></div></header>;
}

function ReferenceFooter({ language }: { language: Language }) {
  return <footer className="reference-footer"><Link href={`/${language}`}><Globe2 size={24} /><span>{copy.website[language]}<small>sampurna-wisdom</small></span></Link><a href={`mailto:${BRAND.email}`}><Mail size={24} /><span>{copy.email[language]}<small>{BRAND.email}</small></span></a><a href={`https://wa.me/${BRAND.whatsapp}`} target="_blank" rel="noreferrer"><Phone size={24} /><span>{copy.contact[language]}<small>{BRAND.phone}</small></span></a></footer>;
}

function getYouTubeId(url?: string) {
  return url?.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([^&?/]+)/)?.[1] || null;
}

function getYouTubeEmbedUrl(id: string) {
  return `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1`;
}

function getYouTubeThumbnailUrl(id: string) {
  return `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;
}

function autoplayEmbed(embed: string, muted = false) {
  return `${embed}&autoplay=1&playsinline=1${muted ? '&mute=1&controls=0' : ''}`;
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
function parseMonth(month?: string) { return month && /^\d{4}-\d{2}$/.test(month) ? new Date(`${month}-01T00:00:00`) : null; }
function monthKey(date: Date) { return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`; }
function dailyHref(language: Language, date: string, mode: Mode, month: string) { return `/${language}?date=${date}&mode=${mode}&month=${month}#daily-content`; }
function calendarMonthHref(language: Language, date: string, mode: Mode, month: string) { return `/${language}?date=${date}&mode=${mode}&month=${month}#daily-calendar-secondary`; }
function monthStart(date: Date) { return new Date(date.getFullYear(), date.getMonth(), 1); }
function addMonths(date: Date, amount: number) { return new Date(date.getFullYear(), date.getMonth() + amount, 1); }
function calendarDays(month: Date) { const start = new Date(month.getFullYear(), month.getMonth(), 1); start.setDate(start.getDate() - start.getDay()); return Array.from({ length: 42 }, (_, index) => { const date = new Date(start); date.setDate(start.getDate() + index); return date; }); }
function localeFor(language: Language) { return language === 'en' ? 'en-IN' : language === 'hi' ? 'hi-IN-u-nu-deva' : 'mr-IN'; }
