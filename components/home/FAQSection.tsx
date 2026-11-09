import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import { faqs } from '@/data/faqs';

export default function FAQSection() {
  return (
    <section className="container-main py-16">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <p className="mb-2 text-sm font-semibold text-primary">
            FAQ
          </p>

          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            Frequently Asked Questions
          </h2>
        </div>

        <Accordion>
          {faqs.map((faq, index) => (
            <AccordionItem
              key={faq.question}
              value={`item-${index}`}
            >
              <AccordionTrigger className="text-foreground hover:text-primary">
                {faq.question}
              </AccordionTrigger>

              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}