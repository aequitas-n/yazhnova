import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowDown, ArrowLeft } from "lucide-react";
import { site, multiPage, pageContent } from "@/content/site";
import { SiteShell } from "@/components/layout/site-shell";
import { ProjectSpotlight } from "@/components/visuals/native-details";
import { ProjectLink } from "@/components/ui/project-link";
export function generateStaticParams() {
  return site.work.projects.map((project) => ({ slug: project.name.toLowerCase() }));
}
const getProject = (slug: string) =>
  site.work.projects.find((project) => project.name.toLowerCase() === slug);
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.name + " — Concept case study",
    description: project.description,
    alternates: { canonical: "/work/" + slug },
    openGraph: {
      title: project.name + " | Yazhnova",
      description: project.description,
      url: "/work/" + slug,
      images: [{ url: "/og/case-" + slug, width: 1200, height: 630, alt: project.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: project.name + " | Yazhnova",
      description: project.description,
      images: ["/og/case-" + slug],
    },
  };
}
export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  return (
    <SiteShell>
      <main id="main-content" className="case-study-page">
        <section
          className="page-hero case-hero paper"
          data-page-hero={slug}
          aria-labelledby="page-title"
        >
          <div className="container">
            <Link href="/work" className="case-back">
              <ArrowLeft size={15} />
              {pageContent.backToWork}
            </Link>
            <div className="case-hero-heading">
              <div>
                <p className="eyebrow">
                  {project.kind} / {site.work.concept}
                </p>
                <h1 id="page-title">{project.name}</h1>
              </div>
              <p>{project.outcome}</p>
            </div>
            <ProjectSpotlight src={project.preview} alt={project.previewAlt} />
          </div>
          <a className="page-scroll mono" href="#case-details">
            <span>{pageContent.scroll}</span>
            <ArrowDown size={17} />
          </a>
        </section>
        <section id="case-details" className="section case-details ink">
          <div className="container">
            <p className="eyebrow">{multiPage.caseStudy.conceptNote}</p>
            <div className="case-detail-row">
              <h2>{multiPage.caseStudy.opportunity}</h2>
              <p>{project.opportunity}</p>
            </div>
            <div className="case-detail-row">
              <h2>{multiPage.caseStudy.approach}</h2>
              <p>{project.approach}</p>
            </div>
            <div className="case-detail-row">
              <h2>{multiPage.caseStudy.scope}</h2>
              <ul>
                {project.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </div>
            <ProjectLink>{site.actions.start}</ProjectLink>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
