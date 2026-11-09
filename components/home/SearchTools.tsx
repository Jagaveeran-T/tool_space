'use client';

import { useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
import { tools } from '@/data/tools';
import ToolCard from '@/components/tools/ToolCard';

export default function SearchTools() {
  const [query, setQuery] = useState('');

  const filteredTools = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return [];
    }

    return tools.filter((tool) => {
      const searchableText = [
        tool.name,
        tool.category,
        tool.description,
        ...tool.keywords,
      ]
        .join(' ')
        .toLowerCase();

      return (
        tool.status === 'active' &&
        searchableText.includes(normalizedQuery)
      );
    });
  }, [query]);

  return (
    <section className="container-main relative z-20 -mt-5">
      <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-card p-3 shadow-xl shadow-primary/5">
        <div className="flex items-center gap-3 px-3">
          <Search className="shrink-0 text-muted-foreground" size={21} />

          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search calculators, converters and tools..."
            className="h-12 w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
            aria-label="Search tools"
          />

          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label="Clear search"
              className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {query.trim() && (
          <div className="mt-3 border-t border-border pt-4">
            {filteredTools.length > 0 ? (
              <>
                <p className="mb-3 px-2 text-xs text-muted-foreground">
                  {filteredTools.length} tools found
                </p>

                <div className="grid gap-3 sm:grid-cols-2">
                  {filteredTools.map((tool) => (
                    <ToolCard key={tool.id} tool={tool} />
                  ))}
                </div>
              </>
            ) : (
              <p className="p-4 text-center text-sm text-muted-foreground">
                No matching tools found.
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}