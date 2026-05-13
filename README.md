# Sampurna Wisdom

A clean, mobile-first rebuild of the Sampurna Samruddhi website.

This repository is intentionally separate from the current live website so the live site remains safe while the new experience is built.

## Product goal

Sampurna Samruddhi should be a free daily wisdom platform for Indian users.

Public users can also land directly on language-first sections such as `/en`, `/hi`, `/mr`, `/hi/library`, and `/mr/wisdom/...`.

Public users should be able to:

- read the daily wisdom message
- watch the video for their language
- listen to audio for their language
- download PPT/PDF/resources for their language
- browse the wisdom library
- share content on WhatsApp

Admin users should eventually be able to:

- create daily wisdom posts
- add English, Hindi, and Marathi versions separately
- upload/paste video, audio, PPT, PDF, and thumbnails
- schedule posts
- manage the content calendar
- update brand/community links

## Current stack

- Next.js 16
- React 19
- Tailwind CSS 4
- TypeScript 6
- Supabase-ready schema

## Environment

Copy `.env.example` to `.env.local` when a Supabase project is ready. Do not commit real keys.

Use these environment variables when connecting the website to Supabase:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://lprsgafivalqxgusagln.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
```

Never commit database passwords, service-role keys, or Supabase personal access tokens.

## Local development

```bash
npm install
npm run dev
```

## Safety rule

All work here is for the new `sampurna-wisdom` project only. The existing live website and its repository should not be modified from this repo.
