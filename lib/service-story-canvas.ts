import { serviceStories as copy } from "@/content/site";
export type StoryId = keyof typeof copy.steps;
const INK = "#0A0A0A",
  PANEL = "#141414",
  LINE = "#414141",
  PAPER = "#F4F2EC",
  GREY = "#909090",
  ORANGE = "#FF3B00";
const clamp = (n: number) => Math.max(0, Math.min(1, n));
const ease = (n: number) => 1 - Math.pow(1 - clamp(n), 3);
function rect(
  c: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  fill = PANEL,
  radius = 0,
  stroke = "",
) {
  c.beginPath();
  c.roundRect(x, y, w, h, radius);
  c.fillStyle = fill;
  c.fill();
  if (stroke) {
    c.strokeStyle = stroke;
    c.lineWidth = 1.5;
    c.stroke();
  }
}
function text(
  c: CanvasRenderingContext2D,
  value: string,
  x: number,
  y: number,
  size = 18,
  color = PAPER,
  weight = 400,
  mono = false,
) {
  c.font = weight + " " + size + "px " + (mono ? "Geist Mono" : "Inter Tight");
  c.fillStyle = color;
  c.fillText(value, x, y);
}
function rule(c: CanvasRenderingContext2D, x: number, y: number, w: number, color = LINE) {
  rect(c, x, y, w, 1, color);
}
function pointer(c: CanvasRenderingContext2D, x: number, y: number, clicking = false) {
  c.save();
  c.translate(x, y);
  c.beginPath();
  c.moveTo(0, 0);
  c.lineTo(0, 29);
  c.lineTo(8, 21);
  c.lineTo(15, 34);
  c.lineTo(22, 30);
  c.lineTo(15, 17);
  c.lineTo(27, 17);
  c.closePath();
  c.fillStyle = PAPER;
  c.fill();
  c.strokeStyle = INK;
  c.lineWidth = 2;
  c.stroke();
  if (clicking) {
    c.beginPath();
    c.arc(4, 4, 32, 0, Math.PI * 2);
    c.strokeStyle = ORANGE;
    c.lineWidth = 3;
    c.stroke();
  }
  c.restore();
}
function browser(c: CanvasRenderingContext2D, url: string) {
  rect(c, 55, 70, 890, 620, INK, 10, LINE);
  rect(c, 55, 70, 890, 45, PANEL, 10);
  [ORANGE, LINE, LINE].forEach((color, i) => rect(c, 75 + i * 16, 88, 7, 7, color, 4));
  rect(c, 225, 80, 560, 24, "#222222", 4);
  text(c, url, 245, 97, 11, GREY, 400, true);
  rule(c, 55, 114, 890);
}
function web(c: CanvasRenderingContext2D, seconds: number, design: boolean) {
  const hi = clamp((seconds - 1.8) / 1.1),
    scroll = design ? 0 : ease((seconds - 3.25) / 0.85) * 75;
  browser(c, design ? copy.design.url : copy.web.url);
  c.save();
  c.beginPath();
  c.rect(56, 116, 888, 574);
  c.clip();
  c.translate(0, -scroll);
  const end = design ? 685 : 900;
  text(c, copy.web.brand, 92, 157, 18, hi > 0.2 ? PAPER : GREY, 600);
  if (!design) copy.web.nav.forEach((label, i) => text(c, label, 640 + i * 92, 155, 13, GREY));
  rule(c, 90, 180, end - 90);
  if (hi < 0.1) {
    [0, 1].forEach((row) => rect(c, 92, 234 + row * 65, 440 - row * 85, 32, LINE));
    rect(c, 92, 390, 360, 10, LINE);
    rect(c, 92, 414, 280, 10, LINE);
    rect(c, 92, 462, 185, 45, "#252525", 0, GREY);
    for (let i = 0; i < 3; i++)
      rect(c, 92 + i * (design ? 190 : 275), 550, design ? 170 : 250, 110, PANEL, 0, LINE);
  } else {
    c.globalAlpha = hi;
    if (design) {
      text(c, copy.design.title, 92, 280, 45, PAPER, 500);
      text(c, copy.web.description, 92, 322, 17, GREY);
    } else {
      copy.web.headline.forEach((line, i) => text(c, line, 92, 275 + i * 65, 65, PAPER, 500));
      text(c, copy.web.description, 94, 393, 20, GREY);
    }
    const radius = design ? ease((seconds - 3.4) / 1.2) * 22 : 3;
    rect(c, 92, design ? 370 : 440, 215, 52, seconds > 3.65 || !design ? ORANGE : GREY, radius);
    text(
      c,
      design ? copy.design.button : seconds > 4.9 ? copy.web.live : copy.web.action,
      111,
      design ? 402 : 472,
      17,
      INK,
      500,
    );
    for (let i = 0; i < 3; i++) {
      const x = 92 + i * (design ? 190 : 275),
        width = design ? 170 : 250;
      rect(c, x, design ? 478 : 550, width, 115, PANEL, 6, LINE);
      text(c, "0" + (i + 1), x + 18, design ? 510 : 584, 12, ORANGE, 400, true);
      text(c, copy.web.cards[i], x + 18, design ? 551 : 625, design ? 16 : 20, PAPER, 500);
      rule(c, x + 18, design ? 574 : 648, width - 60);
    }
    c.globalAlpha = 1;
  }
  c.restore();
  if (design) {
    rect(c, 705, 116, 239, 573, PANEL);
    text(c, copy.design.label, 725, 160, 11, GREY, 400, true);
    rule(c, 724, 185, 198);
    text(c, copy.design.component, 725, 230, 18, PAPER, 500);
    text(c, copy.design.radius, 725, 286, 15, GREY);
    text(c, Math.round(ease((seconds - 3.4) / 1.2) * 22) + " px", 860, 286, 13, PAPER, 400, true);
    rect(c, 725, 310, 190, 3, LINE);
    const sx = 725 + ease((seconds - 3.4) / 1.2) * 175;
    rect(c, sx, 303, 12, 17, ORANGE, 3);
    text(c, copy.design.color, 725, 375, 15, GREY);
    [GREY, ORANGE, "#3B3B3B"].forEach((color, i) =>
      rect(c, 725 + i * 57, 398, 43, 36, color, 4, i === 1 && seconds > 3.8 ? PAPER : ""),
    );
    if (seconds > 2.8)
      pointer(
        c,
        seconds < 4.25 ? sx + 5 : 798,
        seconds < 4.25 ? 315 : 419,
        seconds > 3.6 && seconds < 4.2,
      );
  } else if (seconds > 3.7) {
    const move = ease((seconds - 3.7) / 1.1);
    pointer(
      c,
      610 + (200 - 610) * move,
      325 + (465 - scroll - 325) * move,
      seconds > 4.8 && seconds < 5.1,
    );
  }
}
function dashboard(c: CanvasRenderingContext2D, seconds: number, tenant: string) {
  const grow = ease((seconds - 0.7) / 1.5),
    line = clamp((seconds - 1.8) / 1.2);
  rect(c, 0, 0, 880, 570, INK, 10, LINE);
  rect(c, 0, 0, 168, 570, PANEL, 10);
  text(c, copy.saas.brand, 25, 49, 29, PAPER, 600);
  copy.saas.nav.forEach((label, i) => {
    if (i === 0) rect(c, 12, 90 + i * 45, 144, 35, "#242424", 4);
    text(c, label, 28, 113 + i * 45, 14, i === 0 ? PAPER : GREY);
  });
  text(c, tenant.toUpperCase(), 194, 39, 10, ORANGE, 400, true);
  text(c, copy.saas.title, 194, 83, 35, PAPER, 500);
  rect(c, 693, 45, 159, 35, seconds > 3.6 ? ORANGE : PANEL, 4, LINE);
  text(c, copy.saas.action, 709, 68, 13, seconds > 3.6 ? INK : PAPER, 500);
  for (let i = 0; i < 3; i++) {
    const x = 194 + i * 222;
    rect(c, x, 111, 209, 99, PANEL, 5, seconds > 1.65 && seconds < 2.35 ? ORANGE : LINE);
    text(c, copy.saas.kpis[i], x + 15, 137, 12, GREY);
    text(c, copy.saas.values[i], x + 15, 185, 34, PAPER, 500);
  }
  rect(c, 194, 234, 658, 302, PANEL, 5, LINE);
  text(c, copy.saas.chart, 214, 268, 19, PAPER, 500);
  text(c, copy.saas.period, 746, 267, 12, GREY);
  for (let i = 0; i < 5; i++) rule(c, 220, 305 + i * 45, 600, "#2B2B2B");
  const heights = [44, 76, 58, 115, 85, 142, 130, 168, 150, 186, 166, 205];
  heights.forEach((height, i) =>
    rect(c, 224 + i * 49, 508 - height * grow, 28, height * grow, i > 8 ? ORANGE : "#515151", 3),
  );
  c.strokeStyle = ORANGE;
  c.lineWidth = 3;
  c.beginPath();
  for (let i = 0; i <= Math.floor(heights.length * line); i++) {
    const x = 237 + i * 49,
      y = 485 - (heights[Math.min(i, heights.length - 1)] + 12) * 0.8;
    if (i === 0) c.moveTo(x, y);
    else c.lineTo(x, y);
  }
  c.stroke();
}
function saas(c: CanvasRenderingContext2D, seconds: number) {
  const stack = ease((seconds - 3.85) / 1.5);
  if (stack > 0.05) {
    text(c, copy.saas.stacked, 65, 105, 38, PAPER, 500);
    for (let i = 0; i < 3; i++) {
      const scale = 1 - stack * 0.28;
      c.save();
      c.translate(60 + stack * i * 80, 90 + stack * (55 + i * 65));
      c.scale(scale, scale);
      dashboard(c, seconds, copy.saas.tenants[i]);
      c.restore();
    }
    text(c, copy.saas.isolated, 65, 735, 11, GREY, 400, true);
  } else {
    c.save();
    c.translate(60, 95);
    dashboard(c, seconds, copy.saas.tenants[0]);
    c.restore();
  }
  if (seconds > 3.1 && seconds < 4.3) pointer(c, 820, 160, seconds > 3.7);
}
function mobile(c: CanvasRenderingContext2D, seconds: number) {
  const screen =
    seconds < 2.15
      ? 0
      : seconds < 3.5
        ? ease((seconds - 2.15) / 0.75)
        : 1 + ease((seconds - 3.5) / 0.75);
  for (let i = 0; i < 3; i++) {
    c.save();
    c.translate((i - screen) * 390, 0);
    rect(c, 0, 0, 390, 760, INK);
    text(c, copy.mobile.time, 25, 32, 13, PAPER, 600);
    text(c, copy.mobile.brand, 25, 97, 28, PAPER, 600);
    text(c, copy.mobile.date, 25, 146, 10, ORANGE, 400, true);
    const words = copy.mobile.screens[i].split(" ");
    text(c, words.slice(0, 2).join(" "), 25, 197, 35, PAPER, 500);
    text(c, words.slice(2).join(" "), 25, 237, 35, PAPER, 500);
    for (let j = 0; j < 3; j++) {
      rect(c, 25, 279 + j * 94, 340, 78, PANEL, 10, LINE);
      rect(c, 42, 301 + j * 94, 29, 29, j === i ? ORANGE : LINE, 7);
      text(c, copy.mobile.cards[(j + i) % 3], 86, 312 + j * 94, 16, PAPER, 500);
      rule(c, 86, 333 + j * 94, 180, LINE);
    }
    rect(c, 25, 601, 340, 50, ORANGE, 10);
    text(c, copy.mobile.action, 157, 633, 17, INK, 500);
    rule(c, 25, 684, 340);
    copy.mobile.sections.forEach((label, j) =>
      text(c, label, 38 + j * 122, 719, 13, j === i ? ORANGE : GREY),
    );
    c.restore();
  }
  if (seconds > 4.45) {
    const y = -110 + ease((seconds - 4.45) / 0.8) * 167;
    rect(c, 12, y, 366, 91, "#252525", 12, ORANGE);
    text(c, copy.mobile.sender, 29, y + 28, 11, ORANGE, 500, true);
    text(c, copy.mobile.notification, 29, y + 60, 18, PAPER, 500);
  }
}
export function drawServiceStory(canvas: HTMLCanvasElement, id: StoryId, milliseconds: number) {
  const width = id === "mobile" ? 390 : 1000;
  if (canvas.width !== width) canvas.width = width;
  if (canvas.height !== 760) canvas.height = 760;
  const c = canvas.getContext("2d")!;
  rect(c, 0, 0, canvas.width, canvas.height, INK);
  const seconds = Math.min(copy.duration, milliseconds) / 1000;
  if (id === "web" || id === "design") web(c, seconds, id === "design");
  else if (id === "saas") saas(c, seconds);
  else if (id === "mobile") mobile(c, seconds);
}
