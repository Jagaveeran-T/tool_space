
import type { Metadata } from 'next';

import { getToolsByCategory } from '@/data/tools';
import ToolGrid from '@/components/tools/ToolGrid';
import BreadcrumbStructuredData from '@/components/seo/BreadcrumbStructuredData';
import { SITE_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Online Converters',
  description:
    'Explore free online converters for converting binary numbers, number systems and text into readable formats.',

  alternates: {
    canonical: '/converters',
  },

  openGraph: {
    title: 'Online Converters',
    description:
      'Explore free online converters for converting binary numbers, number systems and text into readable formats.',
    url: `${SITE_CONFIG.url}/converters`,
    siteName: SITE_CONFIG.name,
    type: 'website',
  },

  twitter: {
    card: 'summary',
    title: 'Online Converters',
    description:
      'Explore free online converters for converting binary numbers, number systems and text into readable formats.',
  },
};

export default function ConvertersPage() {
  const converterTools = getToolsByCategory('Converters');

  return (
    <>
      <BreadcrumbStructuredData
        items={[
          {
            name: 'Home',
            url: SITE_CONFIG.url,
          },
          {
            name: 'Converters',
            url: `${SITE_CONFIG.url}/converters`,
          },
        ]}
      />

      <div className="container-main py-12">
        <h1 className="text-3xl font-bold text-foreground">
          Online Converters
        </h1>

        <p className="mt-3 text-muted-foreground">
          Convert binary, numbers and text with useful online tools.
        </p>

        <div className="mt-8">
          <ToolGrid tools={converterTools} />
        </div>
      </div>
    </>
  );
}
