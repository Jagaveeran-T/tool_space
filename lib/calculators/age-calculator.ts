import type { AgeResult } from '@/types/age-calculator';

const DAY_IN_MS = 24 * 60 * 60 * 1000;

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const WEEK_DAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

function parseDate(dateString: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateString);

  if (!match) {
    return null;
  }

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);

  const date = new Date(Date.UTC(year, month - 1, day));

  // Date.UTC treats years 0–99 as 1900–1999.
  // Restore the intended year before validating.
  if (year >= 0 && year <= 99) {
    date.setUTCFullYear(year);
  }

  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    return null;
  }

  return date;
}

function daysInMonth(year: number, month: number): number {
  const date = new Date(Date.UTC(year, month + 1, 0));

  if (year >= 0 && year <= 99) {
    date.setUTCFullYear(year);
  }

  return date.getUTCDate();
}

function differenceInDays(start: Date, end: Date): number {
  return Math.round(
    (end.getTime() - start.getTime()) / DAY_IN_MS,
  );
}

function addYearsClamped(date: Date, years: number): Date {
  const year = date.getUTCFullYear() + years;
  const month = date.getUTCMonth();
  const day = Math.min(
    date.getUTCDate(),
    daysInMonth(year, month),
  );

  const result = new Date(Date.UTC(year, month, day));

  if (year >= 0 && year <= 99) {
    result.setUTCFullYear(year);
  }

  return result;
}

function addMonthsClamped(date: Date, months: number): Date {
  const totalMonths =
    date.getUTCFullYear() * 12 +
    date.getUTCMonth() +
    months;

  const year = Math.floor(totalMonths / 12);
  const month = totalMonths - year * 12;

  const day = Math.min(
    date.getUTCDate(),
    daysInMonth(year, month),
  );

  const result = new Date(Date.UTC(year, month, day));

  if (year >= 0 && year <= 99) {
    result.setUTCFullYear(year);
  }

  return result;
}

function getBirthdayInYear(
  dateOfBirth: Date,
  year: number,
): Date {
  const birthMonth = dateOfBirth.getUTCMonth();
  const birthDay = dateOfBirth.getUTCDate();

  // February 29 birthdays are observed on February 28
  // in non-leap years.
  const day = Math.min(
    birthDay,
    daysInMonth(year, birthMonth),
  );

  const birthday = new Date(
    Date.UTC(year, birthMonth, day),
  );

  if (year >= 0 && year <= 99) {
    birthday.setUTCFullYear(year);
  }

  return birthday;
}

function getNextBirthday(
  dateOfBirth: Date,
  referenceDate: Date,
): Date {
  const currentYear = referenceDate.getUTCFullYear();

  let nextBirthday = getBirthdayInYear(
    dateOfBirth,
    currentYear,
  );

  // If today is the birthday, the next birthday
  // means the birthday in the following year.
  if (nextBirthday.getTime() <= referenceDate.getTime()) {
    nextBirthday = getBirthdayInYear(
      dateOfBirth,
      currentYear + 1,
    );
  }

  return nextBirthday;
}

function formatDate(date: Date): string {
  const day = date.getUTCDate();
  const month = MONTH_NAMES[date.getUTCMonth()];
  const year = date.getUTCFullYear();

  return `${day} ${month} ${year}`;
}

function formatISODate(date: Date): string {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function calculateAge(
  dateOfBirthString: string,
  ageAtDateString: string,
): AgeResult | null {
  const birthDate = parseDate(dateOfBirthString);
  const referenceDate = parseDate(ageAtDateString);

  if (!birthDate || !referenceDate) {
    return null;
  }

  if (birthDate.getTime() > referenceDate.getTime()) {
    return null;
  }

  // Calculate completed years.
  let years =
    referenceDate.getUTCFullYear() -
    birthDate.getUTCFullYear();

  let yearDate = addYearsClamped(birthDate, years);

  if (yearDate.getTime() > referenceDate.getTime()) {
    years -= 1;
    yearDate = addYearsClamped(birthDate, years);
  }

  // Calculate completed months after completed years.
  let months =
    (referenceDate.getUTCFullYear() -
      yearDate.getUTCFullYear()) *
      12 +
    referenceDate.getUTCMonth() -
    yearDate.getUTCMonth();

  let monthDate = addMonthsClamped(yearDate, months);

  if (monthDate.getTime() > referenceDate.getTime()) {
    months -= 1;
    monthDate = addMonthsClamped(yearDate, months);
  }

  // Calculate remaining days.
  const days = differenceInDays(
    monthDate,
    referenceDate,
  );

  // Calculate total elapsed calendar days.
  const totalDays = differenceInDays(
    birthDate,
    referenceDate,
  );

  const totalWeeks = Math.floor(totalDays / 7);

  // Keep total months consistent with completed years and months.
  const totalMonths = years * 12 + months;

  // Calculate the next birthday.
  const nextBirthday = getNextBirthday(
    birthDate,
    referenceDate,
  );

  return {
    years,
    months,
    days,

    totalMonths,
    totalWeeks,
    totalDays,

    // These values use whole calendar days.
    totalHours: totalDays * 24,
    totalMinutes: totalDays * 24 * 60,
    totalSeconds: totalDays * 24 * 60 * 60,

    nextBirthday: formatDate(nextBirthday),

    daysUntilBirthday: differenceInDays(
      referenceDate,
      nextBirthday,
    ),

    dayOfBirth: WEEK_DAYS[birthDate.getUTCDay()],

    isLeapYear:
      birthDate.getUTCFullYear() % 400 === 0 ||
      (birthDate.getUTCFullYear() % 4 === 0 &&
        birthDate.getUTCFullYear() % 100 !== 0),
  };
}

export function getTodayDate(): string {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function formatDateForDisplay(
  dateString: string,
): string {
  const date = parseDate(dateString);

  if (!date) {
    return '';
  }

  return formatDate(date);
}

export function isValidDate(dateString: string): boolean {
  return parseDate(dateString) !== null;
}

export function formatISODateForInput(date: Date): string {
  return formatISODate(date);
}