import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { neoBrutalTheme as defaultTheme } from "./neo-brutal";
import type { Theme } from "./types";

interface ThemeProviderProps {
  theme?: Theme;
  children: React.ReactNode;
}

export function ThemeProvider({
  theme = defaultTheme,
  children,
}: ThemeProviderProps) {
  return <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>;
}
