"use client";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/content/site";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
export default function MobileMenu({
  setOpen,
  restoreFocus,
}: {
  setOpen: (open: boolean) => void;
  restoreFocus: () => void;
}) {
  return (
    <Dialog open onOpenChange={setOpen}>
      <DialogContent
        onCloseAutoFocus={(event) => {
          event.preventDefault();
          restoreFocus();
        }}
        className="mobile-nav-dialog"
        closeLabel={site.actions.close}
      >
        <DialogTitle className="brand">{site.name}</DialogTitle>
        <DialogDescription className="sr-only">{site.description}</DialogDescription>
        <nav>
          {[...site.nav, { label: site.actions.contact, href: "/contact" }].map((item, i) => (
            <Link href={item.href} prefetch={false} key={item.label} onClick={() => setOpen(false)}>
              <span className="mono">0{i + 1}</span>
              {item.label}
              <ArrowUpRight size={23} />
            </Link>
          ))}
        </nav>
      </DialogContent>
    </Dialog>
  );
}
