import Link from "next/link";
import { site } from "@/content/site";
import { SiteShell } from "@/components/layout/site-shell";
export default function NotFound() {
  return (
    <SiteShell>
      <main id="main-content" className="container error-page">
        <p className="eyebrow">{site.notFound.label}</p>
        <h1>{site.notFound.title}</h1>
        <p>{site.notFound.description}</p>
        <Link href="/" className="button button-paper">
          {site.actions.back}
        </Link>
      </main>
    </SiteShell>
  );
}
