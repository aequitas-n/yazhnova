import { ScanSearch, PenTool, Code2, Rocket } from "lucide-react";
import { site } from "@/content/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { Ambient } from "@/components/effects/ambient";
const icons = [ScanSearch, PenTool, Code2, Rocket];
export function Process() {
  return (
    <section id="process" className="section process-section" aria-labelledby="process-title">
      <Ambient mode="fluid" />
      <Ambient mode="lattice" />
      <div className="container">
        <div className="center-heading">
          <p className="eyebrow">{site.process.label}</p>
          <SectionHeading id="process-title">{site.process.title}</SectionHeading>
          <p className="section-description">{site.process.description}</p>
        </div>
        <div className="process-steps">
          <div className="process-connector" aria-hidden="true">
            <span />
          </div>
          {site.process.steps.map((step, i) => {
            const Icon = icons[i];
            return (
              <article className="process-step" key={step.number}>
                <div className="step-icon">
                  <Icon size={23} />
                  <span className="mono">{step.number}</span>
                </div>
                <span className="mono step-detail">{step.detail}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
