import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/content/site";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
export function Faq() {
  return (
    <section className="section faq-section" aria-labelledby="faq-title">
      <div className="container faq-grid">
        <div className="faq-intro">
          <p className="eyebrow">{site.faq.label}</p>
          <SectionHeading id="faq-title">{site.faq.title}</SectionHeading>
          <p className="section-description">{site.faq.description}</p>
          <Link className="text-link" href="/contact">
            {site.faq.link}
            <ArrowUpRight size={15} />
          </Link>
        </div>
        <Accordion type="single" collapsible className="faq-accordion">
          {site.faq.items.map((item, i) => (
            <AccordionItem value={`faq-${i}`} key={item.question}>
              <AccordionTrigger>
                <span className="mono faq-number">0{i + 1}</span>
                <span>{item.question}</span>
              </AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
