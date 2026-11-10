import type { Metadata } from 'next';
import Script from 'next/script';
import { Geist, Geist_Mono } from 'next/font/google';

import './globals.css';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ThemeProvider from '@/components/providers/ThemeProvider';
import { SITE_CONFIG } from '@/lib/constants';
import StructuredData from '@/components/seo/StructuredData';

// Environment variables
const GA_ID = process.env.NEXT_PUBLIC_GA_ID?.trim();
const ADSENSE_CLIENT =
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT?.trim() ||
  'ca-pub-1257782109778947';

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
    default: `${SITE_CONFIG.name} | Free Online Tools`,
    template: `%s | ${SITE_CONFIG.name}`,
  },

  description: SITE_CONFIG.description,
  applicationName: SITE_CONFIG.name,

  // Verification meta tag: <meta name="google-adsense-account" content="..." />
  other: ADSENSE_CLIENT
    ? {
        'google-adsense-account': ADSENSE_CLIENT,
      }
    : {},

  openGraph: {
    title: `${SITE_CONFIG.name} | Free Online Tools`,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    type: 'website',
  },

  twitter: {
    card: 'summary',
    title: `${SITE_CONFIG.name} | Free Online Tools`,
    description: SITE_CONFIG.description,
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Google AdSense Script */}
        {ADSENSE_CLIENT && (
          <Script
            id="google-adsense"
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}

        {/* Google Analytics 4 */}
        {GA_ID && (
          <>
            <Script
              id="google-tag-manager"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
            >
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
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
        </ThemeProvider>
      </body>
    </html>
  );
}