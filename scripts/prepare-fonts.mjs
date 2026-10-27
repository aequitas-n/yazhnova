import { mkdir, copyFile, writeFile, access } from "node:fs/promises";
const fonts = [
  ["inter-tight", "Inter Tight", "400", "normal"],
  ["inter-tight", "Inter Tight", "500", "normal"],
  ["inter-tight", "Inter Tight", "600", "normal"],
  ["instrument-serif", "Instrument Serif", "400", "normal"],
  ["instrument-serif", "Instrument Serif", "400", "italic"],
  ["geist-mono", "Geist Mono", "400", "normal"],
];
await mkdir("public/fonts", { recursive: true });
let css = "/* Self-hosted, unmodified Fontsource Latin font files. */\n";
for (const [slug, family, weight, style] of fonts) {
  const file = `${slug}-latin-${weight}-${style}.woff2`;
  await copyFile(`node_modules/@fontsource/${slug}/files/${file}`, `public/fonts/${file}`);
  css += `@font-face { font-family: "${family}"; font-style: ${style}; font-weight: ${weight}; font-display: swap; src: url("/fonts/${file}") format("woff2"); }\n`;
}
for (const slug of new Set(fonts.map((f) => f[0]))) {
  const license = `node_modules/@fontsource/${slug}/LICENSE`;
  try {
    await access(license);
    await copyFile(license, `public/fonts/${slug}-LICENSE.txt`);
  } catch {}
}
css +=
  ':root { --font-ui: "Inter Tight"; --font-display: "Instrument Serif"; --font-label: "Geist Mono"; }\n';
await writeFile("app/fonts.css", css);
console.log("Prepared 6 original self-hosted font faces with one URL per face.");
