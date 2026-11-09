import { Cake, CalendarDays, Copy, Clock } from 'lucide-react';

import type { AgeResult } from '@/types/age-calculator';

type Props = {
  result: AgeResult;
  onCopy: () => void;
  copied: boolean;
};

export default function AgeResult({
  result,
  onCopy,
  copied,
}: Props) {
  return (
    <section
      aria-live="polite"
      className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
    >
      <div className="bg-gradient-to-r from-primary to-primary/80 p-6 text-primary-foreground sm:p-8">
        <p className="text-sm font-medium opacity-80">
          Your Exact Age
        </p>

        <div className="mt-4 grid grid-cols-3 gap-3 text-center">
          <div className="rounded-xl bg-white/10 p-3">
            <p className="text-3xl font-bold sm:text-4xl">
              {result.years}
            </p>

            <p className="mt-1 text-xs opacity-80 sm:text-sm">
              Years
            </p>
          </div>

          <div className="rounded-xl bg-white/10 p-3">
            <p className="text-3xl font-bold sm:text-4xl">
              {result.months}
            </p>

            <p className="mt-1 text-xs opacity-80 sm:text-sm">
              Months
            </p>
          </div>

          <div className="rounded-xl bg-white/10 p-3">
            <p className="text-3xl font-bold sm:text-4xl">
              {result.days}
            </p>

            <p className="mt-1 text-xs opacity-80 sm:text-sm">
              Days
            </p>
          </div>
        </div>

        <p className="mt-5 text-center text-sm opacity-90">
          {result.years} years, {result.months} months and{' '}
          {result.days} days old.
        </p>
      </div>

      <div className="grid gap-4 p-5 sm:grid-cols-2 sm:p-6">
        <div className="flex items-start gap-3">
          <CalendarDays className="mt-1 text-primary" size={20} />

          <div>
            <p className="text-xs text-muted-foreground">
              Day of Birth
            </p>

            <p className="mt-1 font-semibold text-foreground">
              {result.dayOfBirth}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Cake className="mt-1 text-primary" size={20} />

          <div>
            <p className="text-xs text-muted-foreground">
              Next Birthday
            </p>

            <p className="mt-1 font-semibold text-foreground">
              {result.nextBirthday}
            </p>

            <p className="text-xs text-muted-foreground">
              {result.daysUntilBirthday.toLocaleString()} days remaining
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Clock className="mt-1 text-primary" size={20} />

          <div>
            <p className="text-xs text-muted-foreground">
              Total Days
            </p>

            <p className="mt-1 font-semibold text-foreground">
              {result.totalDays.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <CalendarDays className="mt-1 text-primary" size={20} />

          <div>
            <p className="text-xs text-muted-foreground">
              Total Weeks
            </p>

            <p className="mt-1 font-semibold text-foreground">
              {result.totalWeeks.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-border p-5 sm:px-6">
        <button
          type="button"
          onClick={onCopy}
          aria-label="Copy age calculation results"
          className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-border bg-background text-sm font-semibold text-foreground transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <Copy size={16} />

          {copied ? 'Copied Successfully' : 'Copy Results'}
        </button>
      </div>
    </section>
  );
}