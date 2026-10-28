"use client";
import { useState, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import * as Navigation from "@radix-ui/react-navigation-menu";
import { Menu, ArrowUpRight } from "lucide-react";
import { site } from "@/content/site";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
const MobileMenu = dynamic(() => import("./mobile-menu"), { ssr: false });
export function Navbar() {
  const menuButton = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return (
    <header className="site-nav">
      <div className="nav-inner">
        <Link
          className="brand"
          href="/"
          prefetch={false}
          aria-label={`${site.name} — ${site.actions.back}`}
        >
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
                    prefetch={false}
                    aria-current={
                      pathname === item.href || pathname.startsWith(item.href + "/")
                        ? "page"
                        : undefined
                    }
                  >
                    {item.label}
                  </Link>
                </Navigation.Link>
              </Navigation.Item>
            ))}
          </Navigation.List>
        </Navigation.Root>
        <div className="nav-actions">
          <Button asChild size="small">
            <Link href="/contact" prefetch={false}>
              {site.actions.start}
              <ArrowUpRight size={14} />
            </Link>
          </Button>
          <button
            ref={menuButton}
            className="menu-button"
            aria-label={site.actions.menu}
            aria-haspopup="dialog"
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            <Menu size={22} />
          </button>
          {open && (
            <MobileMenu setOpen={setOpen} restoreFocus={() => menuButton.current?.focus()} />
          )}
        </div>
      </div>
    </header>
  );
}
