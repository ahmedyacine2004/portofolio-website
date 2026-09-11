import type { MetadataRoute } from 'next';

import { siteUrl } from '@/lib/site';

const publicRoutes = [
  '/',
  '/about',
  '/projects',
  '/skills',
  '/experience',
  '/certification',
  '/contact',
  '/about/education',
  '/about/education/bachelor',
  '/about/education/estin',
  '/experience/algerie-telecom',
  '/experience/bachelor',
  '/experience/consultify',
  '/experience/education',
  '/experience/internships',
  '/experience/somiphos',
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.map((route, index) => ({
    url: new URL(route, siteUrl).toString(),
    lastModified: new Date(),
    changeFrequency: index === 0 ? 'weekly' : 'monthly',
    priority: index === 0 ? 1 : 0.7,
  }));
}
