import Link from 'next/link';
import {
  ArrowUpRight,
  Binary,
  CalendarDays,
  Calculator,
  Code,
  GraduationCap,
  Text,
  ArrowLeftRight,
  FileText,
} from 'lucide-react';

import type { Tool } from '@/data/tools';

const iconMap = {
  'calendar-days': CalendarDays,
  'graduation-cap': GraduationCap,
  binary: Binary,
  calculator: Calculator,
  code: Code,
  text: Text,
  'arrow-left-right': ArrowLeftRight,
  'file-text': FileText,
};

type Props = {
  tool: Tool;
};

export default function ToolCard({ tool }: Props) {
  const Icon =
    iconMap[tool.icon as keyof typeof iconMap] ?? Calculator;

  return (
    <Link
      href={tool.slug}
      className="group flex h-full flex-col rounded-2xl border border-border bg-card p-5 transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10"
    >
      <div className="mb-5 flex items-start justify-between">
        <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon size={23} />
        </div>

        <ArrowUpRight
          size={19}
          className="text-muted-foreground transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary"
        />
      </div>

      <h3 className="font-semibold text-card-foreground">
        {tool.name}
      </h3>

      <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">
        {tool.description}
      </p>

      <span className="mt-5 text-sm font-semibold text-primary">
        Use Tool →
      </span>
    </Link>
  );
}