"use client";

import { createContext, useContext, type MutableRefObject } from "react";
import type { EmberHuskChoreography } from "@/components/originkit/ui/hero-69/ember-husk";

export const IntroActiveContext = createContext(false);
export const useIntroActive = () => useContext(IntroActiveContext);

export const StoneContinuityContext = createContext<{
  mount: HTMLDivElement | null;
  staging: boolean;
  started: boolean;
  compact: boolean;
  ready: boolean;
  cue: MutableRefObject<EmberHuskChoreography>;
  onReady: () => void;
  onError: () => void;
} | null>(null);
