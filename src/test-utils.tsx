import type { ReactNode } from "react";
import { render } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { neoBrutalTheme } from "./themes";

export function ThemeWrapper({ children }: { children: ReactNode }) {
  return <ThemeProvider theme={neoBrutalTheme}>{children}</ThemeProvider>;
}

function customRender(ui: ReactNode, options?: RenderOptions) {
  return render(ui, { wrapper: ThemeWrapper, ...options });
}

export * from "@testing-library/react";
export { customRender as render };
