import type { Preview } from "@storybook/react-vite";
import React from "react";
import { GlobalStyles } from "../src/styles/GlobalStyles";
import { ThemeProvider } from "../src/components/ThemeProvider";
import { defaultTheme, neoBrutalTheme } from "../src/themes";

const themes = { default: defaultTheme, "neo-brutal": neoBrutalTheme } as const;

const withGlobalStyles = (Story: any, context: any) => {
  const theme =
    themes[context.globals.theme as keyof typeof themes] ?? defaultTheme;
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Story />
    </ThemeProvider>
  );
};

const preview: Preview = {
  globalTypes: {
    theme: {
      description: "Theme",
      toolbar: {
        title: "Theme",
        icon: "paintbrush",
        items: [
          { value: "neo-brutal", title: "Neo Brutal" },
          { value: "default", title: "Default" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: "neo-brutal",
  },
  decorators: [withGlobalStyles],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "error",
    },
  },
};

export default preview;
