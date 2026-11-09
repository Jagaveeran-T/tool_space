'use client';

import { CalendarDays } from 'lucide-react';

import type { AgeInput } from '@/types/age-calculator';

type Props = {
  values: AgeInput;
  today: string;
  onChange: (values: AgeInput) => void;
  onCalculate: () => void;
  onReset: () => void;
  error: string;
};

export default function AgeInputForm({
  values,
  today,
  onChange,
  onCalculate,
  onReset,
  error,
}: Props) {
  return (
    <section className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-7">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <CalendarDays size={22} />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-foreground">
            Enter Your Details
          </h2>

          <p className="text-sm text-muted-foreground">
            Select your date of birth and calculation date.
          </p>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="dateOfBirth"
            className="mb-2 block text-sm font-medium text-foreground"
          >
            Date of Birth
          </label>

          <input
            id="dateOfBirth"
            name="dateOfBirth"
            type="date"
            max={today || undefined}
            required
            value={values.dateOfBirth}
            onChange={(event) =>
              onChange({
                ...values,
                dateOfBirth: event.target.value,
              })
            }
            aria-invalid={Boolean(error)}
            className="h-12 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/20"
          />
        </div>

        <div>
          <label
            htmlFor="ageAtDate"
            className="mb-2 block text-sm font-medium text-foreground"
          >
            Age at Date
          </label>

          <input
            id="ageAtDate"
            name="ageAtDate"
            type="date"
            min={values.dateOfBirth || undefined}
            required
            value={values.ageAtDate}
            onChange={(event) =>
              onChange({
                ...values,
                ageAtDate: event.target.value,
              })
            }
            aria-invalid={Boolean(error)}
            className="h-12 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/20"
          />

          <p className="mt-2 text-xs text-muted-foreground">
            Defaults to today&apos;s date.
          </p>
        </div>
      </div>

      {error && (
        <p
          role="alert"
          className="mt-4 rounded-lg border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive"
        >
          {error}
        </p>
      )}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={onCalculate}
          className="inline-flex h-11 flex-1 items-center justify-center rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          Calculate Age
        </button>

        <button
          type="button"
          onClick={onReset}
          className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-background px-5 text-sm font-semibold text-foreground transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          Reset
        </button>
      </div>
    </section>
  );
}