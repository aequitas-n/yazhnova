import { notFound } from "next/navigation";
import { sourceCatalog, type SourceSlug } from "@/lib/originkit-catalog";
import { SourceDemo } from "@/components/playground/source-demo";
export const metadata = { robots: { index: false, follow: false } };
export default async function RenderPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ palette?: string }>;
}) {
  const { slug } = await params;
  const { palette } = await searchParams;
  if (!sourceCatalog.some((item) => item.slug === slug)) notFound();
  return <SourceDemo slug={slug as SourceSlug} editorial={palette === "editorial"} />;
}
