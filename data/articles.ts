export type ArticleSection = {
  heading: string;
  paragraphs?: string[];
  list?: string[];
  table?: { headers: string[]; rows: string[][] };
};

export type Article = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string; // YYYY-MM-DD
  updatedAt: string; // YYYY-MM-DD. Change only when the content really changes.
  intro: string;
  sections: ArticleSection[];
  /** ids from data/tools.ts */
  relatedToolIds: string[];
};

// How to add a guide: append an object to this array. The page, the guides
// index, the sitemap and the home page pick it up automatically.
// Write each guide from real knowledge or testing, with your own worked
// examples. Do not paste generic text.
export const articles: Article[] = [
  {
    slug: 'percentage-increase-decrease-not-symmetric',
    title: 'Why a 50% Increase and a 50% Decrease Don’t Cancel Out',
    description:
      'A 50% rise followed by a 50% fall leaves you 25% down. See why percentages are not symmetric, with worked examples for prices, discounts and interest rates.',
    publishedAt: '2026-11-20',
    updatedAt: '2026-11-20',
    intro:
      'If a price rises by 50% and then falls by 50%, it does not return to where it started. It ends up 25% lower. This catches out shoppers, investors and students alike, and it comes from one simple fact: each percentage is measured against a different base.',
    relatedToolIds: ['percentage-calculator'],
    sections: [
      {
        heading: 'The same percentage on a different base',
        paragraphs: [
          'Start with 100. A 50% increase adds 50, giving 150. Now take 50% off that new number. Half of 150 is 75, so you land on 75, not 100. The decrease was applied to 150, a bigger number than the one you began with, so it removed more than the increase added.',
          'The net result is a 25% drop, from 100 to 75. The order does not change the final value: a 50% fall first (100 to 50) followed by a 50% rise (50 to 75) also ends at 75. Multiplying makes this clear, because 1.5 × 0.5 = 0.75.',
        ],
      },
      {
        heading: 'How much do you need to recover a loss?',
        paragraphs: [
          'To get back to the start after a fall, the rise has to be larger than the fall. The formula is: required gain = loss ÷ (1 − loss). A 20% fall needs a 25% rise (0.20 ÷ 0.80). A 50% fall needs a 100% rise. A 75% fall needs a 300% rise.',
          'Going the other way, undoing a rise needs a smaller fall: required fall = gain ÷ (1 + gain). A 25% rise is undone by a 20% fall (0.25 ÷ 1.25).',
        ],
        table: {
          headers: ['Fall', 'Rise needed to get back to the start'],
          rows: [
            ['10%', '11.1%'],
            ['20%', '25%'],
            ['30%', '42.9%'],
            ['50%', '100%'],
            ['75%', '300%'],
          ],
        },
      },
      {
        heading: 'Stacked discounts and tax',
        paragraphs: [
          'Two discounts do not add up. 20% off followed by an extra 10% off is not 30% off. Take 100: after 20% off you pay 80, and 10% off that is 8 less, so you pay 72. The total discount is 28%. As a shortcut, multiply the remaining fractions: 0.80 × 0.90 = 0.72.',
          'The same logic applies to tax. A 20% discount followed by 20% sales tax takes 100 to 80 and then to 96. You pay 4% less than the original price, not the same price.',
        ],
      },
      {
        heading: 'Percent versus percentage points',
        paragraphs: [
          'Another common slip is mixing percent change with percentage points. If an interest rate moves from 4% to 5%, it has risen by 1 percentage point, but by 25% in relative terms (1 ÷ 4). News reports use both, so check which one is meant before comparing numbers.',
        ],
      },
      {
        heading: 'Quick checklist',
        list: [
          'Always ask what the percentage is of: 50% of what?',
          'Percentage change = (new − old) ÷ old × 100. The old value is the base.',
          'Successive changes multiply. They do not add.',
          'A change from zero has no defined percentage change, because it would mean dividing by zero.',
          'Use percentage points when comparing one rate with another.',
        ],
      },
    ],
  },
  {
    slug: 'hexadecimal-in-everyday-computing',
    title: 'Hexadecimal in Everyday Computing: Colors, MAC Addresses and Bytes',
    description:
      'Why programmers use base 16, how to read hex colors such as #FF5733, and how hex relates to bytes, MAC addresses and Unicode characters.',
    publishedAt: '2026-11-20',
    updatedAt: '2026-11-20',
    intro:
      'Hexadecimal looks intimidating, but you probably meet it every day without noticing: in web colors, in device addresses and in error codes. This guide explains why computers favor base 16 and how to read it by hand.',
    relatedToolIds: ['decimal-to-hex', 'hex-to-decimal', 'binary-to-ascii'],
    sections: [
      {
        heading: 'Why base 16?',
        paragraphs: [
          'Computers store data in bits, and a byte is eight bits. One hexadecimal digit represents exactly four bits, so a byte is always exactly two hex digits. That makes hex a compact, readable way to write binary: the byte 11111111 is simply FF. Decimal does not line up with bits this way, which is why 255 is harder to recognize as "all eight bits on".',
          'Hex uses sixteen symbols: 0 to 9 for the values zero to nine, and A to F for ten to fifteen. Prefixes such as 0x (as in 0xFF) or # (in CSS colors) only signal that the number is hexadecimal.',
        ],
        table: {
          headers: ['Decimal', 'Hex', 'Binary'],
          rows: [
            ['10', 'A', '1010'],
            ['15', 'F', '1111'],
            ['16', '10', '10000'],
            ['255', 'FF', '11111111'],
            ['256', '100', '100000000'],
            ['4095', 'FFF', '111111111111'],
            ['65535', 'FFFF', '1111111111111111'],
          ],
        },
      },
      {
        heading: 'Reading a web color',
        paragraphs: [
          'A CSS color such as #FF5733 is three bytes: red, green and blue. Split it into FF, 57 and 33. In decimal, FF is 255, 57 is 5 × 16 + 7 = 87, and 33 is 3 × 16 + 3 = 51. So #FF5733 is rgb(255, 87, 51): full red, a little green and less blue, which gives a reddish orange.',
          '#000000 is black and #FFFFFF is white. Any color with equal red, green and blue values, such as #808080, is a shade of gray.',
        ],
      },
      {
        heading: 'Converting by hand',
        paragraphs: [
          'To convert hex to decimal, multiply each digit by a power of 16, starting from the right. For 0x1F4: 1 × 256 + 15 × 16 + 4 × 1 = 256 + 240 + 4 = 500.',
          'To go the other way, divide by 16 repeatedly and read the remainders from bottom to top. For 500: 500 ÷ 16 = 31 remainder 4; 31 ÷ 16 = 1 remainder 15 (F); 1 ÷ 16 = 0 remainder 1. Reading upward gives 1, F, 4, so 500 is 0x1F4.',
        ],
      },
      {
        heading: 'Other places you will see hex',
        list: [
          'MAC addresses: a network card address such as 00:1A:2B:3C:4D:5E is six bytes written as twelve hex digits.',
          'IPv6 addresses: written as eight groups of four hex digits, for example 2001:0db8:85a3:0000:0000:8a2e:0370:7334.',
          'Unicode: the letter é has the code point U+00E9, which is 233 in decimal.',
          'Debuggers and memory dumps usually print values in hex because it maps cleanly onto bytes.',
        ],
      },
      {
        heading: 'Common mistakes',
        list: [
          'Thinking letter case matters. 0xff and 0xFF are the same value.',
          'Misreading shorthand colors. #0F0 expands to #00FF00 (each digit is doubled), not #0F0000.',
          'Reading a hex number that contains only digits as decimal. 0x10 is 16, not ten.',
        ],
      },
    ],
  },
  {
    slug: 'counting-days-between-dates',
    title: 'Counting Days Between Dates: Inclusive vs Exclusive and Other Pitfalls',
    description:
      'Why two people can get different answers for the number of days between two dates, and how leap years, month lengths and weekends change the result.',
    publishedAt: '2026-11-20',
    updatedAt: '2026-11-20',
    intro:
      'Ask two people how many days there are between 1 November and 20 November and you may get 19 and 20, and both can be right. The difference is whether the end date is counted. Here is how to avoid mix-ups.',
    relatedToolIds: ['date-difference-calculator', 'age-calculator'],
    sections: [
      {
        heading: 'Exclusive and inclusive counting',
        paragraphs: [
          'The most common method is exclusive: subtract the start date from the end date. From 1 November to 20 November that gives 19 days. Inclusive counting also counts the first day, so the same range covers 20 calendar days. Leave requests, event schedules and some contracts use inclusive counting, because both the first and the last day are days that are used.',
          'A simple test: from Monday to Tuesday, is that one day or two? If you are counting the nights of a hotel stay, it is one. If you are counting the calendar days you are present, it is two. Decide which meaning you need before you calculate.',
        ],
      },
      {
        heading: 'Month lengths and leap years',
        paragraphs: [
          'Months have 28 to 31 days, so "one month later" is not a fixed number of days. Adding one month to 31 January has no exact equivalent in February, so every calculator has to apply a rule, such as moving to the last day of February. When an exact month count matters, check which rule is used.',
          'Leap years add 29 February. A year is a leap year if it is divisible by 4, except century years, which must be divisible by 400. So 2028 is a leap year, 2100 is not, and 2000 was. A date range that crosses 29 February is one day longer than the same range in another year.',
        ],
      },
      {
        heading: 'Weekdays and business days',
        paragraphs: [
          'To count weekdays, exclude Saturdays and Sundays. A span of exactly four weeks (28 days) always contains 20 weekdays, wherever it starts. Public holidays vary by country and region, and a weekday count does not know about them, so subtract holidays yourself when you need working days. In some countries the weekend falls on different days, so also check the local convention.',
        ],
      },
      {
        heading: 'Worked example',
        paragraphs: [
          'How many days are there from Monday 2 November 2026 to Friday 20 November 2026?',
        ],
        list: [
          'Exclusive difference: 18 days.',
          'Inclusive count: 19 calendar days.',
          'Weekdays, counting both ends: 15, which is three full Monday-to-Friday weeks.',
        ],
      },
      {
        heading: 'Checklist',
        list: [
          'Decide whether the end date should be counted.',
          'Check whether 29 February falls inside the range.',
          'Say whether you mean calendar days, weekdays or working days.',
          'For deadlines, read the rule in the document: some count from the day after the triggering event.',
        ],
      },
    ],
  },
];

export function getArticleBySlug(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export function getLatestArticles(limit = 3) {
  return [...articles]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, limit);
}

export function getArticleWordCount(article: Article) {
  const text = [
    article.title,
    article.intro,
    ...article.sections.flatMap((section) => [
      section.heading,
      ...(section.paragraphs ?? []),
      ...(section.list ?? []),
      ...(section.table?.rows.flat() ?? []),
    ]),
  ].join(' ');

  return text.split(/\s+/).filter(Boolean).length;
}

export function getReadingMinutes(article: Article) {
  return Math.max(1, Math.round(getArticleWordCount(article) / 200));
}