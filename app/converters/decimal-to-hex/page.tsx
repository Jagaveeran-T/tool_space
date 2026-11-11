import type { Metadata } from 'next';

import DecimalToHexGuide from '@/components/converters/number-base/DecimalToHexGuide';
import NumberBaseConverter from '@/components/converters/number-base/NumberBaseConverter';
import BreadcrumbStructuredData from '@/components/seo/BreadcrumbStructuredData';
import { SITE_CONFIG } from '@/lib/constants';

const path = '/converters/decimal-to-hex';
const pageUrl = `${SITE_CONFIG.url}${path}`;

const pageTitle = 'Decimal to Hex Converter - Convert to Hexadecimal';

const pageDescription =
  'Free online decimal to hex converter. Convert any whole number to hexadecimal instantly, with binary and octal results, 0x prefix and large number support.';

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: path,
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: pageUrl,
    siteName: SITE_CONFIG.name,
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: pageTitle,
    description: pageDescription,
  },
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Decimal to Hex Converter',
  url: pageUrl,
  description: pageDescription,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  browserRequirements: 'Requires JavaScript enabled',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
};

export default function DecimalToHexPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareSchema).replace(/</g, '\\u003c'),
        }}
      />

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
          {
            name: 'Decimal to Hex Converter',
            url: pageUrl,
          },
        ]}
      />

      <div className="container-main py-12 sm:py-16">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
            Free Online Converter
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Decimal to Hex Converter
          </h1>

          <p className="mt-4 leading-7 text-muted-foreground">
            Convert a decimal number to hexadecimal instantly. Works with very large and negative numbers, and also shows the value in binary and octal.
          </p>
        </div>

        <NumberBaseConverter mode="decimal-to-hex" />

        <div className="mx-auto max-w-4xl">
          <DecimalToHexGuide />
        </div>
      </div>
    </>
  );
}