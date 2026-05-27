# blunt-ui

React + TypeScript + styled-components. Thick borders, offset shadows, no fluff. 11 components, 3 hooks.

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
<CollapsibleCard title="blunt-ui" subtitle="Subtitle" defaultOpen>
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

## Table

Read-only table with sorting and pagination. You define columns, pass data, done. Sorting and pagination work in both uncontrolled mode (component handles state internally) and controlled mode (you own the state, useful when data comes from an API).

Sizes: `sm`, `md`, `lg`.

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

**Sorting** — add `sortable: true` to any column. By default the table sorts client-side. If you want to handle it yourself (e.g. send a query param to your backend), pass `sort` + `onSortChange` and it becomes controlled — the table just shows the sort indicator and tells you when it changed, you bring the sorted data.

**Pagination** — set `pageSize` and the table slices the data automatically. For server-side pagination, also pass `totalRows` so it knows how many pages there are, and control `page` + `onPageChange` yourself. If you need both sort and page in one callback, use `onChange` instead.

**Other stuff** — `loading` replaces rows with skeleton cells while data is loading. `stickyHeader` keeps the header in view when the table scrolls. `caption` adds a proper `<caption>` for accessibility.

Color props: `borderColor`, `headerColor`, `rowColor`, `stripeColor`.

## DataTable

Editable table — good for things like spreadsheet-style input or inline CRUD. Each column can be editable or not, and you can mix text inputs with dropdowns.

```tsx
const columns = [
  { key: "name", header: "Name", editable: true },
  { key: "qty", header: "Qty", editable: true, width: "80px" },
  {
    key: "status",
    header: "Status",
    editable: true,
    options: [
      { value: "todo", label: "To do" },
      { value: "in_progress", label: "In progress" },
      { value: "done", label: "Done" },
    ],
  },
];

<DataTable
  columns={columns}
  defaultData={[{ name: "Widget", qty: "1", status: "todo" }]}
  onChange={(rows) => console.log(rows)}
  deletable
  addRowLabel="Add item"
/>;
```

**Editing** — click a text cell to start editing, Enter to confirm, Escape to cancel. For select cells (columns with `options`), one click opens the dropdown directly; picking an option saves immediately. Tab and Shift+Tab move between editable cells. Tab past the last cell adds a new row automatically.

**Select columns** — add `options: [{ value, label }]` to a column. The cell stores the `value` but displays the `label`. The column still needs `editable: true`.

**Controlled vs uncontrolled** — same pattern as the rest of the library. Pass `defaultData` and forget about it, or pass `data` + `onChange` if you need to keep the data in your own state.

**Per-cell editability** — `editable` can be a function `(row, rowIndex) => boolean` if you need some cells to be editable based on row content.

`deletable` adds a remove button per row. `newRowFactory` lets you control what an empty new row looks like (useful if you need generated IDs or default values).

Color props: `borderColor`, `headerColor`.

## useTable

Helper hook for when your table data comes from a server. It keeps track of the current sort and page so you can use them in a fetch call, and passes them back to `<Table>` as controlled props.

```tsx
const { sort, page, onSortChange, onPageChange } = useTable({
  defaultPage: 1,
});

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

When the user changes the sort column, the page resets to 1 automatically — that's usually what you want so you don't end up on page 5 of a different sort order. Pass `defaultSort` if you need a column sorted on first load.

## Design tokens

Colors, spacing, font sizes, and border radius live in `src/consts.ts`. All components pull from there, so changing a token updates everything at once.
