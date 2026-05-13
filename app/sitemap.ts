import type { MetadataRoute } from 'next';
import { DEFAULT_POSTS, LANGUAGES } from '@/lib/content';

const baseRoutes = ['', '/today', '/library', '/pillars', '/about', '/community'];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = baseRoutes.map((route) => ({
    url: `https://fabselfhelp.com${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' || route === '/today' ? 'daily' : 'weekly',
    priority: route === '' ? 1 : 0.8,
  })) satisfies MetadataRoute.Sitemap;

  const wisdomRoutes = LANGUAGES.flatMap((language) =>
    DEFAULT_POSTS.map((post) => ({
      url: `https://fabselfhelp.com/${language.code}/wisdom/${post.id}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  );

  return [...staticRoutes, ...wisdomRoutes];
}
