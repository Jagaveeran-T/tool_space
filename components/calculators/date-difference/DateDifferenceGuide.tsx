import ToolGuide, {
  type GuideFaq,
  type GuideLink,
  type GuideSection,
} from '@/components/tools/ToolGuide';

const sections: GuideSection[] = [
  {
    heading: 'What this calculator shows',
    paragraphs: [
      'Enter a start date and an end date to see the time between them in three ways: as years, months and days; as a total number of days; and as weeks plus leftover days. It also counts how many of those days fall on weekdays (Monday to Friday) and how many fall on weekends.',
    ],
  },
  {
    heading: 'How the calendar difference is calculated',
    paragraphs: [
      'The calculator counts whole years first, then whole months, and then the days that remain. Because months have different lengths, this is a calendar count and not a fixed 30-day month.',
      'When the start date is a day that the target month does not have, such as the 31st, the calculator uses the last day of that month instead.',
    ],
    example: {
      title: 'Example: 31 January 2024 to 1 March 2024',
      lines: [
        '31 January to 29 February is 1 month (29 February is the last day of February in a leap year).',
        '29 February to 1 March is 1 day.',
        'Result: 1 month and 1 day, which is 30 days in total.',
      ],
    },
  },
  {
    heading: 'Including or excluding the end date',
    paragraphs: [
      'By default the end date is not counted, so 1 January to 2 January is 1 day. This matches how most people measure the time that passes between two moments.',
      'Tick "Include the end date" when both the first and the last day count. A conference that runs from 10 to 12 March covers 3 days including both ends, even though only 2 days pass between its start and its end.',
    ],
    example: {
      title: 'Example: 1 January 2024 to 31 December 2024',
      lines: [
        'Without the end date: 365 days, or 11 months and 30 days.',
        'With the end date: 366 days, which is exactly 1 year in a leap year.',
      ],
    },
  },
  {
    heading: 'Weekdays and weekends',
    paragraphs: [
      'The weekday count includes Monday to Friday, starting from the start date. It does not know about public holidays, company shutdowns or regional weekends (some countries use Friday and Saturday), so treat it as an estimate of working days and subtract any holidays yourself.',
    ],
    example: {
      title: 'Example: 15 March 2024 (a Friday) to 20 June 2024',
      lines: [
        '97 days in total, which is 13 weeks and 6 days.',
        '69 weekdays and 28 weekend days.',
      ],
    },
  },
  {
    heading: 'Leap years',
    paragraphs: [
      'A leap year has 366 days because 29 February is added. Years divisible by 4 are leap years, except century years that are not divisible by 400, so 2000 and 2024 were leap years but 1900 and 2100 are not.',
      'The calculator handles this automatically. From 1 January 2000 to 1 January 2024 is exactly 24 years, or 8,766 days, because six leap days fall in that period.',
    ],
  },
  {
    heading: 'Common uses',
    list: [
      'Project deadlines, sprints and delivery schedules.',
      'Notice periods, contract terms and probation periods.',
      'Counting down to an event or counting the time since one.',
      'Travel planning and trip lengths.',
      'Billing periods and subscription lengths.',
      'Estimating how many working days are available before a deadline.',
    ],
  },
  {
    heading: 'Limits',
    paragraphs: [
      'Dates are treated as calendar dates, without a time of day or a time zone. The calculator accepts years from 1000 to 9999.',
    ],
  },
];

const faqs: GuideFaq[] = [
  {
    question: 'How many days are there between two dates?',
    answer:
      'Enter both dates and read the Total days figure. By default the end date is not counted. Tick "Include the end date" to count both the first and the last day.',
  },
  {
    question: 'Does the order of the dates matter?',
    answer:
      'No. If the start date is after the end date, the calculator swaps them and tells you it did so.',
  },
  {
    question: 'How are months counted when months have different lengths?',
    answer:
      'Whole calendar months are counted from the start date, and any remaining days are shown separately. If the start day does not exist in a month, the last day of that month is used.',
  },
  {
    question: 'Does the weekday count exclude public holidays?',
    answer:
      'No. It counts Monday to Friday only, so public holidays and other days off are not removed. Subtract them yourself for an exact count of working days.',
  },
  {
    question: 'Does it account for leap years?',
    answer:
      'Yes. Leap days are included automatically, so a span that contains 29 February counts it.',
  },
  {
    question: 'Are the dates I enter saved?',
    answer:
      'No. The calculation runs in your browser and your dates are not sent to our server or stored.',
  },
];

const related: GuideLink[] = [
  { href: '/calculators/age-calculator', label: 'Age Calculator' },
  { href: '/calculators/percentage-calculator', label: 'Percentage Calculator' },
  { href: '/text-tools/word-counter', label: 'Word Counter' },
  { href: '/calculators', label: 'All Calculators' },
];

export default function DateDifferenceGuide() {
  return (
    <ToolGuide
      id="date-difference-calculator"
      title="How the Date Difference Calculator Works"
      intro="A short guide to how the dates are counted, with worked examples."
      sections={sections}
      faqs={faqs}
      note="Results are calculated from calendar dates only. For legal, contractual or payroll deadlines, confirm the exact counting rules that apply to you."
      related={related}
    />
  );
}
