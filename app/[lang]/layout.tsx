import { LANGUAGES } from '@/lib/content';

export function generateStaticParams() {
  return LANGUAGES.map((language) => ({ lang: language.code }));
}

export default function LanguageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
