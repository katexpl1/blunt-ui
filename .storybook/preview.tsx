import type { Preview } from "@storybook/react-vite";
import React from "react";
import { GlobalStyles, ThemeProvider, neoBrutalTheme } from "../src/themes";

const withGlobalStyles = (Story: any) => {
  return (
    <ThemeProvider theme={neoBrutalTheme}>
      <GlobalStyles />
      <Story />
    </ThemeProvider>
  );
};

const preview: Preview = {
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
