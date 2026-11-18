import type { Metadata } from 'next';
import Link from 'next/link';

import { getToolsByCategory } from '@/data/tools';
import ToolGrid from '@/components/tools/ToolGrid';
import BreadcrumbStructuredData from '@/components/seo/BreadcrumbStructuredData';
import { SITE_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Online Calculators',
  description:
    'Explore free online calculators to calculate age, grades and other everyday values quickly and easily.',

  alternates: {
    canonical: '/calculators',
  },

  openGraph: {
    title: 'Online Calculators',
    description:
      'Explore free online calculators to calculate age, grades and other everyday values quickly and easily.',
    url: `${SITE_CONFIG.url}/calculators`,
    siteName: SITE_CONFIG.name,
    type: 'website',
  },

  twitter: {
    card: 'summary',
    title: 'Online Calculators',
    description:
      'Explore free online calculators to calculate age, grades and other everyday values quickly and easily.',
  },
};

export default function CalculatorsPage() {
  const calculatorTools = getToolsByCategory('Calculators');

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
        ]}
      />

      <div className="container-main py-12">
        <h1 className="text-3xl font-bold text-foreground">
          Online Calculators
        </h1>

        <p className="mt-3 max-w-3xl leading-7 text-muted-foreground">
          These calculators cover everyday number and date questions.
          Use the Age Calculator to find your exact age on any date,
          the Grade Calculator for weighted grades, final exam targets
          and GPA, the Percentage Calculator for percent of, percentage
          change and discounts, and the Date Difference Calculator to
          count the days, weeks and weekdays between two dates.
        </p>

        <p className="mt-3 max-w-3xl leading-7 text-muted-foreground">
          Calculations run in your browser, and each calculator has a
          guide with the formula and worked examples so you can check
          the result yourself. Need to convert numbers instead? See our{' '}
          <Link
            href="/converters"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            converters
          </Link>
          .
        </p>

        <div className="mt-8">
          <ToolGrid tools={calculatorTools} />
        </div>
      </div>
    </>
  );
}