"use client";

import { useState } from "react";
import { Check, Copy, Download } from "lucide-react";

interface Props {
  output: string;
  byteCount: number;
  characterCount: number;
}

const buttonClassName =
  "inline-flex h-9 items-center gap-2 rounded-lg border border-input bg-background px-3 text-xs font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

type CopyStatus = {
  /** The output this status belongs to. */
  forOutput: string;
  copied: boolean;
  error: string;
};

export function OutputPanel({
  output,
  byteCount,
  characterCount,
}: Props) {
  const [status, setStatus] = useState<CopyStatus>({
    forOutput: output,
    copied: false,
    error: "",
  });

  // A "Copied" label or copy error only applies to the output it was made
  // for. When the output changes, the status is treated as reset. Deriving
  // this while rendering avoids calling setState inside an effect.
  const isCurrent = status.forOutput === output;
  const copied = isCurrent && status.copied;
  const copyError = isCurrent ? status.error : "";

  async function copyOutput() {
    if (!output) return;

    try {
      await navigator.clipboard.writeText(output);

      setStatus({ forOutput: output, copied: true, error: "" });

      window.setTimeout(() => {
        setStatus((current) =>
          current.forOutput === output
            ? { ...current, copied: false }
            : current,
        );
      }, 1500);
    } catch {
      setStatus({
        forOutput: output,
        copied: false,
        error:
          "Unable to copy. Please select and copy the output manually.",
      });
    }
  }

  function downloadOutput() {
    if (!output) return;

    const blob = new Blob([output], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "toolspace-converted-output.txt";

    document.body.appendChild(link);
    link.click();
    link.remove();

    window.setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 1000);
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-sm font-semibold text-foreground">
          Converted Output
        </h3>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => void copyOutput()}
            disabled={!output}
            className={buttonClassName}
          >
            {copied ? (
              <Check className="h-3.5 w-3.5" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}

            {copied ? "Copied" : "Copy"}
          </button>

          <button
            type="button"
            onClick={downloadOutput}
            disabled={!output}
            className={buttonClassName}
          >
            <Download className="h-3.5 w-3.5" />
            Download
          </button>
        </div>
      </div>

      <div
        aria-live="polite"
        aria-atomic="true"
        className="min-h-48 whitespace-pre-wrap break-all rounded-xl border border-border bg-muted/30 p-4 font-mono text-sm text-foreground"
      >
        {output || (
          <span className="text-muted-foreground">
            Your converted result will appear here.
          </span>
        )}
      </div>

      {copyError && (
        <p role="alert" className="text-sm text-destructive">
          {copyError}
        </p>
      )}

      <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
        <span>
          Bytes: {byteCount.toLocaleString()}
        </span>

        <span>
          Characters: {characterCount.toLocaleString()}
        </span>
      </div>
    </div>
  );
}