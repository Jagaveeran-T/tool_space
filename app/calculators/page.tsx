
import type { Metadata } from 'next';

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

        <p className="mt-3 text-muted-foreground">
          Explore useful calculators for everyday tasks.
        </p>

        <div className="mt-8">
          <ToolGrid tools={calculatorTools} />
        </div>
      </div>
    </>
  );
}
