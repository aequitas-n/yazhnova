import Link from "next/link";
import { site } from "@/content/site";
import { Button } from "@/components/ui/button";
export default function NotFound() {
  return (
    <main id="main-content" className="error-page container">
      <p className="eyebrow">{site.notFound.label}</p>
      <h1>{site.notFound.title}</h1>
      <p>{site.notFound.description}</p>
      <Button asChild className="glow-border">
        <Link href="/">{site.actions.back}</Link>
      </Button>
    </main>
  );
}
