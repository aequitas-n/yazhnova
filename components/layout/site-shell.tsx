import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { site } from "@/content/site";
import { TouchInput } from "@/components/visuals/touch-input";
export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TouchInput />
      <a className="skip-link" href="#main-content">
        {site.actions.skip}
      </a>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
