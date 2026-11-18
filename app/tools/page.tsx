import type { Metadata } from 'next';

import { getActiveTools } from '@/data/tools';
import ToolGrid from '@/components/tools/ToolGrid';
import SearchTools from '@/components/home/SearchTools';
import BreadcrumbStructuredData from '@/components/seo/BreadcrumbStructuredData';
import { SITE_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'All Online Tools',
  description:
    "Browse GetToolSpace's free online calculators, converters and text tools, and search for the one you need.",

  alternates: {
    canonical: '/tools',
  },

  openGraph: {
    title: 'All Online Tools',
    description:
      "Browse GetToolSpace's free online calculators, converters and text tools, and search for the one you need.",
    url: `${SITE_CONFIG.url}/tools`,
    siteName: SITE_CONFIG.name,
    type: 'website',
  },

  twitter: {
    card: 'summary',
    title: 'All Online Tools',
    description:
      "Browse GetToolSpace's free online calculators, converters and text tools, and search for the one you need.",
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

        <p className="mt-3 max-w-3xl leading-7 text-muted-foreground">
          GetToolSpace offers free calculators, converters and text
          tools that run in your browser. Use the search box to find a
          tool by name or topic, or browse the full list below. Every
          tool has a written guide explaining how it works, with
          examples you can check yourself.
        </p>

        <SearchTools className="relative z-20 mt-6" />

        <div className="mt-8">
          <ToolGrid tools={allTools} />
        </div>
      </div>
    </>
  );
}