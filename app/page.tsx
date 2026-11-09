import type { Metadata } from 'next';

import HeroSection from '@/components/home/HeroSection';
import SearchTools from '@/components/home/SearchTools';
import PopularTools from '@/components/home/PopularTools';
import Categories from '@/components/home/Categories';
import RecentlyAdded from '@/components/home/RecentlyAdded';
import FAQSection from '@/components/home/FAQSection';
import { SITE_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Free Online Calculators, Converters & Tools',
  description:
    'Use free online calculators, converters and useful tools at ToolSpace. Calculate age, grades and convert binary numbers quickly and easily.',

  alternates: {
    canonical: '/',
  },

  openGraph: {
    title: 'Free Online Calculators, Converters & Tools',
    description:
      'Use free online calculators, converters and useful tools at ToolSpace. Calculate age, grades and convert binary numbers quickly and easily.',
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    type: 'website',
  },

  twitter: {
    card: 'summary',
    title: 'Free Online Calculators, Converters & Tools',
    description:
      'Use free online calculators, converters and useful tools at ToolSpace. Calculate age, grades and convert binary numbers quickly and easily.',
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SearchTools />
      <PopularTools />

      <Categories />
      <RecentlyAdded />
      <FAQSection />
    </>
  );
}