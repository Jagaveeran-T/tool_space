'use client';

import { useId, useMemo, useState } from 'react';

import {
  analyzeText,
  formatDuration,
} from '@/lib/text-tools/word-counter';

type StatProps = {
  label: string;
  value: string;
};

function Stat({ label, value }: StatProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-3">
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="mt-1 text-2xl font-semibold tabular-nums text-foreground">
        {value}
      </dd>
    </div>
  );
}

function formatCount(value: number): string {
  return value.toLocaleString('en-US');
}

export default function WordCounter() {
  const [text, setText] = useState('');
  const textId = useId();

  const stats = useMemo(() => analyzeText(text), [text]);

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <section className="space-y-3 rounded-xl border border-border bg-card p-4 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <label
            htmlFor={textId}
            className="text-sm font-medium text-foreground"
          >
            Your text
          </label>

          <button
            type="button"
            onClick={() => setText('')}
            disabled={text === ''}
            className="rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          >
            Clear text
          </button>
        </div>

        <textarea
          id={textId}
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Type or paste your text here…"
          spellCheck
          className="min-h-56 w-full resize-y rounded-lg border border-input bg-background p-3 text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />

        <p className="text-xs text-muted-foreground">
          Your text stays in your browser. It is not uploaded or saved.
        </p>
      </section>

      <section aria-label="Text statistics">
        <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          <Stat label="Words" value={formatCount(stats.words)} />
          <Stat label="Characters" value={formatCount(stats.characters)} />
          <Stat
            label="Characters (no spaces)"
            value={formatCount(stats.charactersWithoutSpaces)}
          />
          <Stat label="Sentences" value={formatCount(stats.sentences)} />
          <Stat label="Paragraphs" value={formatCount(stats.paragraphs)} />
          <Stat
            label="Reading time"
            value={formatDuration(stats.readingTimeSeconds)}
          />
          <Stat
            label="Speaking time"
            value={formatDuration(stats.speakingTimeSeconds)}
          />
        </dl>
      </section>

      <section
        aria-label="Most used words"
        className="rounded-xl border border-border bg-card p-4 sm:p-6"
      >
        <h2 className="text-base font-semibold text-foreground">
          Most used words
        </h2>

        {stats.topWords.length > 0 ? (
          <ul className="mt-3 flex flex-wrap gap-2">
            {stats.topWords.map((item) => (
              <li
                key={item.word}
                className="rounded-full border border-border bg-background px-3 py-1 text-sm text-foreground"
              >
                {item.word}{' '}
                <span className="text-muted-foreground">× {item.count}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-2 text-sm text-muted-foreground">
            Words that appear more than once will be listed here. Common
            words such as &quot;the&quot; and &quot;and&quot; are ignored.
          </p>
        )}
      </section>
    </div>
  );
}
