
import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Contact Us | ToolSpace',
  description:
    'Contact ToolSpace for questions, feedback, suggestions, or issues related to our free online calculators and converters.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact Us | ToolSpace',
    description:
      'Get in touch with ToolSpace for questions, feedback, and suggestions.',
    url: `${SITE_CONFIG.url}/contact`,
    siteName: SITE_CONFIG.name,
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Contact Us | ToolSpace',
    description:
      'Contact ToolSpace for questions, feedback, and suggestions.',
  },
};

export default function ContactPage() {
  const contactEmail = SITE_CONFIG.email;

  return (
    <div className="container-main max-w-4xl py-12">
      <article className="space-y-8">
        <header className="space-y-3">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Contact Us
          </h1>

          <p className="text-muted-foreground">
            We would love to hear from you. If you have questions, feedback,
            suggestions, or encounter any issues while using ToolSpace,
            feel free to contact us.
          </p>
        </header>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">
            Get in Touch
          </h2>

          <p className="text-foreground">
            You can contact us through the email address below. We will do
            our best to respond to your message.
          </p>

          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="text-lg font-semibold text-foreground">
              Email Support
            </h3>

            <p className="mt-2 text-muted-foreground">
              For general questions, feedback, or technical issues:
            </p>

            <a
              href={`mailto:${contactEmail}`}
              className="mt-3 inline-block break-all font-medium text-primary underline-offset-4 hover:underline"
            >
              {contactEmail}
            </a>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">
            What Can You Contact Us About?
          </h2>

          <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
            <li>Report an issue with a calculator or converter.</li>
            <li>Share suggestions for new tools or features.</li>
            <li>Report incorrect results or unexpected behavior.</li>
            <li>Ask questions about our website and services.</li>
            <li>Share general feedback about your experience.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">
            Privacy
          </h2>

          <p className="text-muted-foreground">
            If you contact us, please avoid including sensitive personal
            information in your message. To learn how we handle information,
            read our{' '}
            <Link
              href="/privacy-policy"
              className="font-medium text-primary hover:underline"
            >
              Privacy Policy
            </Link>.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">
            Our Commitment
          </h2>

          <p className="text-muted-foreground">
            We value your feedback and continuously work to improve
            ToolSpace. Your suggestions help us make our tools more useful
            and accessible.
          </p>
        </section>
      </article>
    </div>
  );
}
