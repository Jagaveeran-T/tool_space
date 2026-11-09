"use client";

import type { NumberFormat } from "@/lib/converters/binary-translator/types";
import { ArrowLeftRight } from "lucide-react";

interface Props {
  from: NumberFormat;
  to: NumberFormat;
  onFromChange: (value: NumberFormat) => void;
  onToChange: (value: NumberFormat) => void;
  onSwap: () => void;
}

const formats: {
  value: NumberFormat;
  label: string;
}[] = [
  { value: "binary", label: "Binary" },
  { value: "decimal", label: "Decimal" },
  { value: "octal", label: "Octal" },
  { value: "hexadecimal", label: "Hexadecimal" },
  { value: "text", label: "Text" },
];

const selectClassName =
  "h-11 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

export function ConversionSelectors({
  from,
  to,
  onFromChange,
  onToChange,
  onSwap,
}: Props) {
  return (
    <div className="grid grid-cols-1 items-end gap-4 sm:grid-cols-[1fr_auto_1fr]">
      <div>
        <label
          htmlFor="from-format"
          className="mb-2 block text-sm font-medium text-foreground"
        >
          From
        </label>

        <select
          id="from-format"
          value={from}
          onChange={(event) =>
            onFromChange(event.target.value as NumberFormat)
          }
          className={selectClassName}
        >
          {formats.map((format) => (
            <option key={format.value} value={format.value}>
              {format.label}
            </option>
          ))}
        </select>
      </div>

      <button
        type="button"
        onClick={onSwap}
        aria-label="Swap conversion formats"
        title="Swap From and To"
        className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg border border-input bg-background text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <ArrowLeftRight className="h-4 w-4" />
      </button>

      <div>
        <label
          htmlFor="to-format"
          className="mb-2 block text-sm font-medium text-foreground"
        >
          To
        </label>

        <select
          id="to-format"
          value={to}
          onChange={(event) =>
            onToChange(event.target.value as NumberFormat)
          }
          className={selectClassName}
        >
          {formats.map((format) => (
            <option key={format.value} value={format.value}>
              {format.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}