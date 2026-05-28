export const colors = {
  primary: {
    50: "#f0f8ff",
    500: "#0070f3",
    700: "#005bb5",
  },
  neutral: {
    0: "#ffffff",
    100: "#f5f5f5",
    200: "#eaeaea",
    300: "#cacaca",
    400: "#cccccc",
    500: "#666666",
    600: "#333333",
    900: "#111111",
  },
  error: {
    50: "#fef2f2",
    500: "#d32f2f",
  },
  success: {
    50: "#f0fdf4",
    500: "#16a34a",
  },
  warning: {
    50: "#fffbeb",
    500: "#d97706",
  },
  info: {
    50: "#eff6ff",
    500: "#2563eb",
  },
} as const;

export const spacing = {
  1: "4px",
  2: "8px",
  3: "12px",
  4: "16px",
  5: "20px",
  6: "24px",
} as const;

export const radius = {
  md: "6px",
} as const;

export const zIndex = {
  modal: 1000,
  toast: 1100,
} as const;

export const fontSizes = {
  xs: "12px",
  sm: "14px",
  md: "16px",
  lg: "18px",
} as const;
