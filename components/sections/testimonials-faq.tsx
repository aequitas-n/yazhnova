import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/content/site";
import { SectionLabel } from "@/components/ui/section-label";
import { SectionTitle } from "@/components/ui/section-title";
import { LiveVisual } from "@/components/visuals/live-visual";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export function Proof() {
  if (!site.features.proof) return null;
  const quotes = site.features.testimonials ? site.testimonials.items : [];
  const stats = site.features.verifiedStats ? site.proof.stats : [];
  return (
    <section className="section proof-section ink" aria-labelledby="proof-title">
      <div className="proof-globe" aria-hidden="true">
        <LiveVisual kind="globe" sizes="100vw" />
      </div>
      <div className="container proof-content">
        <SectionLabel number={site.proof.number}>{site.proof.label}</SectionLabel>
        <SectionTitle id="proof-title">
          {site.proof.title}
          <br />
          <em>{site.proof.serif}</em>
        </SectionTitle>
        <p className="section-description">{site.proof.description}</p>
        <dl className="proof-capabilities">
          {site.proof.capabilities.map((item) => (
            <div key={item.label}>
              <dt>{item.label}</dt>
              <dd>{item.detail}</dd>
            </div>
          ))}
        </dl>
        {stats.length > 0 && (
          <dl className="proof-stats">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt>{stat.value}</dt>
                <dd>{stat.label}</dd>
              </div>
            ))}
          </dl>
        )}
        {quotes.length > 0 && (
          <div className="proof-quotes">
            {quotes.map((quote) => (
              <figure key={quote.attribution}>
                <blockquote>{quote.quote}</blockquote>
                <figcaption>{quote.attribution}</figcaption>
              </figure>
            ))}
          </div>
        )}
        <p className="proof-note mono">{site.proof.note}</p>
      </div>
      <span className="globe-interaction mono">{site.proof.interaction}</span>
    </section>
  );
}

export function Faq() {
  return (
    <section className="section faq-section ink" aria-labelledby="faq-title">
      <div className="container">
        <div className="heading-row">
          <div>
            <SectionLabel number={site.faq.number}>{site.faq.label}</SectionLabel>
            <SectionTitle id="faq-title">{site.faq.title}</SectionTitle>
          </div>
          <Link href="/contact" className="text-link">
            {site.faq.link}
            <ArrowUpRight size={16} />
          </Link>
        </div>
        <Accordion type="single" collapsible className="faq-grid">
          {site.faq.items.map((item, index) => (
            <AccordionItem value={"faq-" + index} key={item.question}>
              <AccordionTrigger>
                <span className="faq-number mono">0{index + 1}</span>
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
