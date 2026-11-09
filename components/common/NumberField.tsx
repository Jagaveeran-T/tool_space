'use client';

import { useState, type InputHTMLAttributes } from 'react';

type NumberFieldProps = {
  value: number;
  onValueChange: (value: number) => void;
  /**
   * The value to report when the person empties the field. When omitted,
   * emptying the field reports nothing and the last valid value is kept.
   */
  valueWhenEmpty?: number;
} & Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange' | 'type' | 'defaultValue'
>;

/**
 * A number input that can be cleared and retyped.
 *
 * A plain controlled `<input type="number" value={n}>` snaps back to "0"
 * as soon as the field is emptied, which makes it impossible to replace a
 * value by deleting it first. This component shows what the person is
 * typing while the field has focus, and shows the stored value otherwise.
 */
export default function NumberField({
  value,
  onValueChange,
  valueWhenEmpty,
  onBlur,
  ...inputProps
}: NumberFieldProps) {
  const [draft, setDraft] = useState<string | null>(null);

  return (
    <input
      {...inputProps}
      type="number"
      value={draft ?? String(value)}
      onChange={(event) => {
        const raw = event.target.value;

        setDraft(raw);

        if (raw === '') {
          if (valueWhenEmpty !== undefined) {
            onValueChange(valueWhenEmpty);
          }

          return;
        }

        const parsed = Number(raw);

        if (Number.isFinite(parsed)) {
          onValueChange(parsed);
        }
      }}
      onBlur={(event) => {
        setDraft(null);
        onBlur?.(event);
      }}
    />
  );
}
