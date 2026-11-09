"use client";

import {
  CHARACTER_ENCODINGS,
  isEncodingSupported,
} from "@/lib/converters/binary-translator/encodings";

import type {
  CharacterEncoding,
  NumberFormat,
} from "@/lib/converters/binary-translator/types";

interface Props {
  encoding: CharacterEncoding;
  from: NumberFormat;
  to: NumberFormat;
  onChange: (value: CharacterEncoding) => void;
}

export function EncodingSelector({
  encoding,
  from,
  to,
  onChange,
}: Props) {
  const encodingNeeded =
    from === "text" || to === "text";

  return (
    <div className="space-y-2">
      <label
        htmlFor="character-encoding"
        className="block text-sm font-medium text-foreground"
      >
        Character Encoding
      </label>

      <select
        id="character-encoding"
        value={encoding}
        onChange={(event) =>
          onChange(event.target.value as CharacterEncoding)
        }
        disabled={!encodingNeeded}
        aria-describedby="character-encoding-help"
        className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-60"
      >
        {CHARACTER_ENCODINGS.map((item) => {
          const decoderSupported = isEncodingSupported(item.value);
          const encoderSupported = item.textEncodingSupported;

          const unavailable =
            !encoderSupported && !decoderSupported;

          return (
            <option
              key={item.value}
              value={item.value}
              disabled={unavailable}
            >
              {item.label}
              {!encoderSupported && decoderSupported
                ? " (Decode only)"
                : ""}
              {unavailable ? " (Unavailable)" : ""}
            </option>
          );
        })}
      </select>

      <div
        id="character-encoding-help"
        className="space-y-1"
      >
        <p className="text-xs text-muted-foreground">
          UTF-8 is recommended for most text. The selected encoding
          determines how text is converted to bytes and how bytes
          are decoded into characters.
        </p>

        <p className="text-xs text-muted-foreground">
          Some legacy encodings support decoding only and depend
          on browser compatibility.
        </p>

        {!encodingNeeded && (
          <p className="text-xs text-muted-foreground">
            Character encoding is used only when the source or
            target format is Text.
          </p>
        )}
      </div>
    </div>
  );
}