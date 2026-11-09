import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { getPopularTools } from '@/data/tools';
import ToolGrid from '@/components/tools/ToolGrid';

export default function PopularTools() {
  const popularTools = getPopularTools();

  return (
    <section className="container-main py-16">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-sm font-semibold text-primary">
            QUICK ACCESS
          </p>

          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Popular Tools
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Explore our most useful online tools.
          </p>
        </div>

        <Link
          href="/tools"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
        >
          View All
          <ArrowRight size={16} />
        </Link>
      </div>

      <ToolGrid tools={popularTools} />
    </section>
  );
}