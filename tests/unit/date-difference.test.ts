import { describe, expect, it } from 'vitest';

import { calculateDateDifference } from '@/lib/calculators/date-difference';

describe('Date Difference Calculator', () => {
  it('calculates a full leap year without counting the end date', () => {
    const result = calculateDateDifference('2024-01-01', '2024-12-31');

    expect(result?.totalDays).toBe(365);
    expect(result?.years).toBe(0);
    expect(result?.months).toBe(11);
    expect(result?.days).toBe(30);
  });

  it('counts the end date when asked', () => {
    const result = calculateDateDifference('2024-01-01', '2024-12-31', true);

    expect(result?.totalDays).toBe(366);
    expect(result?.years).toBe(1);
    expect(result?.months).toBe(0);
    expect(result?.days).toBe(0);
    expect(result?.includesEndDate).toBe(true);
  });

  it('calculates a long span in calendar terms', () => {
    const result = calculateDateDifference('2000-01-01', '2024-01-01');

    expect(result?.years).toBe(24);
    expect(result?.months).toBe(0);
    expect(result?.days).toBe(0);
    expect(result?.totalDays).toBe(8766);
  });

  it('handles the same date', () => {
    expect(calculateDateDifference('2024-05-10', '2024-05-10')?.totalDays).toBe(
      0,
    );
    expect(
      calculateDateDifference('2024-05-10', '2024-05-10', true)?.totalDays,
    ).toBe(1);
  });

  it('swaps dates entered in reverse order', () => {
    const result = calculateDateDifference('2024-12-31', '2024-01-01');

    expect(result?.swapped).toBe(true);
    expect(result?.startDate).toBe('2024-01-01');
    expect(result?.endDate).toBe('2024-12-31');
    expect(result?.totalDays).toBe(365);
  });

  it('does not report a swap when dates are in order', () => {
    expect(calculateDateDifference('2024-01-01', '2024-01-02')?.swapped).toBe(
      false,
    );
  });

  it('clamps month ends instead of overflowing', () => {
    // Jan 31 -> Feb 29 (clamped) is one month, then one more day to Mar 1.
    const result = calculateDateDifference('2024-01-31', '2024-03-01');

    expect(result?.years).toBe(0);
    expect(result?.months).toBe(1);
    expect(result?.days).toBe(1);
    expect(result?.totalDays).toBe(30);
  });

  it('splits total days into weeks and remaining days', () => {
    const result = calculateDateDifference('2024-03-15', '2024-06-20');

    expect(result?.totalDays).toBe(97);
    expect(result?.weeks).toBe(13);
    expect(result?.remainingDays).toBe(6);
  });

  describe('weekdays', () => {
    it('counts five weekdays in one full week', () => {
      // 2024-01-01 is a Monday.
      const result = calculateDateDifference('2024-01-01', '2024-01-08');

      expect(result?.totalDays).toBe(7);
      expect(result?.weekdays).toBe(5);
      expect(result?.weekendDays).toBe(2);
    });

    it('counts a range that starts on a Friday', () => {
      // Fri, Sat, Sun are counted; the Monday end date is not.
      const result = calculateDateDifference('2024-01-05', '2024-01-08');

      expect(result?.weekdays).toBe(1);
      expect(result?.weekendDays).toBe(2);
    });

    it('includes the end date when asked', () => {
      const result = calculateDateDifference('2024-01-05', '2024-01-08', true);

      expect(result?.weekdays).toBe(2);
      expect(result?.weekendDays).toBe(2);
    });

    it('matches a day-by-day count over a longer range', () => {
      const result = calculateDateDifference('2024-03-15', '2024-06-20');

      expect(result?.weekdays).toBe(69);
      expect(result?.weekendDays).toBe(28);
    });
  });

  describe('invalid input', () => {
    it('rejects empty or malformed dates', () => {
      expect(calculateDateDifference('', '')).toBeNull();
      expect(calculateDateDifference('2024-01-01', '')).toBeNull();
      expect(calculateDateDifference('01/01/2024', '2024-01-02')).toBeNull();
    });

    it('rejects dates that do not exist', () => {
      expect(calculateDateDifference('2023-02-29', '2024-01-01')).toBeNull();
      expect(calculateDateDifference('2024-02-30', '2024-03-01')).toBeNull();
      expect(calculateDateDifference('2024-13-01', '2024-03-01')).toBeNull();
    });

    it('accepts a real leap day', () => {
      expect(calculateDateDifference('2024-02-29', '2024-03-01')?.totalDays).toBe(
        1,
      );
    });

    it('rejects years outside 1000-9999', () => {
      expect(calculateDateDifference('0999-01-01', '2024-01-01')).toBeNull();
      expect(calculateDateDifference('2024-01-01', '10000-01-01')).toBeNull();
    });
  });
});
