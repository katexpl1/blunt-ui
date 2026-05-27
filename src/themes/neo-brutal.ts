import type { Theme } from "./types";

function contrastColor(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const toLinear = (c: number) =>
    c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  const L = 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);

  return L > 0.179 ? "#111111" : "#ffffff";
}

export const neoBrutalTheme: Theme = {
  colors: {
    primary: {
      50: "#fffde6",
      500: "#ffd000",
      700: "#ffd000",
      contrast: "#111111",
    },
    neutral: {
      0: "#ffffff",
      100: "#f5f0e8",
      200: "#e8e3db",
      300: "#ccc8c0",
      400: "#a8a49c",
      500: "#706c64",
      600: "#3c3830",
      900: "#111111",
    },
    error: { 50: "#fff0f0", 500: "#ff3333" },
    success: { 50: "#f0fff4", 500: "#00cc44" },
    warning: { 50: "#fffbe6", 500: "#ff9900" },
    info: { 50: "#f0f0ff", 500: "#3333ff" },
  },
  spacing: { 1: "4px", 2: "8px", 3: "12px", 4: "16px", 5: "20px", 6: "24px" },
  radius: { md: "2px" },
  zIndex: { modal: 1000, toast: 1100 },
  fontSizes: { xs: "12px", sm: "14px", md: "16px", lg: "18px" },
  shadows: { focusRing: "3px 3px 0 #111111" },
  brutalism: { borderWidth: "2px", shadowOffset: "4px" },
};

export function createNeoBrutalTheme(accent: string): Theme {
  return {
    ...neoBrutalTheme,
    colors: {
      ...neoBrutalTheme.colors,
      primary: {
        50: "#fffff0",
        500: accent,
        700: accent,
        contrast: contrastColor(accent),
      },
    },
  };
}
