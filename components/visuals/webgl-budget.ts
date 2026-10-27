"use client";
import { useEffect, useId, useSyncExternalStore } from "react";

// Viewport candidates share two leases. React cleans up retiring surfaces before
// mounting replacements, so the budget also holds at section boundaries.
const candidates = new Map<string, number>();
let leases = new Set<string>();
const listeners = new Set<() => void>();
const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};
function rank() {
  const next = new Set(
    [...candidates]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 2)
      .map(([id]) => id),
  );
  if (next.size === leases.size && [...next].every((id) => leases.has(id))) return;
  leases = next;
  listeners.forEach((listener) => listener());
}
export function useWebGLBudget(enabled: boolean, priority: number, needsWebGL: boolean) {
  const id = useId();
  const granted = useSyncExternalStore(
    subscribe,
    () => leases.has(id),
    () => false,
  );
  useEffect(() => {
    if (!enabled || !needsWebGL) return;
    candidates.set(id, priority);
    rank();
    return () => {
      candidates.delete(id);
      rank();
    };
  }, [id, enabled, needsWebGL, priority]);
  return enabled && (!needsWebGL || granted);
}
