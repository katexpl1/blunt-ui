import { colors, spacing, fontSizes, radius, zIndex } from "../consts";
import type { Theme } from "./types";

export const defaultTheme: Theme = {
  colors: { ...colors, primary: { ...colors.primary, contrast: "#ffffff" } },
  spacing,
  fontSizes,
  radius,
  zIndex,
  shadows: {
    focusRing: "0 0 0 2px rgba(0, 112, 243, 0.25)",
  },
};
