import type { Metadata } from 'next';

import DateDifferenceCalculator from '@/components/calculators/date-difference/DateDifferenceCalculator';
import DateDifferenceGuide from '@/components/calculators/date-difference/DateDifferenceGuide';
import BreadcrumbStructuredData from '@/components/seo/BreadcrumbStructuredData';
import { SITE_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Date Difference Calculator - Days Between Two Dates',
  description:
    'Calculate the number of days, weeks, months and years between two dates, with a weekday and weekend count. Free online date calculator.',
  alternates: {
    canonical: '/calculators/date-difference-calculator',
  },
  openGraph: {
    title: 'Date Difference Calculator - Days Between Two Dates',
    description:
      'Calculate the number of days, weeks, months and years between two dates, with a weekday and weekend count. Free online date calculator.',
    url: `${SITE_CONFIG.url}/calculators/date-difference-calculator`,
    siteName: SITE_CONFIG.name,
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Date Difference Calculator - Days Between Two Dates',
    description:
      'Calculate the number of days, weeks, months and years between two dates, with a weekday and weekend count. Free online date calculator.',
  },
};

export default function DateDifferenceCalculatorPage() {
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
            name: 'Date Difference Calculator',
            url: `${SITE_CONFIG.url}/calculators/date-difference-calculator`,
          },
        ]}
      />

      <div className="container-main py-12 sm:py-16">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
            Free Online Calculator
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Date Difference Calculator
          </h1>

          <p className="mt-4 leading-7 text-muted-foreground">
            Find the number of days, weeks, months and years between two dates, and see how many of them are weekdays.
          </p>
        </div>

        <DateDifferenceCalculator />

        <div className="mx-auto max-w-4xl">
          <DateDifferenceGuide />
        </div>
      </div>
    </>
  );
}
