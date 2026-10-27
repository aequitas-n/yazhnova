"use client";

import { createContext, useContext } from "react";

export const IntroActiveContext = createContext(false);
export const useIntroActive = () => useContext(IntroActiveContext);
