import type { Metadata } from 'next';
import Link from 'next/link';

import BreadcrumbStructuredData from '@/components/seo/BreadcrumbStructuredData';
import { articles, getReadingMinutes } from '@/data/articles';
import { SITE_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Guides',
  description:
    'Plain-language guides that explain the maths behind our calculators and converters: percentages, hexadecimal, dates and more, with worked examples.',
  alternates: {
    canonical: '/guides',
  },
  openGraph: {
    title: 'Guides | GetToolSpace',
    description:
      'Plain-language guides that explain the maths behind our calculators and converters, with worked examples.',
    url: `${SITE_CONFIG.url}/guides`,
    siteName: SITE_CONFIG.name,
    type: 'website',
  },
};

function formatDate(value: string) {
  return new Date(`${value}T00:00:00Z`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

export default function GuidesPage() {
  const sorted = [...articles].sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt),
  );

  return (
    <>
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: SITE_CONFIG.url },
          { name: 'Guides', url: `${SITE_CONFIG.url}/guides` },
        ]}
      />

      <div className="container-main max-w-4xl py-12 sm:py-16">
        <header className="mb-10 space-y-4">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Guides
          </h1>
          <p className="max-w-2xl leading-7 text-muted-foreground">
            Short, practical explanations of the ideas behind our
            calculators and converters. Each guide includes worked examples
            you can check yourself.
          </p>
        </header>

        <ul className="space-y-6">
          {sorted.map((article) => (
            <li
              key={article.slug}
              className="rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary"
            >
              <h2 className="text-xl font-semibold text-foreground">
                <Link href={`/guides/${article.slug}`}>{article.title}</Link>
              </h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {article.description}
              </p>
              <p className="mt-3 text-xs text-muted-foreground">
                {formatDate(article.publishedAt)} ·{' '}
                {getReadingMinutes(article)} min read
              </p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}