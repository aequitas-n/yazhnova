import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { GlowBorder } from "@/components/slots/GlowBorder";
export function ProjectLink({
  children,
  href = "/contact",
  paper = false,
}: {
  children: React.ReactNode;
  href?: string;
  paper?: boolean;
}) {
  return (
    <GlowBorder color="#FFB45A">
      <Link href={href} className={`button ${paper ? "button-paper" : "button-ink"}`}>
        {children}
        <ArrowUpRight size={17} />
      </Link>
    </GlowBorder>
  );
}
