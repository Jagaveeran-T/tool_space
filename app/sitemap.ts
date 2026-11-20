import type { MetadataRoute } from 'next';

import { getActiveTools } from '@/data/tools';
import { articles } from '@/data/articles';
import { SITE_CONFIG } from '@/lib/constants';

export const dynamic = 'force-static';
export const revalidate = false;

// Update the date of a page here only when its content really changes.
const pages: { path: string; lastModified: string }[] = [
  { path: '/', lastModified: '2026-11-18' },
  { path: '/calculators', lastModified: '2026-11-18' },
  { path: '/converters', lastModified: '2026-11-18' },
  { path: '/text-tools', lastModified: '2026-11-18' },
  { path: '/tools', lastModified: '2026-11-18' },
  { path: '/guides', lastModified: '2026-11-20' },
  { path: '/about', lastModified: '2026-11-18' },
  { path: '/contact', lastModified: '2026-11-07' },
  { path: '/privacy-policy', lastModified: '2026-11-18' },
  { path: '/terms', lastModified: '2026-11-04' },
  { path: '/disclaimer', lastModified: '2026-11-04' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const pageEntries = pages.map((page) => ({
    url: `${SITE_CONFIG.url}${page.path === '/' ? '' : page.path}`,
    lastModified: new Date(page.lastModified),
  }));

  // Tool pages come from the tool registry, so a new tool is added to the
  // sitemap automatically as soon as it is registered in data/tools.ts.
  const toolEntries = getActiveTools().map((tool) => ({
    url: `${SITE_CONFIG.url}${tool.slug}`,
    lastModified: new Date(tool.updatedAt),
  }));

  // Guides come from data/articles.ts.
  const articleEntries = articles.map((article) => ({
    url: `${SITE_CONFIG.url}/guides/${article.slug}`,
    lastModified: new Date(article.updatedAt),
  }));

  return [...pageEntries, ...toolEntries, ...articleEntries];
}