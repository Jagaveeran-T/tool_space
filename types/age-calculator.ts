export type AgeInput = {
  dateOfBirth: string;
  ageAtDate: string;
};

export type AgeResult = {
  years: number;
  months: number;
  days: number;
  totalMonths: number;
  totalWeeks: number;
  totalDays: number;
  totalHours: number;
  totalMinutes: number;
  totalSeconds: number;
  nextBirthday: string;
  daysUntilBirthday: number;
  dayOfBirth: string;
  isLeapYear: boolean;
};