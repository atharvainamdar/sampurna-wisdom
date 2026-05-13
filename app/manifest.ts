import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Sampurna Samruddhi',
    short_name: 'Samruddhi',
    description: 'Free daily wisdom in English, Hindi, and Marathi.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f8efe0',
    theme_color: '#d99218',
    lang: 'en-IN',
    categories: ['education', 'lifestyle'],
  };
}
