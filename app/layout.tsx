import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { site } from "@/content/site";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { GlobalEffects } from "@/components/effects/global-effects";

const geist = localFont({
  src: [
    { path: "../node_modules/@fontsource/geist/files/geist-latin-400-normal.woff2", weight: "400" },
    { path: "../node_modules/@fontsource/geist/files/geist-latin-500-normal.woff2", weight: "500" },
    { path: "../node_modules/@fontsource/geist/files/geist-latin-600-normal.woff2", weight: "600" },
  ],
  variable: "--font-geist",
  display: "swap",
});
const mono = localFont({
  src: "../node_modules/@fontsource/geist-mono/files/geist-mono-latin-400-normal.woff2",
  variable: "--font-geist-mono",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: "%s | Yazhnova" },
  description: site.description,
  alternates: { canonical: "/" },
  applicationName: site.name,
  keywords: [
    "Yazhnova",
    "software development",
    "web development",
    "SaaS development",
    "agentic AI",
    "AI agents",
    "India",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: site.name,
    title: site.title,
    description: site.description,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: site.hero.lineOne + " " + site.hero.lineTwo,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: ["/opengraph-image"],
  },
  robots: { index: true, follow: true },
};
export const viewport: Viewport = { themeColor: "#05060A", colorScheme: "dark" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: site.name,
    url: site.url,
    logo: `${site.url}/icon.svg`,
    email: site.email,
    description: site.description,
  };
  return (
    <html lang="en" className={`dark ${geist.variable} ${mono.variable}`}>
      <body id="top">
        <a className="skip-link" href="#main-content">
          {site.actions.skip}
        </a>
        <GlobalEffects />
        <Navbar />
        {children}
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organization).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
