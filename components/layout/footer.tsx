import Link from "next/link";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { site } from "@/content/site";
import { Logo } from "@/components/ui/logo";
export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-cta">
            <Logo />
            <p>{site.footer.title}</p>
            <a href={`mailto:${site.email}`}>
              {site.email}
              <ArrowUpRight size={21} />
            </a>
          </div>
          <div className="footer-column">
            <span className="eyebrow">{site.footer.linksLabel}</span>
            {site.navigation.map((item) => (
              <Link href={item.href} key={item.label}>
                {item.label}
              </Link>
            ))}
          </div>
          <div className="footer-column">
            <span className="eyebrow">{site.footer.capabilitiesLabel}</span>
            {site.footer.capabilities.map((item) => (
              <Link href="/#services" key={item}>
                {item}
              </Link>
            ))}
          </div>
          <div className="footer-column">
            <span className="eyebrow">{site.footer.connectLabel}</span>
            {site.footer.social.map((item) => (
              <a href={item.href} key={item.label}>
                {item.label}
                <ArrowUpRight size={12} />
              </a>
            ))}
            <p className="footer-made">{site.footer.made}</p>
            <span className="footer-status">
              <span className="status-dot" />
              {site.hero.availability}
            </span>
          </div>
        </div>
        <div className="footer-wordmark" aria-hidden="true">
          {site.name}
        </div>
        <div className="footer-bottom">
          <span>{site.footer.copyright}</span>
          <span className="mono footer-tagline">{site.footer.tagline}</span>
          <a href="#top">
            {site.footer.top}
            <ArrowUp size={13} />
          </a>
        </div>
      </div>
    </footer>
  );
}
