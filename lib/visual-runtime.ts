"use client";

import { useEffect, useSyncExternalStore } from "react";

export type VisualTier = {
  name: "high" | "mid" | "low";
  dprCap: number;
  density: number;
  fps: number;
  post: boolean;
};
const high: VisualTier = { name: "high", dprCap: 1.5, density: 1, fps: 60, post: true };
const mid: VisualTier = { name: "mid", dprCap: 1.25, density: 0.6, fps: 60, post: false };
const low: VisualTier = { name: "low", dprCap: 1, density: 0.35, fps: 30, post: false };
let cachedTier: VisualTier | undefined,
  cachedWidth = 0,
  checked = 0;
export function getVisualTier(): VisualTier {
  if (typeof window === "undefined" || typeof navigator === "undefined") return low;
  if (cachedTier && cachedWidth === innerWidth && performance.now() - checked < 1000)
    return cachedTier;
  cachedWidth = innerWidth;
  checked = performance.now();
  const device = navigator as Navigator & {
    deviceMemory?: number;
    connection?: { saveData?: boolean };
  };
  if (
    device.connection?.saveData ||
    (device.deviceMemory ?? 8) <= 4 ||
    (device.hardwareConcurrency || 8) <= 4 ||
    innerWidth < 768 ||
    matchMedia("(pointer:coarse)").matches
  )
    return (cachedTier = low);
  return (cachedTier =
    (device.deviceMemory ?? 8) < 8 || (device.hardwareConcurrency || 8) < 8 ? mid : high);
}

type Candidate = { priority: number; group?: string };
const candidates = new Map<string, Candidate>();
const listeners = new Set<() => void>();
let leases = new Set<string>();
let observing = false;
function rank() {
  const next = new Set<string>();
  const groups = new Set<string>();
  if (!document.hidden && !matchMedia("(prefers-reduced-motion:reduce)").matches) {
    for (const [id, candidate] of [...candidates].sort((a, b) => b[1].priority - a[1].priority)) {
      if (candidate.group && groups.has(candidate.group)) continue;
      next.add(id);
      if (candidate.group) groups.add(candidate.group);
      if (next.size === 2) break;
    }
  }
  if (next.size === leases.size && [...next].every((id) => leases.has(id))) return;
  leases = next;
  listeners.forEach((notify) => notify());
}
function subscribe(notify: () => void) {
  listeners.add(notify);
  if (!observing) {
    observing = true;
    document.addEventListener("visibilitychange", () => {
      rank();
      if (!document.hidden) {
        if (frames.size && !animation) animation = window.requestAnimationFrame(tick);
        if (startups.size) scheduleStartup();
      }
    });
    matchMedia("(prefers-reduced-motion:reduce)").addEventListener("change", rank);
  }
  return () => {
    listeners.delete(notify);
  };
}
export function useVisualSlot(id: string, enabled: boolean, priority = 0, group?: string) {
  const granted = useSyncExternalStore(
    subscribe,
    () => leases.has(id),
    () => false,
  );
  useEffect(() => {
    if (!enabled) return;
    candidates.set(id, { priority, group });
    rank();
    return () => {
      candidates.delete(id);
      rank();
    };
  }, [id, enabled, group]);
  useEffect(() => {
    if (candidates.has(id)) {
      candidates.set(id, { priority, group });
      rank();
    }
  }, [id, priority, group]);
  return enabled && granted;
}

// All native canvas loops share a cadence, rather than each waking the browser
// independently. Handles remain cancellable even while a frame is deferred.
const frames = new Map<number, FrameRequestCallback>();
let serial = 0,
  animation = 0,
  last = 0;
function tick(now: number) {
  animation = 0;
  if (document.hidden) return;
  const interval = 1000 / getVisualTier().fps;
  const elapsed = now - last;
  if (elapsed >= interval - 1) {
    last += Math.max(1, Math.floor((elapsed + 1) / interval)) * interval;
    const batch = [...frames];
    for (const [id, callback] of batch) {
      if (!frames.delete(id)) continue;
      callback(now);
    }
  }
  if (frames.size && !animation) animation = window.requestAnimationFrame(tick);
}
export function requestVisualFrame(callback: FrameRequestCallback) {
  const id = ++serial;
  frames.set(id, callback);
  if (!animation && !document.hidden) animation = window.requestAnimationFrame(tick);
  return id;
}
export function cancelVisualFrame(id: number) {
  frames.delete(id);
  if (!frames.size && animation) {
    window.cancelAnimationFrame(animation);
    animation = 0;
  }
}

// One cancellable, idle startup at a time. No eager below-fold shader boot work.
const startups = new Map<number, () => void>();
let startupSerial = 0,
  startupScheduled = false;
let painted = false,
  waitingForPaint = false;
function startNext() {
  startupScheduled = false;
  const job = startups.entries().next().value;
  if (job && !document.hidden) {
    startups.delete(job[0]);
    job[1]();
  }
  if (startups.size && !document.hidden) scheduleStartup();
}
function scheduleStartup() {
  if (
    !painted &&
    typeof PerformanceObserver !== "undefined" &&
    PerformanceObserver.supportedEntryTypes?.includes("paint")
  ) {
    painted = performance.getEntriesByName("first-contentful-paint").length > 0;
    if (!painted) {
      if (!waitingForPaint) {
        waitingForPaint = true;
        let fallback: ReturnType<typeof setTimeout>;
        const observer = new PerformanceObserver((list) => {
          if (list.getEntries().some((entry) => entry.name === "first-contentful-paint")) release();
        });
        const release = () => {
          painted = true;
          observer.disconnect();
          clearTimeout(fallback);
          scheduleStartup();
        };
        observer.observe({ type: "paint", buffered: true });
        fallback = setTimeout(release, 1800);
      }
      return;
    }
  }
  if (startupScheduled) return;
  startupScheduled = true;
  if ("requestIdleCallback" in window) window.requestIdleCallback(startNext, { timeout: 1500 });
  else setTimeout(startNext, 120);
}
export function scheduleVisualStart(callback: () => void) {
  const id = ++startupSerial;
  startups.set(id, callback);
  // Two paints let semantic content and the poster reach the screen first.
  const frame = window.requestAnimationFrame(() => window.requestAnimationFrame(scheduleStartup));
  return () => {
    startups.delete(id);
    window.cancelAnimationFrame(frame);
  };
}

export async function yieldVisualTask() {
  const scheduler = (
    globalThis as typeof globalThis & { scheduler?: { yield: () => Promise<void> } }
  ).scheduler;
  if (scheduler?.yield) await scheduler.yield();
  else await new Promise<void>((resolve) => setTimeout(resolve, 0));
}
