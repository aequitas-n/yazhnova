import type { Metadata } from "next";
import { pageContent } from "@/content/site";
export function pageMetadata(
  key: Exclude<
    keyof typeof pageContent,
    "scroll" | "exploreServices" | "exploreWork" | "viewProject" | "backToWork"
  >,
): Metadata {
  const page = pageContent[key];
  return {
    title: page.seoTitle,
    description: page.description,
    alternates: { canonical: page.path },
    openGraph: {
      title: page.seoTitle + " | Yazhnova",
      description: page.description,
      url: page.path,
      images: [{ url: "/og/" + key, width: 1200, height: 630, alt: page.seoTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: page.seoTitle + " | Yazhnova",
      description: page.description,
      images: ["/og/" + key],
    },
  };
}
