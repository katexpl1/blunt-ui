export interface Theme {
  colors: {
    primary: { 50: string; 500: string; 700: string; contrast: string };
    neutral: {
      0: string;
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      900: string;
    };
    error: { 50: string; 500: string };
    success: { 50: string; 500: string };
    warning: { 50: string; 500: string };
    info: { 50: string; 500: string };
  };
  spacing: { 1: string; 2: string; 3: string; 4: string; 5: string; 6: string };
  radius: { md: string };
  zIndex: { modal: number; toast: number };
  fontSizes: { xs: string; sm: string; md: string; lg: string };
  shadows: { focusRing: string };
  brutalism?: {
    borderWidth: string;
    shadowOffset: string;
  };
}
