export type Language = 'en' | 'hi' | 'mr';
export type ContentStatus = 'draft' | 'scheduled' | 'published';
export type PillarSlug = 'arogya' | 'sampatti' | 'sambandh' | 'karya' | 'adhyatma';

export interface Pillar {
  slug: PillarSlug;
  name: Record<Language, string>;
  english: string;
  symbol: string;
  tone: string;
  gradient: string;
  description: Record<Language, string>;
}

export interface WisdomPost {
  id: string;
  date: string;
  pillar: PillarSlug;
  status: ContentStatus;
  featured?: boolean;
  tags: string[];
  title: Record<Language, string>;
  excerpt: Record<Language, string>;
  body: Record<Language, string>;
  reflection: Record<Language, string>;
  media: Record<Language, {
    videoUrl?: string;
    audioUrl?: string;
    resources: Array<{ label: string; url: string; kind: 'ppt' | 'pdf' | 'image' | 'link' }>;
  }>;
}

export const BRAND = {
  siteName: 'Sampurna Samruddhi',
  siteNameDevanagari: 'संपूर्ण समृद्धी',
  suffix: '(with ease)',
  founder: 'Ramesh Inamdar',
  team: 'Samruddhi Upasana Team',
  email: 'tcprc.energyscience@gmail.com',
  phone: '+91 78880 48281',
  whatsapp: '917888048281',
  location: 'Pune, Maharashtra, India',
  youtube: 'https://www.youtube.com/@selfupliftmentprojectfetcp3253',
};

export const LANGUAGES: Array<{ code: Language; label: string; native: string }> = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
  { code: 'mr', label: 'Marathi', native: 'मराठी' },
];

export const PILLARS: Pillar[] = [
  {
    slug: 'arogya',
    english: 'Health',
    symbol: 'प्राण',
    tone: '#1f8f69',
    gradient: 'linear-gradient(135deg, #e5f8eb, #87d6b3)',
    name: { en: 'Arogya', hi: 'आरोग्य', mr: 'आरोग्य' },
    description: {
      en: 'Energy, rhythm, food, sleep, and daily body discipline.',
      hi: 'ऊर्जा, दिनचर्या, भोजन, नींद और शरीर की साधना।',
      mr: 'ऊर्जा, दिनचर्या, आहार, झोप आणि शरीराची साधना.',
    },
  },
  {
    slug: 'sampatti',
    english: 'Wealth',
    symbol: 'लक्ष्मी',
    tone: '#b87410',
    gradient: 'linear-gradient(135deg, #fff3bd, #e4a12b)',
    name: { en: 'Sampatti', hi: 'संपत्ति', mr: 'संपत्ती' },
    description: {
      en: 'Money beliefs, disciplined action, value creation, and abundance.',
      hi: 'धन के संस्कार, अनुशासन, मूल्य निर्माण और समृद्धि।',
      mr: 'धनाचे संस्कार, शिस्त, मूल्यनिर्मिती आणि समृद्धी.',
    },
  },
  {
    slug: 'sambandh',
    english: 'Relationships',
    symbol: 'स्नेह',
    tone: '#c64d73',
    gradient: 'linear-gradient(135deg, #ffe3ef, #e78aa7)',
    name: { en: 'Sambandh', hi: 'संबंध', mr: 'संबंध' },
    description: {
      en: 'Family, communication, forgiveness, trust, and emotional prosperity.',
      hi: 'परिवार, संवाद, क्षमा, विश्वास और भावनात्मक समृद्धि।',
      mr: 'कुटुंब, संवाद, क्षमा, विश्वास आणि भावनिक समृद्धी.',
    },
  },
  {
    slug: 'karya',
    english: 'Career',
    symbol: 'कर्म',
    tone: '#4868b5',
    gradient: 'linear-gradient(135deg, #dce9ff, #8db1ff)',
    name: { en: 'Karya', hi: 'कार्य', mr: 'कार्य' },
    description: {
      en: 'Purposeful work, focus, service, skill, and professional excellence.',
      hi: 'उद्देश्यपूर्ण कार्य, ध्यान, सेवा, कौशल और उत्कृष्टता।',
      mr: 'उद्देशपूर्ण कार्य, लक्ष, सेवा, कौशल्य आणि उत्कृष्टता.',
    },
  },
  {
    slug: 'adhyatma',
    english: 'Spirituality',
    symbol: 'ॐ',
    tone: '#7449a8',
    gradient: 'linear-gradient(135deg, #eee7ff, #b695e6)',
    name: { en: 'Adhyatma', hi: 'अध्यात्म', mr: 'अध्यात्म' },
    description: {
      en: 'Silence, surrender, source connection, devotion, and inner clarity.',
      hi: 'मौन, समर्पण, स्रोत से जुड़ाव, भक्ति और आंतरिक स्पष्टता।',
      mr: 'मौन, समर्पण, स्रोताशी जोड, भक्ती आणि अंतर्गत स्पष्टता.',
    },
  },
];

export const DEFAULT_POSTS: WisdomPost[] = [
  {
    id: '2026-05-13-millionaire-mind',
    date: '2026-05-13',
    pillar: 'sampatti',
    status: 'published',
    featured: true,
    tags: ['beliefs', 'wealth', 'discipline'],
    title: {
      en: 'The Millionaire Mind: Rich Beliefs',
      hi: 'मिलियनेयर माइंड: समृद्ध विश्वास',
      mr: 'मिलियनेयर माइंड: समृद्ध विश्वास',
    },
    excerpt: {
      en: 'Prosperity begins before money appears. It starts with the belief that value can flow through your hands with ease.',
      hi: 'समृद्धि पैसे आने से पहले शुरू होती है। यह इस विश्वास से शुरू होती है कि मूल्य आपके हाथों से सहजता से प्रवाहित हो सकता है।',
      mr: 'समृद्धी पैसा येण्याआधी सुरू होते. मूल्य तुमच्या हातून सहज वाहू शकते या विश्वासातून ती सुरू होते.',
    },
    body: {
      en: 'A rich mind does not chase money in panic. It creates value with steadiness. Today, observe one belief you carry about money. Is it inherited fear, or your own truth? Replace one sentence of scarcity with one sentence of service: “I am learning to create value every day.”',
      hi: 'समृद्ध मन घबराहट में पैसे का पीछा नहीं करता। वह स्थिरता से मूल्य बनाता है। आज धन के बारे में अपने एक विश्वास को देखें। क्या वह विरासत में मिला डर है, या आपका अपना सत्य? कमी के एक वाक्य को सेवा के एक वाक्य से बदलें: “मैं हर दिन मूल्य बनाना सीख रहा हूँ।”',
      mr: 'समृद्ध मन घाईघाईने पैशामागे धावत नाही. ते स्थिरतेने मूल्य निर्माण करते. आज पैशाबद्दलचा तुमचा एक विश्वास पाहा. तो वारशाने आलेली भीती आहे की तुमचे स्वतःचे सत्य? कमतरतेचे एक वाक्य सेवेच्या एका वाक्याने बदला: “मी दररोज मूल्य निर्माण करायला शिकत आहे.”',
    },
    reflection: {
      en: 'Write one money belief you are ready to release, and one value you can create today.',
      hi: 'एक धन-संबंधी विश्वास लिखें जिसे आप छोड़ने के लिए तैयार हैं, और एक मूल्य लिखें जो आप आज बना सकते हैं।',
      mr: 'तुम्ही सोडायला तयार असलेला पैशाबद्दलचा एक विश्वास लिहा आणि आज निर्माण करू शकणारे एक मूल्य लिहा.',
    },
    media: {
      en: {
        videoUrl: BRAND.youtube,
        audioUrl: '#english-audio',
        resources: [
          { label: 'English reflection worksheet', url: '#english-pdf', kind: 'pdf' },
          { label: 'English prosperity slide deck', url: '#english-ppt', kind: 'ppt' },
        ],
      },
      hi: {
        videoUrl: BRAND.youtube,
        audioUrl: '#hindi-audio',
        resources: [
          { label: 'हिन्दी चिंतन पत्रक', url: '#hindi-pdf', kind: 'pdf' },
          { label: 'हिन्दी समृद्धि प्रस्तुति', url: '#hindi-ppt', kind: 'ppt' },
        ],
      },
      mr: {
        videoUrl: BRAND.youtube,
        audioUrl: '#marathi-audio',
        resources: [
          { label: 'मराठी चिंतन पत्रक', url: '#marathi-pdf', kind: 'pdf' },
          { label: 'मराठी समृद्धी सादरीकरण', url: '#marathi-ppt', kind: 'ppt' },
        ],
      },
    },
  },
  {
    id: '2026-05-12-morning-stillness',
    date: '2026-05-12',
    pillar: 'adhyatma',
    status: 'published',
    tags: ['morning', 'silence', 'source'],
    title: {
      en: 'Begin the Day from the Source',
      hi: 'दिन की शुरुआत स्रोत से करें',
      mr: 'दिवसाची सुरुवात स्रोतापासून करा',
    },
    excerpt: {
      en: 'The first ten minutes of the morning decide the fragrance of the day.',
      hi: 'सुबह के पहले दस मिनट पूरे दिन की सुगंध तय करते हैं।',
      mr: 'सकाळचे पहिले दहा मिनिटे संपूर्ण दिवसाचा सुगंध ठरवतात.',
    },
    body: {
      en: 'Before the phone, before the world, sit with your breath. Place one hand on the heart and one on the navel. Say quietly: “I receive this day with gratitude.” This is not a ritual for perfection. It is a return to center.',
      hi: 'फोन से पहले, दुनिया से पहले, अपनी सांस के साथ बैठें। एक हाथ हृदय पर और एक नाभि पर रखें। धीरे से कहें: “मैं इस दिन को कृतज्ञता से स्वीकार करता हूँ।” यह पूर्णता का अनुष्ठान नहीं, केंद्र में लौटना है।',
      mr: 'फोनच्या आधी, जगाच्या आधी, तुमच्या श्वासासोबत बसा. एक हात हृदयावर आणि एक नाभीवर ठेवा. शांतपणे म्हणा: “मी हा दिवस कृतज्ञतेने स्वीकारतो.” हा परिपूर्णतेचा विधी नाही, केंद्राकडे परत येणे आहे.',
    },
    reflection: {
      en: 'Tomorrow morning, delay your phone by ten minutes. Notice what changes.',
      hi: 'कल सुबह फोन दस मिनट देर से उठाएँ। क्या बदलता है, देखें।',
      mr: 'उद्या सकाळी फोन दहा मिनिटे उशिरा घ्या. काय बदलते ते पाहा.',
    },
    media: {
      en: { audioUrl: '#morning-en-audio', resources: [{ label: 'Morning stillness guide', url: '#morning-en-pdf', kind: 'pdf' }] },
      hi: { audioUrl: '#morning-hi-audio', resources: [{ label: 'सुबह की शांति मार्गदर्शिका', url: '#morning-hi-pdf', kind: 'pdf' }] },
      mr: { audioUrl: '#morning-mr-audio', resources: [{ label: 'सकाळची शांतता मार्गदर्शिका', url: '#morning-mr-pdf', kind: 'pdf' }] },
    },
  },
  {
    id: '2026-05-11-relationship-listening',
    date: '2026-05-11',
    pillar: 'sambandh',
    status: 'published',
    tags: ['family', 'listening', 'communication'],
    title: {
      en: 'Listening is Also Love',
      hi: 'सुनना भी प्रेम है',
      mr: 'ऐकणे हेही प्रेम आहे',
    },
    excerpt: {
      en: 'Many relationships do not need more arguments. They need one person to listen without preparing a reply.',
      hi: 'कई संबंधों को और तर्क नहीं चाहिए। उन्हें एक ऐसा व्यक्ति चाहिए जो जवाब तैयार किए बिना सुने।',
      mr: 'अनेक नात्यांना आणखी वाद नको असतात. उत्तर तयार न करता ऐकणारी एक व्यक्ती हवी असते.',
    },
    body: {
      en: 'Today, choose one conversation where you will not interrupt. Let the other person finish. Listening does not mean agreeing. It means giving dignity to the other person’s inner world.',
      hi: 'आज एक बातचीत चुनें जिसमें आप बीच में नहीं बोलेंगे। सामने वाले को पूरा बोलने दें। सुनना सहमत होना नहीं है। यह दूसरे व्यक्ति की आंतरिक दुनिया को सम्मान देना है।',
      mr: 'आज एक संवाद निवडा ज्यात तुम्ही मध्ये बोलणार नाही. समोरच्याला पूर्ण बोलू द्या. ऐकणे म्हणजे सहमत होणे नाही. ते दुसऱ्याच्या अंतर्गत जगाला सन्मान देणे आहे.',
    },
    reflection: {
      en: 'Ask someone: “What are you feeling that I have not fully understood yet?”',
      hi: 'किसी से पूछें: “आप क्या महसूस कर रहे हैं जिसे मैंने अभी तक पूरी तरह नहीं समझा?”',
      mr: 'एखाद्याला विचारा: “तुम्ही काय अनुभवत आहात जे मी अजून पूर्णपणे समजलेलो नाही?”',
    },
    media: {
      en: { resources: [] },
      hi: { resources: [] },
      mr: { resources: [] },
    },
  },
];

export const getPillar = (slug: PillarSlug) => PILLARS.find((pillar) => pillar.slug === slug) ?? PILLARS[0];
export const todayPost = DEFAULT_POSTS.find((post) => post.featured) ?? DEFAULT_POSTS[0];
