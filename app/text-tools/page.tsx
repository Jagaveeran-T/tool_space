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

        <p className="mt-3 max-w-3xl leading-7 text-muted-foreground">
          Text tools help you check the size of what you write. The
          Word Counter counts words, characters, sentences and
          paragraphs as you type, and estimates how long your text
          takes to read or speak. It is useful for essays, articles,
          speeches and any text with a word or character limit.
        </p>

        <p className="mt-3 max-w-3xl leading-7 text-muted-foreground">
          Your text is processed in your browser and is not sent to our
          server. The tool&apos;s guide explains how words and sentences
          are counted, so you know how the numbers are produced.
        </p>

        <div className="mt-8">
          <ToolGrid tools={textTools} />
        </div>
      </div>
    </>
  );
}