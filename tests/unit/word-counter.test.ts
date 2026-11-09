import { describe, expect, it } from 'vitest';

import {
  analyzeText,
  formatDuration,
} from '@/lib/text-tools/word-counter';

describe('Word Counter', () => {
  it('returns zeros for empty text', () => {
    const stats = analyzeText('');

    expect(stats.words).toBe(0);
    expect(stats.characters).toBe(0);
    expect(stats.charactersWithoutSpaces).toBe(0);
    expect(stats.sentences).toBe(0);
    expect(stats.paragraphs).toBe(0);
    expect(stats.topWords).toEqual([]);
  });

  it('returns zeros for whitespace only', () => {
    const stats = analyzeText('   \n\n  \t ');

    expect(stats.words).toBe(0);
    expect(stats.sentences).toBe(0);
    expect(stats.paragraphs).toBe(0);
  });

  it('counts a simple sentence', () => {
    const stats = analyzeText('Hello world');

    expect(stats.words).toBe(2);
    expect(stats.characters).toBe(11);
    expect(stats.charactersWithoutSpaces).toBe(10);
    expect(stats.sentences).toBe(1);
    expect(stats.paragraphs).toBe(1);
  });

  describe('words', () => {
    it('does not count stray symbols as words', () => {
      expect(analyzeText('a - b').words).toBe(2);
      expect(analyzeText('a — b').words).toBe(2);
      expect(analyzeText('... !!!').words).toBe(0);
    });

    it('counts hyphenated and apostrophe words once', () => {
      expect(analyzeText('well-known').words).toBe(1);
      expect(analyzeText("don't stop").words).toBe(2);
    });

    it('counts numbers', () => {
      expect(analyzeText('call 555 1234 now').words).toBe(4);
    });

    it('supports other alphabets', () => {
      expect(analyzeText('Привет мир').words).toBe(2);
    });

    it('treats line breaks and tabs as separators', () => {
      expect(analyzeText('one\ntwo\tthree\r\nfour').words).toBe(4);
    });
  });

  describe('characters', () => {
    it('counts an emoji as one character', () => {
      expect(analyzeText('hi 😀').characters).toBe(4);
    });

    it('counts a Windows line break as one character', () => {
      expect(analyzeText('a\r\nb').characters).toBe(3);
    });

    it('excludes all whitespace from the no-spaces count', () => {
      expect(analyzeText('a b\nc\td').charactersWithoutSpaces).toBe(4);
    });
  });

  describe('sentences', () => {
    it('counts sentences ended by . ! and ?', () => {
      expect(analyzeText('Hello, world! How are you?').sentences).toBe(2);
      expect(analyzeText('One. Two. Three.').sentences).toBe(3);
    });

    it('counts a final sentence with no punctuation', () => {
      expect(analyzeText('One. Two').sentences).toBe(2);
    });

    it('does not end a sentence at a decimal point', () => {
      expect(analyzeText('3.14 is pi').sentences).toBe(1);
    });

    it('treats repeated punctuation as one ending', () => {
      expect(analyzeText('Really?! Yes...').sentences).toBe(2);
    });
  });

  describe('paragraphs', () => {
    it('counts blank-line separated paragraphs', () => {
      expect(analyzeText('One two.\n\nThree four five.').paragraphs).toBe(2);
    });

    it('counts each non-empty line', () => {
      expect(analyzeText('one\ntwo\nthree').paragraphs).toBe(3);
    });

    it('ignores empty lines', () => {
      expect(analyzeText('one\n\n\n\ntwo\n').paragraphs).toBe(2);
    });
  });

  describe('reading and speaking time', () => {
    const words = (count: number) => Array(count).fill('word').join(' ');

    it('reads 225 words in one minute', () => {
      expect(analyzeText(words(225)).readingTimeSeconds).toBe(60);
      expect(analyzeText(words(450)).readingTimeSeconds).toBe(120);
    });

    it('speaks 130 words in one minute', () => {
      expect(analyzeText(words(130)).speakingTimeSeconds).toBe(60);
    });

    it('is zero for empty text', () => {
      expect(analyzeText('').readingTimeSeconds).toBe(0);
    });
  });

  describe('top words', () => {
    it('ignores common words and single occurrences', () => {
      expect(analyzeText('the cat and the dog and the bird').topWords).toEqual(
        [],
      );
    });

    it('ignores case and surrounding punctuation', () => {
      expect(analyzeText('Apple banana apple, Apple.').topWords).toEqual([
        { word: 'apple', count: 3 },
      ]);
    });

    it('orders by count, then alphabetically', () => {
      const stats = analyzeText('pear pear fig fig kiwi kiwi kiwi');

      expect(stats.topWords).toEqual([
        { word: 'kiwi', count: 3 },
        { word: 'fig', count: 2 },
        { word: 'pear', count: 2 },
      ]);
    });

    it('returns at most five words', () => {
      const text = 'a1 a1 b2 b2 c3 c3 d4 d4 e5 e5 f6 f6 g7 g7';

      expect(analyzeText(text).topWords).toHaveLength(5);
    });
  });

  describe('formatDuration', () => {
    it('formats seconds, minutes and both', () => {
      expect(formatDuration(0)).toBe('0 sec');
      expect(formatDuration(45)).toBe('45 sec');
      expect(formatDuration(60)).toBe('1 min');
      expect(formatDuration(80)).toBe('1 min 20 sec');
      expect(formatDuration(3600)).toBe('60 min');
    });

    it('never returns a negative duration', () => {
      expect(formatDuration(-5)).toBe('0 sec');
    });
  });
});
