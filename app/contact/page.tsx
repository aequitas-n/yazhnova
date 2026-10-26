import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, ShieldCheck } from "lucide-react";
import { site } from "@/content/site";
import { Ambient } from "@/components/effects/ambient";
import { ContactForm } from "@/components/contact/contact-form";
export const metadata: Metadata = {
  title: "Start a project",
  description: site.contact.description,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Start a project | Yazhnova",
    description: site.contact.description,
    url: "/contact",
  },
};
export default function Contact() {
  return (
    <main id="main-content" className="contact-page">
      <Ambient mode="fluid" />
      <div className="container contact-layout">
        <div className="contact-intro">
          <Link href="/" className="contact-back">
            <ArrowLeft size={13} />
            {site.actions.back}
          </Link>
          <p className="eyebrow">{site.contact.label}</p>
          <h1>{site.contact.title}</h1>
          <p className="contact-description">{site.contact.description}</p>
          <div className="contact-email">
            <p className="eyebrow">{site.contact.emailLabel}</p>
            <a href={`mailto:${site.email}`}>
              {site.email}
              <ArrowUpRight size={18} />
            </a>
          </div>
          <p className="contact-note">
            <ShieldCheck size={15} />
            {site.contact.note}
          </p>
          <div className="contact-orbit" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
        </div>
        <div className="contact-form-panel">
          <Suspense
            fallback={
              <div className="form-skeleton" aria-busy="true">
                <h2>{site.contact.formTitle}</h2>
                <p className="form-description">{site.contact.formDescription}</p>
              </div>
            }
          >
            <ContactForm />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
