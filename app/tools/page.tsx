
import type { Metadata } from 'next';

import { getActiveTools } from '@/data/tools';
import ToolGrid from '@/components/tools/ToolGrid';
import BreadcrumbStructuredData from '@/components/seo/BreadcrumbStructuredData';
import { SITE_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'All Online Tools',
  description:
    "Browse ToolSpace's collection of free online calculators, converters and useful tools.",

  alternates: {
    canonical: '/tools',
  },

  openGraph: {
    title: 'All Online Tools',
    description:
      "Browse ToolSpace's collection of free online calculators, converters and useful tools.",
    url: `${SITE_CONFIG.url}/tools`,
    siteName: SITE_CONFIG.name,
    type: 'website',
  },

  twitter: {
    card: 'summary',
    title: 'All Online Tools',
    description:
      "Browse ToolSpace's collection of free online calculators, converters and useful tools.",
  },
};

export default function AllToolsPage() {
  const allTools = getActiveTools();

  return (
    <>
      <BreadcrumbStructuredData
        items={[
          {
            name: 'Home',
            url: SITE_CONFIG.url,
          },
          {
            name: 'All Tools',
            url: `${SITE_CONFIG.url}/tools`,
          },
        ]}
      />

      <div className="container-main py-12">
        <h1 className="text-3xl font-bold text-foreground">
          All Tools
        </h1>

        <p className="mt-3 text-muted-foreground">
          Discover all our available online tools.
        </p>

        <div className="mt-8">
          <ToolGrid tools={allTools} />
        </div>
      </div>
    </>
  );
}
