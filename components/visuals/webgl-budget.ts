"use client";
import { useId } from "react";
import { useVisualSlot } from "@/lib/visual-runtime";
// Compatibility for older consumers: full-screen 2D now shares the same budget.
export function useWebGLBudget(enabled: boolean, priority: number, _needsWebGL: boolean) {
  return useVisualSlot(useId(), enabled, priority);
}
