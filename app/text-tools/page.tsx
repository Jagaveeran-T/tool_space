
import type { Metadata } from 'next';

import { getToolsByCategory } from '@/data/tools';
import ToolGrid from '@/components/tools/ToolGrid';
import BreadcrumbStructuredData from '@/components/seo/BreadcrumbStructuredData';
import { SITE_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Text Tools',
  description:
    'Explore free online text tools to count words and characters and check reading time.',

  alternates: {
    canonical: '/text-tools',
  },

  openGraph: {
    title: 'Text Tools',
    description:
      'Explore free online text tools to count words and characters and check reading time.',
    url: `${SITE_CONFIG.url}/text-tools`,
    siteName: SITE_CONFIG.name,
    type: 'website',
  },

  twitter: {
    card: 'summary',
    title: 'Text Tools',
    description:
      'Explore free online text tools to count words and characters and check reading time.',
  },
};

export default function TextToolsPage() {
  const textTools = getToolsByCategory('Text Tools');

  return (
    <>
      <BreadcrumbStructuredData
        items={[
          {
            name: 'Home',
            url: SITE_CONFIG.url,
          },
          {
            name: 'Text Tools',
            url: `${SITE_CONFIG.url}/text-tools`,
          },
        ]}
      />

      <div className="container-main py-12">
        <h1 className="text-3xl font-bold text-foreground">
          Online Text Tools
        </h1>

        <p className="mt-3 text-muted-foreground">
          Count words and characters and check reading time with useful online tools.
        </p>

        <div className="mt-8">
          <ToolGrid tools={textTools} />
        </div>
      </div>
    </>
  );
}
