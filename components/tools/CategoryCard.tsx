import Link from 'next/link';
import {
  Calculator,
  GraduationCap,
  ArrowLeftRight,
  Code,
  Text,
  FileText,
  ArrowUpRight,
} from 'lucide-react';

import type { Category } from '@/data/categories';

const icons = {
  calculator: Calculator,
  'graduation-cap': GraduationCap,
  'arrow-left-right': ArrowLeftRight,
  code: Code,
  text: Text,
  'file-text': FileText,
};

type Props = {
  category: Category;
};

export default function CategoryCard({ category }: Props) {
  const Icon =
    icons[category.icon as keyof typeof icons] ?? Calculator;

  return (
    <Link
      href={category.slug}
      className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-md hover:shadow-primary/10"
    >
      <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Icon size={23} />
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="font-semibold text-card-foreground">
          {category.name}
        </h3>

        <p className="mt-1 text-sm leading-5 text-muted-foreground">
          {category.description}
        </p>
      </div>

      <ArrowUpRight
        size={18}
        className="shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
      />
    </Link>
  );
}