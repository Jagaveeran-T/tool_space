export type NumberFormat =
  | "binary"
  | "decimal"
  | "octal"
  | "hexadecimal"
  | "text";

export type CharacterEncoding =
  | "UTF-8"
  | "UTF-16LE"
  | "UTF-16BE"
  | "ASCII"
  | "Windows-1252"
  | "ISO-8859-1"
  | "ISO-8859-2"
  | "ISO-8859-5"
  | "ISO-8859-7"
  | "ISO-8859-9"
  | "ISO-8859-15"
  | "Windows-1250"
  | "Windows-1251"
  | "Windows-1253"
  | "Windows-1254"
  | "Windows-1255"
  | "Windows-1256"
  | "Windows-1257"
  | "Windows-1258"
  | "Shift_JIS"
  | "EUC-JP"
  | "EUC-KR"
  | "GBK"
  | "GB18030"
  | "Big5"
  | "KOI8-R"
  | "KOI8-U"
  | "ISO-2022-JP";

export interface TranslatorOptions {
  from: NumberFormat;
  to: NumberFormat;
  encoding: CharacterEncoding;
  delimiter: string;
  usePrefix: boolean;
  usePostfix: boolean;
}

export interface ConversionResult {
  output: string;
  byteCount: number;
  characterCount: number;
}