import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { site, pageContent, multiPage } from "@/content/site";
import { ProjectSpotlight } from "@/components/visuals/native-details";
import { SectionTitle } from "@/components/ui/section-title";
export function HomeFeatured() {
  const project = site.work.projects[0];
  return (
    <section id="work" className="home-featured paper section">
      <div className="container">
        <div className="heading-row">
          <div>
            <p className="eyebrow">{multiPage.home.featured}</p>
            <SectionTitle>
              {multiPage.home.title}
              <br />
              <em>{multiPage.home.serif}</em>
            </SectionTitle>
          </div>
          <Link className="text-link" href="/work" prefetch={false}>
            {pageContent.exploreWork}
            <ArrowUpRight size={18} />
          </Link>
        </div>
        <Link
          href="/work/clarity"
          prefetch={false}
          className="featured-project"
          aria-label={`${project.name} ${project.kind} / ${site.work.concept} — ${pageContent.viewProject}`}
        >
          <ProjectSpotlight src={project.preview} alt={project.previewAlt} />
          <div>
            <strong>{project.name}</strong>
            <span className="mono">
              {project.kind} / {site.work.concept}
            </span>
            <ArrowUpRight size={24} />
          </div>
        </Link>
      </div>
    </section>
  );
}
