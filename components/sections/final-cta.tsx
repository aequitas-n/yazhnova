import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/content/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Ambient } from "@/components/effects/ambient";
export function FinalCta() {
  return (
    <section className="final-cta" aria-labelledby="cta-title">
      <div className="light-bloom" aria-hidden="true" />
      <Ambient mode="gate" />
      <div className="container">
        <div className="cta-orbit-mark" aria-hidden="true">
          ✳
        </div>
        <p className="eyebrow">{site.cta.label}</p>
        <SectionHeading id="cta-title">{site.cta.title}</SectionHeading>
        <p>{site.cta.description}</p>
        <Button asChild className="glow-border">
          <Link href="/contact">
            {site.cta.action}
            <ArrowUpRight size={17} />
          </Link>
        </Button>
        <span className="cta-detail">{site.cta.detail}</span>
      </div>
    </section>
  );
}
