import Link from 'next/link';
import Logo from '@/components/common/Logo';
import ScrollToTopLink from '@/components/common/ScrollToTopLink';

const mainLinks = [
  { name: 'Home', href: '/' },
  { name: 'All Tools', href: '/tools' },
  { name: 'About Us', href: '/about' },
  { name: 'Contact Us', href: '/contact' },
];

const legalLinks = [
  { name: 'Privacy Policy', href: '/privacy-policy' },
  { name: 'Terms & Conditions', href: '/terms' },
  { name: 'Disclaimer', href: '/disclaimer' },
];

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-muted/40">
      <div className="container-main py-12">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
          <div className="space-y-4">
            <Logo />

            <p className="max-w-md text-sm leading-7 text-muted-foreground">
              Simple, fast and free online calculators,
              converters and useful tools for everyday tasks.
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-foreground">
              Quick Links
            </h3>

            <div className="grid grid-cols-2 gap-3">
              {mainLinks.map((link) =>
                link.href === '/' ? (
                  <ScrollToTopLink
                    key={link.href}
                    href="/"
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.name}
                  </ScrollToTopLink>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.name}
                  </Link>
                )
              )}
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-foreground">
              Legal
            </h3>

            <div className="flex flex-col gap-3">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} ToolSpace. All rights reserved.
        </div>
      </div>
    </footer>
  );
}