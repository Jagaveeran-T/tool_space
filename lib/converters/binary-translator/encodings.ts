
import type { CharacterEncoding } from "./types";

export const CHARACTER_ENCODINGS: {
  value: CharacterEncoding;
  label: string;
  description: string;
  textEncodingSupported: boolean;
}[] = [
  {
    value: "UTF-8",
    label: "UTF-8",
    description: "Unicode encoding used by most websites",
    textEncodingSupported: true,
  },
  {
    value: "UTF-16LE",
    label: "UTF-16 Little Endian",
    description: "UTF-16 with little-endian byte order",
    textEncodingSupported: true,
  },
  {
    value: "UTF-16BE",
    label: "UTF-16 Big Endian",
    description: "UTF-16 with big-endian byte order",
    textEncodingSupported: true,
  },
  {
    value: "ASCII",
    label: "ASCII",
    description: "7-bit ASCII character encoding",
    textEncodingSupported: true,
  },
  {
    value: "Windows-1252",
    label: "Windows-1252",
    description: "Western European character encoding",
    textEncodingSupported: true,
  },
  {
    value: "ISO-8859-1",
    label: "ISO-8859-1",
    description: "Latin-1 character encoding",
    textEncodingSupported: false,
  },
  {
    value: "ISO-8859-2",
    label: "ISO-8859-2",
    description: "Central European character encoding",
    textEncodingSupported: false,
  },
  {
    value: "ISO-8859-5",
    label: "ISO-8859-5",
    description: "Cyrillic character encoding",
    textEncodingSupported: false,
  },
  {
    value: "ISO-8859-7",
    label: "ISO-8859-7",
    description: "Greek character encoding",
    textEncodingSupported: false,
  },
  {
    value: "ISO-8859-9",
    label: "ISO-8859-9",
    description: "Turkish character encoding",
    textEncodingSupported: false,
  },
  {
    value: "ISO-8859-15",
    label: "ISO-8859-15",
    description: "Latin-9 character encoding",
    textEncodingSupported: false,
  },
  {
    value: "Windows-1250",
    label: "Windows-1250",
    description: "Central European Windows encoding",
    textEncodingSupported: false,
  },
  {
    value: "Windows-1251",
    label: "Windows-1251",
    description: "Cyrillic Windows encoding",
    textEncodingSupported: false,
  },
  {
    value: "Windows-1253",
    label: "Windows-1253",
    description: "Greek Windows encoding",
    textEncodingSupported: false,
  },
  {
    value: "Windows-1254",
    label: "Windows-1254",
    description: "Turkish Windows encoding",
    textEncodingSupported: false,
  },
  {
    value: "Windows-1255",
    label: "Windows-1255",
    description: "Hebrew Windows encoding",
    textEncodingSupported: false,
  },
  {
    value: "Windows-1256",
    label: "Windows-1256",
    description: "Arabic Windows encoding",
    textEncodingSupported: false,
  },
  {
    value: "Windows-1257",
    label: "Windows-1257",
    description: "Baltic Windows encoding",
    textEncodingSupported: false,
  },
  {
    value: "Windows-1258",
    label: "Windows-1258",
    description: "Vietnamese Windows encoding",
    textEncodingSupported: false,
  },
  {
    value: "Shift_JIS",
    label: "Shift JIS",
    description: "Japanese character encoding",
    textEncodingSupported: false,
  },
  {
    value: "EUC-JP",
    label: "EUC-JP",
    description: "Japanese extended Unix encoding",
    textEncodingSupported: false,
  },
  {
    value: "EUC-KR",
    label: "EUC-KR",
    description: "Korean character encoding",
    textEncodingSupported: false,
  },
  {
    value: "GBK",
    label: "GBK",
    description: "Simplified Chinese character encoding",
    textEncodingSupported: false,
  },
  {
    value: "GB18030",
    label: "GB18030",
    description: "Chinese national character encoding",
    textEncodingSupported: false,
  },
  {
    value: "Big5",
    label: "Big5",
    description: "Traditional Chinese character encoding",
    textEncodingSupported: false,
  },
  {
    value: "KOI8-R",
    label: "KOI8-R",
    description: "Russian character encoding",
    textEncodingSupported: false,
  },
  {
    value: "KOI8-U",
    label: "KOI8-U",
    description: "Ukrainian character encoding",
    textEncodingSupported: false,
  },
  {
    value: "ISO-2022-JP",
    label: "ISO-2022-JP",
    description: "Japanese email character encoding",
    textEncodingSupported: false,
  },
];

export function isEncodingSupported(
  encoding: CharacterEncoding,
): boolean {
  // These encodings have dedicated implementations.
  if (
    encoding === "UTF-16LE" ||
    encoding === "UTF-16BE" ||
    encoding === "ASCII" ||
    encoding === "ISO-8859-1"
  ) {
    return true;
  }

  try {
    new TextDecoder(encoding, { fatal: true });
    return true;
  } catch {
    return false;
  }
}
