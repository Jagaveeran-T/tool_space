'use client';

import Link from 'next/link';
import { useId, useMemo, useState } from 'react';
import { Check, Copy } from 'lucide-react';

import {
  formatHex,
  groupDigits,
  parseDecimal,
  parseHex,
  toBase,
} from '@/lib/converters/number-base/number-base';

export type NumberBaseMode = 'decimal-to-hex' | 'hex-to-decimal';

type ModeConfig = {
  inputLabel: string;
  placeholder: string;
  outputLabel: string;
  inputMode: 'numeric' | 'text';
  examples: string[];
  switchHref: string;
  switchLabel: string;
};

const MODES: Record<NumberBaseMode, ModeConfig> = {
  'decimal-to-hex': {
    inputLabel: 'Decimal number',
    placeholder: 'Enter a decimal number, for example 255',
    outputLabel: 'Hexadecimal result',
    inputMode: 'numeric',
    examples: ['255', '4095', '65535', '1000000'],
    switchHref: '/converters/hex-to-decimal',
    switchLabel: 'Hex to Decimal Converter',
  },
  'hex-to-decimal': {
    inputLabel: 'Hexadecimal number',
    placeholder: 'Enter a hex number, for example FF or 0xFF',
    outputLabel: 'Decimal result',
    inputMode: 'text',
    examples: ['FF', '1A3F', '0xFFFF', 'DEADBEEF'],
    switchHref: '/converters/decimal-to-hex',
    switchLabel: 'Decimal to Hex Converter',
  },
};

const inputClassName =
  'w-full rounded-lg border border-input bg-background px-3 py-2.5 font-mono text-base text-foreground placeholder:font-sans placeholder:text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring aria-invalid:border-destructive';

const buttonClassName =
  'inline-flex h-9 items-center gap-2 rounded-lg border border-input bg-background px-3 text-xs font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';

type Detail = {
  label: string;
  value: string;
};

type Props = {
  mode: NumberBaseMode;
};

export default function NumberBaseConverter({ mode }: Props) {
  const config = MODES[mode];
  const inputId = useId();
  const errorId = useId();

  const [input, setInput] = useState('');
  const [uppercase, setUppercase] = useState(true);
  const [prefix, setPrefix] = useState(false);
  const [copiedValue, setCopiedValue] = useState('');
  const [copyFailedFor, setCopyFailedFor] = useState('');

  const parsed = useMemo(() => {
    if (input.trim() === '') {
      return null;
    }

    return mode === 'decimal-to-hex' ? parseDecimal(input) : parseHex(input);
  }, [input, mode]);

  const value = parsed !== null && parsed.ok ? parsed.value : null;
  const error = parsed !== null && !parsed.ok ? parsed.error : '';

  const output =
    value === null
      ? ''
      : mode === 'decimal-to-hex'
        ? formatHex(value, { uppercase, prefix })
        : toBase(value, 10);

  const details: Detail[] =
    value === null
      ? []
      : [
          ...(mode === 'hex-to-decimal'
            ? [
                {
                  label: 'Decimal with separators',
                  value: groupDigits(toBase(value, 10), 3, ','),
                },
              ]
            : []),
          {
            label: 'Binary',
            value: groupDigits(toBase(value, 2), 4, ' '),
          },
          {
            label: 'Octal',
            value: toBase(value, 8),
          },
        ];

  // "Copied" and copy errors only apply to the result they were made for,
  // so they are derived here instead of being reset inside an effect.
  const copied = output !== '' && copiedValue === output;
  const copyFailed = output !== '' && copyFailedFor === output;

  async function copyOutput() {
    if (!output) return;

    try {
      await navigator.clipboard.writeText(output);

      setCopyFailedFor('');
      setCopiedValue(output);

      window.setTimeout(() => {
        setCopiedValue((current) => (current === output ? '' : current));
      }, 1500);
    } catch {
      setCopiedValue('');
      setCopyFailedFor(output);
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <section className="space-y-5 rounded-xl border border-border bg-card p-4 sm:p-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <label
              htmlFor={inputId}
              className="text-sm font-medium text-foreground"
            >
              {config.inputLabel}
            </label>

            <button
              type="button"
              onClick={() => setInput('')}
              disabled={input === ''}
              className={buttonClassName}
            >
              Clear
            </button>
          </div>

          <input
            id={inputId}
            type="text"
            inputMode={config.inputMode}
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            value={input}
            placeholder={config.placeholder}
            onChange={(event) => setInput(event.target.value)}
            aria-invalid={error !== ''}
            aria-describedby={error !== '' ? errorId : undefined}
            className={inputClassName}
          />

          {error !== '' && (
            <p id={errorId} role="alert" className="text-sm text-destructive">
              {error}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-muted-foreground">
            <span>Try an example:</span>

            {config.examples.map((example) => (
              <button
                key={example}
                type="button"
                onClick={() => setInput(example)}
                className="rounded-full border border-border bg-background px-3 py-1 font-mono text-xs text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {example}
              </button>
            ))}
          </div>
        </div>

        {mode === 'decimal-to-hex' && (
          <fieldset className="flex flex-wrap gap-x-6 gap-y-2">
            <legend className="sr-only">Output options</legend>

            <label className="flex items-center gap-2 text-sm text-foreground">
              <input
                type="checkbox"
                checked={uppercase}
                onChange={(event) => setUppercase(event.target.checked)}
                className="size-4 accent-primary"
              />
              Uppercase letters (A-F)
            </label>

            <label className="flex items-center gap-2 text-sm text-foreground">
              <input
                type="checkbox"
                checked={prefix}
                onChange={(event) => setPrefix(event.target.checked)}
                className="size-4 accent-primary"
              />
              Add 0x prefix
            </label>
          </fieldset>
        )}

        <div className="space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-sm font-semibold text-foreground">
              {config.outputLabel}
            </h2>

            <button
              type="button"
              onClick={() => void copyOutput()}
              disabled={!output}
              className={buttonClassName}
            >
              {copied ? (
                <Check className="h-3.5 w-3.5" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}

              {copied ? 'Copied' : 'Copy result'}
            </button>
          </div>

          <div
            aria-live="polite"
            aria-atomic="true"
            className="min-h-14 break-all rounded-xl border border-border bg-muted/30 p-4 font-mono text-lg text-foreground"
          >
            {output || (
              <span className="font-sans text-sm text-muted-foreground">
                Your result will appear here.
              </span>
            )}
          </div>

          {copyFailed && (
            <p role="alert" className="text-sm text-destructive">
              Unable to copy. Please select and copy the result manually.
            </p>
          )}
        </div>

        <p className="text-xs text-muted-foreground">
          Your numbers stay in your browser. They are not uploaded or saved.
        </p>
      </section>

      <section
        aria-label="The same number in other number systems"
        className="rounded-xl border border-border bg-card p-4 sm:p-6"
      >
        <h2 className="text-base font-semibold text-foreground">
          The same number in other number systems
        </h2>

        {details.length > 0 ? (
          <dl className="mt-4 space-y-3">
            {details.map((detail) => (
              <div
                key={detail.label}
                className="flex flex-col gap-1 sm:flex-row sm:gap-4"
              >
                <dt className="text-sm text-muted-foreground sm:w-48 sm:shrink-0">
                  {detail.label}
                </dt>
                <dd className="min-w-0 break-all font-mono text-sm text-foreground">
                  {detail.value}
                </dd>
              </div>
            ))}
          </dl>
        ) : (
          <p className="mt-2 text-sm text-muted-foreground">
            Enter a number above to see it in binary and octal as well.
          </p>
        )}
      </section>

      <p className="text-center text-sm text-muted-foreground">
        Need to convert the other way?{' '}
        <Link
          href={config.switchHref}
          className="font-medium text-primary underline-offset-4 hover:underline"
        >
          {config.switchLabel}
        </Link>
      </p>
    </div>
  );
}