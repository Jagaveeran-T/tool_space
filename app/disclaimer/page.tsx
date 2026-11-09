
import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Disclaimer | ToolSpace',
  description:
    'Read the ToolSpace disclaimer regarding the accuracy, reliability and use of our online calculators, converters and tools.',
  alternates: {
    canonical: `${SITE_CONFIG.url}/disclaimer`,
  },
  openGraph: {
    title: 'Disclaimer | ToolSpace',
    description:
      'Important information about using ToolSpace calculators, converters and online tools.',
    url: `${SITE_CONFIG.url}/disclaimer`,
    siteName: SITE_CONFIG.name,
    type: 'website',
  },
};

export default function DisclaimerPage() {
  const sectionHeadingClass =
    'mb-3 text-xl font-semibold text-foreground';

  const paragraphClass = 'text-muted-foreground';

  return (
    <div className="container-main max-w-4xl py-12">
      <div className="mb-10">
        <h1 className="mb-3 text-3xl font-bold text-foreground">
          Disclaimer
        </h1>

        <p className="text-sm text-muted-foreground">
          Last Updated: November 4, 2026
        </p>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className={sectionHeadingClass}>
            1. General Information
          </h2>

          <p className={paragraphClass}>
            The information and tools available on ToolSpace are provided
            for general informational and educational purposes only.
            We offer online calculators, converters and other utilities
            to help users perform everyday tasks.
          </p>
        </section>

        <section>
          <h2 className={sectionHeadingClass}>
            2. Accuracy of Results
          </h2>

          <p className={paragraphClass}>
            We make reasonable efforts to ensure that our tools produce
            accurate results. However, we do not guarantee that all
            calculations, conversions or other outputs will always be
            accurate, complete or error-free.
          </p>

          <p className={`mt-3 ${paragraphClass}`}>
            Results may depend on the information entered by users,
            calculation methods and other factors. Please independently
            verify important results before relying on them.
          </p>
        </section>

        <section>
          <h2 className={sectionHeadingClass}>
            3. No Professional Advice
          </h2>

          <p className={paragraphClass}>
            ToolSpace does not provide professional, legal, financial,
            medical or other specialist advice. Our tools and information
            should not replace advice from qualified professionals.
          </p>

          <p className={`mt-3 ${paragraphClass}`}>
            Always consult an appropriate professional before making
            important decisions based on information or results obtained
            from this website.
          </p>
        </section>

        <section>
          <h2 className={sectionHeadingClass}>
            4. User Responsibility
          </h2>

          <p className={paragraphClass}>
            You are responsible for how you use the tools and information
            available on ToolSpace. You should check the inputs and verify
            important outputs before using them for personal, academic,
            business or professional purposes.
          </p>
        </section>

        <section>
          <h2 className={sectionHeadingClass}>
            5. External Links
          </h2>

          <p className={paragraphClass}>
            ToolSpace may contain links to third-party websites or services.
            These links are provided for convenience. We do not control
            or guarantee the accuracy, availability or content of external
            websites.
          </p>
        </section>

        <section>
          <h2 className={sectionHeadingClass}>
            6. Advertising
          </h2>

          <p className={paragraphClass}>
            ToolSpace may display advertisements provided by third-party
            advertising services, including Google AdSense, when enabled.
            Advertisements and their linked websites are managed by their
            respective providers.
          </p>

          <p className={`mt-3 ${paragraphClass}`}>
            The appearance of an advertisement does not mean that ToolSpace
            endorses or guarantees the advertised product or service.
          </p>
        </section>

        <section>
          <h2 className={sectionHeadingClass}>
            7. Limitation of Liability
          </h2>

          <p className={paragraphClass}>
            To the extent permitted by applicable law, ToolSpace and its
            operators shall not be liable for losses or damages arising
            from the use of, inability to use, or reliance on the website,
            its tools or their results.
          </p>

          <p className={`mt-3 ${paragraphClass}`}>
            Nothing in this disclaimer excludes liability that cannot
            legally be excluded under applicable law.
          </p>
        </section>

        <section>
          <h2 className={sectionHeadingClass}>
            8. Changes to This Disclaimer
          </h2>

          <p className={paragraphClass}>
            We may update this disclaimer from time to time. Any changes
            will be published on this page with an updated revision date.
          </p>
        </section>

        <section>
          <h2 className={sectionHeadingClass}>
            9. Contact Us
          </h2>

          <p className={paragraphClass}>
            If you have questions about this disclaimer, please contact us
            through our{' '}
            <Link
              href="/contact"
              className="font-medium text-primary hover:underline"
            >
              Contact Us
            </Link>{' '}
            page.
          </p>
        </section>
      </div>
    </div>
  );
}
