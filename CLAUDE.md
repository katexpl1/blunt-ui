# CLAUDE.md — blunt-ui

## Tech stack

- **React 19**, **TypeScript**
- **styled-components** — all styling
- **Vite** — dev server and library build
- **Jest + Testing Library** — unit tests
- **Storybook** — component stories

## File structure

Each component has its own folder. Every file inside follows `ComponentName.<role>.ts(x)`:

```
ComponentName/
  tests/                     # all test files
    ComponentName.test.tsx
    ComponentName.hooks.test.ts  (if needed)
  stories/                   # all Storybook stories
    ComponentName.stories.tsx
  ComponentName.tsx          # main component
  ComponentName.styles.ts    # styled-components only
  ComponentName.types.ts     # TypeScript interfaces and string union type aliases
  ComponentName.helpers.ts   # pure utility functions (if needed)
  ComponentName.hooks.ts     # pure hook functions only (if needed)
  ComponentName.provider.tsx # React Context + Provider component (if needed)
  ComponentName.consts.ts    # constants (if needed)
  index.ts                   # re-exports only — no logic
```

If a component has complex utilities (like Form's validators), those go in their own subfolder too:

```
Form/
  tests/
  stories/
  validators/
    Form.validators.ts
  FormField/         # sub-component with its own structure
  ...
```

**One folder = one component.** If a component is complex enough to have sub-parts, each sub-part gets its own subfolder with the same structure (e.g. `Form/FormField/`).

**No types or constants in hooks or provider files.** Interfaces belong in `.types.ts`. Constants belong in `.consts.ts`.

## Provider (`.provider.tsx`)

Use `.provider.tsx` when a component is used **imperatively** via React Context — meaning it needs to be triggered from anywhere in the component tree without passing props down. Examples: `Toast`, `ConfirmDialog`.

The `.provider.tsx` file contains:

- The exported context object (`createContext`) — exported so the consumer hook can import it
- The `Provider` component only

The consumer hook (`useXxx`) lives in the separate `.hooks.ts` file and imports the context from `.provider.tsx`:

```ts
// ConfirmDialog.hooks.ts
import { ConfirmContext } from "./ConfirmDialog.provider";

export function useConfirm(): ConfirmFn {
  const confirmContext = useContext(ConfirmContext);
  ...
}
```

Regular components (`Button`, `Modal`, etc.) don't need a provider because they're used declaratively — you render them where you need them.

## Hooks (`.hooks.ts`)

- Pure hook functions only — `useXxx` returning `{ a, b, c }` or a value
- No Provider components, no interfaces, no constants
- Interfaces for hook options/return types go in `.types.ts`

## Types (`.types.ts`)

- All TypeScript interfaces and type aliases live here
- Use **string union types**, not enums:

  ```ts
  // correct
  export type ButtonVariant = "primary" | "secondary" | "outline";

  // wrong
  export enum ButtonVariant { PRIMARY = "primary", ... }
  ```

- Since types are not runtime values, they must be re-exported with `export type` from `index.ts`

## Consts (`.consts.ts`)

- Magic numbers and named constants belong here, not in `.hooks.ts` or `.tsx` files

## Styling

- styled-components only — no inline styles
- Always in a separate `ComponentName.styles.ts` file
- Styled component names are PascalCase (e.g. `StyledButton`, `FieldWrapper`)
- Use string union keys in Records: `Record<ButtonVariant, ReturnType<typeof css>>`
- **All spacing, font sizes, font weights, and colors must come from the theme** — no hardcoded pixel values, weight numbers, or hex strings:

  ```ts
  // correct
  padding: ${({ theme }) => theme.spacing[2]};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.neutral[900]};

  // wrong
  padding: 8px;
  font-weight: 600;
  ```

- Exceptions: `padding: 0`, `border`/`outline`/`box-shadow` pixel offsets (e.g. `2px solid`), and functional CSS values like `2.5rem` for icon insets

## Exports

- Each component's `index.ts` re-exports everything consumers need:
  - The component itself (as a value)
  - Type aliases (with `export type`)
  - Props interfaces (with `export type`)
- The main `src/index.ts` re-exports from all component folders

## tsconfig

Three files only:

- `tsconfig.json` — base config for `src/` (strict, noEmit, Vite/React settings)
- `tsconfig.build.json` — extends base, emits declarations for the library build
- `tsconfig.jest.json` — extends base, CommonJS mode for Jest

## Testing

Every component must have a `ComponentName.test.tsx` file. Tests use Jest + Testing Library via the shared `render` from `src/test-utils.tsx` (wraps with ThemeProvider).

What to test per component:

- Renders correctly (children, labels, values)
- All variants and sizes render without errors
- Interactive behaviour (clicks, keyboard, onChange)
- Error/disabled/loading states
- Accessibility attributes (`aria-label`, `aria-invalid`, `role`, etc.)

```ts
import { render, screen, fireEvent } from "../../test-utils";
import "@testing-library/jest-dom";
import { Input } from "./Input";

describe("Input", () => {
  it("shows error message", () => {
    render(<Input error="Required" />);
    expect(screen.getByText("Required")).toBeInTheDocument();
  });
});
```

## Accessibility

Every interactive component must have correct ARIA attributes. Required patterns:

- **Form inputs** (`Input`, `Textarea`, `Select`, `DatePicker`): `aria-invalid` on error, `aria-describedby` linking to helper/error text
- **Buttons and controls**: `aria-label` on icon-only buttons (clear, close, nav arrows)
- **Modal**: `role="dialog"`, `aria-modal="true"`, `aria-labelledby` pointing to title, focus trap on open, focus restored on close
- **Spinner**: `role="status"`, `aria-label` describing what is loading
- **Toast**: `role="alert"`, `aria-live="polite"`
- **DatePicker calendar**: `role="dialog"`, `aria-label` on each day button
- **Collapsible**: `aria-expanded` on the toggle button

## Workflow

After making changes, always run:

```
pnpm tsc        # zero errors required
pnpm test       # all tests must pass
pnpm prettier   # format all files
```

## Code style

- Always use braces for early returns, even one-liners:

  ```ts
  // correct
  if (!str) {
    return null;
  }

  // wrong
  if (!str) return null;
  ```

- **No abbreviations.** Use descriptive variable names:

  ```ts
  // correct
  const toastContext = useContext(ToastContext);

  // wrong
  const ctx = useContext(ToastContext);
  ```
