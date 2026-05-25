import { useState, useDeferredValue, useMemo } from "react";
import { Badge } from "./components/Badge";
import { Button } from "./components/Button";
import { Link } from "./components/Link";
import { ThemeProvider } from "./components/ThemeProvider";
import { GlobalStyles } from "./styles/GlobalStyles";
import { createNeoBrutalTheme } from "./themes";
import {
  Page,
  Card,
  CardAccent,
  CardBody,
  Title,
  Subtitle,
  BadgeRow,
  Actions,
  Credit,
  ColorPickerRow,
  ColorPickerLabel,
  ColorInput,
} from "./App.styles";

const BADGES = [
  "React",
  "TypeScript",
  "styled-components",
  "8 components",
  "2 hooks",
];

function App() {
  const [accent, setAccent] = useState("#ffd000");
  const deferredAccent = useDeferredValue(accent);
  const theme = useMemo(
    () => createNeoBrutalTheme(deferredAccent),
    [deferredAccent],
  );

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Page>
        <Card>
          <CardAccent>blunt-ui</CardAccent>
          <CardBody>
            <Title>blunt-ui</Title>
            <Subtitle>
              A React component library with bold, no-nonsense styling. Thick
              borders, offset shadows, zero fluff.
            </Subtitle>
            <BadgeRow>
              {BADGES.map((b) => (
                <Badge key={b} variant="primary">
                  {b}
                </Badge>
              ))}
            </BadgeRow>
            <Actions>
              <Button
                href="https://blunt-ui-storybook.vercel.app"
                target="_blank"
                rel="noreferrer"
              >
                Open Storybook
              </Button>
              <Button
                variant="secondary"
                href="https://github.com/katexpl1"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </Button>
            </Actions>
            <ColorPickerRow>
              <ColorInput
                id="accent-picker"
                type="color"
                value={accent}
                onChange={(e) => setAccent(e.target.value)}
              />
              <ColorPickerLabel htmlFor="accent-picker">
                Play with colors
              </ColorPickerLabel>
            </ColorPickerRow>
            <Credit>
              made by{" "}
              <Link
                href="https://github.com/katexpl1"
                variant="subtle"
                external
              >
                kasia kubisiak
              </Link>
            </Credit>
          </CardBody>
        </Card>
      </Page>
    </ThemeProvider>
  );
}

export default App;
