import Link from "next/link";
import { site } from "@/content/site";
export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 34" fill="none" aria-hidden="true">
      <path d="M2 3h7.3L16 14.3 22.7 3H30L19.6 20.4V31h-7.2V20.4L2 3Z" fill="currentColor" />
      <path d="m21.3 17.7 4-6.7H31L20.6 28.5V19Z" fill="#7B5CFF" />
    </svg>
  );
}
export function Logo() {
  return (
    <Link href="/" className="logo" aria-label={`${site.name} — ${site.actions.back}`}>
      <BrandMark />
      <span>{site.name}</span>
    </Link>
  );
}
