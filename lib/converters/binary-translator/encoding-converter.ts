
import type { CharacterEncoding } from "./types";
import { isEncodingSupported } from "./encodings";

function decodeCodeUnits(codeUnits: number[]): string {
  const chunks: string[] = [];

  for (let index = 0; index < codeUnits.length; index += 8192) {
    chunks.push(
      String.fromCharCode(...codeUnits.slice(index, index + 8192)),
    );
  }

  return chunks.join("");
}

function validateBytes(bytes: number[]): void {
  if (
    bytes.some(
      (byte) => !Number.isInteger(byte) || byte < 0 || byte > 255,
    )
  ) {
    throw new Error("Invalid byte data. Values must be between 0 and 255.");
  }
}

function encodeAscii(text: string): Uint8Array {
  const bytes: number[] = [];

  for (const character of text) {
    const code = character.codePointAt(0);

    if (code === undefined || code > 127) {
      throw new Error(
        "ASCII supports only characters from 0 to 127.",
      );
    }

    bytes.push(code);
  }

  return new Uint8Array(bytes);
}

function encodeUtf16(
  text: string,
  littleEndian: boolean,
): Uint8Array {
  const bytes: number[] = [];

  for (let index = 0; index < text.length; index++) {
    const code = text.charCodeAt(index);

    if (littleEndian) {
      bytes.push(code & 255, (code >> 8) & 255);
    } else {
      bytes.push((code >> 8) & 255, code & 255);
    }
  }

  return new Uint8Array(bytes);
}

const WINDOWS_1252_SPECIAL: Record<string, number> = {
  "€": 0x80,
  "‚": 0x82,
  "ƒ": 0x83,
  "„": 0x84,
  "…": 0x85,
  "†": 0x86,
  "‡": 0x87,
  "ˆ": 0x88,
  "‰": 0x89,
  "Š": 0x8a,
  "‹": 0x8b,
  "Œ": 0x8c,
  "Ž": 0x8e,
  "‘": 0x91,
  "’": 0x92,
  "“": 0x93,
  "”": 0x94,
  "•": 0x95,
  "–": 0x96,
  "—": 0x97,
  "˜": 0x98,
  "™": 0x99,
  "š": 0x9a,
  "›": 0x9b,
  "œ": 0x9c,
  "ž": 0x9e,
  "Ÿ": 0x9f,
};

function encodeWindows1252(text: string): Uint8Array {
  const bytes: number[] = [];

  for (const character of text) {
    const code = character.codePointAt(0);

    if (code === undefined) {
      continue;
    }

    if (code <= 127 || (code >= 160 && code <= 255)) {
      bytes.push(code);
      continue;
    }

    const specialByte = WINDOWS_1252_SPECIAL[character];

    if (specialByte !== undefined) {
      bytes.push(specialByte);
      continue;
    }

    throw new Error(
      `The character "${character}" cannot be represented in Windows-1252.`,
    );
  }

  return new Uint8Array(bytes);
}

export function encodeText(
  text: string,
  encoding: CharacterEncoding,
): Uint8Array {
  switch (encoding) {
    case "UTF-8":
      return new TextEncoder().encode(text);

    case "UTF-16LE":
      return encodeUtf16(text, true);

    case "UTF-16BE":
      return encodeUtf16(text, false);

    case "ASCII":
      return encodeAscii(text);

    case "Windows-1252":
      return encodeWindows1252(text);

    default:
      throw new Error(
        `${encoding} text encoding is not implemented. Select UTF-8, UTF-16LE, UTF-16BE, ASCII or Windows-1252.`,
      );
  }
}

export function decodeBytes(
  bytes: number[],
  encoding: CharacterEncoding,
): string {
  validateBytes(bytes);

  if (encoding === "ASCII") {
    if (bytes.some((byte) => byte > 127)) {
      throw new Error(
        "Invalid ASCII data. ASCII bytes must be between 0 and 127.",
      );
    }

    return decodeCodeUnits(bytes);
  }

  // ISO-8859-1 is decoded directly to preserve its actual
  // character mapping instead of the browser's Windows-1252 alias.
  if (encoding === "ISO-8859-1") {
    return decodeCodeUnits(bytes);
  }

  if (!isEncodingSupported(encoding)) {
    throw new Error(
      `${encoding} is not supported by this browser.`,
    );
  }

  const decoderEncoding =
    encoding === "UTF-16LE"
      ? "utf-16le"
      : encoding === "UTF-16BE"
        ? "utf-16be"
        : encoding;

  try {
    return new TextDecoder(decoderEncoding, {
      fatal: true,
      ignoreBOM: true,
    }).decode(new Uint8Array(bytes));
  } catch {
    throw new Error(
      `The input is not valid ${encoding} data.`,
    );
  }
}
