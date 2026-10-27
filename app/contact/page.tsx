import { Suspense } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { pageContent, site } from "@/content/site";
import { SiteShell } from "@/components/layout/site-shell";
import { LiveVisual } from "@/components/visuals/live-visual";
import { ContactForm } from "@/components/contact/contact-form";
import { pageMetadata } from "@/lib/page-metadata";
export const metadata = pageMetadata("contact");
export default function ContactPage() {
  const copy = pageContent.contact;
  return (
    <SiteShell>
      <main id="main-content" className="contact-page-v4">
        <section
          className="page-hero contact-hero"
          data-page-hero="contact"
          aria-labelledby="page-title"
        >
          <div className="page-hero-art" aria-hidden="true">
            <LiveVisual kind="ocean" priority sizes="100vw" />
          </div>
          <div className="page-hero-shade" aria-hidden="true" />
          <div className="container contact-layout-v4">
            <div className="contact-heading-v4">
              <p className="eyebrow">{copy.label}</p>
              <h1 id="page-title">
                {copy.title} <em>{copy.serif}</em>
              </h1>
              <p>{copy.description}</p>
            </div>
            <div className="contact-form-panel">
              <Suspense
                fallback={
                  <div className="form-skeleton" aria-busy="true">
                    <h2>{site.contact.formTitle}</h2>
                    <p>{site.contact.formNote}</p>
                  </div>
                }
              >
                <ContactForm />
              </Suspense>
            </div>
          </div>
          <a href="#contact-details" className="page-scroll mono">
            <span>{pageContent.scroll}</span>
            <ArrowDown size={17} />
          </a>
        </section>
        <section id="contact-details" className="section contact-details ink">
          <div className="container">
            <p className="eyebrow">{site.contact.emailLabel}</p>
            <a href={"mailto:" + site.email}>
              {site.email}
              <ArrowUpRight size={28} />
            </a>
            <p>{site.contact.nda}</p>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
