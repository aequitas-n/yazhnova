import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/content/site";
import { SectionLabel } from "@/components/ui/section-label";
import { SectionTitle } from "@/components/ui/section-title";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
export function TestimonialsFaq() {
  return (
    <>
      <section className="section testimonials-section ink" aria-labelledby="testimonials-title">
        <div className="container">
          <div className="heading-row">
            <div>
              <SectionLabel number={site.testimonials.number}>
                {site.testimonials.label}
              </SectionLabel>
              <SectionTitle id="testimonials-title">
                {site.testimonials.title}
                <br />
                <em>{site.testimonials.serif}</em>
              </SectionTitle>
            </div>
            <p className="placeholder-notice">{site.testimonials.notice}</p>
          </div>
          <div className="testimonial-columns">
            {site.testimonials.items.map((item) => (
              <figure key={item.quote}>
                <span className="quote-mark" aria-hidden="true">
                  “
                </span>
                <blockquote>{item.quote}</blockquote>
                <figcaption>{item.attribution}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
      <section className="section faq-section ink" aria-labelledby="faq-title">
        <div className="container faq-layout">
          <div>
            <SectionLabel number={site.faq.number}>{site.faq.label}</SectionLabel>
            <SectionTitle id="faq-title">{site.faq.title}</SectionTitle>
            <Link href="/contact" className="text-link">
              {site.faq.link}
              <ArrowUpRight size={16} />
            </Link>
          </div>
          <Accordion type="single" collapsible>
            {site.faq.items.map((item, i) => (
              <AccordionItem value={`faq-${i}`} key={item.question}>
                <AccordionTrigger>
                  <span className="faq-number mono">0{i + 1}</span>
                  <span>{item.question}</span>
                </AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
}
