import type { Metadata } from 'next';
import Script from 'next/script';
import { Geist, Geist_Mono } from 'next/font/google';

import './globals.css';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ThemeProvider from '@/components/providers/ThemeProvider';
import { SITE_CONFIG } from '@/lib/constants';
import StructuredData from '@/components/seo/StructuredData';
import ConsentBanner from '@/components/common/ConsentBanner';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
// Your AdSense publisher ID, e.g. "ca-pub-1234567890123456".
const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),

  verification: {
    google: 'qE712S-6gcMSrwcjyC9sGcryhPvxFuQ_gJPB5YyEOTA',
  },

  title: {
    default: `${SITE_CONFIG.name} - Free Online Tools`,
    template: `%s | ${SITE_CONFIG.name}`,
  },

  description: SITE_CONFIG.description,

  applicationName: SITE_CONFIG.name,

  openGraph: {
    title: `${SITE_CONFIG.name} - Free Online Tools`,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    type: 'website',
  },

  twitter: {
    card: 'summary',
    title: `${SITE_CONFIG.name} - Free Online Tools`,
    description: SITE_CONFIG.description,
  },

  robots: {
    index: true,
    follow: true,
  },

  // Lets Google AdSense verify that you own this site.
  ...(ADSENSE_CLIENT
    ? { other: { 'google-adsense-account': ADSENSE_CLIENT } }
    : {}),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {GA_ID && (
          <>
            {/* Analytics starts in a denied state (Google Consent Mode)
                and is only enabled after the visitor accepts. */}
            <Script id="google-consent-default" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('consent', 'default', {
                  analytics_storage: 'denied',
                  ad_storage: 'denied',
                  ad_user_data: 'denied',
                  ad_personalization: 'denied'
                });
                try {
                  if (window.localStorage.getItem('toolspace-consent') === 'granted') {
                    gtag('consent', 'update', { analytics_storage: 'granted' });
                  }
                } catch (e) {}
              `}
            </Script>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `}
            </Script>
          </>
        )}

        <ThemeProvider>
          <StructuredData />
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          {GA_ID && <ConsentBanner />}
        </ThemeProvider>
      </body>
    </html>
  );
}