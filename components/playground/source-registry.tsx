"use client";
import dynamic from "next/dynamic";
export const sources = {
  "ridge-parallax": dynamic(() => import("@/components/originkit/ui/ridge-parallax"), {
    ssr: false,
  }),
  "live-chat": dynamic(() => import("@/components/originkit/ui/live-chat"), { ssr: false }),
  "aura-cursor": dynamic(() => import("@/components/originkit/ui/aura-cursor"), { ssr: false }),
  "hairline-loader": dynamic(() => import("@/components/originkit/ui/hairline-loader"), {
    ssr: false,
  }),
  curvedmarquee: dynamic(() => import("@/components/originkit/ui/curvedmarquee"), { ssr: false }),
  "stacked-carousel": dynamic(() => import("@/components/originkit/ui/stacked-carousel"), {
    ssr: false,
  }),
  "image-spotlight": dynamic(() => import("@/components/originkit/ui/image-spotlight"), {
    ssr: false,
  }),
  "light-cables": dynamic(() => import("@/components/originkit/ui/light-cables"), { ssr: false }),
  "data-strings": dynamic(() => import("@/components/originkit/ui/data-strings"), { ssr: false }),
  "liquid-grid": dynamic(() => import("@/components/originkit/ui/liquid-grid"), { ssr: false }),
  scrambletext: dynamic(() => import("@/components/originkit/ui/scrambletext"), { ssr: false }),
  "scroll-text-reveal": dynamic(() => import("@/components/originkit/ui/scroll-text-reveal"), {
    ssr: false,
  }),
  "glow-border": dynamic(() => import("@/components/originkit/ui/glow-border"), { ssr: false }),
  "predictive-arc-02": dynamic(() => import("@/components/originkit/ui/predictive-arc-02"), {
    ssr: false,
  }),
  "fluid-field": dynamic(() => import("@/components/originkit/ui/fluid-field"), { ssr: false }),
  "light-bloom": dynamic(() => import("@/components/originkit/ui/light-bloom"), { ssr: false }),
  "single-glossy-sphere": dynamic(() => import("@/components/originkit/ui/single-glossy-sphere"), {
    ssr: false,
  }),
  "star-gate": dynamic(() => import("@/components/originkit/ui/star-gate"), { ssr: false }),
  "spark-lattice": dynamic(() => import("@/components/originkit/ui/spark-lattice"), { ssr: false }),
  "hero-40": dynamic(() => import("@/components/originkit/hero-40"), { ssr: false }),
  "hero-44": dynamic(() => import("@/components/originkit/hero-44"), { ssr: false }),
  "hero-51": dynamic(() => import("@/components/originkit/hero-51"), { ssr: false }),
  "hero-55": dynamic(() => import("@/components/originkit/hero-55"), { ssr: false }),
  "hero-69": dynamic(() => import("@/components/originkit/hero-69"), { ssr: false }),
  "hero-28": dynamic(() => import("@/components/originkit/hero-28"), { ssr: false }),
  "features-02": dynamic(() => import("@/components/originkit/features-02"), { ssr: false }),
  "pricing-04": dynamic(() => import("@/components/originkit/pricing-04"), { ssr: false }),
  "footer-03": dynamic(() => import("@/components/originkit/footer-03"), { ssr: false }),
  "dither-reveal": dynamic(() => import("@/components/originkit/ui/dither-reveal"), { ssr: false }),
  "paperline-archive": dynamic(() => import("@/components/originkit/ui/paperline-archive"), {
    ssr: false,
  }),
  "dithered-pixel-grid": dynamic(() => import("@/components/originkit/ui/dithered-pixel-grid"), {
    ssr: false,
  }),
  "beyond-horizon": dynamic(() => import("@/components/originkit/ui/beyond-horizon"), {
    ssr: false,
  }),
  glassbound: dynamic(() => import("@/components/originkit/ui/glassbound"), { ssr: false }),
  "network-lines": dynamic(() => import("@/components/originkit/ui/network-lines"), { ssr: false }),
  "ocean-swell": dynamic(() => import("@/components/originkit/ui/ocean-swell"), { ssr: false }),
  "rain-puddle": dynamic(() => import("@/components/originkit/ui/rain-puddle"), { ssr: false }),
  "shadow-cast": dynamic(() => import("@/components/originkit/ui/shadow-cast"), { ssr: false }),
};
