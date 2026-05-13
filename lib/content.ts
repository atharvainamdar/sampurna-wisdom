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
      en: "Your body is your first home. Let's make it strong and vibrant together.",
      hi: 'शरीर आपका पहला घर है। आइए मिलकर इसे मज़बूत और ऊर्जावान बनाएँ।',
      mr: 'शरीर हे तुमचं पहिलं घर आहे. चला मिळून ते मजबूत आणि ऊर्जावान बनवूया.',
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
      en: "Money is energy. Learn to attract, respect, and grow it through value creation.",
      hi: 'पैसा ऊर्जा है। मूल्य निर्माण के साथ उसे आकर्षित, सम्मान और विकसित करना सीखें।',
      mr: 'पैसा ही ऊर्जा आहे. मूल्यनिर्मितीतून त्याला आकर्षित, सन्मान आणि वाढवायला शिका.',
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
      en: 'Our connections define our happiness. Learn to nurture the relationships that matter.',
      hi: 'रिश्ते हमारी खुशी तय करते हैं। जो संबंध महत्वपूर्ण हैं, उन्हें सँजोना सीखें।',
      mr: 'नाती आपला आनंद ठरवतात. महत्त्वाची नाती कशी जपायची ते शिका.',
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
      en: "Work should feel like purpose, not punishment. Find focus, service, and skill in your calling.",
      hi: 'काम सज़ा नहीं, उद्देश्य होना चाहिए। अपने कार्य में ध्यान, सेवा और कौशल खोजें।',
      mr: 'काम शिक्षा नाही, उद्देश असायला हवं. तुमच्या कार्यात लक्ष, सेवा आणि कौशल्य शोधा.',
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
      en: 'Inner peace is the foundation of outer success. This is where complete prosperity begins.',
      hi: 'आंतरिक शांति बाहरी सफलता की नींव है। संपूर्ण समृद्धि यहीं से शुरू होती है।',
      mr: 'आतली शांती बाहेरच्या यशाचा पाया आहे. संपूर्ण समृद्धी इथूनच सुरू होते.',
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

export const TRUST_STATS: Array<{ value: string; label: Record<Language, string> }> = [
  { value: '20+', label: { en: 'years of experience', hi: 'वर्षों का अनुभव', mr: 'वर्षांचा अनुभव' } },
  { value: '10K+', label: { en: 'students guided', hi: 'विद्यार्थियों का मार्गदर्शन', mr: 'विद्यार्थ्यांना मार्गदर्शन' } },
  { value: '60+', label: { en: 'courses created earlier', hi: 'पहले बनाए गए कोर्स', mr: 'पूर्वी तयार केलेले कोर्सेस' } },
  { value: '15+', label: { en: 'countries reached', hi: 'देशों तक पहुँच', mr: 'देशांमध्ये पोहोच' } },
];

export const HERITAGE_COPY = {
  heroBadge: {
    en: 'The Complete Prosperity Relay Channel',
    hi: 'द कम्प्लीट प्रोस्पॅरीटी रिले चॅनल',
    mr: 'द कम्प्लीट प्रॉस्पेरिटी रिले चॅनल',
  },
  heroDescription: {
    en: 'Transform your life across 5 dimensions of prosperity with daily wisdom from Samruddhi Upasana Team.',
    hi: 'समृद्धि उपासना टीम के दैनिक ज्ञान से जीवन के पाँच आयामों में संपूर्ण समृद्धि की ओर बढ़ें।',
    mr: 'समृद्धी उपासना टीमच्या दैनिक ज्ञानातून आयुष्याच्या पाच आयामांमध्ये संपूर्ण समृद्धीकडे चला.',
  },
  founderIntro: {
    en: "Namaste, I'm Ramesh Inamdar. For 20 years, I have helped people find balance in health, wealth, relationships, career, and spirituality. Now this wisdom is being rebuilt as a free, simple, mobile-first platform.",
    hi: 'नमस्ते, मैं रमेश इनामदार हूँ। २० वर्षों से मैंने लोगों को स्वास्थ्य, धन, रिश्ते, कार्य और अध्यात्म में संतुलन खोजने में मदद की है। अब यही ज्ञान एक सरल, मोबाइल-फर्स्ट और निःशुल्क मंच पर आ रहा है।',
    mr: 'नमस्कार, मी रमेश इनामदार. २० वर्षांपासून मी लोकांना आरोग्य, संपत्ती, संबंध, कार्य आणि अध्यात्मात संतुलन शोधायला मदत केली आहे. आता हेच ज्ञान सोप्या, मोबाइल-फर्स्ट आणि मोफत व्यासपीठावर येत आहे.',
  },
  mission: {
    en: 'Sampurna means complete, and Samruddhi means prosperity. Together, they represent one vision: helping every person move toward wholeness in every dimension of life.',
    hi: 'संपूर्ण का अर्थ है पूरा, और समृद्धि का अर्थ है खुशहाली। साथ मिलकर यह एक दृष्टि है: हर व्यक्ति को जीवन के हर आयाम में पूर्णता की ओर ले जाना।',
    mr: 'संपूर्ण म्हणजे सर्वसमावेशक, आणि समृद्धी म्हणजे प्रचुरता. एकत्रितपणे ही एक दृष्टी आहे: प्रत्येक व्यक्तीला जीवनाच्या प्रत्येक आयामात परिपूर्णतेकडे नेणे.',
  },
  dailyGift: {
    en: 'A small gift to start your day right. New wisdom unlocks every morning at 6 AM — free forever, no credit card required.',
    hi: 'दिन की सही शुरुआत के लिए एक छोटी भेंट। हर सुबह ६ बजे नया ज्ञान — हमेशा निःशुल्क, कोई क्रेडिट कार्ड नहीं।',
    mr: 'दिवसाची योग्य सुरुवात करण्यासाठी एक छोटी भेट. दररोज सकाळी ६ वाजता नवीन ज्ञान — कायम मोफत, क्रेडिट कार्ड नाही.',
  },
  footerTagline: {
    en: 'Helping Indian families find balance and prosperity, one step at a time.',
    hi: 'भारतीय परिवारों को एक-एक कदम संतुलन और समृद्धि की ओर ले जाना।',
    mr: 'भारतीय कुटुंबांना एक-एक पाऊल संतुलन आणि समृद्धीकडे नेणे.',
  },
};

export const LEGACY_ASSETS: Record<PillarSlug | 'founder', string> = {
  founder: '/legacy-assets/ramesh-inamdar.jpg',
  arogya: '/legacy-assets/pillar-arogya.jpg',
  sampatti: '/legacy-assets/pillar-sampatti.jpg',
  sambandh: '/legacy-assets/pillar-sambandh.jpg',
  karya: '/legacy-assets/pillar-karya.jpg',
  adhyatma: '/legacy-assets/pillar-adhyatma.jpg',
};
