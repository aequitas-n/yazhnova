import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { site } from "../content/site.ts";

const dir = fileURLToPath(new URL("../public/work/", import.meta.url));
await mkdir(dir, { recursive: true });
const escape = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" })[c],
  );
const rect = (x, y, w, h, fill = "#0B0D14", radius = 0, stroke = "none") =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${radius}" fill="${fill}" stroke="${stroke}"/>`;
const text = (x, y, value, size = 12, color = "#8A90A6", weight = 400, extra = "") =>
  `<text x="${x}" y="${y}" font-family="Arial,sans-serif" font-size="${size}" font-weight="${weight}" fill="${color}" ${extra}>${escape(value)}</text>`;
const line = (x1, y1, x2, y2, color = "#ffffff0d") =>
  `<path d="M${x1} ${y1}H${x2}" transform="translate(0 ${y2 - y1})" stroke="${color}"/>`;
const wrap = (body) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="1100" height="640" viewBox="0 0 1100 640"><defs><linearGradient id="line" x1="0" x2="1"><stop stop-color="#3B6BFF"/><stop offset="1" stop-color="#7B5CFF"/></linearGradient><linearGradient id="area" x2="0" y2="1"><stop stop-color="#3B6BFF" stop-opacity=".25"/><stop offset="1" stop-color="#3B6BFF" stop-opacity="0"/></linearGradient><linearGradient id="sculpture" x1="0" y1="0" x2="1" y2=".5"><stop stop-color="#151c35"/><stop offset=".28" stop-color="#a2b1e4"/><stop offset=".45" stop-color="#e0e5f4"/><stop offset=".6" stop-color="#5c6b98"/><stop offset="1" stop-color="#13182c"/></linearGradient><radialGradient id="aura"><stop stop-color="#7B5CFF" stop-opacity=".2"/><stop offset="1" stop-color="#7B5CFF" stop-opacity="0"/></radialGradient></defs>${rect(0, 0, 1100, 640, "#080A11")}${body}</svg>`;
const dot = (x, y, color = "#7B5CFF", r = 3) =>
  `<circle cx="${x}" cy="${y}" r="${r}" fill="${color}"/>`;
const c = site.work.mockups.clarity;
let clarity =
  rect(0, 0, 180, 640, "#0C0E17") +
  rect(180, 0, 920, 52, "#0B0D14") +
  line(180, 52, 1100, 52) +
  text(24, 39, c.name, 25, "#EDEFF7", 600) +
  rect(18, 69, 144, 35, "#141824", 6, "#ffffff0d") +
  dot(34, 87, "#7B5CFF", 4) +
  text(47, 91, c.workspace, 10, "#C1C8DC") +
  text(194, 32, c.top, 10) +
  text(797, 32, c.search, 10) +
  dot(1060, 27, "#3B6BFF", 12);
c.nav.forEach((label, i) => {
  const y = 142 + i * 43;
  if (!i) clarity += rect(12, y - 22, 156, 35, "#3B6BFF16", 6);
  clarity +=
    rect(27, y - 12, 10, 10, "none", 2, i ? "#606c8d" : "#8faaff") +
    text(49, y - 3, label, 11, i ? "#7f8ba9" : "#C9D5FF");
});
clarity +=
  text(25, 567, c.plan, 10, "#9da8c5") +
  text(25, 611, c.support, 10) +
  text(215, 104, c.greeting, 26, "#EDEFF7", 500) +
  text(215, 130, c.sub, 11) +
  rect(918, 83, 145, 35, "#3B6BFF", 6) +
  text(936, 105, c.action, 11, "#EDEFF7");
c.stats.forEach((label, i) => {
  const x = 215 + i * 286;
  clarity +=
    rect(x, 158, 269, 102, "#0E111B", 9, "#ffffff0d") +
    text(x + 17, 184, label, 10) +
    text(x + 17, 225, c.values[i], 29, "#EDEFF7", 500) +
    text(x + 99, 224, c.changes[i], 9, "#95a8e2");
});
clarity +=
  rect(215, 280, 547, 228, "#0D101A", 9, "#ffffff0d") +
  text(234, 310, c.chart, 13, "#D6DBEC", 500) +
  text(641, 309, c.chartMeta, 8) +
  dot(243, 336, "#6487ff", 3) +
  text(253, 339, c.chartLegend, 9);
for (let i = 0; i < 4; i++) clarity += line(238, 361 + i * 34, 739, 361 + i * 34);
clarity += `<path d="M239 461C265 462 274 438 303 439S351 461 382 428 414 440 447 405 492 430 524 391 557 404 592 369 628 389 660 356 713 357 738 342V480H239Z" fill="url(#area)"/><path d="M239 461C265 462 274 438 303 439S351 461 382 428 414 440 447 405 492 430 524 391 557 404 592 369 628 389 660 356 713 357 738 342" fill="none" stroke="url(#line)" stroke-width="2.5"/>`;
c.chartDays.forEach((day, i) => (clarity += text(239 + i * 76, 491, day, 7)));
clarity +=
  rect(780, 280, 292, 228, "#0D101A", 9, "#ffffff0d") +
  text(800, 310, c.activity, 13, "#D6DBEC", 500);
c.tasks.forEach((task, i) => {
  const y = 345 + i * 42;
  clarity +=
    rect(800, y - 8, 11, 11, i === 1 ? "#3B6BFF" : "none", 3, "#445273") +
    text(822, y, task, 10, "#AAB5D0") +
    text(822, y + 15, c.taskMeta[i], 8);
});
clarity += text(215, 544, c.bottom, 13, "#D6DBEC", 500);
c.projects.forEach((p, i) => {
  const x = 215 + i * 286;
  clarity +=
    rect(x, 563, 269, 95, "#10131D", 9, "#ffffff0d") +
    dot(x + 20, 585, ["#7B5CFF", "#3B6BFF", "#6EE7FF"][i], 4) +
    text(x + 33, 589, p, 11, "#C2CBE3") +
    text(x + 17, 614, c.progress[i], 9) +
    text(x + 230, 614, c.progressValues[i], 9) +
    rect(x + 17, 628, 234, 3, "#252B3E", 2) +
    rect(x + 17, 628, [150, 192, 89][i], 3, ["#7B5CFF", "#3B6BFF", "#6EE7FF"][i], 2);
});
await writeFile(`${dir}/clarity.svg`, wrap(clarity));

const r = site.work.mockups.relay;
let relay =
  rect(0, 0, 1100, 57, "#0E101B") +
  line(0, 57, 1100, 57) +
  text(26, 37, r.name, 28, "#EDEFF7", 600) +
  text(196, 33, r.top, 10) +
  dot(915, 29, "#ad9bff", 3) +
  text(927, 33, r.status, 8, "#B3A0FF") +
  text(45, 116, r.title, 28, "#EDEFF7", 500) +
  text(45, 142, r.sub, 12) +
  rect(915, 102, 139, 34, "#7B5CFF", 7) +
  text(935, 124, r.action, 11, "#EDEFF7") +
  rect(30, 175, 1040, 235, "#0D0F1B", 13, "#ffffff0e");
for (let x = 46; x < 1070; x += 18)
  for (let y = 189; y < 409; y += 18) relay += dot(x, y, "#34334e", 0.8);
relay += `<path d="M244 296H327M486 296H569M728 296H810" stroke="#7B5CFF" stroke-opacity=".5" stroke-width="1.4" stroke-dasharray="4 4"/>`;
r.nodes.forEach((node, i) => {
  const x = 61 + i * 250;
  relay +=
    text(x, 225, r.labels[i], 8, "#9289B2") +
    rect(x, 248, 224, 113, "#131323", 10, "#7B5CFF40") +
    rect(x + 15, 263, 24, 24, "#7B5CFF24", 7) +
    text(x + 23, 280, ["↗", "✳", "◇", "↗"][i], 15, "#C2B0FF") +
    text(x + 15, 309, node, 14, "#D8D4EA", 500) +
    text(x + 15, 329, r.details[i], 9) +
    text(x + 15, 347, r.integrations[i], 8, "#9c8fd0") +
    dot(x + 204, 277, "#a399dd", 3);
});
relay +=
  rect(30, 433, 1040, 195, "#0E101B", 12, "#ffffff0e") +
  text(50, 464, r.log, 13, "#D7D8E8", 500) +
  text(932, 464, r.run, 9, "#A298C1") +
  line(50, 482, 1050, 482);
r.logEntries.forEach((entry, i) => {
  const y = 508 + i * 31;
  relay +=
    dot(57, y - 3, "#8f9ade", 3) +
    text(74, y, entry, 10, "#A8B0CA") +
    text(968, y, r.times[i], 9, "#8591AD") +
    text(1025, y, "✓", 12, "#A8B6EB");
});
relay +=
  rect(0, 0, 1100, 0, "none") +
  text(52, 394, r.complete, 8, "#ACB9F0") +
  text(837, 394, r.monitor, 8, "#8E87A7");
await writeFile(`${dir}/relay.svg`, wrap(relay));

const f = site.work.mockups.forma;
let forma =
  rect(0, 0, 1100, 640, "#0B0D14") + text(38, 46, f.name, 23, "#EDEFF7", 600, 'letter-spacing="4"');
f.nav.forEach((item, i) => (forma += text(672 + i * 135, 43, item, 10, "#A6AEC5")));
forma += line(36, 73, 1064, 73) + text(52, 139, f.label, 9, "#98A0B8", 400, 'letter-spacing="2"');
f.title.forEach(
  (title, i) => (forma += text(47, 225 + i * 69, title, 65, "#DFE3EF", 400, 'letter-spacing="-3"')),
);
forma +=
  text(52, 424, f.sub, 15, "#B4BCD4") +
  text(52, 449, f.detail, 11) +
  rect(51, 485, 177, 43, "#151A2A", 5, "#8B9DC733") +
  text(69, 512, f.action, 11, "#CDD6EC") +
  rect(574, 106, 488, 457, "#101522", 0) +
  `<ellipse cx="822" cy="327" rx="225" ry="250" fill="url(#aura)"/><ellipse cx="819" cy="506" rx="147" ry="25" fill="#05060A" opacity=".5"/>` +
  rect(666, 406, 309, 99, "#171E2F", 0) +
  `<path d="M700 407V267C700 184 746 158 805 158S912 198 912 267V407H866V267C866 222 843 206 806 206S747 227 747 267V407Z" fill="url(#sculpture)"/><path d="M912 267 940 287V421L912 407Z" fill="#28324c"/><path d="M700 407 729 421H940L912 407Z" fill="#4a5677"/><path d="M666 406 699 425H1005L975 406Z" fill="#2a3552"/><path d="M975 406 1005 425V525L975 505Z" fill="#0b101d"/>` +
  text(598, 538, f.product, 11, "#AEB9D5") +
  text(598, 129, f.meta, 7, "#7C89AA", 400, 'letter-spacing="2"') +
  line(36, 594, 1064, 594) +
  text(50, 622, f.footer, 8, "#7F8AA6", 400, 'letter-spacing="2"') +
  text(1000, 622, f.index, 9, "#A3AEC9");
await writeFile(`${dir}/forma.svg`, wrap(forma));
console.log("Generated 3 original project illustrations from content/site.ts.");
