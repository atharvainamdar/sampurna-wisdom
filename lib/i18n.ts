import { notFound } from 'next/navigation';
import { LANGUAGES, Language } from '@/lib/content';

export const isLanguage = (value: string): value is Language => LANGUAGES.some((language) => language.code === value);

export function requireLanguage(value: string): Language {
  if (!isLanguage(value)) notFound();
  return value;
}

export function localizedPath(language: Language, focus: 'today' | 'library' | 'pillars' | 'about' | 'community') {
  if (focus === 'today') return `/${language}`;
  if (focus === 'library') return `/${language}/videos`;
  if (focus === 'community') return `/${language}/audio`;
  if (focus === 'pillars') return `/${language}/blog`;
  return `/${language}/${focus}`;
}

