import type {
  NumberFormat,
  TranslatorOptions,
  ConversionResult,
} from "./types";

import { parseNumberInput } from "./parser";
import { encodeText, decodeBytes } from "./encoding-converter";
import { formatBytes } from "./number-converter";

export function convertInput(
  input: string,
  options: TranslatorOptions,
): ConversionResult {
  if (!input.trim()) {
    throw new Error("Please enter some input.");
  }

  let bytes: number[];

  if (options.from === "text") {
    bytes = Array.from(
      encodeText(input, options.encoding),
    );
  } else {
    bytes = parseNumberInput(
      input,
      options.from,
      options.delimiter,
      options.usePrefix,
      options.usePostfix,
    );
  }

  if (bytes.length === 0) {
    throw new Error("No valid bytes found in the input.");
  }

  let output: string;

  if (options.to === "text") {
    output = decodeBytes(bytes, options.encoding);
  } else {
    output = formatBytes(
      bytes,
      options.to as Exclude<NumberFormat, "text">,
    );
  }

  return {
    output,
    byteCount: bytes.length,
    characterCount:
      options.to === "text"
        ? [...output].length
        : options.from === "text"
          ? [...input].length
          : [...output].length,
  };
}

export function getFormatLabel(
  format: NumberFormat,
): string {
  const labels: Record<NumberFormat, string> = {
    binary: "Binary",
    decimal: "Decimal",
    octal: "Octal",
    hexadecimal: "Hexadecimal",
    text: "Text",
  };

  return labels[format];
}