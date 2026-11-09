import type { Metadata } from 'next';

import AgeCalculator from '@/components/calculators/age-calculator/AgeCalculator';
import BreadcrumbStructuredData from '@/components/seo/BreadcrumbStructuredData';
import { SITE_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Age Calculator - Calculate Your Exact Age',
  description:
    'Calculate your exact age in years, months, days, weeks, hours and minutes using our free online age calculator.',
  alternates: {
    canonical: '/calculators/age-calculator',
  },
  openGraph: {
    title: 'Age Calculator - Calculate Your Exact Age',
    description:
      'Calculate your exact age in years, months, days, weeks, hours and minutes using our free online age calculator.',
    url: `${SITE_CONFIG.url}/calculators/age-calculator`,
    siteName: SITE_CONFIG.name,
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Age Calculator - Calculate Your Exact Age',
    description:
      'Calculate your exact age in years, months, days, weeks, hours and minutes using our free online age calculator.',
  },
};

export default function AgeCalculatorPage() {
  return (
    <>
      <BreadcrumbStructuredData
        items={[
          {
            name: 'Home',
            url: SITE_CONFIG.url,
          },
          {
            name: 'Calculators',
            url: `${SITE_CONFIG.url}/calculators`,
          },
          {
            name: 'Age Calculator',
            url: `${SITE_CONFIG.url}/calculators/age-calculator`,
          },
        ]}
      />

      <div className="container-main py-12 sm:py-16">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
            Free Online Calculator
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Age Calculator
          </h1>

          <p className="mt-4 leading-7 text-muted-foreground">
            Calculate your exact age in years, months and days.
            Discover your total days, weeks, hours and more.
          </p>
        </div>

        <AgeCalculator />
      </div>
    </>
  );
}