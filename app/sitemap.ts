import type { MetadataRoute } from 'next';

import { getActiveTools } from '@/data/tools';
import { SITE_CONFIG } from '@/lib/constants';

export const dynamic = 'force-static';
export const revalidate = false;

const pagePaths = [
  '/',
  '/calculators',
  '/converters',
  '/text-tools',
  '/tools',
  '/about',
  '/contact',
  '/privacy-policy',
  '/terms',
  '/disclaimer',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  // Tool pages come from the tool registry, so a new tool is added to the
  // sitemap automatically as soon as it is registered in data/tools.ts.
  const toolPaths = getActiveTools().map((tool) => tool.slug);

  return [...pagePaths, ...toolPaths].map((path) => ({
    url: `${SITE_CONFIG.url}${path === '/' ? '' : path}`,
    lastModified,
  }));
}
