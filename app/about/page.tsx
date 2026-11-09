
import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'About Us | ToolSpace',
  description:
    'Learn about ToolSpace, a free online platform offering useful calculators, converters, and everyday tools designed to make common tasks easier.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About Us | ToolSpace',
    description:
      'Learn about ToolSpace and our collection of free online calculators, converters, and useful everyday tools.',
    url: `${SITE_CONFIG.url}/about`,
    siteName: SITE_CONFIG.name,
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'About Us | ToolSpace',
    description:
      'Discover free online calculators, converters, and useful tools at ToolSpace.',
  },
};

export default function AboutPage() {
  return (
    <div className="container-main max-w-4xl py-16">
      <article className="space-y-10">
        <header className="space-y-4">
          <h1 className="text-3xl font-bold text-foreground">
            About ToolSpace
          </h1>

          <p className="text-lg leading-8 text-muted-foreground">
            ToolSpace is a collection of free online calculators,
            converters, and useful tools designed to make everyday
            tasks simpler, faster, and more convenient.
          </p>
        </header>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">
            What We Do
          </h2>

          <p className="leading-8 text-muted-foreground">
            We provide easy-to-use online tools that help users
            perform common calculations and data conversions
            without installing additional software.
          </p>

          <p className="leading-8 text-muted-foreground">
            Our goal is to make useful digital tools accessible
            through a simple interface that works across
            different devices and screen sizes.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">
            Our Tools
          </h2>

          <p className="leading-8 text-muted-foreground">
            ToolSpace currently offers tools across different
            categories, including:
          </p>

          <ul className="list-disc space-y-3 pl-6 leading-7 text-muted-foreground">
            <li>
              <strong className="text-foreground">
                Calculators:
              </strong>{' '}
              Calculate age, grades and GPA, percentages, and the
              time between two dates.
            </li>

            <li>
              <strong className="text-foreground">
                Converters:
              </strong>{' '}
              Convert binary values into readable ASCII text.
            </li>

            <li>
              <strong className="text-foreground">
                Text Tools:
              </strong>{' '}
              Count words, characters, sentences and paragraphs, and
              estimate reading time.
            </li>
          </ul>

          <p>
            <Link
              href="/tools"
              className="font-medium text-primary transition-colors hover:underline"
            >
              Explore all available tools →
            </Link>
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">
            Our Approach
          </h2>

          <p className="leading-8 text-muted-foreground">
            We focus on creating tools that are straightforward
            to use, easy to understand, and accessible to everyone.
            We aim to provide clear results and continuously
            improve the functionality and usability of our website.
          </p>

          <p className="leading-8 text-muted-foreground">
            Our tools are designed to process user-provided inputs
            directly in the browser rather than sending those
            inputs to our application server.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">
            How We Check Our Tools
          </h2>

          <p className="leading-8 text-muted-foreground">
            Every tool page explains the formulas it uses and shows
            worked examples, so you can see how a result was reached
            and check it yourself. The calculation logic behind our
            calculators and converters is covered by automated tests
            that we run whenever we make changes.
          </p>

          <p className="leading-8 text-muted-foreground">
            If you ever find a result that looks wrong, please tell
            us through the contact page and we will investigate.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">
            Our Commitment
          </h2>

          <p className="leading-8 text-muted-foreground">
            We work to keep ToolSpace useful, accessible, and
            reliable. We welcome feedback and suggestions that
            help us improve our tools and provide a better
            experience for visitors.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">
            Get in Touch
          </h2>

          <p className="leading-8 text-muted-foreground">
            Have a suggestion, question, or encountered an issue
            with one of our tools? We would be happy to hear from you.
          </p>

          <Link
            href="/contact"
            className="inline-block rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Contact Us
          </Link>
        </section>
      </article>
    </div>
  );
}
