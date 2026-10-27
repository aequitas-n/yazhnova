import Link from "next/link";
import { ArrowUpRight, ArrowUp } from "lucide-react";
import { site } from "@/content/site";
import { LiveVisual } from "@/components/visuals/live-visual";
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-water" aria-hidden="true">
        <LiveVisual kind="rain" />
      </div>
      <div className="container">
        <div className="footer-top">
          <div className="footer-invitation">
            <span className="eyebrow">{site.footer.label}</span>
            <p>
              {site.footer.title}
              <br />
              <em>{site.footer.serif}</em>
            </p>
            <a href={`mailto:${site.email}`}>
              {site.email}
              <ArrowUpRight size={22} />
            </a>
          </div>
          <div className="footer-column">
            <span className="eyebrow">{site.footer.explore}</span>
            {site.nav.map((item) => (
              <Link key={item.label} href={item.href}>
                {item.label}
              </Link>
            ))}
            <Link href="/contact">{site.actions.contact}</Link>
          </div>
          <div className="footer-column">
            <span className="eyebrow">{site.footer.expertise}</span>
            {site.footer.capabilities.map((label) => (
              <Link key={label} href="/services" prefetch={false}>
                {label}
              </Link>
            ))}
          </div>
          <div className="footer-column">
            <span className="eyebrow">{site.footer.connect}</span>
            <a href={`mailto:${site.email}`}>
              {site.email}
              <ArrowUpRight size={12} />
            </a>
            <p>{site.footer.note}</p>
          </div>
        </div>
        <div className="footer-wordmark" aria-label={site.name}>
          <LiveVisual kind="wordmark" />
          <span className="sr-only">{site.name}</span>
        </div>
        <div className="footer-baseline">
          <span>{site.footer.copyright}</span>
          <span className="mono">{site.footer.baseline}</span>
          <a href="#top">
            {site.actions.top}
            <ArrowUp size={12} />
          </a>
        </div>
      </div>
    </footer>
  );
}
