import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
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
    <Link
      href={href}
      prefetch={false}
      className={`button ${paper ? "button-paper" : "button-ink"}`}
    >
      {children}
      <ArrowUpRight size={17} />
    </Link>
  );
}
