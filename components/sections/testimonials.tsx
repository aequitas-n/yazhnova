import { Quote } from "lucide-react";
import { site } from "@/content/site";
import { SectionHeading } from "@/components/ui/section-heading";
function QuoteRow({
  row,
  duplicate = false,
}: {
  row: typeof site.testimonials.items;
  duplicate?: boolean;
}) {
  return (
    <div className="quote-row" aria-hidden={duplicate || undefined}>
      {row.map((item) => (
        <figure key={item.initials} className="testimonial-card">
          <div className="quote-top">
            <Quote size={19} />
            <span className="mono">{site.testimonials.placeholder}</span>
          </div>
          <blockquote>“{item.quote}”</blockquote>
          <figcaption>
            <span className="quote-avatar mono">{item.initials}</span>
            <span>{item.role}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
export function Testimonials() {
  const first = site.testimonials.items.slice(0, 3),
    second = site.testimonials.items.slice(3);
  return (
    <section className="section testimonials-section" aria-labelledby="testimonials-title">
      <div className="container center-heading">
        <p className="eyebrow">{site.testimonials.label}</p>
        <SectionHeading id="testimonials-title">{site.testimonials.title}</SectionHeading>
        <p className="todo-note">{site.testimonials.notice}</p>
      </div>
      <div className="quotes-marquee">
        <div className="quotes-track">
          <QuoteRow row={first} />
          <QuoteRow row={first} duplicate />
        </div>
        <div className="quotes-track quotes-reverse">
          <QuoteRow row={second} />
          <QuoteRow row={second} duplicate />
        </div>
      </div>
    </section>
  );
}
