// The public site URL is used for canonical links, Open Graph URLs,
// the sitemap and structured data. In production it MUST be configured,
// otherwise every one of those would point to localhost.
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ?.trim()
  .replace(/\/+$/, '');

if (!configuredSiteUrl && process.env.NODE_ENV === 'production') {
  throw new Error(
    'NEXT_PUBLIC_SITE_URL is not set. Set it to your public site URL (for example https://your-domain.com) before building for production.',
  );
}

export const SITE_CONFIG = {
  name: 'ToolSpace',
  description:
    'Free online calculators, converters and useful tools for everyday tasks.',
  url: configuredSiteUrl || 'http://localhost:3000',
  author: 'ToolSpace',
  email: 'gettoolspace@gmail.com',
};

export const NAVIGATION_ITEMS = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Calculators',
    href: '/calculators',
  },
  {
    label: 'Converters',
    href: '/converters',
  },
  {
    label: 'Text Tools',
    href: '/text-tools',
  },
  {
    label: 'All Tools',
    href: '/tools',
  },
];
