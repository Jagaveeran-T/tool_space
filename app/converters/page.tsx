import type { Metadata } from 'next';
import Link from 'next/link';

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

        <p className="mt-3 max-w-3xl leading-7 text-muted-foreground">
          These converters translate numbers and text between formats
          used in computing. The Binary to Text Converter turns binary
          code into readable characters using ASCII or UTF-8 and also
          converts text back to binary. The Decimal to Hex and Hex to
          Decimal converters move whole numbers between base 10 and
          base 16, including very large values and the optional 0x
          prefix.
        </p>

        <p className="mt-3 max-w-3xl leading-7 text-muted-foreground">
          Each converter has a guide that explains the method step by
          step with examples. Looking for everyday maths instead? See our{' '}
          <Link
            href="/calculators"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            calculators
          </Link>
          .
        </p>

        <div className="mt-8">
          <ToolGrid tools={converterTools} />
        </div>
      </div>
    </>
  );
}