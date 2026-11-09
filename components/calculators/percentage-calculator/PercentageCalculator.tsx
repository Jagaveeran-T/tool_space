'use client';

import { useId, useState, type ReactNode } from 'react';

import {
  applyPercent,
  formatNumber,
  parseNumberInput,
  percentChange,
  percentOf,
  whatPercent,
} from '@/lib/calculators/percentage-calculator';

const inputClassName =
  'w-full rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring';

type FieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
};

function Field({ label, value, onChange, placeholder }: FieldProps) {
  const id = useId();

  return (
    <div className="min-w-0 flex-1">
      <label
        htmlFor={id}
        className="mb-1 block text-sm font-medium text-foreground"
      >
        {label}
      </label>
      <input
        id={id}
        type="number"
        inputMode="decimal"
        step="any"
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className={inputClassName}
      />
    </div>
  );
}

type CardProps = {
  title: string;
  description: string;
  children: ReactNode;
  result: ReactNode;
};

function CalculatorCard({
  title,
  description,
  children,
  result,
}: CardProps) {
  return (
    <section className="space-y-4 rounded-xl border border-border bg-card p-4 sm:p-5">
      <div>
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">{children}</div>

      <div
        aria-live="polite"
        className="min-h-[3.25rem] rounded-lg bg-muted/40 px-4 py-3 text-sm"
      >
        {result}
      </div>
    </section>
  );
}

function Hint({ children }: { children: ReactNode }) {
  return <p className="text-muted-foreground">{children}</p>;
}

function Answer({ children }: { children: ReactNode }) {
  return <p className="text-base font-semibold text-foreground">{children}</p>;
}

function Problem({ children }: { children: ReactNode }) {
  return <p className="text-destructive">{children}</p>;
}

function PercentOfCard() {
  const [percentage, setPercentage] = useState('');
  const [value, setValue] = useState('');

  const p = parseNumberInput(percentage);
  const v = parseNumberInput(value);

  return (
    <CalculatorCard
      title="What is X% of Y?"
      description="Find a percentage of a number, such as 15% of 80."
      result={
        p !== null && v !== null ? (
          <Answer>
            {formatNumber(p)}% of {formatNumber(v)} is{' '}
            {formatNumber(percentOf(p, v))}
          </Answer>
        ) : (
          <Hint>Enter a percentage and a number.</Hint>
        )
      }
    >
      <Field
        label="Percentage (%)"
        value={percentage}
        onChange={setPercentage}
        placeholder="15"
      />
      <Field label="Of the number" value={value} onChange={setValue} placeholder="80" />
    </CalculatorCard>
  );
}

function WhatPercentCard() {
  const [part, setPart] = useState('');
  const [whole, setWhole] = useState('');

  const a = parseNumberInput(part);
  const b = parseNumberInput(whole);
  const result = a !== null && b !== null ? whatPercent(a, b) : null;

  return (
    <CalculatorCard
      title="X is what percent of Y?"
      description="Work out what share one number is of another, such as 18 out of 60."
      result={
        a === null || b === null ? (
          <Hint>Enter two numbers.</Hint>
        ) : result === null ? (
          <Problem>The second number cannot be 0.</Problem>
        ) : (
          <Answer>
            {formatNumber(a)} is {formatNumber(result)}% of {formatNumber(b)}
          </Answer>
        )
      }
    >
      <Field label="Number (X)" value={part} onChange={setPart} placeholder="18" />
      <Field label="Out of (Y)" value={whole} onChange={setWhole} placeholder="60" />
    </CalculatorCard>
  );
}

function PercentChangeCard() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const a = parseNumberInput(from);
  const b = parseNumberInput(to);
  const result = a !== null && b !== null ? percentChange(a, b) : null;

  return (
    <CalculatorCard
      title="Percentage change"
      description="Find the percentage increase or decrease from an old value to a new value."
      result={
        a === null || b === null ? (
          <Hint>Enter the old and the new value.</Hint>
        ) : result === null ? (
          <Problem>
            The change is undefined when the old value is 0.
          </Problem>
        ) : result.direction === 'none' ? (
          <Answer>No change (0%)</Answer>
        ) : (
          <Answer>
            {result.direction === 'increase' ? 'Increase' : 'Decrease'} of{' '}
            {formatNumber(Math.abs(result.change))}%
          </Answer>
        )
      }
    >
      <Field label="Old value" value={from} onChange={setFrom} placeholder="50" />
      <Field label="New value" value={to} onChange={setTo} placeholder="65" />
    </CalculatorCard>
  );
}

function ApplyPercentCard() {
  const [value, setValue] = useState('');
  const [percentage, setPercentage] = useState('');

  const v = parseNumberInput(value);
  const p = parseNumberInput(percentage);

  return (
    <CalculatorCard
      title="Increase or decrease by a percentage"
      description="Add or take away a percentage, such as a 25% discount or an 8% tax."
      result={
        v !== null && p !== null ? (
          <div className="space-y-1">
            <Answer>
              {formatNumber(v)} + {formatNumber(p)}% ={' '}
              {formatNumber(applyPercent(v, p, 'increase'))}
            </Answer>
            <Answer>
              {formatNumber(v)} − {formatNumber(p)}% ={' '}
              {formatNumber(applyPercent(v, p, 'decrease'))}
            </Answer>
          </div>
        ) : (
          <Hint>Enter a number and a percentage.</Hint>
        )
      }
    >
      <Field label="Number" value={value} onChange={setValue} placeholder="200" />
      <Field
        label="Percentage (%)"
        value={percentage}
        onChange={setPercentage}
        placeholder="15"
      />
    </CalculatorCard>
  );
}

export default function PercentageCalculator() {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <PercentOfCard />
      <WhatPercentCard />
      <PercentChangeCard />
      <ApplyPercentCard />
    </div>
  );
}
