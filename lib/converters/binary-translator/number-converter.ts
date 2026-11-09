import type { NumberFormat } from "./types";

export function formatBytes(
  bytes: number[],
  format: Exclude<NumberFormat, "text">,
): string {
  const converted = bytes.map((byte) => {
    switch (format) {
      case "binary":
        return byte.toString(2).padStart(8, "0");

      case "decimal":
        return byte.toString(10);

      case "octal":
        return byte.toString(8).padStart(3, "0");

      case "hexadecimal":
        return byte.toString(16).toUpperCase().padStart(2, "0");

      default:
        throw new Error("Unsupported output format.");
    }
  });

  return converted.join(" ");
}