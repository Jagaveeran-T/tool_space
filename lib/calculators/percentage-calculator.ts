export type ChangeDirection = 'increase' | 'decrease' | 'none';

export type PercentageChange = {
  change: number;
  direction: ChangeDirection;
};

/** Rounds away floating-point noise such as 0.1 + 0.2 = 0.30000000000000004. */
export function roundTo(value: number, decimals = 10): number {
  const factor = 10 ** decimals;

  return Math.round((value + Number.EPSILON) * factor) / factor;
}

/** Converts text from an input field to a number, or null when it is empty or invalid. */
export function parseNumberInput(value: string): number | null {
  const trimmed = value.trim();

  if (trimmed === '') {
    return null;
  }

  const parsed = Number(trimmed);

  return Number.isFinite(parsed) ? parsed : null;
}

/** X% of Y. Example: 15% of 80 = 12. */
export function percentOf(percentage: number, value: number): number {
  return roundTo((percentage * value) / 100);
}

/** What percent is `part` of `whole`? Returns null when `whole` is 0. */
export function whatPercent(part: number, whole: number): number | null {
  if (whole === 0) {
    return null;
  }

  return roundTo((part * 100) / whole);
}

/**
 * Percentage change from `from` to `to`: (to - from) / |from| x 100.
 * Returns null when `from` is 0, because the change is undefined.
 */
export function percentChange(
  from: number,
  to: number,
): PercentageChange | null {
  if (from === 0) {
    return null;
  }

  const change = roundTo(((to - from) * 100) / Math.abs(from));

  return {
    change,
    direction: change > 0 ? 'increase' : change < 0 ? 'decrease' : 'none',
  };
}

/** Increases or decreases `value` by `percentage` percent. */
export function applyPercent(
  value: number,
  percentage: number,
  direction: 'increase' | 'decrease',
): number {
  const factor = direction === 'increase' ? 100 + percentage : 100 - percentage;

  return roundTo((value * factor) / 100);
}

/** Formats a result for display. A fixed locale keeps server and browser output identical. */
export function formatNumber(value: number): string {
  if (value === 0) {
    return '0';
  }

  return value.toLocaleString('en-US', { maximumFractionDigits: 6 });
}
