import type { Metadata } from 'next';

import PercentageCalculator from '@/components/calculators/percentage-calculator/PercentageCalculator';
import PercentageGuide from '@/components/calculators/percentage-calculator/PercentageGuide';
import BreadcrumbStructuredData from '@/components/seo/BreadcrumbStructuredData';
import { SITE_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Percentage Calculator - Percent Of, Change, Increase & Decrease',
  description:
    'Free online percentage calculator. Find a percentage of a number, work out percentage change, and increase or decrease a value by a percentage.',
  alternates: {
    canonical: '/calculators/percentage-calculator',
  },
  openGraph: {
    title: 'Percentage Calculator - Percent Of, Change, Increase & Decrease',
    description:
      'Free online percentage calculator. Find a percentage of a number, work out percentage change, and increase or decrease a value by a percentage.',
    url: `${SITE_CONFIG.url}/calculators/percentage-calculator`,
    siteName: SITE_CONFIG.name,
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Percentage Calculator - Percent Of, Change, Increase & Decrease',
    description:
      'Free online percentage calculator. Find a percentage of a number, work out percentage change, and increase or decrease a value by a percentage.',
  },
};

export default function PercentageCalculatorPage() {
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
            name: 'Percentage Calculator',
            url: `${SITE_CONFIG.url}/calculators/percentage-calculator`,
          },
        ]}
      />

      <div className="container-main py-12 sm:py-16">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
            Free Online Calculator
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Percentage Calculator
          </h1>

          <p className="mt-4 leading-7 text-muted-foreground">
            Find a percentage of a number, see what percent one number is of another, and calculate percentage change, discounts and increases.
          </p>
        </div>

        <PercentageCalculator />

        <div className="mx-auto max-w-4xl">
          <PercentageGuide />
        </div>
      </div>
    </>
  );
}
