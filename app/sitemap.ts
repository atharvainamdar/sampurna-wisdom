import type { MetadataRoute } from 'next';
import { DEFAULT_POSTS, LANGUAGES } from '@/lib/content';

const baseRoutes = ['', '/today', '/library', '/pillars', '/about', '/community'];
const localizedSections = ['', '/library', '/pillars', '/about', '/community'];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = baseRoutes.map((route) => ({
    url: `https://fabselfhelp.com${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' || route === '/today' ? 'daily' : 'weekly',
    priority: route === '' ? 1 : 0.8,
  })) satisfies MetadataRoute.Sitemap;

  const localizedRoutes = LANGUAGES.flatMap((language) =>
    localizedSections.map((section) => ({
      url: `https://fabselfhelp.com/${language.code}${section}`,
      lastModified: new Date(),
      changeFrequency: section === '' ? 'daily' as const : 'weekly' as const,
      priority: section === '' ? 0.9 : 0.75,
    }))
  );

  const wisdomRoutes = LANGUAGES.flatMap((language) =>
    DEFAULT_POSTS.map((post) => ({
      url: `https://fabselfhelp.com/${language.code}/wisdom/${post.id}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  );

  return [...staticRoutes, ...localizedRoutes, ...wisdomRoutes];
}
