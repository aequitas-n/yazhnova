import type { MetadataRoute } from "next";
import { site, pageContent } from "@/content/site";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...["home", "services", "agents", "work", "process", "engage", "about", "contact"].map(
      (key) => {
        const page =
          pageContent[
            key as
              "home" | "services" | "agents" | "work" | "process" | "engage" | "about" | "contact"
          ];
        return {
          url: site.url + (page.path === "/" ? "" : page.path),
          changeFrequency: "monthly" as const,
          priority: key === "home" ? 1 : 0.8,
        };
      },
    ),
    ...site.work.projects.map((project) => ({
      url: site.url + "/work/" + project.name.toLowerCase(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
