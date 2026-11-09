
import type { Metadata } from 'next';
import Link from 'next/link';

import { SITE_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Terms and Conditions | ToolSpace',
  description:
    'Read the Terms and Conditions for using ToolSpace online calculators, converters, and other free tools.',
  alternates: {
    canonical: '/terms',
  },
  openGraph: {
    title: 'Terms and Conditions | ToolSpace',
    description:
      'Read the Terms and Conditions for using ToolSpace online tools.',
    url: `${SITE_CONFIG.url}/terms`,
    siteName: SITE_CONFIG.name,
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Terms and Conditions | ToolSpace',
    description:
      'Read the Terms and Conditions for using ToolSpace online tools.',
  },
};

export default function TermsPage() {
  const sectionHeadingClass = 'text-xl font-semibold text-foreground';

  const paragraphClass = 'text-muted-foreground';

  const linkClass =
    'text-primary underline underline-offset-4 hover:opacity-80';

  const contactEmail = SITE_CONFIG.email;

  return (
    <div className="container-main max-w-4xl py-12">
      <article className="space-y-8">
        <header className="space-y-3">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Terms and Conditions
          </h1>

          <p className="text-sm text-muted-foreground">
            Last Updated: November 4, 2026
          </p>

          <p className={paragraphClass}>
            Welcome to ToolSpace. These Terms and Conditions explain
            the rules and guidelines for accessing and using our
            website and its tools. By accessing or using ToolSpace,
            you agree to these terms.
          </p>
        </header>

        <section className="space-y-3">
          <h2 className={sectionHeadingClass}>
            1. Acceptance of Terms
          </h2>

          <p className={paragraphClass}>
            By visiting or using ToolSpace, you acknowledge that
            you have read and understood these Terms and Conditions
            and agree to follow them. If you do not agree with
            these terms, please discontinue using the website.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className={sectionHeadingClass}>
            2. About ToolSpace
          </h2>

          <p className={paragraphClass}>
            ToolSpace provides free online tools, including
            calculators, converters, and other utilities designed
            to help users perform everyday calculations and
            conversions.
          </p>

          <p className={paragraphClass}>
            We may add, modify, suspend, or discontinue any tool
            or website feature at any time, subject to applicable law.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className={sectionHeadingClass}>
            3. Permitted Use
          </h2>

          <p className={paragraphClass}>
            You agree to use ToolSpace only for lawful purposes.
            You must not:
          </p>

          <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
            <li>Use the website for illegal or unauthorized activities.</li>
            <li>Attempt to disrupt or damage the website or its services.</li>
            <li>Attempt unauthorized access to website systems or data.</li>
            <li>Use automated methods to abuse or overload the website.</li>
            <li>Copy, redistribute, or exploit website content in violation of applicable laws.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className={sectionHeadingClass}>
            4. Accuracy of Results
          </h2>

          <p className={paragraphClass}>
            We aim to provide useful and accurate results through
            our tools. However, we do not guarantee that every
            calculation, conversion, or result will always be
            accurate, complete, or error-free.
          </p>

          <p className={paragraphClass}>
            Results should be independently verified before being
            used for important decisions, including financial,
            educational, legal, medical, or professional purposes.
          </p>

          <p className={paragraphClass}>
            ToolSpace should not be considered a substitute for
            professional advice where such advice is necessary.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className={sectionHeadingClass}>
            5. Intellectual Property
          </h2>

          <p className={paragraphClass}>
            Unless otherwise stated, the website design, branding,
            text, graphics, and original content available on
            ToolSpace are owned by or licensed to ToolSpace and
            are protected by applicable intellectual property laws.
          </p>

          <p className={paragraphClass}>
            You may use the tools for personal and lawful purposes.
            You may not reproduce, republish, or commercially
            redistribute our website content without appropriate
            permission or a legal right to do so.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className={sectionHeadingClass}>
            6. Third-Party Services and Links
          </h2>

          <p className={paragraphClass}>
            ToolSpace may contain links to third-party websites
            or use third-party services, including hosting,
            analytics, security, and advertising providers.
          </p>

          <p className={paragraphClass}>
            These third-party services operate under their own
            terms and privacy policies. We do not control and
            are not responsible for the content, availability,
            or independent practices of external websites and
            services.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className={sectionHeadingClass}>
            7. Advertisements
          </h2>

          <p className={paragraphClass}>
            ToolSpace may display advertisements from third-party
            advertising providers, including Google AdSense,
            when advertising services are enabled.
          </p>

          <p className={paragraphClass}>
            Third-party advertising providers may use cookies
            or similar technologies according to their own
            policies and applicable privacy settings and
            consent requirements.
          </p>

          <p className={paragraphClass}>
            The presence of an advertisement does not constitute
            an endorsement or guarantee by ToolSpace of the
            advertised products or services. We are not
            responsible for third-party products, services,
            claims, or transactions.
          </p>

          <p className={paragraphClass}>
            Please review our Privacy Policy for more information
            about cookies and advertising.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className={sectionHeadingClass}>
            8. Disclaimer of Warranties
          </h2>

          <p className={paragraphClass}>
            To the extent permitted by applicable law, ToolSpace
            is provided on an &quot;as is&quot; and &quot;as available&quot; basis,
            without warranties of any kind, whether express
            or implied.
          </p>

          <p className={paragraphClass}>
            We do not guarantee uninterrupted access, error-free
            operation, or that the website will meet every
            user&quot;s requirements.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className={sectionHeadingClass}>
            9. Limitation of Liability
          </h2>

          <p className={paragraphClass}>
            To the extent permitted by applicable law, ToolSpace
            and its operators shall not be liable for indirect,
            incidental, special, or consequential losses arising
            from the use of, or inability to use, the website
            or its tools.
          </p>

          <p className={paragraphClass}>
            Nothing in these terms excludes or limits liability
            that cannot legally be excluded or limited under
            applicable law.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className={sectionHeadingClass}>
            10. Privacy
          </h2>

          <p className={paragraphClass}>
            Your use of ToolSpace is also subject to our
            Privacy Policy, which explains how information
            may be handled when you access our website.
          </p>

          <p>
            <Link href="/privacy-policy" className={linkClass}>
              Read our Privacy Policy
            </Link>
          </p>
        </section>

        <section className="space-y-3">
          <h2 className={sectionHeadingClass}>
            11. Changes to These Terms
          </h2>

          <p className={paragraphClass}>
            We may update these Terms and Conditions from time
            to time to reflect changes to our website, services,
            or applicable legal requirements.
          </p>

          <p className={paragraphClass}>
            Updated terms will be published on this page with
            a revised &quot;Last Updated&quot; date.
          </p>

          <p className={paragraphClass}>
            Your continued use of ToolSpace after updated terms
            are published may be subject to those updated terms,
            to the extent permitted by applicable law.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className={sectionHeadingClass}>
            12. Contact Us
          </h2>

          <p className={paragraphClass}>
            If you have questions about these Terms and Conditions,
            you can contact us at:
          </p>

          <p className={paragraphClass}>
            <strong className="text-foreground">Email:</strong>{' '}
            <a
              href={`mailto:${contactEmail}`}
              className={linkClass}
            >
              {contactEmail}
            </a>
          </p>
        </section>
      </article>
    </div>
  );
}
