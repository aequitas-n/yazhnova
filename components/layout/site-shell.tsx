import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { site } from "@/content/site";
export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a className="skip-link" href="#main-content">
        {site.actions.skip}
      </a>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
