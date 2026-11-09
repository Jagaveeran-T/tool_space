export const READING_WORDS_PER_MINUTE = 225;
export const SPEAKING_WORDS_PER_MINUTE = 130;

export type WordFrequency = {
  word: string;
  count: number;
};

export type TextStatistics = {
  words: number;
  characters: number;
  charactersWithoutSpaces: number;
  sentences: number;
  paragraphs: number;
  readingTimeSeconds: number;
  speakingTimeSeconds: number;
  topWords: WordFrequency[];
};

// A "word" is a run of non-space characters that contains at least one
// letter or number in any language, so stray symbols such as "-" or "—"
// are not counted.
const HAS_LETTER_OR_NUMBER = /[\p{L}\p{N}]/u;

const STOP_WORDS = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'been', 'but', 'by', 'for',
  'from', 'had', 'has', 'have', 'he', 'her', 'his', 'i', 'in', 'is', 'it',
  'its', 'of', 'on', 'or', 'she', 'that', 'the', 'their', 'them', 'they',
  'this', 'to', 'was', 'we', 'were', 'which', 'will', 'with', 'you', 'your',
]);

function splitIntoWords(text: string): string[] {
  return text
    .split(/\s+/)
    .filter((token) => HAS_LETTER_OR_NUMBER.test(token));
}

function countCharacters(text: string): number {
  // Array.from counts each Unicode character once, so an emoji is one.
  return Array.from(text.replace(/\r\n/g, '\n')).length;
}

function countSentences(text: string): number {
  // A sentence ends with . ! ? or … followed by a space or the end of the
  // text, so a decimal such as 3.14 does not end a sentence.
  return text
    .split(/[.!?…]+(?:\s+|$)/)
    .filter((sentence) => HAS_LETTER_OR_NUMBER.test(sentence)).length;
}

function countParagraphs(text: string): number {
  // Each non-empty line counts as a paragraph, like a word processor.
  return text
    .split(/\r?\n/)
    .filter((line) => HAS_LETTER_OR_NUMBER.test(line)).length;
}

function findTopWords(words: string[], limit: number): WordFrequency[] {
  const counts = new Map<string, number>();

  for (const token of words) {
    const word = token
      .toLowerCase()
      .replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, '');

    if (word === '' || STOP_WORDS.has(word)) {
      continue;
    }

    counts.set(word, (counts.get(word) ?? 0) + 1);
  }

  return [...counts.entries()]
    .filter(([, count]) => count >= 2)
    .map(([word, count]) => ({ word, count }))
    .sort((a, b) => b.count - a.count || a.word.localeCompare(b.word))
    .slice(0, limit);
}

export function analyzeText(text: string): TextStatistics {
  const words = splitIntoWords(text);

  return {
    words: words.length,
    characters: countCharacters(text),
    charactersWithoutSpaces: Array.from(text.replace(/\s/g, '')).length,
    sentences: countSentences(text),
    paragraphs: countParagraphs(text),
    readingTimeSeconds: Math.round(
      (words.length / READING_WORDS_PER_MINUTE) * 60,
    ),
    speakingTimeSeconds: Math.round(
      (words.length / SPEAKING_WORDS_PER_MINUTE) * 60,
    ),
    topWords: findTopWords(words, 5),
  };
}

/** Formats seconds as "45 sec", "1 min" or "1 min 20 sec". */
export function formatDuration(totalSeconds: number): string {
  const seconds = Math.max(0, Math.round(totalSeconds));

  if (seconds < 60) {
    return `${seconds} sec`;
  }

  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;

  return rest === 0 ? `${minutes} min` : `${minutes} min ${rest} sec`;
}
