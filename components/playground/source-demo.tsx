"use client";
import { useEffect, type ComponentType } from "react";
import { sources } from "./source-registry";
import { editorialPresets, sourceCatalog, type SourceSlug } from "@/lib/originkit-catalog";

export function SourceDemo({ slug, editorial }: { slug: SourceSlug; editorial: boolean }) {
  const item = sourceCatalog.find((item) => item.slug === slug)!;
  const Source = sources[slug] as unknown as ComponentType<Record<string, unknown>>;
  useEffect(() => {
    document.documentElement.dataset.study = editorial ? "editorial" : "default";
    return () => {
      delete document.documentElement.dataset.study;
    };
  }, [editorial]);
  return (
    <div
      className={`source-render ${editorial ? "study-editorial" : "study-default"} source-${slug}`}
      data-source={slug}
      data-preset={editorial ? "editorial" : "default"}
    >
      <Source
        {...(slug === "image-spotlight" && !editorial
          ? { image: { src: "/originkit/image-spotlight/default.jpg" } }
          : {})}
        {...(editorial ? editorialPresets[slug] : {})}
        {...(item.kind === "component"
          ? { style: { width: "100%", height: "100%", minWidth: 0, minHeight: 0 } }
          : {})}
      />
    </div>
  );
}
