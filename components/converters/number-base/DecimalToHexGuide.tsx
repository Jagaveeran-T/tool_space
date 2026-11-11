import ToolGuide, {
  type GuideFaq,
  type GuideLink,
  type GuideSection,
} from '@/components/tools/ToolGuide';

const sections: GuideSection[] = [
  {
    heading: 'What is hexadecimal?',
    paragraphs: [
      'Hexadecimal, or hex, is a number system with a base of 16. Decimal, the system we use every day, has ten digits (0 to 9). Hexadecimal needs sixteen, so after 9 it continues with the letters A to F. A stands for 10, B for 11, C for 12, D for 13, E for 14 and F for 15.',
      'Hex is popular in computing because one hex digit matches exactly four binary digits (bits). A byte, which is eight bits, is always two hex digits. That makes hex a short, readable way to write values that are long in binary.',
    ],
  },
  {
    heading: 'How to convert decimal to hex',
    paragraphs: [
      'The standard method is repeated division by 16. Divide the number by 16 and write down the remainder. Then divide the quotient by 16 again, and keep going until the quotient is 0. The remainders, read from the last one to the first, are the hex digits. Any remainder from 10 to 15 is written as A to F.',
    ],
    formula: {
      label: 'Method',
      text: 'Divide by 16, note the remainder, repeat with the quotient until it is 0, then read the remainders from bottom to top.',
    },
    example: {
      title: 'Example: convert 750 to hex',
      lines: [
        '750 ÷ 16 = 46 remainder 14 (E)',
        '46 ÷ 16 = 2 remainder 14 (E)',
        '2 ÷ 16 = 0 remainder 2',
        'Reading the remainders from the bottom up gives 2EE.',
        'Check: 2 × 256 + 14 × 16 + 14 = 750.',
      ],
    },
  },
  {
    heading: 'Why 255 is FF',
    paragraphs: [
      'The number 255 is the largest value that fits in one byte, so it is one of the most common numbers you will convert.',
    ],
    example: {
      title: 'Example: convert 255 to hex',
      lines: [
        '255 ÷ 16 = 15 remainder 15 (F)',
        '15 ÷ 16 = 0 remainder 15 (F)',
        'Reading upward gives FF.',
      ],
    },
  },
  {
    heading: 'Decimal, hexadecimal and binary from 0 to 15',
    paragraphs: [
      'Every hex digit is a value from 0 to 15. Learning this short table makes all other conversions easier.',
    ],
    table: {
      caption: 'Decimal values 0 to 15 with their hexadecimal and binary equivalents',
      headers: ['Decimal', 'Hexadecimal', 'Binary'],
      rows: [
        ['0', '0', '0000'],
        ['1', '1', '0001'],
        ['2', '2', '0010'],
        ['3', '3', '0011'],
        ['4', '4', '0100'],
        ['5', '5', '0101'],
        ['6', '6', '0110'],
        ['7', '7', '0111'],
        ['8', '8', '1000'],
        ['9', '9', '1001'],
        ['10', 'A', '1010'],
        ['11', 'B', '1011'],
        ['12', 'C', '1100'],
        ['13', 'D', '1101'],
        ['14', 'E', '1110'],
        ['15', 'F', '1111'],
      ],
    },
  },
  {
    heading: 'Common decimal to hex values',
    table: {
      caption: 'Common decimal numbers and their hexadecimal values',
      headers: ['Decimal', 'Hexadecimal'],
      rows: [
        ['10', 'A'],
        ['16', '10'],
        ['100', '64'],
        ['255', 'FF'],
        ['256', '100'],
        ['1,000', '3E8'],
        ['4,095', 'FFF'],
        ['65,535', 'FFFF'],
      ],
    },
  },
  {
    heading: 'Negative numbers',
    paragraphs: [
      'This converter shows a negative number with a minus sign, so -255 becomes -FF. Computers usually store negative numbers in a different form called two\'s complement. To get the two\'s complement for a fixed width, add 2 raised to the number of bits to the negative value. For example, -1 in 8 bits is -1 + 256 = 255, which is FF.',
    ],
  },
  {
    heading: 'Where hexadecimal is used',
    list: [
      'Programming: memory addresses, byte values and the 0x prefix used in languages such as C, JavaScript and Python.',
      'Web design: colour codes such as #FF8800 store red, green and blue as three hex pairs.',
      'Networking: MAC addresses and IPv6 addresses are written in hex.',
      'Debugging and file formats: hex editors and error codes show raw bytes as hex.',
    ],
  },
];

const faqs: GuideFaq[] = [
  {
    question: 'How do I convert decimal to hexadecimal?',
    answer:
      'Divide the decimal number by 16 repeatedly and write down each remainder, using A to F for remainders 10 to 15. When the quotient reaches 0, read the remainders from last to first. You can also type the number into the converter above and get the answer instantly.',
  },
  {
    question: 'What is 255 in hex?',
    answer:
      '255 in decimal is FF in hexadecimal. It is 15 × 16 + 15, and both 15s are written as F.',
  },
  {
    question: 'Why do programmers use hexadecimal?',
    answer:
      'One hex digit represents exactly four bits, so a byte is always two hex digits. Hex is much shorter than binary and far easier to convert to and from it than decimal is.',
  },
  {
    question: 'Can this converter handle very large numbers?',
    answer:
      'Yes. It uses arbitrary-precision integers, so the result is exact even for numbers far above the limit of a normal calculator. For example, 18446744073709551615 converts exactly to FFFFFFFFFFFFFFFF. Input is limited to 2,000 characters.',
  },
  {
    question: 'Does it support decimal fractions such as 10.5?',
    answer:
      'No. The converter works with whole numbers only. Remove the fractional part before converting.',
  },
  {
    question: 'What does the 0x prefix mean?',
    answer:
      '0x is not part of the number. Many programming languages write it in front of a value to show that it is hexadecimal. Tick "Add 0x prefix" if you want it included in the result.',
  },
  {
    question: 'Are the numbers I enter saved?',
    answer:
      'No. Every conversion runs in your browser, and your numbers are not sent to our server or stored.',
  },
];

const related: GuideLink[] = [
  { href: '/converters/hex-to-decimal', label: 'Hex to Decimal Converter' },
  { href: '/converters/binary-to-ascii', label: 'Binary to Text Converter' },
  { href: '/converters', label: 'All Converters' },
];

export default function DecimalToHexGuide() {
  return (
    <ToolGuide
      id="decimal-to-hex"
      title="How to Convert Decimal to Hexadecimal"
      intro="This guide explains how hexadecimal works, the method behind the converter above, and the values you will use most often."
      sections={sections}
      faqs={faqs}
      note="This converter gives mathematical results for whole numbers. For work where a wrong value matters, such as firmware or security, double-check the result in your own tools."
      related={related}
    />
  );
}