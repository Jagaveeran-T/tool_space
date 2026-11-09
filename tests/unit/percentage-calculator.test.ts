import { describe, expect, it } from 'vitest';

import {
  applyPercent,
  formatNumber,
  parseNumberInput,
  percentChange,
  percentOf,
  roundTo,
  whatPercent,
} from '@/lib/calculators/percentage-calculator';

describe('Percentage Calculator', () => {
  describe('percentOf', () => {
    it('calculates a percentage of a value', () => {
      expect(percentOf(15, 80)).toBe(12);
      expect(percentOf(25, 200)).toBe(50);
    });

    it('supports decimals and percentages above 100', () => {
      expect(percentOf(0.5, 200)).toBe(1);
      expect(percentOf(150, 20)).toBe(30);
    });

    it('does not return floating-point noise', () => {
      expect(percentOf(7, 0.1)).toBe(0.007);
    });
  });

  describe('whatPercent', () => {
    it('calculates what percent a part is of a whole', () => {
      expect(whatPercent(18, 60)).toBe(30);
      expect(whatPercent(60, 30)).toBe(200);
    });

    it('rounds repeating decimals', () => {
      expect(whatPercent(1, 3)).toBe(33.3333333333);
    });

    it('returns null when the whole is zero', () => {
      expect(whatPercent(5, 0)).toBeNull();
    });
  });

  describe('percentChange', () => {
    it('detects an increase', () => {
      expect(percentChange(50, 65)).toEqual({
        change: 30,
        direction: 'increase',
      });
    });

    it('detects a decrease', () => {
      expect(percentChange(80, 60)).toEqual({
        change: -25,
        direction: 'decrease',
      });
    });

    it('detects no change', () => {
      expect(percentChange(50, 50)).toEqual({
        change: 0,
        direction: 'none',
      });
    });

    it('is undefined when the starting value is zero', () => {
      expect(percentChange(0, 5)).toBeNull();
    });

    it('treats a move toward zero from a negative value as an increase', () => {
      expect(percentChange(-50, -25)).toEqual({
        change: 50,
        direction: 'increase',
      });
    });
  });

  describe('applyPercent', () => {
    it('increases a value by a percentage', () => {
      expect(applyPercent(200, 15, 'increase')).toBe(230);
    });

    it('decreases a value by a percentage', () => {
      expect(applyPercent(200, 15, 'decrease')).toBe(170);
      expect(applyPercent(80, 25, 'decrease')).toBe(60);
    });

    it('shows that +50% then -50% does not return to the start', () => {
      const raised = applyPercent(100, 50, 'increase');

      expect(raised).toBe(150);
      expect(applyPercent(raised, 50, 'decrease')).toBe(75);
    });

    it('reverses a 25% increase with a 20% decrease', () => {
      const raised = applyPercent(100, 25, 'increase');

      expect(applyPercent(raised, 20, 'decrease')).toBe(100);
    });
  });

  describe('helpers', () => {
    it('parses input text', () => {
      expect(parseNumberInput('12.5')).toBe(12.5);
      expect(parseNumberInput('  7 ')).toBe(7);
      expect(parseNumberInput('-3')).toBe(-3);
      expect(parseNumberInput('')).toBeNull();
      expect(parseNumberInput('   ')).toBeNull();
      expect(parseNumberInput('abc')).toBeNull();
      expect(parseNumberInput('Infinity')).toBeNull();
    });

    it('rounds away floating-point noise', () => {
      expect(roundTo(0.1 + 0.2)).toBe(0.3);
    });

    it('formats numbers with a fixed locale', () => {
      expect(formatNumber(1234.5)).toBe('1,234.5');
      expect(formatNumber(0)).toBe('0');
      expect(formatNumber(-0)).toBe('0');
      expect(formatNumber(1 / 3)).toBe('0.333333');
    });
  });
});
