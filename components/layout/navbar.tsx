"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import * as Navigation from "@radix-ui/react-navigation-menu";
import { Menu, ArrowUpRight } from "lucide-react";
import { site } from "@/content/site";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
export function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const pathname = usePathname();
  useEffect(() => {
    if (pathname !== "/") {
      setActive("");
      return;
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      const current = site.nav.find((item) => {
        const section = document.querySelector(item.href.replace("/", ""));
        if (!section) return false;
        const box = section.getBoundingClientRect();
        return box.top <= innerHeight * 0.35 && box.bottom > innerHeight * 0.35;
      });
      setActive(current?.href ?? "");
    };
    const scroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", scroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scroll);
    };
  }, [pathname]);
  return (
    <header className="site-nav">
      <div className="nav-inner">
        <Link className="brand" href="/" aria-label={`${site.name} — ${site.actions.back}`}>
          {site.name}
          <span className="brand-period" />
        </Link>
        <Navigation.Root className="desktop-nav" aria-label="Main navigation">
          <Navigation.List>
            {site.nav.map((item) => (
              <Navigation.Item key={item.label}>
                <Navigation.Link asChild>
                  <Link
                    className="nav-section-link"
                    href={item.href}
                    aria-current={active === item.href ? "location" : undefined}
                  >
                    {item.label}
                  </Link>
                </Navigation.Link>
              </Navigation.Item>
            ))}
            <Navigation.Item>
              <Navigation.Link asChild>
                <Link
                  className="nav-section-link"
                  href="/contact"
                  prefetch={false}
                  aria-current={pathname === "/contact" ? "page" : undefined}
                >
                  {site.actions.contact}
                </Link>
              </Navigation.Link>
            </Navigation.Item>
          </Navigation.List>
        </Navigation.Root>
        <div className="nav-actions">
          <Button asChild size="small">
            <Link href="/contact" prefetch={false}>
              {site.actions.start}
              <ArrowUpRight size={14} />
            </Link>
          </Button>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <button className="menu-button" aria-label={site.actions.menu}>
                <Menu size={22} />
              </button>
            </DialogTrigger>
            <DialogContent className="mobile-nav-dialog" closeLabel={site.actions.close}>
              <DialogTitle className="brand">{site.name}</DialogTitle>
              <DialogDescription className="sr-only">{site.description}</DialogDescription>
              <nav>
                {[...site.nav, { label: site.actions.contact, href: "/contact" }].map((item, i) => (
                  <Link href={item.href} key={item.label} onClick={() => setOpen(false)}>
                    <span className="mono">0{i + 1}</span>
                    {item.label}
                    <ArrowUpRight size={23} />
                  </Link>
                ))}
              </nav>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  );
}
