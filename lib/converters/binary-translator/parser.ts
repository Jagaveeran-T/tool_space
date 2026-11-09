
import type { NumberFormat } from "./types";

function splitTokens(input: string, delimiter: string): string[] {
  let normalized = input;

  if (delimiter) {
    normalized = normalized.replaceAll(delimiter, " ");
  }

  return normalized
    .trim()
    .split(/[\s,;]+/)
    .filter(Boolean);
}

function parseToken(token: string, format: NumberFormat): number {
  let value: number;

  switch (format) {
    case "binary":
      if (!/^[01]+$/.test(token)) {
        throw new Error(`Invalid binary value: ${token}`);
      }
      value = Number.parseInt(token, 2);
      break;

    case "decimal":
      if (!/^\d+$/.test(token)) {
        throw new Error(`Invalid decimal value: ${token}`);
      }
      value = Number(token);
      break;

    case "octal":
      if (!/^[0-7]+$/.test(token)) {
        throw new Error(`Invalid octal value: ${token}`);
      }
      value = Number.parseInt(token, 8);
      break;

    case "hexadecimal":
      if (!/^[0-9a-f]+$/i.test(token)) {
        throw new Error(`Invalid hexadecimal value: ${token}`);
      }
      value = Number.parseInt(token, 16);
      break;

    default:
      throw new Error("Unsupported number format.");
  }

  if (!Number.isSafeInteger(value) || value < 0 || value > 255) {
    throw new Error(
      `Value ${token} is outside the supported byte range (0–255).`,
    );
  }

  return value;
}

export function parseNumberInput(
  input: string,
  format: Exclude<NumberFormat, "text">,
  delimiter = "",
  usePrefix = true,
  usePostfix = true,
): number[] {
  if (!input.trim()) {
    throw new Error("Please enter some input.");
  }

  let tokens = splitTokens(input, delimiter);

  if (format === "binary") {
    tokens = tokens.map((token) => {
      let value = token;

      if (usePrefix) {
        value = value.replace(/^0b/i, "");
      }

      if (usePostfix) {
        value = value.replace(/b$/i, "");
      }

      return value;
    });

    // Validate continuous binary input as complete 8-bit bytes.
    if (tokens.length === 1 && /^[01]+$/.test(tokens[0])) {
      if (tokens[0].length % 8 !== 0) {
        throw new Error(
          "Continuous binary input must contain complete 8-bit bytes.",
        );
      }

      if (tokens[0].length > 8) {
        tokens = tokens[0].match(/.{8}/g) ?? [];
      }
    }
  }

  return tokens.map((token) => parseToken(token, format));
}
