
import type { Metadata } from "next";

import GradeCalculator from "@/components/calculators/grade-calculator/GradeCalculator";
import BreadcrumbStructuredData from "@/components/seo/BreadcrumbStructuredData";
import { SITE_CONFIG } from "@/lib/constants";

const pageTitle = "Grade Calculator - Weighted Grades, Final Exam & GPA";

const pageDescription =
  "Calculate weighted grades, plan your final grade, find the exam score you need, and calculate your GPA with this free online grade calculator.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,

  alternates: {
    canonical: "/calculators/grade-calculator",
  },

  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: `${SITE_CONFIG.url}/calculators/grade-calculator`,
    siteName: SITE_CONFIG.name,
    type: "website",
  },

  twitter: {
    card: "summary",
    title: pageTitle,
    description: pageDescription,
  },
};

export default function GradeCalculatorPage() {
  return (
    <>
      <BreadcrumbStructuredData
        items={[
          {
            name: "Home",
            url: SITE_CONFIG.url,
          },
          {
            name: "Calculators",
            url: `${SITE_CONFIG.url}/calculators`,
          },
          {
            name: "Grade Calculator",
            url: `${SITE_CONFIG.url}/calculators/grade-calculator`,
          },
        ]}
      />

      <div className="container-main py-8">
        <GradeCalculator />
      </div>
    </>
  );
}
