import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, ShieldCheck } from "lucide-react";
import { site } from "@/content/site";
import { SiteShell } from "@/components/layout/site-shell";
import { LiveVisual } from "@/components/visuals/live-visual";
import { ContactForm } from "@/components/contact/contact-form";
import { FluidField, LightBloom, CloudSky03 } from "@/components/slots";
export const metadata: Metadata = {
  title: "Start a project",
  description: site.contact.description,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Start a project | Yazhnova",
    url: "/contact",
    description: site.contact.description,
  },
};
export default function ContactPage() {
  return (
    <SiteShell>
      <main id="main-content" className="contact-page">
        <FluidField />
        <LightBloom />
        <CloudSky03 />
        <div className="contact-water" aria-hidden="true">
          <LiveVisual kind="ocean" className="monochrome" />
        </div>
        <div className="container contact-layout">
          <div className="contact-intro">
            <Link className="contact-back" href="/">
              <ArrowLeft size={13} />
              {site.actions.back}
            </Link>
            <p className="eyebrow">{site.contact.label}</p>
            <h1>
              {site.contact.title}
              <br />
              <em>{site.contact.serif}</em>
            </h1>
            <p className="section-description">{site.contact.description}</p>
            <div className="contact-email">
              <p className="eyebrow">{site.contact.emailLabel}</p>
              <a href={`mailto:${site.email}`}>
                {site.email}
                <ArrowUpRight size={20} />
              </a>
            </div>
            <p className="contact-nda">
              <ShieldCheck size={15} />
              {site.contact.nda}
            </p>
          </div>
          <div className="contact-form-panel">
            <Suspense
              fallback={
                <div className="form-skeleton" aria-busy="true">
                  <h2>{site.contact.formTitle}</h2>
                  <p className="form-note">{site.contact.formNote}</p>
                </div>
              }
            >
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </main>
    </SiteShell>
  );
}
