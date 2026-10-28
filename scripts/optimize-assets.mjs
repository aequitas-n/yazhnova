import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const rows = [];
for (const item of await fs.readdir("public", { recursive: true, withFileTypes: true })) {
  if (!item.isFile() || !item.name.endsWith(".png")) continue;
  const input = path.join(item.parentPath, item.name);
  const url = "/" + path.relative("public", input).split(path.sep).join("/");
  const before = (await fs.stat(input)).size;
  if (before < 100000 && !url.startsWith("/frames/")) continue;
  const output = input.replace(/\.png$/, ".webp");
  let encoded = await sharp(input)
    .resize({ width: 1920, height: 1440, fit: "inside", withoutEnlargement: true })
    .webp({ quality: url.includes("contact-rain") ? 76 : 82, alphaQuality: 90, effort: 5 })
    .toBuffer();
  if (encoded.length > before) {
    const lossless = await sharp(input).webp({ lossless: true, effort: 5 }).toBuffer();
    if (lossless.length < encoded.length) encoded = lossless;
  }
  await fs.writeFile(output, encoded);
  rows.push({
    from: url,
    to: url.replace(/\.png$/, ".webp"),
    before,
    after: (await fs.stat(output)).size,
  });
}
for (const root of ["app", "components", "lib", "content"]) {
  for (const entry of await fs.readdir(root, { recursive: true, withFileTypes: true })) {
    if (!entry.isFile() || !/\.(tsx?|css)$/.test(entry.name)) continue;
    const file = path.join(entry.parentPath, entry.name);
    const previous = await fs.readFile(file, "utf8");
    let source = previous;
    for (const row of rows) source = source.replaceAll(row.from, row.to);
    if (source !== previous) await fs.writeFile(file, source);
  }
}
await fs.mkdir("docs/performance", { recursive: true });
await fs.writeFile("docs/performance/assets.json", JSON.stringify(rows, null, 2) + "\n");
console.log(
  JSON.stringify({
    images: rows.length,
    before: rows.reduce((sum, row) => sum + row.before, 0),
    after: rows.reduce((sum, row) => sum + row.after, 0),
    contact: rows.find((row) => row.from.endsWith("contact-rain.png")),
  }),
);
