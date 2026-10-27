"use client";
import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import { visualPresets, type VisualKind } from "@/lib/visual-presets";
const renderers = {
  cables: dynamic(() => import("@/components/originkit/ui/light-cables"), { ssr: false }),
  globe: dynamic(() => import("@/components/originkit/ui/features-02/globe"), { ssr: false }),
  gate: dynamic(() => import("@/components/originkit/ui/star-gate"), { ssr: false }),
  liquid: dynamic(() => import("@/components/originkit/ui/liquid-grid"), { ssr: false }),
  glossy: dynamic(() => import("@/components/originkit/ui/single-glossy-sphere"), { ssr: false }),
  strings: dynamic(() => import("@/components/originkit/ui/data-strings"), { ssr: false }),
  deck: dynamic(() => import("@/components/originkit/ui/stacked-carousel"), { ssr: false }),
  "hero-dither": dynamic(() => import("@/components/originkit/ui/hero-40/dither-reveal"), {
    ssr: false,
  }),
  manifesto: dynamic(() => import("@/components/originkit/ui/paperline-archive"), { ssr: false }),
  pixels: dynamic(() => import("@/components/originkit/ui/dithered-pixel-grid"), { ssr: false }),
  network: dynamic(() => import("@/components/originkit/ui/network-lines"), { ssr: false }),
  horizon: dynamic(() => import("@/components/originkit/ui/beyond-horizon"), { ssr: false }),
  glassbound: dynamic(() => import("@/components/originkit/ui/glassbound"), { ssr: false }),
  shadow: dynamic(() => import("@/components/originkit/ui/shadow-cast"), { ssr: false }),
  ocean: dynamic(() => import("@/components/originkit/ui/ocean-swell"), { ssr: false }),
  rain: dynamic(() => import("@/components/originkit/ui/rain-puddle"), { ssr: false }),
  ember: dynamic(() => import("@/components/originkit/ui/hero-69/ember-husk"), { ssr: false }),
  wordmark: dynamic(() => import("@/components/originkit/ui/footer-03/light-shaft-text"), {
    ssr: false,
  }),
};
export default function Renderer({
  kind,
  overrides = {},
}: {
  kind: VisualKind;
  overrides?: Record<string, unknown>;
}) {
  const Source = renderers[kind] as unknown as ComponentType<Record<string, unknown>>;
  return (
    <Source
      {...visualPresets[kind]}
      {...overrides}
      style={{ width: "100%", height: "100%", minWidth: 0, minHeight: 0 }}
    />
  );
}
