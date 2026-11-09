import ToolGuide, {
  type GuideFaq,
  type GuideLink,
  type GuideSection,
} from '@/components/tools/ToolGuide';

const sections: GuideSection[] = [
  {
    heading: 'What is a percentage?',
    paragraphs: [
      'A percentage is a way of writing a number as a part of 100. The word comes from the Latin per centum, meaning "by the hundred". So 25% means 25 out of every 100, which is the same as the fraction 1/4 and the decimal 0.25.',
      'Percentages make it easy to compare amounts of different sizes. Saying that 18 of 60 students passed is harder to interpret than saying that 30% passed, because you can compare 30% with the result from a class of any other size.',
    ],
  },
  {
    heading: 'Finding a percentage of a number (X% of Y)',
    paragraphs: [
      'To find a percentage of a number, turn the percentage into a decimal by dividing it by 100, then multiply it by the number.',
    ],
    formula: {
      label: 'Formula',
      text: 'Result = (Percentage ÷ 100) × Number',
    },
    example: {
      title: 'Example: 15% of 80',
      lines: ['15 ÷ 100 = 0.15', '0.15 × 80 = 12', 'So 15% of 80 is 12.'],
    },
  },
  {
    heading: 'Finding what percent one number is of another',
    paragraphs: [
      'To see what share one number is of another, divide the part by the whole and multiply by 100. This is how test scores, completion rates and survey results are usually expressed.',
    ],
    formula: {
      label: 'Formula',
      text: 'Percentage = (Part ÷ Whole) × 100',
    },
    example: {
      title: 'Example: 18 out of 60',
      lines: ['18 ÷ 60 = 0.3', '0.3 × 100 = 30', 'So 18 is 30% of 60.'],
    },
  },
  {
    heading: 'Calculating percentage change',
    paragraphs: [
      'Percentage change compares a new value with an old one. Subtract the old value from the new value, divide by the old value, then multiply by 100. A positive result is an increase and a negative result is a decrease. The old value is the starting point, so it cannot be zero.',
      'If a price falls from 80 to 60, the change is (60 − 80) ÷ 80 × 100 = −25%, which is a 25% decrease.',
    ],
    formula: {
      label: 'Formula',
      text: 'Change (%) = (New value − Old value) ÷ Old value × 100',
    },
    example: {
      title: 'Example: a price rises from 50 to 65',
      lines: [
        '65 − 50 = 15',
        '15 ÷ 50 = 0.3',
        '0.3 × 100 = 30, so the price rose by 30%.',
      ],
    },
  },
  {
    heading: 'Increasing or decreasing a number by a percentage',
    paragraphs: [
      'To add a percentage to a number, multiply the number by 1 plus the percentage as a decimal. To take a percentage away, multiply by 1 minus the percentage as a decimal. This is the quickest way to work out discounts, sales tax and price rises.',
    ],
    formula: {
      label: 'Formula',
      text: 'New value = Number × (1 ± Percentage ÷ 100)',
    },
    example: {
      title: 'Example: a jacket costs 80 and is 25% off',
      lines: [
        '1 − 0.25 = 0.75',
        '80 × 0.75 = 60',
        'The sale price is 60. Adding 8% sales tax to 45 works the same way: 45 × 1.08 = 48.60.',
      ],
    },
  },
  {
    heading: 'Why an increase and a decrease are not the same',
    paragraphs: [
      'A 50% increase followed by a 50% decrease does not bring you back to where you started. Starting at 100, a 50% increase gives 150. A 50% decrease of 150 is 75, not 100, because the second percentage is taken from the larger number.',
      'To undo an increase, the decrease has to be smaller in percentage terms. Reversing a 25% increase takes a 20% decrease, because 100 × 1.25 × 0.80 = 100.',
    ],
  },
  {
    heading: 'Percent versus percentage points',
    paragraphs: [
      'If an interest rate rises from 10% to 12%, it has gone up by 2 percentage points. In percentage terms the rise is 20%, because 2 ÷ 10 = 0.2. Mixing up the two is one of the most common sources of misleading statistics, so always check which one a headline or report is using.',
    ],
  },
  {
    heading: 'Quick mental maths',
    paragraphs: [
      'You can estimate many percentages in your head by starting from 10%.',
    ],
    list: [
      '10%: move the decimal point one place to the left (10% of 80 is 8).',
      '1%: move it two places (1% of 80 is 0.8).',
      '5%: take half of 10% (5% of 80 is 4).',
      '15%: add 10% and 5% (8 + 4 = 12).',
      '20%: double 10% (2 × 8 = 16).',
      '25%: divide by 4, and for 50% divide by 2.',
    ],
  },
  {
    heading: 'Where percentages are used',
    list: [
      'Shopping: discounts, sales tax and price comparisons.',
      'Education: test scores, weighted grades and attendance.',
      'Finance: interest rates, investment returns and inflation.',
      'Business: growth rates, profit margins and conversion rates.',
      'Health and food: nutrition labels and progress toward goals.',
    ],
  },
];

const faqs: GuideFaq[] = [
  {
    question: 'How do I calculate a percentage of a number?',
    answer:
      'Divide the percentage by 100 and multiply by the number. For example, 20% of 150 is 0.20 × 150 = 30.',
  },
  {
    question: 'How do I calculate the percentage increase between two numbers?',
    answer:
      'Subtract the old number from the new number, divide the result by the old number, and multiply by 100. Use the Percentage change calculator above and enter the old value first.',
  },
  {
    question: 'Can a percentage be greater than 100?',
    answer:
      'Yes. A value above 100% means more than the original amount. For example, 150% of 40 is 60, and a 150% increase on 40 gives 100.',
  },
  {
    question: 'Why is the percentage change undefined when the old value is 0?',
    answer:
      'The formula divides by the old value, and dividing by zero has no answer. When something grows from nothing, describe the change as a plain difference instead of a percentage.',
  },
  {
    question: 'Does the calculator work with decimals and negative numbers?',
    answer:
      'Yes. You can enter decimals and negative numbers. For percentage change, the result is measured against the size of the old value, so moving from −50 to −25 is shown as a 50% increase.',
  },
  {
    question: 'Are the numbers I enter saved?',
    answer:
      'No. Every calculation runs in your browser and your numbers are not sent to our server or stored.',
  },
];

const related: GuideLink[] = [
  { href: '/calculators/grade-calculator', label: 'Grade Calculator' },
  {
    href: '/calculators/date-difference-calculator',
    label: 'Date Difference Calculator',
  },
  { href: '/calculators/age-calculator', label: 'Age Calculator' },
  { href: '/calculators', label: 'All Calculators' },
];

export default function PercentageGuide() {
  return (
    <ToolGuide
      id="percentage-calculator"
      title="How Percentages Work"
      intro="This guide explains the formulas behind each calculator above, with worked examples and the mistakes people make most often."
      sections={sections}
      faqs={faqs}
      note="These calculators give mathematical results. For financial, tax or other important decisions, check the figures with a qualified professional."
      related={related}
    />
  );
}
