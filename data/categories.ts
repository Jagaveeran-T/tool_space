export type Category = {
  id: string;
  name: string;
  description: string;
  icon: string;
  slug: string;
};

// Only list categories that already contain tools. Empty categories look
// like an unfinished site to visitors and to AdSense reviewers. Add a new
// category here at the same time as its first tool.
export const categories: Category[] = [
  {
    id: 'calculators',
    name: 'Calculators',
    description:
      'Calculate ages, grades, GPA, percentages and date differences.',
    icon: 'calculator',
    slug: '/calculators',
  },
  {
    id: 'converters',
    name: 'Converters',
    description:
      'Convert numbers, text and different data formats.',
    icon: 'arrow-left-right',
    slug: '/converters',
  },
  {
    id: 'text-tools',
    name: 'Text Tools',
    description:
      'Count words and characters and check reading time.',
    icon: 'text',
    slug: '/text-tools',
  },
];
