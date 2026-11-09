'use client';

import { useId, useState } from 'react';

import { getTodayDate } from '@/lib/calculators/age-calculator';
import {
  calculateDateDifference,
  type DateDifference,
} from '@/lib/calculators/date-difference';

const inputClassName =
  'w-full rounded-md border border-input bg-background px-3 py-2 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring';

const smallButtonClassName =
  'rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring';

function formatCount(value: number): string {
  return value.toLocaleString('en-US');
}

function plural(value: number, singular: string): string {
  return `${formatCount(value)} ${singular}${value === 1 ? '' : 's'}`;
}

function describeCalendarDifference(result: DateDifference): string {
  const parts = [
    result.years > 0 ? plural(result.years, 'year') : null,
    result.months > 0 ? plural(result.months, 'month') : null,
    result.days > 0 ? plural(result.days, 'day') : null,
  ].filter((part): part is string => part !== null);

  return parts.length > 0 ? parts.join(', ') : '0 days';
}

type DateFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

function DateField({ label, value, onChange }: DateFieldProps) {
  const id = useId();

  return (
    <div>
      <div className="mb-1 flex items-center justify-between gap-2">
        <label htmlFor={id} className="text-sm font-medium text-foreground">
          {label}
        </label>

        <button
          type="button"
          onClick={() => onChange(getTodayDate())}
          className={smallButtonClassName}
        >
          Use today
        </button>
      </div>

      <input
        id={id}
        type="date"
        value={value}
        min="1000-01-01"
        max="9999-12-31"
        onChange={(event) => onChange(event.target.value)}
        className={inputClassName}
      />
    </div>
  );
}

type StatProps = {
  label: string;
  value: string;
  detail?: string;
};

function Stat({ label, value, detail }: StatProps) {
  return (
    <div className="rounded-lg border border-border bg-background p-3">
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="mt-1 text-xl font-semibold tabular-nums text-foreground">
        {value}
      </dd>
      {detail && (
        <dd className="mt-0.5 text-xs text-muted-foreground">{detail}</dd>
      )}
    </div>
  );
}

export default function DateDifferenceCalculator() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [includeEndDate, setIncludeEndDate] = useState(false);

  const includeEndId = useId();

  const hasBothDates = startDate !== '' && endDate !== '';
  const result = hasBothDates
    ? calculateDateDifference(startDate, endDate, includeEndDate)
    : null;
  const hasInvalidDates = hasBothDates && result === null;

  function swapDates() {
    setStartDate(endDate);
    setEndDate(startDate);
  }

  function reset() {
    setStartDate('');
    setEndDate('');
    setIncludeEndDate(false);
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <section
        aria-label="Date difference calculator"
        className="space-y-5 rounded-xl border border-border bg-card p-4 sm:p-6"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <DateField
            label="Start date"
            value={startDate}
            onChange={setStartDate}
          />
          <DateField label="End date" value={endDate} onChange={setEndDate} />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <label
            htmlFor={includeEndId}
            className="flex cursor-pointer items-center gap-2 text-sm font-medium text-foreground"
          >
            <input
              id={includeEndId}
              type="checkbox"
              checked={includeEndDate}
              onChange={(event) => setIncludeEndDate(event.target.checked)}
              className="size-4 rounded border-input accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            Include the end date
          </label>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={swapDates}
              className={smallButtonClassName}
            >
              Swap dates
            </button>
            <button
              type="button"
              onClick={reset}
              className={smallButtonClassName}
            >
              Reset
            </button>
          </div>
        </div>

        {hasInvalidDates && (
          <p role="alert" className="text-sm text-destructive">
            Enter valid dates between the years 1000 and 9999.
          </p>
        )}
      </section>

      <section aria-live="polite" aria-label="Result">
        {result ? (
          <div className="space-y-4 rounded-xl border border-border bg-card p-4 sm:p-6">
            <div>
              <p className="text-sm text-muted-foreground">
                Time between the dates
              </p>
              <p className="mt-1 text-2xl font-bold text-foreground sm:text-3xl">
                {describeCalendarDifference(result)}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {result.startDate} to {result.endDate}
                {result.includesEndDate ? ', including the end date' : ''}
              </p>
            </div>

            {result.swapped && (
              <p className="text-sm text-muted-foreground">
                The start date was after the end date, so the dates were
                swapped.
              </p>
            )}

            <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              <Stat label="Total days" value={formatCount(result.totalDays)} />
              <Stat
                label="Weeks"
                value={formatCount(result.weeks)}
                detail={`and ${plural(result.remainingDays, 'day')}`}
              />
              <Stat label="Weekdays" value={formatCount(result.weekdays)} detail="Monday to Friday" />
              <Stat
                label="Weekend days"
                value={formatCount(result.weekendDays)}
                detail="Saturday and Sunday"
              />
            </dl>
          </div>
        ) : (
          !hasInvalidDates && (
            <p className="rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
              Choose a start date and an end date to see the difference.
            </p>
          )
        )}
      </section>
    </div>
  );
}
