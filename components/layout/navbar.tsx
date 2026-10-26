"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu } from "lucide-react";
import { site } from "@/content/site";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  return (
    <header className="navbar">
      <div className="nav-inner">
        <Logo />
        <NavigationMenu className="desktop-nav" aria-label="Main">
          <NavigationMenuList>
            {site.navigation.map((item) => (
              <NavigationMenuItem key={item.label}>
                <NavigationMenuLink asChild active={path === item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <div className="nav-actions">
          <Button asChild size="small" className="glow-border nav-cta">
            <Link href="/contact">
              {site.actions.start}
              <ArrowUpRight size={15} />
            </Link>
          </Button>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <button className="mobile-menu" aria-label={site.actions.menu}>
                <Menu size={22} />
              </button>
            </DialogTrigger>
            <DialogContent className="mobile-nav-dialog" closeLabel={site.actions.close}>
              <DialogTitle className="mobile-nav-title">{site.name}</DialogTitle>
              <DialogDescription className="sr-only">{site.hero.availability}</DialogDescription>
              <nav aria-label="Mobile">
                {site.navigation.map((item, index) => (
                  <Link href={item.href} key={item.label} onClick={() => setOpen(false)}>
                    <span className="mono">0{index + 1}</span>
                    {item.label}
                    <ArrowUpRight size={21} />
                  </Link>
                ))}
                <Button asChild className="glow-border">
                  <Link href="/contact" onClick={() => setOpen(false)}>
                    {site.actions.start}
                    <ArrowUpRight size={17} />
                  </Link>
                </Button>
              </nav>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  );
}
