import { mkdir, copyFile, writeFile, access } from "node:fs/promises";
const fonts = [
  ["instrument-serif", "Instrument Serif", "400", "normal"],
  ["instrument-serif", "Instrument Serif", "400", "italic"],
  ["geist-mono", "Geist Mono", "400", "normal"],
];
await mkdir("public/fonts", { recursive: true });
let css = "/* Self-hosted, unmodified Fontsource Latin font files. */\n";
const variableFile = "inter-tight-latin-wght-normal.woff2";
await copyFile(
  `node_modules/@fontsource-variable/inter-tight/files/${variableFile}`,
  `public/fonts/${variableFile}`,
);
await copyFile(
  "node_modules/@fontsource-variable/inter-tight/LICENSE",
  "public/fonts/inter-tight-LICENSE.txt",
);
css += `@font-face { font-family: "Inter Tight"; font-style: normal; font-weight: 100 900; font-display: swap; src: url("/fonts/${variableFile}") format("woff2"); }\n`;
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
console.log(
  "Prepared 4 original self-hosted font faces, with Inter Tight weights sharing one variable file.",
);
