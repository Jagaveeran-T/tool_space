/**
 * Decimal <-> hexadecimal conversion.
 *
 * Everything here uses BigInt, so very large numbers convert exactly. A
 * normal JavaScript number is only exact up to 9,007,199,254,740,991.
 * Negative numbers are shown with a minus sign (for example -255 is -FF),
 * not as two's complement.
 */

export type ParseResult =
  | { ok: true; value: bigint }
  | { ok: false; error: string };

export type ConversionResult =
  | { ok: true; value: string }
  | { ok: false; error: string };

export type Base = 2 | 8 | 10 | 16;

/** Longest input that is accepted. Keeps huge pasted text from freezing the page. */
export const MAX_INPUT_LENGTH = 2000;

const ZERO = BigInt(0);

/** Removes spaces and underscores, and (for decimal) commas used as separators. */
function stripSeparators(value: string, allowCommas: boolean): string {
  return value.trim().replace(allowCommas ? /[\s_,]/g : /[\s_]/g, '');
}

/** Splits an optional leading + or - sign from the digits. */
function splitSign(value: string): { negative: boolean; digits: string } {
  if (value.startsWith('-')) {
    return { negative: true, digits: value.slice(1) };
  }

  if (value.startsWith('+')) {
    return { negative: false, digits: value.slice(1) };
  }

  return { negative: false, digits: value };
}

/** Reads a whole decimal number such as 255, -42 or 1,000,000. */
export function parseDecimal(input: string): ParseResult {
  if (input.length > MAX_INPUT_LENGTH) {
    return {
      ok: false,
      error: `The input is too long. Use at most ${MAX_INPUT_LENGTH.toLocaleString('en-US')} characters.`,
    };
  }

  const cleaned = stripSeparators(input, true);

  if (cleaned === '') {
    return { ok: false, error: 'Enter a decimal number.' };
  }

  if (/^[+-]?\d*\.\d*$/.test(cleaned)) {
    return {
      ok: false,
      error: 'Only whole numbers are supported. Remove the decimal point and anything after it.',
    };
  }

  const { negative, digits } = splitSign(cleaned);

  if (!/^\d+$/.test(digits)) {
    return {
      ok: false,
      error: 'Use only the digits 0-9, with an optional minus sign at the start.',
    };
  }

  const magnitude = BigInt(digits);

  return { ok: true, value: negative ? -magnitude : magnitude };
}

/** Reads a hexadecimal number such as FF, ff, 0xFF or -1A3F. */
export function parseHex(input: string): ParseResult {
  if (input.length > MAX_INPUT_LENGTH) {
    return {
      ok: false,
      error: `The input is too long. Use at most ${MAX_INPUT_LENGTH.toLocaleString('en-US')} characters.`,
    };
  }

  const cleaned = stripSeparators(input, false);

  if (cleaned === '') {
    return { ok: false, error: 'Enter a hexadecimal number.' };
  }

  const { negative, digits: signless } = splitSign(cleaned);
  const digits = signless.replace(/^0x/i, '');

  if (digits === '') {
    return { ok: false, error: 'Enter the hexadecimal digits after the 0x prefix.' };
  }

  if (!/^[0-9a-fA-F]+$/.test(digits)) {
    return {
      ok: false,
      error: 'Use only the hex digits 0-9 and A-F. An optional 0x prefix is allowed.',
    };
  }

  const magnitude = BigInt(`0x${digits}`);

  return { ok: true, value: negative ? -magnitude : magnitude };
}

/** Writes a BigInt in the given base, keeping the minus sign for negatives. */
export function toBase(value: bigint, base: Base): string {
  const negative = value < ZERO;
  const text = (negative ? -value : value).toString(base);

  return negative ? `-${text}` : text;
}

/** Splits a string of digits into groups counted from the right. */
export function groupDigits(value: string, size: number, separator: string): string {
  const negative = value.startsWith('-');
  const digits = negative ? value.slice(1) : value;
  const groups: string[] = [];

  for (let end = digits.length; end > 0; end -= size) {
    groups.unshift(digits.slice(Math.max(0, end - size), end));
  }

  return (negative ? '-' : '') + groups.join(separator);
}

export type HexOptions = {
  /** Show A-F instead of a-f. Defaults to true. */
  uppercase?: boolean;
  /** Add a 0x prefix. Defaults to false. */
  prefix?: boolean;
};

/** Writes a BigInt as hexadecimal text. */
export function formatHex(value: bigint, options: HexOptions = {}): string {
  const { uppercase = true, prefix = false } = options;
  const negative = value < ZERO;
  const magnitude = (negative ? -value : value).toString(16);
  const digits = uppercase ? magnitude.toUpperCase() : magnitude;

  return `${negative ? '-' : ''}${prefix ? '0x' : ''}${digits}`;
}

/** Decimal text in, hexadecimal text out. Example: "255" gives "FF". */
export function decimalToHex(
  input: string,
  options: HexOptions = {},
): ConversionResult {
  const parsed = parseDecimal(input);

  if (!parsed.ok) {
    return parsed;
  }

  return { ok: true, value: formatHex(parsed.value, options) };
}

/** Hexadecimal text in, decimal text out. Example: "FF" gives "255". */
export function hexToDecimal(input: string): ConversionResult {
  const parsed = parseHex(input);

  if (!parsed.ok) {
    return parsed;
  }

  return { ok: true, value: toBase(parsed.value, 10) };
}