
import type { Metadata } from "next";

import { BinaryTranslator } from "@/components/converters/binary-translator/BinaryTranslator";
import BreadcrumbStructuredData from "@/components/seo/BreadcrumbStructuredData";
import { SITE_CONFIG } from "@/lib/constants";

const pageUrl = `${SITE_CONFIG.url}/converters/binary-to-ascii`;

const pageTitle = "Binary to Text Converter - Binary, ASCII & UTF-8";

const pageDescription =
  "Convert binary to text and text to binary online. Convert decimal, octal and hexadecimal values using ASCII, UTF-8 and other character encodings.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: pageUrl,
    siteName: SITE_CONFIG.name,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: pageTitle,
    description: pageDescription,
  },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Binary to Text Converter",
  url: pageUrl,
  description: pageDescription,
  applicationCategory: "UtilitiesApplication",
  browserRequirements: "Requires JavaScript enabled",
};

export default function BinaryToAsciiPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareSchema).replace(/</g, "\\u003c"),
        }}
      />

      <BreadcrumbStructuredData
        items={[
          {
            name: "Home",
            url: SITE_CONFIG.url,
          },
          {
            name: "Converters",
            url: `${SITE_CONFIG.url}/converters`,
          },
          {
            name: "Binary to Text Converter",
            url: pageUrl,
          },
        ]}
      />

      <div className="container-main py-10">
        <BinaryTranslator />
      </div>
    </>
  );
}
