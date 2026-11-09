import ToolGuide, {
  type GuideFaq,
  type GuideLink,
  type GuideSection,
} from '@/components/tools/ToolGuide';

const sections: GuideSection[] = [
  {
    heading: 'What the Word Counter measures',
    paragraphs: [
      'Type or paste text into the box and the counts update as you go. Here is what each figure means.',
    ],
    list: [
      'Words: groups of characters separated by spaces, tabs or line breaks.',
      'Characters: every character including spaces. A line break counts as one character.',
      'Characters (no spaces): the same count with all spaces, tabs and line breaks removed.',
      'Sentences: an estimate based on . ! ? and … followed by a space or the end of the text.',
      'Paragraphs: each non-empty line counts as one paragraph, like a word processor.',
      'Reading time and speaking time: estimates based on the word count.',
      'Most used words: words that appear more than once, ignoring common words such as "the" and "and".',
    ],
  },
  {
    heading: 'How words are counted',
    paragraphs: [
      'A word is any group of characters that contains at least one letter or number. Symbols on their own, such as a lone dash or an ellipsis, are not counted as words.',
      'Hyphenated terms like "well-known" and contractions like "don\'t" each count as one word, which is how most word processors count them. Counts can still differ by a few words between programs, because each one treats numbers, symbols and hyphens slightly differently.',
    ],
  },
  {
    heading: 'Reading time and speaking time',
    paragraphs: [
      'Reading time assumes 225 words per minute, a common estimate for an adult reading ordinary text silently. Speaking time assumes 130 words per minute, a comfortable pace for a speech or presentation.',
      'Real speeds vary a lot between people. Technical or unfamiliar material is read more slowly, and a presentation with pauses, slides or questions takes longer than the raw figure suggests.',
    ],
    example: {
      title: 'Example: a 900-word article',
      lines: [
        'Reading time: 900 ÷ 225 = 4 minutes.',
        'Speaking time: 900 ÷ 130 ≈ 6 minutes 55 seconds.',
      ],
    },
  },
  {
    heading: 'Common length guidelines',
    paragraphs: [
      'Many places limit how much you can write. These are typical figures, but always check the exact rules of the platform or assignment you are writing for.',
    ],
    table: {
      caption: 'Typical text length guidelines',
      headers: ['Use', 'Typical guideline'],
      rows: [
        ['Post on X (standard accounts)', '280 characters'],
        ['Single SMS message', '160 characters (70 if it has emoji or some non-Latin characters)'],
        ['Search result title', 'About 50 to 60 characters'],
        ['Meta description', 'About 150 to 160 characters'],
        ['Page of an essay', 'Roughly 250 words double-spaced, 500 single-spaced'],
      ],
    },
  },
  {
    heading: 'Ways to use the counts',
    list: [
      'Check an essay or application against a word limit before you submit it.',
      'Trim a title or description to fit a character limit.',
      'Use the most used words to spot repetition and find better wording.',
      'Shorten long sentences: a high word count with few sentences often means the sentences are too long.',
      'Estimate how long a blog post takes to read or how long a speech will run.',
    ],
  },
  {
    heading: 'Languages and limits',
    paragraphs: [
      'Word counting relies on spaces between words, so it works well for English and other languages that use spaces. It does not work for languages such as Chinese, Japanese or Thai, which do not separate words with spaces. For those languages, use the character count.',
      'Sentence counting is an estimate. An abbreviation such as "Dr." followed by a space may be counted as the end of a sentence. Text with hard line breaks inside paragraphs, for example when copied from a PDF, will show more paragraphs than it really contains.',
    ],
  },
  {
    heading: 'Your text stays private',
    paragraphs: [
      'The text is analysed in your browser as you type. It is not uploaded to our server or stored, and it disappears when you close or refresh the page.',
    ],
  },
];

const faqs: GuideFaq[] = [
  {
    question: 'How many words are on a page?',
    answer:
      'It depends on the font, size and spacing, but a common rule of thumb is about 500 words for a single-spaced page and about 250 words for a double-spaced page.',
  },
  {
    question: 'Do spaces count as characters?',
    answer:
      'The Characters figure includes spaces. Characters (no spaces) leaves out all spaces, tabs and line breaks. Check which one your platform or assignment uses.',
  },
  {
    question: 'How is reading time calculated?',
    answer:
      'The word count is divided by 225 words per minute and rounded to the nearest second. Speaking time uses 130 words per minute.',
  },
  {
    question: 'Why is my count different from Microsoft Word or Google Docs?',
    answer:
      'Programs handle numbers, symbols, hyphens and line breaks in slightly different ways, so counts can differ by a few words. If an exact count matters, use the same program your reader or marker will use.',
  },
  {
    question: 'Does it work for languages other than English?',
    answer:
      'It works for any language that puts spaces between words, including those written in other alphabets. For languages without spaces between words, such as Chinese or Japanese, use the character count instead.',
  },
  {
    question: 'Is my text saved or uploaded?',
    answer:
      'No. Your text is analysed in your browser and is not sent to our server or stored.',
  },
];

const related: GuideLink[] = [
  { href: '/converters/binary-to-ascii', label: 'Binary to ASCII Converter' },
  { href: '/calculators/percentage-calculator', label: 'Percentage Calculator' },
  { href: '/text-tools', label: 'All Text Tools' },
  { href: '/tools', label: 'All Tools' },
];

export default function WordCounterGuide() {
  return (
    <ToolGuide
      id="word-counter"
      title="How the Word Counter Works"
      intro="What each figure means, how the text is counted, and how to get the most from it."
      sections={sections}
      faqs={faqs}
      related={related}
    />
  );
}
