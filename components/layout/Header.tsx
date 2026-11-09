import Link from 'next/link';
import { Search } from 'lucide-react';

import Logo from '@/components/common/Logo';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import MobileNavigation from './MobileNavigation';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Calculators', href: '/calculators' },
  { name: 'Converters', href: '/converters' },
  { name: 'Text Tools', href: '/text-tools' },
  { name: 'All Tools', href: '/tools' },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-xl">
      <div className="container-main flex h-16 items-center justify-between gap-4">
        <Logo />

        <nav className="hidden items-center gap-7 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/tools"
            className="hidden items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary sm:flex"
          >
            <Search size={16} />
            Find tools
          </Link>

          <ThemeToggle />

          <div className="md:hidden">
            <MobileNavigation />
          </div>
        </div>
      </div>
    </header>
  );
}