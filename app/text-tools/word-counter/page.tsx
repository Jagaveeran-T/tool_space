import type { Metadata } from 'next';

import WordCounter from '@/components/text-tools/WordCounter';
import WordCounterGuide from '@/components/text-tools/WordCounterGuide';
import BreadcrumbStructuredData from '@/components/seo/BreadcrumbStructuredData';
import { SITE_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Word Counter - Count Words, Characters and Reading Time',
  description:
    'Free online word counter. Count words, characters, sentences and paragraphs, and estimate reading and speaking time as you type.',
  alternates: {
    canonical: '/text-tools/word-counter',
  },
  openGraph: {
    title: 'Word Counter - Count Words, Characters and Reading Time',
    description:
      'Free online word counter. Count words, characters, sentences and paragraphs, and estimate reading and speaking time as you type.',
    url: `${SITE_CONFIG.url}/text-tools/word-counter`,
    siteName: SITE_CONFIG.name,
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Word Counter - Count Words, Characters and Reading Time',
    description:
      'Free online word counter. Count words, characters, sentences and paragraphs, and estimate reading and speaking time as you type.',
  },
};

export default function WordCounterPage() {
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
          {
            name: 'Word Counter',
            url: `${SITE_CONFIG.url}/text-tools/word-counter`,
          },
        ]}
      />

      <div className="container-main py-12 sm:py-16">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
            Free Online Text Tool
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Word Counter
          </h1>

          <p className="mt-4 leading-7 text-muted-foreground">
            Count words, characters, sentences and paragraphs, and see how long your text takes to read or speak.
          </p>
        </div>

        <WordCounter />

        <div className="mx-auto max-w-4xl">
          <WordCounterGuide />
        </div>
      </div>
    </>
  );
}
