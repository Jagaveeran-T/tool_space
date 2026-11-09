import { describe, expect, it } from 'vitest';

import {
  calculateAge,
  getTodayDate,
  isValidDate,
} from '@/lib/calculators/age-calculator';

describe('Age Calculator', () => {
  it('should calculate age correctly', () => {
    const result = calculateAge('2000-01-01', '2026-01-01');

    expect(result).not.toBeNull();
    expect(result?.years).toBe(26);
    expect(result?.months).toBe(0);
    expect(result?.days).toBe(0);
  });

  it('should calculate remaining months and days', () => {
    const result = calculateAge('2000-01-15', '2026-03-20');

    expect(result?.years).toBe(26);
    expect(result?.months).toBe(2);
    expect(result?.days).toBe(5);
  });

  it('should calculate total days', () => {
    const result = calculateAge('2024-01-01', '2024-01-08');

    expect(result?.totalDays).toBe(7);
    expect(result?.totalWeeks).toBe(1);
  });

  it('should calculate total hours', () => {
    const result = calculateAge('2024-01-01', '2024-01-02');

    expect(result?.totalHours).toBe(24);
  });

  it('should calculate total minutes', () => {
    const result = calculateAge('2024-01-01', '2024-01-02');

    expect(result?.totalMinutes).toBe(1440);
  });

  it('should calculate total seconds', () => {
    const result = calculateAge('2024-01-01', '2024-01-02');

    expect(result?.totalSeconds).toBe(86400);
  });

  it('should reject future birth dates', () => {
    const result = calculateAge('2027-01-01', '2026-01-01');

    expect(result).toBeNull();
  });

  it('should reject invalid dates', () => {
    const result = calculateAge('2000-02-30', '2026-01-01');

    expect(result).toBeNull();
  });

  it('should reject incorrectly formatted dates', () => {
    const result = calculateAge('01-01-2000', '2026-01-01');

    expect(result).toBeNull();
  });

  it('should handle leap-year birth dates', () => {
    const result = calculateAge('2000-02-29', '2024-02-29');

    expect(result?.years).toBe(24);
    expect(result?.isLeapYear).toBe(true);
  });

  it('should calculate the next birthday', () => {
    const result = calculateAge('2000-05-10', '2026-05-01');

    expect(result?.nextBirthday).toBe('10 May 2026');
    expect(result?.daysUntilBirthday).toBe(9);
  });

  it('should return a valid current date string', () => {
    expect(isValidDate(getTodayDate())).toBe(true);
  });

  it('should reject an impossible date', () => {
    expect(isValidDate('2025-02-29')).toBe(false);
  });

  it('should recognize a leap year', () => {
    const result = calculateAge('2024-02-29', '2024-03-01');

    expect(result?.isLeapYear).toBe(true);
  });
});