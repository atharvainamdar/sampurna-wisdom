import { notFound } from 'next/navigation';
import { LANGUAGES, Language } from '@/lib/content';

export const isLanguage = (value: string): value is Language => LANGUAGES.some((language) => language.code === value);

export function requireLanguage(value: string): Language {
  if (!isLanguage(value)) notFound();
  return value;
}

export function localizedPath(language: Language, focus: 'today' | 'library' | 'pillars' | 'about' | 'community') {
  return focus === 'today' ? `/${language}` : `/${language}/${focus}`;
}
