import Link from 'next/link';

import { getLatestArticles } from '@/data/articles';

/**
 * Plain, honest text for the home page, plus links to the latest guides.
 * Keep every statement here true. Update it when the site changes.
 */
export default function SiteIntro() {
  const latest = getLatestArticles(3);

  return (
    <section
      aria-labelledby="site-intro-heading"
      className="container-main max-w-4xl py-12"
    >
      <h2
        id="site-intro-heading"
        className="text-2xl font-semibold tracking-tight text-foreground"
      >
        How GetToolSpace works
      </h2>

      <div className="mt-4 space-y-4 leading-7 text-muted-foreground">
        <p>
          GetToolSpace is a small, focused set of free calculators,
          converters and text tools. Each tool does one job and comes with
          a written guide that shows the formula, a worked example and the
          mistakes people commonly make, so you can check the result
          rather than just trust it.
        </p>
        <p>
          Everything runs in your browser. The numbers and text you enter
          are processed on your own device and are not sent to our server.
          The calculation code is covered by automated tests, and results
          are meant for general use. For anything official, such as a
          grade or a legal deadline, confirm it with the organisation
          concerned.
        </p>
      </div>

      {latest.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-foreground">
            Latest guides
          </h3>
          <ul className="mt-3 space-y-2">
            {latest.map((article) => (
              <li key={article.slug}>
                <Link
                  href={`/guides/${article.slug}`}
                  className="font-medium text-primary hover:underline"
                >
                  {article.title}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm">
            <Link
              href="/guides"
              className="text-primary hover:underline"
            >
              Browse all guides →
            </Link>
          </p>
        </div>
      )}
    </section>
  );
}