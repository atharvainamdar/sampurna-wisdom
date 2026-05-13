import { z } from 'zod';

export const languageSchema = z.enum(['en', 'hi', 'mr']);
export const contentStatusSchema = z.enum(['draft', 'scheduled', 'published', 'archived']);
export const pillarSchema = z.enum(['arogya', 'sampatti', 'sambandh', 'karya', 'adhyatma']);

export const mediaResourceSchema = z.object({
  label: z.string().min(1, 'Resource label is required'),
  url: z.string().min(1, 'Resource URL or storage path is required'),
  kind: z.enum(['ppt', 'pdf', 'image', 'link']),
});

export const translationSchema = z.object({
  title: z.string().min(3, 'Title is required'),
  excerpt: z.string().min(10, 'Short summary is required'),
  body: z.string().min(20, 'Daily wisdom message is required'),
  reflection: z.string().min(5, 'Reflection prompt is required'),
  videoUrl: z.string().optional(),
  audioUrl: z.string().optional(),
  resources: z.array(mediaResourceSchema).default([]),
});

export const wisdomPostSchema = z.object({
  slug: z.string().min(3).regex(/^[a-z0-9-]+$/, 'Use lowercase letters, numbers, and hyphens only'),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  pillar: pillarSchema,
  status: contentStatusSchema,
  tags: z.array(z.string()).default([]),
  translations: z.object({
    en: translationSchema,
    hi: translationSchema,
    mr: translationSchema,
  }),
});

export type WisdomPostInput = z.infer<typeof wisdomPostSchema>;
