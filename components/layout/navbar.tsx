"use client";
import { useState } from "react";
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
                  <Link href={item.href}>{item.label}</Link>
                </Navigation.Link>
              </Navigation.Item>
            ))}
            <Navigation.Item>
              <Navigation.Link asChild>
                <Link href="/contact">{site.actions.contact}</Link>
              </Navigation.Link>
            </Navigation.Item>
          </Navigation.List>
        </Navigation.Root>
        <div className="nav-actions">
          <Button asChild size="small">
            <Link href="/contact">
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
