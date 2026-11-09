
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { Search, Sparkles } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background py-20 md:py-28">
      <div className="container-main relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-primary">
            <Sparkles size={14} />
            SIMPLE · FAST · FREE ONLINE TOOLS
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Everything you need,
            <span className="block text-primary">
              in one place.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
            Discover free online calculators, converters
            and useful tools designed to make everyday
            tasks easier.
          </p>

          <div className="mx-auto mt-9 flex max-w-xl flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/tools"
              className={buttonVariants({ size: 'lg' })}
            >
              Explore Tools
            </Link>

            <Link
              href="/calculators"
              className={buttonVariants({
                variant: 'outline',
                size: 'lg',
              })}
            >
              <Search size={17} />
              Explore Calculators
            </Link>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute -right-20 -top-20 size-80 rounded-full bg-indigo-200/30 blur-3xl dark:bg-indigo-700/10" />

      <div className="pointer-events-none absolute -bottom-20 -left-20 size-80 rounded-full bg-purple-200/30 blur-3xl dark:bg-purple-700/10" />
    </section>
  );
}
