import ToolGuide, {
  type GuideFaq,
  type GuideLink,
  type GuideSection,
} from "@/components/tools/ToolGuide";

const sections: GuideSection[] = [
  {
    heading: "What is binary?",
    paragraphs: [
      "Binary is a number system that uses only two digits, 0 and 1. Computers use it because their circuits have two states, on and off. Each 0 or 1 is called a bit, and eight bits make a byte. One byte can hold 256 different values, from 0 to 255.",
      "Computers store text by giving every character a number and writing that number in binary. When you convert binary to text, you are reversing that process: reading the numbers and looking up which characters they stand for.",
    ],
  },
  {
    heading: "How binary maps to text",
    paragraphs: [
      "ASCII is the best-known mapping. It assigns the numbers 0 to 127 to English letters, digits, punctuation and a few control codes. For example, uppercase A is 65 and lowercase a is 97. The table below shows common characters in decimal, hexadecimal and 8-bit binary.",
    ],
    table: {
      caption: "Common ASCII characters in decimal, hexadecimal and binary",
      headers: ["Character", "Decimal", "Hex", "Binary"],
      rows: [
        ["A", "65", "41", "01000001"],
        ["B", "66", "42", "01000010"],
        ["H", "72", "48", "01001000"],
        ["a", "97", "61", "01100001"],
        ["z", "122", "7A", "01111010"],
        ["0", "48", "30", "00110000"],
        ["9", "57", "39", "00111001"],
        ["Space", "32", "20", "00100000"],
        ["!", "33", "21", "00100001"],
      ],
    },
  },
  {
    heading: "Converting binary to text by hand",
    paragraphs: [
      "First, split the binary into groups of 8 bits. Second, convert each group to a decimal number by adding the place values 128, 64, 32, 16, 8, 4, 2 and 1 wherever there is a 1. Third, look up the character for that number.",
    ],
    example: {
      title: "Example: 01001000 01101001",
      lines: [
        "01001000 = 64 + 8 = 72, which is H",
        "01101001 = 64 + 32 + 8 + 1 = 105, which is i",
        "The text is Hi.",
      ],
    },
  },
  {
    heading: "Converting text to binary",
    paragraphs: [
      "Going the other way, look up the number for each character and write it as 8 bits. The word Hello is made of the numbers 72, 101, 108, 108 and 111.",
    ],
    example: {
      title: "Example: Hello",
      lines: [
        "H = 72 = 01001000",
        "e = 101 = 01100101",
        "l = 108 = 01101100 (twice)",
        "o = 111 = 01101111",
        "Hello = 01001000 01100101 01101100 01101100 01101111",
      ],
    },
  },
  {
    heading: "ASCII, UTF-8 and other encodings",
    paragraphs: [
      "ASCII only covers 128 characters, so it cannot represent accented letters, other alphabets or emoji. UTF-8 solves this by using one to four bytes per character. The first 128 characters are identical to ASCII, which is why plain English text looks the same in both.",
      "Characters outside ASCII take more bytes. The letter é is two bytes (11000011 10101001), the euro sign € is three bytes (11100010 10000010 10101100), and most emoji are four bytes.",
      "This converter also supports UTF-16 in little-endian and big-endian byte order and Windows-1252. Several ISO-8859 encodings are available for decoding binary into text. Choose the encoding the data was created with. The wrong encoding is the most common reason for garbled or invalid output.",
    ],
  },
  {
    heading: "Other number systems",
    paragraphs: [
      "The same value can be written in different number systems. The number 72, the letter H in ASCII, is 1001000 in binary, 110 in octal and 48 in hexadecimal. Programmers often use hexadecimal because two hex digits describe exactly one byte, which is shorter and easier to read than eight binary digits.",
    ],
  },
  {
    heading: "Common problems and how to fix them",
    list: [
      "An error about complete 8-bit bytes: binary written as one continuous run must be a whole number of bytes. A missing leading zero shifts every byte after it, so write each character as a full 8 bits.",
      "The output has strange symbols or an error about invalid data: try a different encoding, usually UTF-8.",
      "An invalid binary value: the input may contain a character other than 0 and 1. Separate groups with spaces, commas or semicolons, or enter one continuous run of full bytes.",
      "An error about ASCII in ASCII mode: ASCII stops at 127, so switch to UTF-8 or another encoding for characters beyond that.",
    ],
  },
  {
    heading: "Where binary to text conversion is useful",
    list: [
      "Learning how computers store and represent data.",
      "Solving computer science homework and puzzles.",
      "Debugging data, network messages and file contents.",
      "Decoding messages that were written in binary.",
    ],
  },
];

const faqs: GuideFaq[] = [
  {
    question: "How do I convert binary to text?",
    answer:
      "Select Binary as the input format and Text as the output format. Enter your binary values, select a character encoding such as UTF-8, and click Convert to view the readable text.",
  },
  {
    question: "What is the binary representation of the letter H?",
    answer:
      "In ASCII and UTF-8, the uppercase letter H is represented by the 8-bit binary value 01001000. Its decimal value is 72 and its hexadecimal value is 48.",
  },
  {
    question: "What is the difference between ASCII and UTF-8?",
    answer:
      "ASCII represents 128 standard characters, while UTF-8 supports Unicode characters from many languages. UTF-8 is backward-compatible with standard ASCII.",
  },
  {
    question: "Can I convert text to binary?",
    answer:
      "Yes. Select Text as the input format and Binary as the output format. Enter your text, choose a character encoding and click Convert.",
  },
  {
    question: "Can I convert decimal, octal and hexadecimal values?",
    answer:
      "Yes. You can convert between binary, decimal, octal, hexadecimal and text using the input and output format selectors.",
  },
  {
    question: "Why does my output show strange characters?",
    answer:
      "This usually means the data was encoded with a different character encoding from the one selected. Try UTF-8 first, then the other encodings in the list.",
  },
  {
    question: "Is this binary to text converter free?",
    answer:
      "Yes. You can use this online converter for free without creating an account.",
  },
  {
    question: "Is my input data uploaded to a server?",
    answer:
      "Conversion is performed in your browser. Your entered values are not sent to the application server for conversion.",
  },
];

const related: GuideLink[] = [
  { href: "/text-tools/word-counter", label: "Word Counter" },
  { href: "/calculators/percentage-calculator", label: "Percentage Calculator" },
  { href: "/converters", label: "All Converters" },
  { href: "/tools", label: "All Tools" },
];

export default function HowItWorks() {
  return (
    <ToolGuide
      id="binary-converter"
      title="Binary, ASCII and Text Explained"
      intro="How binary represents text, how to convert by hand, and how to fix the most common problems."
      sections={sections}
      faqs={faqs}
      related={related}
    />
  );
}
