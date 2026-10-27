"use client";

function asset(file: string) {
  return `/originkit/hero-28/${file}`;
}

type Brand = { name: string; src: string; w: number; h: number };

const BRANDS: Brand[] = [
  { name: "Logiqo", src: asset("brand-logiqo.svg"), w: 83.875, h: 27.958 },
  { name: "Nexora", src: asset("brand-nexora.svg"), w: 86.975, h: 28.056 },
  {
    name: "Brandly",
    src: asset("brand-brandly.svg"),
    w: 90.194,
    h: 28.011,
  },
  {
    name: "Markivo",
    src: asset("brand-markivo.svg"),
    w: 93.371,
    h: 27.956,
  },
  { name: "Typely", src: asset("brand-typely.svg"), w: 92.786, h: 26.012 },
  { name: "Framex", src: asset("brand-framex.svg"), w: 89.467, h: 27.958 },
  { name: "Webora", src: asset("brand-webora.svg"), w: 92.388, h: 27.996 },
  {
    name: "Designo",
    src: asset("brand-designo.svg"),
    w: 95.14,
    h: 27.982,
  },
  { name: "Formix", src: asset("brand-formix.svg"), w: 83.942, h: 27.981 },
];

const SCALE = "[--logo-scale:0.702] ipad:[--logo-scale:1]";

const FADE = [
  "rgba(0,0,0,0.688) 0%",
  "rgba(0,0,0,0.682) 16%",
  "rgba(0,0,0,0.665) 28%",
  "rgba(0,0,0,0.634) 40%",
  "rgba(0,0,0,0.601) 48%",
  "rgba(0,0,0,0.552) 56%",
  "rgba(0,0,0,0.517) 60%",
  "rgba(0,0,0,0.472) 64%",
  "rgba(0,0,0,0.411) 68%",
  "rgba(0,0,0,0.331) 72%",
  "rgba(0,0,0,0.238) 76%",
  "rgba(0,0,0,0.145) 80%",
  "rgba(0,0,0,0.073) 84%",
  "rgba(0,0,0,0.029) 88%",
  "rgba(0,0,0,0.009) 92%",
  "transparent 100%",
].join(", ");

const FADE_MASK = `radial-gradient(ellipse var(--fade-r) 200% at var(--fade-cx) 50%, ${FADE})`;

const Half = ({ hidden = false }: { hidden?: boolean }) => (
  <ul
    aria-hidden={hidden || undefined}
    aria-label={hidden ? undefined : "Trusted by"}
    className="flex shrink-0 items-center gap-[calc(var(--logo-scale)*53.4px)] pr-[calc(var(--logo-scale)*53.4px)]"
  >
    {BRANDS.map((brand) => (
      <li key={brand.name} className="shrink-0">
        <img
          src={brand.src}
          alt={hidden ? "" : brand.name}
          className="block max-w-none"
          style={{
            width: `calc(var(--logo-scale) * ${brand.w}px)`,
            height: `calc(var(--logo-scale) * ${brand.h}px)`,
          }}
        />
      </li>
    ))}
  </ul>
);

const RAIL_WINDOW =
  "left-[32px] right-[32px] ipad:left-[62px] ipad:right-[62px] desktop-sm:left-1/2 desktop-sm:right-[80px]";

export const LogoMarquee = () => (
  <div
    className={`${SCALE} ${RAIL_WINDOW} absolute top-[1115px] z-20 h-[52px] overflow-hidden [--fade-cx:50.6%] [--fade-r:54.8%] ipad:top-[1183px] ipad:h-[74px] desktop-sm:top-auto desktop-sm:bottom-[66px]`}
    style={{ maskImage: FADE_MASK, WebkitMaskImage: FADE_MASK }}
  >
    <div className="flex h-full w-max items-center will-change-transform motion-safe:animate-logo-marquee">
      <Half />
      <Half hidden />
    </div>
  </div>
);