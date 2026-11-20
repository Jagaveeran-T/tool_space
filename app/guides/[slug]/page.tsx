import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import BreadcrumbStructuredData from '@/components/seo/BreadcrumbStructuredData';
import {
  articles,
  getArticleBySlug,
  getReadingMinutes,
} from '@/data/articles';
import { getToolById } from '@/data/tools';
import { SITE_CONFIG } from '@/lib/constants';

// Static export: only the slugs returned below exist.
export const dynamicParams = false;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {};
  }

  const url = `${SITE_CONFIG.url}/guides/${article.slug}`;

  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/guides/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.description,
      url,
      siteName: SITE_CONFIG.name,
      type: 'article',
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
    },
    twitter: {
      card: 'summary',
      title: article.title,
      description: article.description,
    },
  };
}

function formatDate(value: string) {
  return new Date(`${value}T00:00:00Z`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

export default async function GuidePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const url = `${SITE_CONFIG.url}/guides/${article.slug}`;
  const authorName = SITE_CONFIG.owner.name || SITE_CONFIG.name;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    mainEntityOfPage: url,
    author: {
      '@type': SITE_CONFIG.owner.name ? 'Person' : 'Organization',
      name: authorName,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
  };

  const relatedTools = article.relatedToolIds
    .map((id) => getToolById(id))
    .filter((tool) => tool !== undefined);

  return (
    <>
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: SITE_CONFIG.url },
          { name: 'Guides', url: `${SITE_CONFIG.url}/guides` },
          { name: article.title, url },
        ]}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="container-main max-w-3xl py-12 sm:py-16">
        <article className="space-y-10">
          <header className="space-y-4">
            <p className="text-sm">
              <Link
                href="/guides"
                className="font-medium text-primary hover:underline"
              >
                ← All guides
              </Link>
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {article.title}
            </h1>

            <p className="text-xs text-muted-foreground">
              By {authorName} · Published {formatDate(article.publishedAt)}
              {article.updatedAt !== article.publishedAt &&
                ` · Updated ${formatDate(article.updatedAt)}`}{' '}
              · {getReadingMinutes(article)} min read
            </p>

            <p className="text-lg leading-8 text-muted-foreground">
              {article.intro}
            </p>
          </header>

          {article.sections.map((section) => (
            <section key={section.heading} className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                {section.heading}
              </h2>

              {section.paragraphs?.map((paragraph, index) => (
                <p
                  key={index}
                  className="leading-8 text-muted-foreground"
                >
                  {paragraph}
                </p>
              ))}

              {section.table && (
                <div className="overflow-x-auto rounded-lg border border-border">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-muted/50 text-foreground">
                      <tr>
                        {section.table.headers.map((header) => (
                          <th
                            key={header}
                            scope="col"
                            className="px-4 py-2 font-semibold"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="text-muted-foreground">
                      {section.table.rows.map((row) => (
                        <tr
                          key={row.join('|')}
                          className="border-t border-border"
                        >
                          {row.map((cell, index) => (
                            <td key={index} className="px-4 py-2">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {section.list && (
                <ul className="list-disc space-y-2 pl-6 leading-7 text-muted-foreground">
                  {section.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          {relatedTools.length > 0 && (
            <section className="space-y-4 rounded-xl border border-border bg-card p-6">
              <h2 className="text-xl font-semibold text-foreground">
                Try it yourself
              </h2>
              <ul className="space-y-2">
                {relatedTools.map((tool) => (
                  <li key={tool.id}>
                    <Link
                      href={tool.slug}
                      className="font-medium text-primary hover:underline"
                    >
                      {tool.name} →
                    </Link>
                    <span className="block text-sm text-muted-foreground">
                      {tool.description}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </article>
      </div>
    </>
  );
}