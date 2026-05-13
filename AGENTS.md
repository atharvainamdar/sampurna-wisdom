# Sampurna Wisdom repo memory

- This repository is the new private rebuild for Sampurna Samruddhi / self-upliftment project.
- Never modify the existing live website repository from this repo. The live site must remain untouched until Atharva explicitly approves a future migration.
- Product direction: free mobile-first wisdom platform for Indian users; no subscriptions/payments for now.
- Audience needs English, Hindi, and Marathi support. Blog text, videos, audio, PPT/PDF, and resources must be language-specific, not merely translated UI labels.
- Current stack: Next.js 16, React 19, Tailwind CSS 4, TypeScript 6, Supabase-ready CMS schema.
- Quality checks: run `npm run lint`, `npm run build`, and `npm audit --omit=dev --audit-level=moderate` before pushing.
- PR #1 tracks the initial fresh platform branch `fresh-mobile-wisdom-platform`.
- Vercel project is user-owned; deployments from OpenHands commits can be blocked because OpenHands is not a Vercel team member. After pushing fixes, Atharva may need to make a tiny owner commit or manually redeploy from an owner-authored commit.
- Vercel URL currently used for preview/testing: `https://sampurna-wisdom-ashy.vercel.app/`. Admin login: `/admin/login`.

