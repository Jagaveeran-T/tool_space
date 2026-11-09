
import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Read the ToolSpace Privacy Policy to understand how we handle information, cookies, advertising and user privacy.',
  alternates: {
    canonical: '/privacy-policy',
  },
  openGraph: {
    title: 'Privacy Policy',
    description:
      'Learn how ToolSpace handles information, cookies, advertising and user privacy.',
    url: `${SITE_CONFIG.url}/privacy-policy`,
    siteName: SITE_CONFIG.name,
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Privacy Policy',
    description:
      'Learn how ToolSpace handles information, cookies, advertising and user privacy.',
  },
};

export default function PrivacyPolicyPage() {
  const contactEmail = SITE_CONFIG.email;

  const sectionHeadingClass =
    'mb-3 text-xl font-semibold text-foreground';

  const paragraphClass = 'mt-3';

  const linkClass =
    'text-primary underline underline-offset-4 hover:opacity-80';

  return (
    <div className="container-main max-w-4xl py-16">
      <h1 className="text-3xl font-bold text-foreground">
        Privacy Policy
      </h1>

      <p className="mt-3 text-sm text-muted-foreground">
        Last Updated: November 7, 2026
      </p>

      <div className="mt-8 space-y-8 leading-8 text-muted-foreground">
        <section>
          <h2 className={sectionHeadingClass}>
            1. Introduction
          </h2>

          <p>
            Welcome to ToolSpace. Your privacy is important to us.
            This Privacy Policy explains how information may be
            collected, used, disclosed and protected when you visit
            or use our website.
          </p>

          <p className={paragraphClass}>
            By using ToolSpace, you acknowledge that you have read
            this Privacy Policy. Where applicable, we will obtain
            your consent before processing information that
            requires consent under relevant privacy laws.
          </p>
        </section>

        <section>
          <h2 className={sectionHeadingClass}>
            2. Information We Collect
          </h2>

          <p>
            ToolSpace provides online calculators, converters and
            other useful browser-based tools.
          </p>

          <p className={paragraphClass}>
            The values and information you enter into our calculators
            and converters are designed to be processed directly in
            your browser. Our tools are intended not to send these
            inputs to our servers or store them in a personal
            database.
          </p>

          <p className={paragraphClass}>
            However, certain technical information may be
            automatically processed by our hosting provider or
            other service providers. This may include IP addresses,
            browser type, device information, operating system,
            access times and server request logs.
          </p>

          <p className={paragraphClass}>
            If you contact us, we may collect information such as
            your email address and the contents of your message
            so that we can respond to your request.
          </p>
        </section>

        <section>
          <h2 className={sectionHeadingClass}>
            3. How We Use Information
          </h2>

          <p>
            Information processed through our website and
            third-party services may be used to:
          </p>

          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>Maintain and operate our website.</li>
            <li>Improve website performance and user experience.</li>
            <li>Monitor website security and prevent abuse.</li>
            <li>Respond to user questions and support requests.</li>
            <li>Understand website usage and visitor trends, where analytics are enabled.</li>
            <li>Display and measure advertisements, where advertising services are enabled.</li>
            <li>Comply with applicable legal obligations.</li>
          </ul>
        </section>

        <section>
          <h2 className={sectionHeadingClass}>
            4. Cookies and Similar Technologies
          </h2>

          <p>
            ToolSpace may use cookies and similar technologies
            directly or through third-party services integrated
            into the website.
          </p>

          <p className={paragraphClass}>
            These technologies may support essential website
            functions, remember user preferences, measure website
            traffic and support advertising when advertising
            services are enabled.
          </p>

          <p className={paragraphClass}>
            Third-party providers, including Google when its
            services are enabled, may use cookies or similar
            technologies to process information for analytics,
            advertising measurement and ad personalization,
            depending on applicable settings and user consent.
          </p>

          <p className={paragraphClass}>
            You can manage or disable cookies through your browser
            settings. Where required by applicable law, we will
            provide appropriate consent choices and information
            about how to change or withdraw those choices.
          </p>

          <p className={paragraphClass}>
            Analytics cookies, such as those used by Google Analytics,
            are only enabled after you accept them in the cookie
            banner. If you decline, analytics stays off. To change
            your decision later, clear this site&apos;s cookies and
            site data in your browser; the banner will then appear
            again.
          </p>
        </section>

        <section>
          <h2 className={sectionHeadingClass}>
            5. Google AdSense and Third-Party Advertising
          </h2>

          <p>
            ToolSpace may display advertisements through Google
            AdSense or other third-party advertising providers.
            Advertising services may not be active on the website
            at all times.
          </p>

          <p className={paragraphClass}>
            When advertising services are enabled, third-party
            providers, including Google, may use cookies or similar
            technologies to collect and process information about
            visits to this and other websites. This information
            may be used to provide, personalize, measure and
            improve advertisements, subject to applicable
            privacy settings and consent requirements.
          </p>

          <p className={paragraphClass}>
            Google&apos;s use of advertising information is governed
            by its privacy policies and applicable settings.
            You can learn more here:
          </p>

          <p className={paragraphClass}>
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              Google Privacy Policy
            </a>
          </p>

          <p className={paragraphClass}>
            You can review and manage your Google advertising
            preferences here:
          </p>

          <p className={paragraphClass}>
            <a
              href="https://adssettings.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              Google Ads Settings
            </a>
          </p>

          <p className={paragraphClass}>
            Third-party vendors, including Google, use cookies to
            serve ads based on a visitor&apos;s previous visits to
            this website or other websites. Google&apos;s use of
            advertising cookies enables it and its partners to serve
            ads to visitors based on their visit to this site and
            other sites on the internet.
          </p>

          <p className={paragraphClass}>
            You can opt out of personalized advertising by visiting
            Google Ads Settings (linked above). You can also opt out
            of some third-party vendors&apos; use of cookies for
            personalized advertising by visiting{' '}
            <a
              href="https://www.aboutads.info/choices/"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              aboutads.info
            </a>
            .
          </p>

          <p className={paragraphClass}>
            Where required, ToolSpace will implement appropriate
            consent mechanisms to allow visitors to manage their
            choices regarding cookies, personalized advertising
            and other applicable data processing activities. For
            visitors in the European Economic Area, the United
            Kingdom and Switzerland, this includes a consent message
            that complies with Google&apos;s consent requirements
            before personalized ads are shown.
          </p>
        </section>

        <section>
          <h2 className={sectionHeadingClass}>
            6. Third-Party Services
          </h2>

          <p>
            ToolSpace may use third-party services for website
            hosting, security, analytics, performance monitoring
            and advertising.
          </p>

          <p className={paragraphClass}>
            These providers may process certain information
            according to their own privacy policies and terms.
            We do not control the independent privacy practices
            of third-party providers.
          </p>

          <p className={paragraphClass}>
            Visitors should review the privacy policies of
            relevant third-party services to understand how
            their information is handled.
          </p>
        </section>

        <section>
          <h2 className={sectionHeadingClass}>
            7. Data Security
          </h2>

          <p>
            We take reasonable technical and organizational
            measures to protect information processed through
            our website and services.
          </p>

          <p className={paragraphClass}>
            However, no method of transmitting or storing
            information electronically can be guaranteed
            to be completely secure.
          </p>
        </section>

        <section>
          <h2 className={sectionHeadingClass}>
            8. Children&apos;s Privacy
          </h2>

          <p>
            ToolSpace is intended for a general audience.
            We do not knowingly collect personal information
            directly from children without appropriate
            authorization where required by law.
          </p>

          <p className={paragraphClass}>
            If you believe that a child has provided personal
            information to us, please contact us so that we
            can review the matter and take appropriate action.
          </p>
        </section>

        <section>
          <h2 className={sectionHeadingClass}>
            9. Your Privacy Rights
          </h2>

          <p>
            Depending on your location and applicable privacy
            laws, you may have rights to:
          </p>

          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>Request access to personal information we hold about you.</li>
            <li>Request correction of inaccurate information.</li>
            <li>Request deletion of personal information, where applicable.</li>
            <li>Object to or restrict certain processing activities.</li>
            <li>Withdraw consent where processing is based on consent.</li>
            <li>Exercise applicable choices regarding personalized advertising.</li>
          </ul>

          <p className={paragraphClass}>
            To exercise applicable privacy rights, you may
            contact us using the email address provided below.
          </p>
        </section>

        <section>
          <h2 className={sectionHeadingClass}>
            10. Data Retention
          </h2>

          <p>
            We retain personal information only for as long
            as reasonably necessary for the purposes described
            in this Privacy Policy, unless a longer retention
            period is required or permitted by applicable law.
          </p>
        </section>

        <section>
          <h2 className={sectionHeadingClass}>
            11. Changes to This Privacy Policy
          </h2>

          <p>
            We may update this Privacy Policy from time to time
            to reflect changes in our website, services or
            applicable legal requirements.
          </p>

          <p className={paragraphClass}>
            Any updates will be published on this page with
            a revised Last Updated date.
          </p>
        </section>

        <section>
          <h2 className={sectionHeadingClass}>
            12. Contact Us
          </h2>

          <p>
            If you have questions about this Privacy Policy
            or wish to submit a privacy-related request,
            contact us at:
          </p>

          <p className={paragraphClass}>
            <strong className="text-foreground">
              Website:
            </strong>{' '}
            {SITE_CONFIG.name}
          </p>

          <p className="mt-2">
            <strong className="text-foreground">
              Email:
            </strong>{' '}
            <a
              href={`mailto:${contactEmail}`}
              className={linkClass}
            >
              {contactEmail}
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
