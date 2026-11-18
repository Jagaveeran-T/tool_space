import Link from 'next/link';
import { Calculator } from 'lucide-react';

export default function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2"
      aria-label="GetToolSpace homepage"
    >
      <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
        <Calculator size={21} />
      </span>

      <span className="text-xl font-bold tracking-tight text-foreground">
        Get<span className="text-primary">ToolSpace</span>
      </span>
    </Link>
  );
}