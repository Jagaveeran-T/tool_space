import { describe, expect, it } from 'vitest';

import {
  MAX_INPUT_LENGTH,
  decimalToHex,
  formatHex,
  groupDigits,
  hexToDecimal,
  parseDecimal,
  parseHex,
  toBase,
} from '@/lib/converters/number-base/number-base';

describe('Number base converter', () => {
  describe('decimalToHex', () => {
    it('converts common values', () => {
      expect(decimalToHex('0')).toEqual({ ok: true, value: '0' });
      expect(decimalToHex('10')).toEqual({ ok: true, value: 'A' });
      expect(decimalToHex('16')).toEqual({ ok: true, value: '10' });
      expect(decimalToHex('255')).toEqual({ ok: true, value: 'FF' });
      expect(decimalToHex('750')).toEqual({ ok: true, value: '2EE' });
      expect(decimalToHex('65535')).toEqual({ ok: true, value: 'FFFF' });
    });

    it('supports lowercase output and the 0x prefix', () => {
      expect(decimalToHex('255', { uppercase: false })).toEqual({
        ok: true,
        value: 'ff',
      });
      expect(decimalToHex('255', { prefix: true })).toEqual({
        ok: true,
        value: '0xFF',
      });
      expect(
        decimalToHex('-255', { uppercase: false, prefix: true }),
      ).toEqual({ ok: true, value: '-0xff' });
    });

    it('handles negative numbers and negative zero', () => {
      expect(decimalToHex('-255')).toEqual({ ok: true, value: '-FF' });
      expect(decimalToHex('-0')).toEqual({ ok: true, value: '0' });
      expect(decimalToHex('+16')).toEqual({ ok: true, value: '10' });
    });

    it('ignores spaces, commas and underscores', () => {
      expect(decimalToHex('1,000')).toEqual({ ok: true, value: '3E8' });
      expect(decimalToHex(' 1 000 ')).toEqual({ ok: true, value: '3E8' });
      expect(decimalToHex('1_000')).toEqual({ ok: true, value: '3E8' });
    });

    it('stays exact beyond the safe integer limit', () => {
      expect(decimalToHex('9007199254740993')).toEqual({
        ok: true,
        value: '20000000000001',
      });
      expect(decimalToHex('18446744073709551615')).toEqual({
        ok: true,
        value: 'FFFFFFFFFFFFFFFF',
      });
    });

    it('rejects empty and invalid input', () => {
      expect(decimalToHex('').ok).toBe(false);
      expect(decimalToHex('   ').ok).toBe(false);
      expect(decimalToHex('12a').ok).toBe(false);
      expect(decimalToHex('-').ok).toBe(false);
      expect(decimalToHex('--5').ok).toBe(false);
      expect(decimalToHex('0xFF').ok).toBe(false);
    });

    it('explains that fractions are not supported', () => {
      const result = decimalToHex('1.5');

      expect(result.ok).toBe(false);

      if (!result.ok) {
        expect(result.error).toMatch(/whole numbers/i);
      }
    });

    it('rejects input that is too long', () => {
      expect(decimalToHex('9'.repeat(MAX_INPUT_LENGTH + 1)).ok).toBe(false);
      expect(decimalToHex('9'.repeat(MAX_INPUT_LENGTH)).ok).toBe(true);
    });
  });

  describe('hexToDecimal', () => {
    it('converts common values', () => {
      expect(hexToDecimal('0')).toEqual({ ok: true, value: '0' });
      expect(hexToDecimal('A')).toEqual({ ok: true, value: '10' });
      expect(hexToDecimal('FF')).toEqual({ ok: true, value: '255' });
      expect(hexToDecimal('2EE')).toEqual({ ok: true, value: '750' });
      expect(hexToDecimal('1A3F')).toEqual({ ok: true, value: '6719' });
      expect(hexToDecimal('88')).toEqual({ ok: true, value: '136' });
    });

    it('is not case sensitive', () => {
      expect(hexToDecimal('ff')).toEqual({ ok: true, value: '255' });
      expect(hexToDecimal('1a3F')).toEqual({ ok: true, value: '6719' });
    });

    it('accepts an optional 0x prefix', () => {
      expect(hexToDecimal('0xFF')).toEqual({ ok: true, value: '255' });
      expect(hexToDecimal('0XfF')).toEqual({ ok: true, value: '255' });
      expect(hexToDecimal('-0x10')).toEqual({ ok: true, value: '-16' });
    });

    it('handles negative numbers and negative zero', () => {
      expect(hexToDecimal('-FF')).toEqual({ ok: true, value: '-255' });
      expect(hexToDecimal('-0')).toEqual({ ok: true, value: '0' });
    });

    it('ignores spaces and underscores', () => {
      expect(hexToDecimal('FF FF')).toEqual({ ok: true, value: '65535' });
      expect(hexToDecimal('FF_FF')).toEqual({ ok: true, value: '65535' });
    });

    it('stays exact for very large values', () => {
      expect(hexToDecimal('FFFFFFFFFFFFFFFF')).toEqual({
        ok: true,
        value: '18446744073709551615',
      });
    });

    it('rejects empty and invalid input', () => {
      expect(hexToDecimal('').ok).toBe(false);
      expect(hexToDecimal('0x').ok).toBe(false);
      expect(hexToDecimal('-').ok).toBe(false);
      expect(hexToDecimal('12G').ok).toBe(false);
      expect(hexToDecimal('#FF8800').ok).toBe(false);
      expect(hexToDecimal('1.5').ok).toBe(false);
    });

    it('rejects input that is too long', () => {
      expect(hexToDecimal('F'.repeat(MAX_INPUT_LENGTH + 1)).ok).toBe(false);
    });
  });

  describe('round trip', () => {
    it('gives the original number back', () => {
      const samples = [
        '0',
        '1',
        '15',
        '16',
        '255',
        '256',
        '65535',
        '-98765',
        '123456789012345678901234567890',
      ];

      samples.forEach((sample) => {
        const hex = decimalToHex(sample);

        expect(hex.ok).toBe(true);

        if (hex.ok) {
          expect(hexToDecimal(hex.value)).toEqual({
            ok: true,
            value: sample,
          });
        }
      });
    });
  });

  describe('helpers', () => {
    it('parses to BigInt values', () => {
      expect(parseDecimal('-42')).toEqual({ ok: true, value: BigInt(-42) });
      expect(parseHex('0x2A')).toEqual({ ok: true, value: BigInt(42) });
    });

    it('formats a BigInt in other bases', () => {
      expect(toBase(BigInt(10), 2)).toBe('1010');
      expect(toBase(BigInt(-10), 8)).toBe('-12');
      expect(toBase(BigInt(255), 16)).toBe('ff');
      expect(formatHex(BigInt(255), { prefix: true })).toBe('0xFF');
    });

    it('groups digits from the right', () => {
      expect(groupDigits('11111111', 4, ' ')).toBe('1111 1111');
      expect(groupDigits('101', 4, ' ')).toBe('101');
      expect(groupDigits('-10110', 4, ' ')).toBe('-1 0110');
      expect(groupDigits('1234567', 3, ',')).toBe('1,234,567');
      expect(groupDigits('0', 3, ',')).toBe('0');
    });
  });
});