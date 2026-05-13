import type { MetadataRoute } from 'next';

const routes = ['', '/today', '/library', '/pillars', '/about', '/community'];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `https://fabselfhelp.com${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' || route === '/today' ? 'daily' : 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));
}
