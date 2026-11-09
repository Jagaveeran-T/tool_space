
export type Tool = {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  icon: string;
  status: 'active' | 'coming-soon';
  featured: boolean;
  popular: boolean;
  keywords: string[];
  createdAt: string;
};

export const tools: Tool[] = [
  {
    id: 'age-calculator',
    name: 'Age Calculator',
    slug: '/calculators/age-calculator',
    category: 'Calculators',
    description:
      'Calculate your exact age in years, months, weeks and days.',
    icon: 'calendar-days',
    status: 'active',
    featured: true,
    popular: true,
    keywords: [
      'age',
      'date of birth',
      'birthday',
      'years',
      'months',
      'days',
      'age calculator',
    ],
    createdAt: '2026-11-01',
  },
  {
    id: 'grade-calculator',
    name: 'Grade Calculator',
    slug: '/calculators/grade-calculator',
    category: 'Calculators',
    description:
      'Calculate weighted grades, letter grades and required final exam scores.',
    icon: 'graduation-cap',
    status: 'active',
    featured: true,
    popular: true,
    keywords: ['grade', 'marks', 'percentage', 'GPA', 'exam'],
    createdAt: '2026-11-01',
  },
  {
    id: 'binary-to-ascii',
    name: 'Binary to ASCII Converter',
    slug: '/converters/binary-to-ascii',
    category: 'Converters',
    description:
      'Convert binary numbers into readable text using ASCII and UTF-8.',
    icon: 'binary',
    status: 'active',
    featured: true,
    popular: true,
    keywords: ['binary', 'ASCII', 'text', 'number conversion'],
    createdAt: '2026-11-01',
  },
  {
    id: 'percentage-calculator',
    name: 'Percentage Calculator',
    slug: '/calculators/percentage-calculator',
    category: 'Calculators',
    description:
      'Find a percentage of a number, percentage change, and increase or decrease a value by a percentage.',
    icon: 'calculator',
    status: 'active',
    featured: true,
    popular: true,
    keywords: [
      'percentage',
      'percent',
      'percent of',
      'percentage change',
      'percentage increase',
      'percentage decrease',
      'discount',
    ],
    createdAt: '2026-11-07',
  },
  {
    id: 'date-difference-calculator',
    name: 'Date Difference Calculator',
    slug: '/calculators/date-difference-calculator',
    category: 'Calculators',
    description:
      'Calculate the number of days, weeks, months and years between two dates, including weekdays.',
    icon: 'calendar-days',
    status: 'active',
    featured: false,
    popular: false,
    keywords: [
      'date difference',
      'days between dates',
      'date calculator',
      'weekdays',
      'business days',
      'duration',
    ],
    createdAt: '2026-11-07',
  },
  {
    id: 'word-counter',
    name: 'Word Counter',
    slug: '/text-tools/word-counter',
    category: 'Text Tools',
    description:
      'Count words, characters, sentences and paragraphs, and estimate reading and speaking time.',
    icon: 'text',
    status: 'active',
    featured: false,
    popular: true,
    keywords: [
      'word count',
      'character count',
      'sentences',
      'paragraphs',
      'reading time',
      'text',
    ],
    createdAt: '2026-11-07',
  },
];

export function getActiveTools() {
  return tools.filter((tool) => tool.status === 'active');
}

export function getFeaturedTools() {
  return getActiveTools().filter((tool) => tool.featured);
}

export function getPopularTools() {
  return getActiveTools().filter((tool) => tool.popular);
}

export function getToolsByCategory(category: string) {
  return getActiveTools().filter(
    (tool) => tool.category === category,
  );
}

export function getToolById(id: string) {
  return tools.find((tool) => tool.id === id);
}
