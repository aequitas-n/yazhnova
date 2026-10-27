"use client";
import dynamic from "next/dynamic";
export const sources = {
  "hero-40": dynamic(() => import("@/components/originkit/hero-40"), { ssr: false }),
  "hero-51": dynamic(() => import("@/components/originkit/hero-51"), { ssr: false }),
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
