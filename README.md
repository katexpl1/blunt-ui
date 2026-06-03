# blunt-ui

A React component library I built for myself and started using across projects. Neo-brutalism aesthetic — thick borders, offset shadows, high contrast. No animations, no gradients, no magic. Just components that do what they say.

Built with React, TypeScript, and styled-components.

**Live demo:** https://blunt-ui.vercel.app/

**Storybook:** https://blunt-ui-storybook.vercel.app

**npm:** https://www.npmjs.com/package/blunt-ui

## Install

```bash
npm install blunt-ui
```

Wrap your app with `ThemeProvider` and `GlobalStyles` once:

```tsx
import { ThemeProvider, GlobalStyles } from "blunt-ui";

<ThemeProvider>
  <GlobalStyles />
  <App />
</ThemeProvider>;
```

If you're using `useToast` or `useConfirm`, add their providers here too — more on those below.

## Running locally

```bash
npm install
npm run storybook  # component explorer, port 6006
npm run dev        # landing page
npm test
npm run build
```

---

## Components

### Badge

Small inline label for statuses, tags, counts — wherever you need a bit of color-coded context.

Variants: `primary`, `neutral`, `success`, `error`, `warning`, `info`. Sizes: `sm` (default), `md`.

```tsx
<Badge variant="success">Active</Badge>
<Badge variant="error" size="sm">Failed</Badge>
```

### Button

Three variants: `primary` (filled), `secondary` (muted fill), `outline` (border only). Sizes: `sm`, `md`, `lg`.

```tsx
<Button variant="primary" onClick={handleSave}>Save</Button>
<Button variant="outline" isLoading={submitting}>Submit</Button>
```

`isLoading` disables the button and swaps the label for "Loading..." — no spinner, keeps the layout stable. The `as` prop lets you swap the underlying element, which is useful when you want a `<Link>` from your router but with button styles.

### Input

Standard text input with a label, optional helper text, error state, left/right icon slots, and a clearable option.

```tsx
<Input label="Email" type="email" error="Enter a valid email" />
<Input label="Search" clearable leftElement={<SearchIcon />} onClear={() => setValue("")} />
```

`error` accepts a string (shows a message below) or `true` (just turns the border red). Same pattern used across all form inputs.

### Textarea

Multi-line input. Same props as Input — `label`, `helperText`, `error`, `fullWidth`. Variants: `default`, `outlined`. Sizes: `sm`, `md`, `lg`.

```tsx
<Textarea label="Notes" helperText="Max 500 chars" />
<Textarea label="Bio" variant="outlined" error="Required" rows={4} />
```

### Select

Styled native `<select>`. I kept it native because custom dropdowns are more trouble than they're worth for most use cases. Same sizes and error handling as Input.

```tsx
<Select
  options={[{ value: "frontend", label: "Frontend dev" }]}
  placeholder="Pick one"
  value={value}
  onChange={(e) => setValue(e.target.value)}
  clearable
  onClear={() => setValue("")}
/>
```

### Editable

Click-to-edit inline text. Renders as plain text, turns into an input when clicked. Enter confirms, Escape cancels, blur also confirms.

```tsx
<Editable defaultValue="Untitled" onSubmit={(v) => save(v)} />
```

For controlled mode, pass `value` + `onChange`:

```tsx
<Editable
  value={title}
  onChange={setTitle}
  onSubmit={(v) => api.rename(v)}
  placeholder="Click to add a title"
/>
```

### Field

A read-only label + value pair. Useful for detail views or anywhere you're displaying data rather than collecting it.

```tsx
<Field label="Status" value="Active" />
<Field label="Profile" value="View profile" href="/profile" />
```

Pass `href` and the value becomes a link.

### Modal

Opens in a portal on `document.body`. Traps focus, locks body scroll, closes on Escape or backdrop click. Sizes: `sm`, `md`, `lg`, `fullscreen`.

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

The `footer` slot is where you put action buttons — it renders at the bottom of the modal, separated from the content.

### Toast

Auto-dismisses after 4 seconds. Set `duration={0}` if you need it to stay until the user closes it manually.

Variants: `success`, `error`, `warning`, `info`. Positions: `bottom-right`, `bottom-left`, `top-right`, `top-left`.

```tsx
<Toast
  open={open}
  onClose={() => setOpen(false)}
  message="Changes saved."
  variant="success"
/>
```

In practice you'll probably want `useToast` instead — see hooks below.

### Form

`Form` is a flex column wrapper that calls `e.preventDefault()` for you. `FormField` handles the label, error message, helper text, and `htmlFor` wiring — so you don't have to manage IDs manually.

```tsx
<Form onSubmit={handleSubmit}>
  <FormField label="Email" error={errors.email} required>
    <Input
      type="email"
      value={email}
      onChange={handleChange}
      onBlur={handleBlur}
      name="email"
    />
  </FormField>
  <Button type="submit">Submit</Button>
</Form>
```

Pair with `useForm` for validation — they're designed to work together.

### Link

Styled anchor. Variants: `default` and `subtle` (less prominent, for secondary links). Pass `external` and it adds `target="_blank"` and `rel="noopener noreferrer"` so you don't have to remember.

```tsx
<Link href="/docs">Documentation</Link>
<Link href="https://example.com" external variant="subtle">External link</Link>
```

### CollapsibleCard

A card with a header you can click to show/hide the content. Works uncontrolled out of the box — just use `defaultOpen` and forget about it. For controlled mode, pass `open` + `onToggle`.

```tsx
<CollapsibleCard title="Details" subtitle="Optional subtitle" defaultOpen>
  Content goes here.
</CollapsibleCard>
```

`accentColor` tints the left border and the chevron icon. `headerActions` is a slot for extra stuff in the header — a badge, a button, whatever.

```tsx
<CollapsibleCard
  title="Project"
  open={isOpen}
  onToggle={setIsOpen}
  accentColor="#f97316"
  headerActions={<Badge variant="primary">New</Badge>}
>
  {children}
</CollapsibleCard>
```

### Spinner

Loading indicator. Sizes: `sm`, `md`, `lg`. Weights: `thin`, `normal`, `bold`. You can override the color.

```tsx
<Spinner />
<Spinner size="lg" weight="thin" color="#f97316" label="Loading data..." />
```

`label` sets an `aria-label` for screen readers but doesn't render visibly.

### Table

Read-only table with sorting and pagination built in. Define columns, pass data — that's the basic case.

```tsx
const columns = [
  { key: "name", header: "Name", sortable: true },
  { key: "role", header: "Role" },
  { key: "status", header: "Status", render: (v) => <Badge>{v}</Badge> },
];

<Table
  columns={columns}
  data={rows}
  rowKey="id"
  striped
  bordered
  pageSize={10}
  emptyMessage="No results"
/>;
```

**Sorting** — add `sortable: true` to a column. Client-side by default. To sort server-side, pass `sort` + `onSortChange` — the table just shows the indicator and tells you what changed, you handle the data.

**Pagination** — set `pageSize` and the table slices the data automatically. For server-side pagination, also pass `totalRows` (so it knows how many pages exist) and control `page` + `onPageChange` yourself. Use `onChange` if you need both sort and page changes in one callback.

**Other props** — `loading` shows skeleton rows while data loads. `stickyHeader` keeps the header visible on scroll. `caption` adds an accessible `<caption>`.

Color props if you need to match a specific theme: `borderColor`, `headerColor`, `rowColor`, `stripeColor`.

### ConfirmDialog

A specialized modal for destructive actions. Two variants: `default` and `danger` (the confirm button turns red). Wrap this in `useConfirm` if you're triggering it programmatically.

```tsx
<ConfirmDialog
  open={isOpen}
  title="Delete item"
  message="This can't be undone."
  variant="danger"
  confirmLabel="Delete"
  onConfirm={handleDelete}
  onCancel={() => setIsOpen(false)}
/>
```

### DatePicker

Calendar-based date input. Sizes: `sm`, `md`, `lg`. Supports `minDate`, `maxDate`, and `clearable`.

```tsx
<DatePicker value={date} onChange={setDate} placeholder="Pick a date" />
<DatePicker value={date} onChange={setDate} minDate={new Date()} clearable />
```

`formatDate` controls how the selected date is displayed in the input field:

```tsx
<DatePicker
  value={date}
  onChange={setDate}
  formatDate={(d) => d.toLocaleDateString("pl-PL")}
/>
```

---

## Hooks

### useToast

Wrap your app with `ToastProvider` once, then call `useToast()` anywhere you need to fire a notification.

```tsx
// main.tsx or App.tsx
<ToastProvider>
  <App />
</ToastProvider>
```

```tsx
const { toast } = useToast();

toast.success("Saved!");
toast.error("Something went wrong.");
toast.warning("Are you sure?");
toast.info("New version available.");
```

### useConfirm

Same pattern as `useToast` — provider at the top, hook wherever you need it. Returns a promise so you can `await` the user's decision.

```tsx
<ConfirmProvider>
  <App />
</ConfirmProvider>
```

```tsx
const confirm = useConfirm();

const handleDelete = async () => {
  const ok = await confirm({
    title: "Delete item",
    message: "This can't be undone.",
    variant: "danger",
    confirmLabel: "Delete",
  });
  if (ok) deleteItem();
};
```

Much cleaner than managing open/close state for every confirm dialog in your app.

### useForm

Handles values, touched state, validation, and errors. Errors only show after a field has been touched or a submit was attempted — no red borders on page load.

```tsx
const { values, errors, handleChange, handleBlur, handleSubmit, reset } =
  useForm({
    initialValues: { email: "", password: "" },
    validate: (v) => ({
      email: !v.email.trim() ? "Required" : undefined,
      password: v.password.length < 8 ? "Min 8 characters" : undefined,
    }),
    onSubmit: (values) => {
      // only called when all validations pass
    },
    onError: () => {
      toast.error("Fix the errors first.");
    },
  });
```

Each input's `name` needs to match a key in `initialValues`. `reset()` puts everything back to the initial state.

### useTable

A small helper for server-side table state. Tracks the current sort and page so you can pass them to a fetch call, then hands everything back to `<Table>` as controlled props.

```tsx
const { sort, page, onSortChange, onPageChange } = useTable({ defaultPage: 1 });

useEffect(() => {
  fetchProducts({ sort, page });
}, [sort, page]);

<Table
  columns={columns}
  data={serverData}
  sort={sort}
  onSortChange={onSortChange}
  page={page}
  onPageChange={onPageChange}
  pageSize={20}
  totalRows={totalCount}
/>;
```

Changing the sort resets the page to 1 automatically — saves you from ending up on page 5 of a different sort order. Pass `defaultSort` if you need a column pre-sorted on first load.

---

## Design tokens

Everything lives in `src/consts.ts` — colors, spacing, font sizes, border radius. All components reference these, so updating a single token changes the look across the whole library.
