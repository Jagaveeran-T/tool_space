"use client";

import { useRef, useState } from "react";
import { FileUp, X, FileText } from "lucide-react";

interface Props {
  fileName: string;
  onFileRead: (content: string, fileName: string) => void;
  onRemoveFile: () => void;
}

const MAX_FILE_SIZE = 1024 * 1024;
const MAX_INPUT_LENGTH = 100000;

export function FileUpload({
  fileName,
  onFileRead,
  onRemoveFile,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");

  async function handleFile(file?: File) {
    if (!file) return;

    setError("");

    if (file.size > MAX_FILE_SIZE) {
      setError("File size must not exceed 1 MB.");
      return;
    }

    const allowedExtensions = [".txt", ".text"];

    const hasAllowedExtension = allowedExtensions.some(
      (extension) => file.name.toLowerCase().endsWith(extension),
    );

    if (!hasAllowedExtension && file.type !== "text/plain") {
      setError("Please upload a plain text file.");
      return;
    }

    try {
      const content = await file.text();

      if (!content.trim()) {
        setError("The selected file is empty.");
        return;
      }

      if (content.length > MAX_INPUT_LENGTH) {
        setError("File content must not exceed 100,000 characters.");
        return;
      }

      onFileRead(content, file.name);
    } catch {
      setError("Unable to read the selected file.");
    }
  }

  return (
    <div className="space-y-2">
      <input
        ref={inputRef}
        type="file"
        accept=".txt,.text,text/plain"
        className="hidden"
        onChange={(event) => {
          void handleFile(event.target.files?.[0]);
          event.currentTarget.value = "";
        }}
      />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => {
            setError("");
            inputRef.current?.click();
          }}
          className="inline-flex h-9 items-center gap-2 rounded-lg border border-input bg-background px-3 text-xs font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <FileUp className="h-4 w-4" />
          Add File
        </button>

        <span className="text-xs text-muted-foreground">
          TXT files · Maximum 1 MB
        </span>
      </div>

      {fileName && (
        <div className="flex items-center justify-between gap-3 rounded-lg border border-border bg-muted/40 px-3 py-2">
          <div className="flex min-w-0 items-center gap-2">
            <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />

            <span className="truncate text-sm font-medium text-foreground">
              {fileName}
            </span>
          </div>

          <button
            type="button"
            onClick={onRemoveFile}
            aria-label="Remove selected file"
            title="Remove file"
            className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}