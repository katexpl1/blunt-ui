# blunt-ui

React + TypeScript + styled-components. Thick borders, offset shadows, no fluff. 9 components, 2 hooks.

**Live demo:** https://blunt-ui.vercel.app/

**Storybook:** https://blunt-ui-storybook.vercel.app

**npm:** https://www.npmjs.com/package/blunt-ui

## Getting started

```bash
npm install
npm run storybook  # component explorer on port 6006
npm run dev        # landing page with link to Storybook
npm test
npm run build
```

## Button

Variants: `primary`, `secondary`, `outline`. Sizes: `sm`, `md`, `lg`.

```tsx
<Button variant="primary" onClick={handleSave}>Save</Button>
<Button variant="outline" isLoading={submitting}>Submit</Button>
```

`isLoading` disables the button and shows "Loading...". The `as` prop swaps the element, handy for router links with button styles.

## Input

Label, helper text, error message, left/right icon slots, and an optional clear button.

```tsx
<Input label="Email" type="email" error="Enter a valid email" />
<Input label="Search" clearable leftElement={<SearchIcon />} onClear={() => setValue("")} />
```

Pass a string to `error` to show a message, or `true` for just the red border.

## Modal

Opens in a portal on `document.body`. Traps focus, locks body scroll, and closes on Escape or backdrop click by default.

Sizes: `sm`, `md`, `lg`, `fullscreen`.

```tsx
<Modal
  open={isOpen}
  onClose={() => setIsOpen(false)}
  title="Delete item"
  footer={
    <>
      <Button variant="outline" onClick={() => setIsOpen(false)}>
        Cancel
      </Button>
      <Button variant="primary" onClick={handleDelete}>
        Delete
      </Button>
    </>
  }
>
  This can't be undone.
</Modal>
```

## CollapsibleCard

A card with a clickable header that shows/hides its content. Supports controlled and uncontrolled modes, an optional subtitle, a slot for header actions, and an `accentColor` prop to tint the border and chevron.

```tsx
<CollapsibleCard
  title="blunt-ui"
  subtitle="Subtitle"
  defaultOpen
>
  React component library in neo-brutalism style.
</CollapsibleCard>
```

Pass `open` + `onToggle` for controlled mode:

```tsx
<CollapsibleCard
  title="Project"
  open={isOpen}
  onToggle={setIsOpen}
  accentColor="#f97316"
  headerActions={<Badge variant="primary">npm</Badge>}
>
  {children}
</CollapsibleCard>
```

## Toast

Pops up in a portal, auto-dismisses after 4 seconds. Set `duration={0}` to keep it until the user closes it.

Variants: `success`, `error`, `warning`, `info`. Positions: `bottom-right`, `bottom-left`, `top-right`, `top-left`.

```tsx
<Toast
  open={open}
  onClose={() => setOpen(false)}
  message="Changes saved."
  variant="success"
/>
```

## Select

Styled native select, works the same as Input for sizes, variants, and error handling. Pass `clearable` to add an X button.

```tsx
<Select
  options={[{ value: "frontend", label: "frontend dev" }]}
  placeholder="pick one"
  value={value}
  onChange={(e) => setValue(e.target.value)}
  clearable
  onClear={() => setValue("")}
/>
```

## Form

`Form` is just a flex column wrapper that handles `preventDefault`. `FormField` adds the label, error message, helper text, and wires up the `htmlFor` automatically.

```tsx
<Form onSubmit={handleSubmit}>
  <FormField label="email" error={errors.email} required>
    <Input
      type="email"
      value={email}
      onChange={handleChange}
      onBlur={handleBlur}
      name="email"
    />
  </FormField>
  <Button type="submit">submit</Button>
</Form>
```

## useToast

Add `ToastProvider` once at the top of your app, then use `useToast()` anywhere inside it.

```tsx
<ToastProvider>
  <App />
</ToastProvider>
```

```tsx
const { toast } = useToast();

toast.success("saved!");
toast.error("something went wrong");
```

## useForm

Handles values, validation, and errors so you don't have to wire it all up yourself. Errors only show after the user has touched a field or tried to submit.

```tsx
const { values, errors, handleChange, handleBlur, handleSubmit, reset } =
  useForm({
    initialValues: { email: "", password: "" },
    validate: (v) => ({
      email: !v.email.trim() ? "required" : undefined,
      password: v.password.length < 8 ? "min 8 chars" : undefined,
    }),
    onSubmit: (values) => {
      /* only called when everything is valid */
    },
    onError: () => {
      toast.error("fix the errors first");
    },
  });
```

The `name` on each input needs to match the key in `initialValues`. Use `reset()` to clear everything back to the start.

## Design tokens

Colors, spacing, font sizes, and border radius live in `src/consts.ts`. All components pull from there, so changing a token updates everything at once.
