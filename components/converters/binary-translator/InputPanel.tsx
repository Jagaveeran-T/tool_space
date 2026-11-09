"use client";

import { useState } from "react";
import { ClipboardPaste, RotateCcw } from "lucide-react";
import { FileUpload } from "./FileUpload";

interface Props {
  value: string;
  onChange: (value: string) => void;
  onLoadExample: () => void;
  onClear: () => void;
}

const buttonClassName =
  "inline-flex h-9 items-center gap-2 rounded-lg border border-input bg-background px-3 text-xs font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

export function InputPanel({
  value,
  onChange,
  onLoadExample,
  onClear,
}: Props) {
  const [fileName, setFileName] = useState("");

  const characterCount = [...value].length;

  async function pasteInput() {
    try {
      const clipboard = await navigator.clipboard.readText();

      onChange(clipboard);
      setFileName("");
    } catch {
      // Clipboard permission may be denied by the browser.
    }
  }

  function handleClear() {
    setFileName("");
    onClear();
  }

  function handleLoadExample() {
    setFileName("");
    onLoadExample();
  }

  function handleFileRead(content: string, name: string) {
    onChange(content);
    setFileName(name);
  }

  function handleRemoveFile() {
    setFileName("");
    onChange("");
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <label
          htmlFor="translator-input"
          className="text-sm font-semibold text-foreground"
        >
          Enter Your Input
        </label>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => void pasteInput()}
            className={buttonClassName}
          >
            <ClipboardPaste className="h-3.5 w-3.5" />
            Paste
          </button>

          <button
            type="button"
            onClick={handleLoadExample}
            className={buttonClassName}
          >
            Load Example
          </button>

          <button
            type="button"
            onClick={handleClear}
            className={buttonClassName}
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Clear
          </button>
        </div>
      </div>

      <textarea
        id="translator-input"
        value={value}
        onChange={(event) => {
          onChange(event.target.value);

          if (fileName) {
            setFileName("");
          }
        }}
        placeholder="Enter binary, decimal, octal, hexadecimal or text..."
        rows={8}
        maxLength={100000}
        spellCheck={false}
        aria-describedby="translator-input-help"
        className="w-full resize-y rounded-xl border border-input bg-background p-4 font-mono text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      />

      <div
        id="translator-input-help"
        className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground"
      >
        <span>Maximum input length: 100,000 characters</span>

        <span>
          {characterCount.toLocaleString()} characters
        </span>
      </div>

      <FileUpload
        fileName={fileName}
        onFileRead={handleFileRead}
        onRemoveFile={handleRemoveFile}
      />
    </div>
  );
}