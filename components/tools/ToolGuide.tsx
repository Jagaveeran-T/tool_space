import Link from 'next/link';

export type GuideSection = {
  heading: string;
  paragraphs?: string[];
  formula?: { label: string; text: string };
  example?: { title: string; lines: string[] };
  list?: string[];
  table?: { caption: string; headers: string[]; rows: string[][] };
};

export type GuideFaq = {
  question: string;
  answer: string;
};

export type GuideLink = {
  href: string;
  label: string;
};

type ToolGuideProps = {
  /** Unique per page. Used for the heading id. */
  id: string;
  title: string;
  intro?: string;
  sections: GuideSection[];
  faqs?: GuideFaq[];
  note?: string;
  related?: GuideLink[];
};

/**
 * The written guide shown under a tool: what it does, the formulas it
 * uses, worked examples and a FAQ. Every tool page should include one so
 * the page has useful content, not only a form.
 */
export default function ToolGuide({
  id,
  title,
  intro,
  sections,
  faqs,
  note,
  related,
}: ToolGuideProps) {
  const headingId = `${id}-guide`;

  return (
    <section aria-labelledby={headingId} className="mt-12 space-y-8">
      <div>
        <h2
          id={headingId}
          className="text-2xl font-semibold tracking-tight text-foreground"
        >
          {title}
        </h2>

        {intro && (
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {intro}
          </p>
        )}
      </div>

      <div className="space-y-8">
        {sections.map((section) => (
          <article key={section.heading} className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground">
              {section.heading}
            </h3>

            {section.paragraphs?.map((paragraph) => (
              <p
                key={paragraph}
                className="max-w-3xl text-sm leading-6 text-muted-foreground"
              >
                {paragraph}
              </p>
            ))}

            {section.formula && (
              <div className="rounded-lg border border-border bg-muted/40 p-4">
                <p className="text-sm font-medium text-foreground">
                  {section.formula.label}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {section.formula.text}
                </p>
              </div>
            )}

            {section.example && (
              <div className="rounded-lg border border-border bg-card p-4 text-sm text-foreground">
                <p className="font-medium">{section.example.title}</p>
                <div className="mt-2 space-y-1 text-muted-foreground">
                  {section.example.lines.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </div>
            )}

            {section.list && (
              <ul className="max-w-3xl list-disc space-y-1.5 pl-5 text-sm leading-6 text-muted-foreground">
                {section.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}

            {section.table && (
              <div className="overflow-x-auto rounded-lg border border-border">
                <table className="w-full min-w-[320px] text-left text-sm">
                  <caption className="sr-only">
                    {section.table.caption}
                  </caption>
                  <thead className="bg-muted/40 text-foreground">
                    <tr>
                      {section.table.headers.map((header) => (
                        <th
                          key={header}
                          scope="col"
                          className="px-3 py-2 font-medium"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border text-muted-foreground">
                    {section.table.rows.map((row) => (
                      <tr key={row.join('|')}>
                        {row.map((cell, index) => (
                          <td
                            key={`${row[0]}-${index}`}
                            className="px-3 py-2 tabular-nums"
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </article>
        ))}
      </div>

      {faqs && faqs.length > 0 && (
        <article className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">
            Frequently Asked Questions
          </h3>

          <div className="divide-y divide-border">
            {faqs.map((faq) => (
              <div key={faq.question} className="py-4 first:pt-0 last:pb-0">
                <h4 className="font-semibold text-foreground">
                  {faq.question}
                </h4>
                <p className="mt-1 max-w-3xl text-sm leading-6 text-muted-foreground">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </article>
      )}

      {note && (
        <div className="rounded-lg border border-border bg-card p-4">
          <h3 className="font-semibold text-foreground">Important Note</h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {note}
          </p>
        </div>
      )}

      {related && related.length > 0 && (
        <article className="space-y-3">
          <h3 className="text-xl font-semibold text-foreground">
            Explore More Free Tools
          </h3>

          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {related.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-primary underline-offset-4 hover:underline"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </article>
      )}
    </section>
  );
}
