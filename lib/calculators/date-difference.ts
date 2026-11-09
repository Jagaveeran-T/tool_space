import { calculateAge } from '@/lib/calculators/age-calculator';

export type DateDifference = {
  /** The earlier date, as YYYY-MM-DD (after swapping, if needed). */
  startDate: string;
  /** The later date, as YYYY-MM-DD (after swapping, if needed). */
  endDate: string;
  /** True when the dates were entered in reverse order and were swapped. */
  swapped: boolean;
  includesEndDate: boolean;
  years: number;
  months: number;
  days: number;
  totalDays: number;
  weeks: number;
  remainingDays: number;
  /** Monday to Friday. Public holidays are not taken into account. */
  weekdays: number;
  weekendDays: number;
};

const MIN_YEAR = 1000;
const MAX_YEAR = 9999;

function parseISODate(value: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);

  if (!match) {
    return null;
  }

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);

  if (year < MIN_YEAR || year > MAX_YEAR) {
    return null;
  }

  const date = new Date(Date.UTC(year, month - 1, day));

  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    return null;
  }

  return date;
}

function toISODate(date: Date): string {
  const year = String(date.getUTCFullYear()).padStart(4, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date.getTime());

  result.setUTCDate(result.getUTCDate() + days);

  return result;
}

/**
 * Counts Monday-Friday days in the range that starts on `start` (inclusive)
 * and lasts `totalDays` days.
 */
function countWeekdays(start: Date, totalDays: number): number {
  const fullWeeks = Math.floor(totalDays / 7);
  const extraDays = totalDays % 7;

  let weekdays = fullWeeks * 5;

  for (let offset = 0; offset < extraDays; offset += 1) {
    const dayOfWeek = (start.getUTCDay() + offset) % 7;

    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      weekdays += 1;
    }
  }

  return weekdays;
}

/**
 * Calculates the calendar difference between two dates (YYYY-MM-DD).
 *
 * The end date is not counted unless `includeEndDate` is true, so Jan 1 to
 * Jan 2 is 1 day. Dates in reverse order are swapped. Returns null for
 * invalid dates or years outside 1000-9999.
 */
export function calculateDateDifference(
  firstDate: string,
  secondDate: string,
  includeEndDate = false,
): DateDifference | null {
  const first = parseISODate(firstDate);
  const second = parseISODate(secondDate);

  if (!first || !second) {
    return null;
  }

  const swapped = first.getTime() > second.getTime();
  const start = swapped ? second : first;
  const end = swapped ? first : second;

  // Counting the end date is the same as measuring up to the next day.
  const measuredUntil = includeEndDate ? addDays(end, 1) : end;

  const age = calculateAge(toISODate(start), toISODate(measuredUntil));

  if (!age) {
    return null;
  }

  const totalDays = age.totalDays;
  const weekdays = countWeekdays(start, totalDays);

  return {
    startDate: toISODate(start),
    endDate: toISODate(end),
    swapped,
    includesEndDate: includeEndDate,
    years: age.years,
    months: age.months,
    days: age.days,
    totalDays,
    weeks: Math.floor(totalDays / 7),
    remainingDays: totalDays % 7,
    weekdays,
    weekendDays: totalDays - weekdays,
  };
}
