import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { site } from "@/content/site";
import { AuraCursor, HairlineLoader } from "@/components/slots";
export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a className="skip-link" href="#main-content">
        {site.actions.skip}
      </a>
      <AuraCursor enabled />
      <HairlineLoader />
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
