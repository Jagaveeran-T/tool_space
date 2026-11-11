import ToolGuide, {
  type GuideFaq,
  type GuideLink,
  type GuideSection,
} from '@/components/tools/ToolGuide';

const sections: GuideSection[] = [
  {
    heading: 'What is a hexadecimal number?',
    paragraphs: [
      'A hexadecimal (hex) number is written in base 16. It uses the digits 0 to 9 and the letters A to F, where A is 10, B is 11, C is 12, D is 13, E is 14 and F is 15. Each digit is worth 16 times more than the digit to its right, just as each digit in a decimal number is worth 10 times more.',
    ],
  },
  {
    heading: 'How to convert hex to decimal',
    paragraphs: [
      'Give every digit a position, starting from 0 at the right-hand end. Convert each digit to its decimal value, multiply it by 16 raised to its position, and add the results together.',
    ],
    formula: {
      label: 'Formula',
      text: 'Decimal = (digit × 16^position) added together for every digit, counting positions from 0 on the right',
    },
    example: {
      title: 'Example: convert 1A3F to decimal',
      lines: [
        'F (15) × 16^0 = 15',
        '3 × 16^1 = 48',
        'A (10) × 16^2 = 2,560',
        '1 × 16^3 = 4,096',
        'Total: 15 + 48 + 2,560 + 4,096 = 6,719',
      ],
    },
  },
  {
    heading: 'Powers of 16',
    paragraphs: [
      'These are the place values you multiply by. Each position is 16 times the one before it.',
    ],
    table: {
      caption: 'Powers of 16 for hexadecimal place values',
      headers: ['Position', 'Power', 'Value'],
      rows: [
        ['0', '16^0', '1'],
        ['1', '16^1', '16'],
        ['2', '16^2', '256'],
        ['3', '16^3', '4,096'],
        ['4', '16^4', '65,536'],
        ['5', '16^5', '1,048,576'],
      ],
    },
  },
  {
    heading: 'Reading a hex colour code',
    paragraphs: [
      'A web colour such as #FF8800 is three hex pairs: red, green and blue. Converting each pair to decimal gives the familiar 0 to 255 values used by rgb().',
    ],
    example: {
      title: 'Example: the colour #FF8800',
      lines: [
        'FF = 15 × 16 + 15 = 255 (red)',
        '88 = 8 × 16 + 8 = 136 (green)',
        '00 = 0 (blue)',
        'So #FF8800 is rgb(255, 136, 0), a bright orange.',
      ],
    },
  },
  {
    heading: 'Bytes and hex digits',
    paragraphs: [
      'Two hex digits make one byte, so you can tell the size of a value from the number of digits. The table shows the largest value that fits in each size.',
    ],
    table: {
      caption: 'Largest hexadecimal value for common byte sizes',
      headers: ['Size', 'Hex digits', 'Largest hex value', 'Decimal'],
      rows: [
        ['1 byte', '2', 'FF', '255'],
        ['2 bytes', '4', 'FFFF', '65,535'],
        ['4 bytes', '8', 'FFFFFFFF', '4,294,967,295'],
        ['8 bytes', '16', 'FFFFFFFFFFFFFFFF', '18,446,744,073,709,551,615'],
      ],
    },
  },
  {
    heading: 'What input the converter accepts',
    list: [
      'Upper or lower case letters: FF and ff give the same result.',
      'An optional 0x prefix, such as 0xFF.',
      'An optional minus sign at the start for negative numbers.',
      'Spaces and underscores are ignored, so FF FF and FF_FF both work.',
      'Whole numbers only. Letters after F, a # sign or a decimal point will show an error.',
    ],
  },
  {
    heading: 'Signed values and two\'s complement',
    paragraphs: [
      'The converter reads the digits you enter as a plain positive number, so FFFFFFFF is 4,294,967,295. If that value is a signed 32-bit number, where the top bit marks a negative, subtract 2^32 (4,294,967,296) to get the signed value. Here that gives -1. Type a minus sign yourself, such as -FF, to convert a negative hex number directly.',
    ],
  },
];

const faqs: GuideFaq[] = [
  {
    question: 'How do I convert hex to decimal?',
    answer:
      'Multiply each hex digit by 16 raised to its position, counting from 0 at the right, then add the results. For 2EE that is 2 × 256 + 14 × 16 + 14 = 750. Or paste the hex value into the converter above.',
  },
  {
    question: 'What is FF in decimal?',
    answer:
      'FF in hexadecimal is 255 in decimal, because 15 × 16 + 15 = 255. It is the largest value a single byte can hold.',
  },
  {
    question: 'Is hexadecimal case sensitive?',
    answer:
      'No. The letters A to F can be upper or lower case. For example, 1a3f and 1A3F both equal 6,719.',
  },
  {
    question: 'What does 0x mean in front of a number?',
    answer:
      '0x is a prefix used by many programming languages to show that the number is hexadecimal. It is not part of the value, and this converter accepts it or ignores it.',
  },
  {
    question: 'Why does the converter show an error for my hex value?',
    answer:
      'Hex uses only 0-9 and A-F. The most common causes are a letter past F, such as G, a # sign copied from a colour code, or a decimal point. Remove those characters and try again.',
  },
  {
    question: 'Can it convert very large hex numbers?',
    answer:
      'Yes. It uses arbitrary-precision integers, so large values stay exact. FFFFFFFFFFFFFFFF converts to 18446744073709551615. Input is limited to 2,000 characters.',
  },
  {
    question: 'Are the values I enter saved?',
    answer:
      'No. Every conversion runs in your browser, and nothing you type is sent to our server or stored.',
  },
];

const related: GuideLink[] = [
  { href: '/converters/decimal-to-hex', label: 'Decimal to Hex Converter' },
  { href: '/converters/binary-to-ascii', label: 'Binary to Text Converter' },
  { href: '/converters', label: 'All Converters' },
];

export default function HexToDecimalGuide() {
  return (
    <ToolGuide
      id="hex-to-decimal"
      title="How to Convert Hexadecimal to Decimal"
      intro="This guide explains how hex place values work, shows the formula behind the converter above, and covers the sizes and formats you will meet most often."
      sections={sections}
      faqs={faqs}
      note="This converter gives mathematical results for whole numbers. For work where a wrong value matters, such as firmware or security, double-check the result in your own tools."
      related={related}
    />
  );
}