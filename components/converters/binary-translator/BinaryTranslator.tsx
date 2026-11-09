
"use client";

import { useState } from "react";
import {
  ArrowRightLeft,
  Info,
  RefreshCw,
} from "lucide-react";

import type {
  CharacterEncoding,
  NumberFormat,
  TranslatorOptions,
} from "@/lib/converters/binary-translator/types";

import { convertInput } from "@/lib/converters/binary-translator/translator";

import { ConversionSelectors } from "./ConversionSelectors";
import { EncodingSelector } from "./EncodingSelector";
import { InputPanel } from "./InputPanel";
import { OutputPanel } from "./OutputPanel";
import HowItWorks from "./HowItWorks";

const INITIAL_OPTIONS: TranslatorOptions = {
  from: "binary",
  to: "text",
  encoding: "UTF-8",
  delimiter: "",
  usePrefix: true,
  usePostfix: true,
};

const EXAMPLES: Record<NumberFormat, string> = {
  binary: "01001000 01100101 01101100 01101100 01101111",
  decimal: "72 101 108 108 111",
  octal: "110 145 154 154 157",
  hexadecimal: "48 65 6C 6C 6F",
  text: "Hello",
};

export function BinaryTranslator() {
  const [options, setOptions] = useState<TranslatorOptions>(
    INITIAL_OPTIONS,
  );

  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [byteCount, setByteCount] = useState(0);
  const [characterCount, setCharacterCount] = useState(0);
  const [error, setError] = useState("");
  const [hasConverted, setHasConverted] = useState(false);

  function resetConversion() {
    setOutput("");
    setError("");
    setHasConverted(false);
    setByteCount(0);
    setCharacterCount(0);
  }

  function updateOption<K extends keyof TranslatorOptions>(
    key: K,
    value: TranslatorOptions[K],
  ) {
    setOptions((previous) => ({
      ...previous,
      [key]: value,
    }));

    resetConversion();
  }

  function handleConvert() {
    resetConversion();

    try {
      const result = convertInput(input, options);

      setOutput(result.output);
      setByteCount(result.byteCount);
      setCharacterCount(result.characterCount);
      setHasConverted(true);
    } catch (conversionError) {
      setError(
        conversionError instanceof Error
          ? conversionError.message
          : "Unable to convert the input.",
      );
    }
  }

  function handleClear() {
    setInput("");
    resetConversion();
  }

  function handleInputChange(value: string) {
    setInput(value);
    resetConversion();
  }

  function handleSwap() {
    const nextInput = hasConverted ? output : "";

    setOptions((previous) => ({
      ...previous,
      from: previous.to,
      to: previous.from,
    }));

    setInput(nextInput);
    resetConversion();
  }

  function loadExample() {
    setInput(EXAMPLES[options.from]);
    resetConversion();
  }

  return (
    <div className="mx-auto w-full max-w-5xl space-y-8">
      {/* Page Header */}
      <header className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Binary to Text Converter
        </h1>

        <p className="max-w-3xl text-muted-foreground">
          Convert binary to text and text to binary instantly.
          You can also convert decimal, octal and hexadecimal
          values using ASCII, UTF-8 and other character encodings.
        </p>

        <p className="max-w-3xl text-sm text-muted-foreground">
          Enter your values, choose the input and output formats,
          select a character encoding when working with text,
          and convert your data directly in your browser.
        </p>
      </header>

      {/* Main Converter */}
      <section
        aria-label="Binary and text conversion tool"
        className="space-y-6 rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-6"
      >
        <ConversionSelectors
          from={options.from}
          to={options.to}
          onFromChange={(value) => updateOption("from", value)}
          onToChange={(value) => updateOption("to", value)}
          onSwap={handleSwap}
        />

        <EncodingSelector
          encoding={options.encoding}
          from={options.from}
          to={options.to}
          onChange={(value: CharacterEncoding) =>
            updateOption("encoding", value)
          }
        />

        {/* Input Panel */}
        <InputPanel
          value={input}
          onChange={handleInputChange}
          onLoadExample={loadExample}
          onClear={handleClear}
        />

        {/* Error Message */}
        {error && (
          <div
            role="alert"
            aria-live="assertive"
            className="rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive"
          >
            {error}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleConvert}
            disabled={!input.trim()}
            className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none"
          >
            <ArrowRightLeft
              className="h-4 w-4"
              aria-hidden="true"
            />
            Convert
          </button>

          <button
            type="button"
            onClick={handleClear}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-input bg-background px-5 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <RefreshCw
              className="h-4 w-4"
              aria-hidden="true"
            />
            Reset
          </button>
        </div>

        {/* Output Panel */}
        <OutputPanel
          output={hasConverted ? output : ""}
          byteCount={hasConverted ? byteCount : 0}
          characterCount={hasConverted ? characterCount : 0}
        />
      </section>

      {/* How It Works */}
      <HowItWorks />

      {/* Supported Input Formats */}
      <section
        aria-labelledby="supported-formats-heading"
        className="space-y-4 rounded-xl border border-border bg-card p-5"
      >
        <div className="flex items-center gap-2">
          <Info
            className="h-5 w-5 text-primary"
            aria-hidden="true"
          />

          <h2
            id="supported-formats-heading"
            className="font-semibold text-foreground"
          >
            Supported Input and Output Formats
          </h2>
        </div>

        <p className="text-sm text-muted-foreground">
          This converter supports five input and output formats
          for converting numerical data and text.
        </p>

        <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
          <li>
            <strong className="text-foreground">Binary:</strong> Base-2 values using 0 and 1.
            Continuous input is supported when it contains complete
            8-bit bytes.
          </li>
          <li>
            <strong className="text-foreground">Decimal:</strong> Base-10 byte values between 0 and 255.
          </li>
          <li>
            <strong className="text-foreground">Octal:</strong> Base-8 byte values between 0 and 377.
          </li>
          <li>
            <strong className="text-foreground">Hexadecimal:</strong> Base-16 byte values between 00 and FF.
          </li>
          <li>
            <strong className="text-foreground">Text:</strong> Character data converted using the
            selected character encoding.
          </li>
        </ul>

        <p className="text-sm text-muted-foreground">
          Separate numerical values using spaces, commas, semicolons,
          tabs or newlines. Binary prefix and suffix handling is
          available through the converter options.
        </p>
      </section>

      {/* How to Use */}
      <section
        aria-labelledby="how-to-use-heading"
        className="space-y-4"
      >
        <h2
          id="how-to-use-heading"
          className="text-xl font-semibold tracking-tight text-foreground"
        >
          How to Use the Binary to Text Converter
        </h2>

        <ol className="list-decimal space-y-3 pl-5 text-sm text-muted-foreground">
          <li>
            Select your source format, such as binary, decimal,
            octal, hexadecimal or text.
          </li>
          <li>
            Select the output format you want to convert your data into.
          </li>
          <li>
            Choose a character encoding such as UTF-8 or ASCII
            when converting to or from text.
          </li>
          <li>
            Enter your data or upload a supported plain-text file.
          </li>
          <li>
            Click Convert to view the result, including the byte
            and character counts.
          </li>
        </ol>
      </section>

      {/* Conversion Examples */}
      <section
        aria-labelledby="conversion-examples-heading"
        className="space-y-4"
      >
        <h2
          id="conversion-examples-heading"
          className="text-xl font-semibold tracking-tight text-foreground"
        >
          Binary to Text Conversion Examples
        </h2>

        <p className="text-sm text-muted-foreground">
          The word Hello can be represented using different
          numerical formats. Here are its UTF-8 byte values.
        </p>

        <div className="overflow-x-auto rounded-xl border border-border bg-card">
          <table className="w-full min-w-[320px] text-left text-sm">
            <thead className="bg-muted/50 text-foreground">
              <tr>
                <th scope="col" className="p-3 font-semibold">Format</th>
                <th scope="col" className="p-3 font-semibold">Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-foreground">
              <tr>
                <td className="p-3 font-medium">Text</td>
                <td className="p-3">Hello</td>
              </tr>
              <tr>
                <td className="p-3 font-medium">Binary</td>
                <td className="break-all p-3 font-mono text-xs">
                  01001000 01100101 01101100 01101100 01101111
                </td>
              </tr>
              <tr>
                <td className="p-3 font-medium">Decimal</td>
                <td className="p-3 font-mono">72 101 108 108 111</td>
              </tr>
              <tr>
                <td className="p-3 font-medium">Octal</td>
                <td className="p-3 font-mono">110 145 154 154 157</td>
              </tr>
              <tr>
                <td className="p-3 font-medium">Hexadecimal</td>
                <td className="p-3 font-mono">48 65 6C 6C 6F</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Character Encoding Information */}
      <section
        aria-labelledby="encoding-info-heading"
        className="space-y-3"
      >
        <h2
          id="encoding-info-heading"
          className="text-xl font-semibold tracking-tight text-foreground"
        >
          Understanding Character Encodings
        </h2>

        <p className="text-sm leading-7 text-muted-foreground">
          Character encoding determines how text characters are
          represented as bytes and how those bytes are interpreted
          when converted back into text. UTF-8 is recommended for
          most modern applications because it supports Unicode
          characters from many languages. ASCII supports a smaller
          set of basic English characters, while UTF-16 and legacy
          encodings are useful for specific compatibility requirements.
        </p>

        <p className="text-sm leading-7 text-muted-foreground">
          Always use the same character encoding when encoding and
          decoding data. Selecting an incorrect encoding can produce
          unexpected characters or decoding errors.
        </p>
      </section>
    </div>
  );
}
