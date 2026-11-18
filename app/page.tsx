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
    'Free online calculators, converters and text tools at GetToolSpace: age, grade, percentage, date difference, word count, binary and hex.',

  alternates: {
    canonical: '/',
  },

  openGraph: {
    title: 'Free Online Calculators, Converters & Tools',
    description:
      'Free online calculators, converters and text tools at GetToolSpace: age, grade, percentage, date difference, word count, binary and hex.',
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    type: 'website',
  },

  twitter: {
    card: 'summary',
    title: 'Free Online Calculators, Converters & Tools',
    description:
      'Free online calculators, converters and text tools at GetToolSpace: age, grade, percentage, date difference, word count, binary and hex.',
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