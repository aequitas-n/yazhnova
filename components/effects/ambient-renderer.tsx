"use client";
import { useEffect, useRef } from "react";
import type { AmbientMode } from "./ambient";

// Shared render loop keeps every decorative canvas capped at 24 fps and dormant off-screen.
export default function AmbientRenderer({ mode, active }: { mode: AmbientMode; active: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !ctx) return;
    let width = 0,
      height = 0,
      frame = 0,
      last = 0;
    let visible = !document.hidden;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(performance.now() / 1000);
    };
    const draw = (time: number) => {
      if (!width || !height) return;
      const t = reduced.matches ? 0 : time;
      ctx.clearRect(0, 0, width, height);
      if (mode === "pixels") {
        const gap = 12;
        for (let x = 0; x < width; x += gap)
          for (let y = 0; y < height; y += gap) {
            const wave = Math.sin(x / 42 + t * 0.45) * Math.cos(y / 45 - t * 0.3);
            const fade = Math.max(
              0,
              1 - Math.hypot((x - width * 0.5) / width, (y - height * 0.55) / height) * 1.5,
            );
            ctx.fillStyle = `rgba(${wave > 0.55 ? "110,231,255" : "59,107,255"},${(0.12 + Math.max(0, wave) * 0.72) * fade})`;
            const size = wave > 0.5 ? 5 : 2;
            ctx.fillRect(x, y, size, size);
          }
      } else if (mode === "liquid") {
        ctx.lineWidth = 1;
        for (let row = 0; row < 14; row++) {
          ctx.beginPath();
          for (let x = -20; x < width + 20; x += 5) {
            const y =
              height * 0.24 +
              row * 12 +
              Math.sin(x / 65 + row * 0.17 + t * 0.35) * 26 +
              Math.cos(x / 95 + t * 0.3) * 13;
            if (x === -20) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.strokeStyle = `rgba(123,92,255,${0.16 + Math.sin((row / 14) * Math.PI) * 0.5})`;
          ctx.stroke();
        }
        for (let col = 0; col < 21; col++) {
          ctx.beginPath();
          for (let row = 0; row <= 14; row += 0.2) {
            const x = (col * width) / 20;
            const y =
              height * 0.24 +
              row * 12 +
              Math.sin(x / 65 + row * 0.17 + t * 0.35) * 26 +
              Math.cos(x / 95 + t * 0.3) * 13;
            if (row === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.strokeStyle = "rgba(123,92,255,.2)";
          ctx.stroke();
        }
      } else if (mode === "sphere") {
        const x = width * 0.5,
          y = height * 0.5 + Math.sin(t * 0.55) * 5,
          r = Math.min(width, height) * 0.29;
        const aura = ctx.createRadialGradient(x, y, r * 0.3, x, y, r * 2.1);
        aura.addColorStop(0, "#3B6BFF50");
        aura.addColorStop(1, "#3B6BFF00");
        ctx.fillStyle = aura;
        ctx.fillRect(0, 0, width, height);
        const globe = ctx.createRadialGradient(
          x - r * 0.35,
          y - r * 0.5,
          0,
          x + r * 0.22,
          y + r * 0.15,
          r * 1.2,
        );
        globe.addColorStop(0, "#b9e4ff");
        globe.addColorStop(0.18, "#7196ff");
        globe.addColorStop(0.4, "#3B6BFF");
        globe.addColorStop(0.75, "#142459");
        globe.addColorStop(0.95, "#050b20");
        globe.addColorStop(1, "#7B5CFF");
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = globe;
        ctx.fill();
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(-0.3);
        ctx.scale(1, 0.3);
        ctx.beginPath();
        ctx.arc(0, 0, r * 1.45, 0, Math.PI * 2);
        ctx.strokeStyle = "#6EE7FF60";
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();
      } else if (mode === "lattice") {
        const gap = 48;
        ctx.strokeStyle = "rgba(110,231,255,.045)";
        ctx.lineWidth = 1;
        for (let x = 0; x < width; x += gap) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
        }
        for (let y = 0; y < height; y += gap) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }
        for (let i = 0; i < 16; i++) {
          const x = (i * 137.7 + t * 17) % width,
            y = Math.floor(((i * 79.7) % height) / gap) * gap;
          const glow = ctx.createRadialGradient(x, y, 0, x, y, 22);
          glow.addColorStop(0, "#6EE7FF50");
          glow.addColorStop(1, "#6EE7FF00");
          ctx.fillStyle = glow;
          ctx.fillRect(x - 22, y - 22, 44, 44);
          ctx.fillStyle = "#6EE7FF";
          ctx.fillRect(x, y, 2, 2);
        }
      } else if (mode === "fluid") {
        for (let i = 0; i < 3; i++) {
          const x = width * (0.25 + i * 0.24) + Math.sin(t * 0.15 + i) * width * 0.1;
          const y = height * (0.4 + Math.cos(t * 0.12 + i) * 0.17);
          const r = Math.max(width, height) * 0.55;
          const gradient = ctx.createRadialGradient(x, y, 0, x, y, r);
          gradient.addColorStop(0, i % 2 ? "#7B5CFF18" : "#3B6BFF16");
          gradient.addColorStop(1, "#05060A00");
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, width, height);
        }
      } else if (mode === "gate") {
        const x = width / 2,
          y = height / 2;
        for (let i = 0; i < 14; i++) {
          const phase = (i / 14 + t * 0.023) % 1;
          const radius = 28 + phase * Math.max(width, height) * 0.7;
          ctx.save();
          ctx.translate(x, y);
          ctx.scale(1, 0.48);
          ctx.beginPath();
          ctx.arc(0, 0, radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(123,92,255,${(1 - phase) * 0.3})`;
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.restore();
        }
      }
    };
    const loop = (now: number) => {
      if (now - last > 1000 / 24) {
        draw(now / 1000);
        last = now;
      }
      frame = requestAnimationFrame(loop);
    };
    const sync = () => {
      cancelAnimationFrame(frame);
      if (active && visible && !reduced.matches) frame = requestAnimationFrame(loop);
      else draw(performance.now() / 1000);
    };
    const onVisibility = () => {
      visible = !document.hidden;
      sync();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    document.addEventListener("visibilitychange", onVisibility);
    reduced.addEventListener("change", sync);
    resize();
    sync();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      reduced.removeEventListener("change", sync);
    };
  }, [mode, active]);
  return <canvas ref={ref} />;
}
