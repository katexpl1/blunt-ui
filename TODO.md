New stuff to add

- [x] Textarea — there's no textarea component at all. Right now in job-tracker the notes/pros/cons fields use Input which is a single line,
      which is wrong. Should look and work just like Input (same size/variant props etc) but be multiline
- [x] Field — a simple read-only "label + value" thing. Needed on any detail/show page. job-tracker already built its own because blunt didn't
      have it. Should support an optional link (when the value is a URL). Just label on top, value below, nothing fancy
- [x] Spinner / Skeleton — right now if you want to show loading state you write <p>Loading...</p> and style it yourself. Need at least a spinner. Skeleton (greyed out placeholder shapes) would be nice too but spinner is the minimum
- [ ] ConfirmDialog — there's no "are you sure?" flow. DataTable has delete but nothing stops you from accidentally deleting a row. Could be a component or just a useConfirm() hook that opens the existing Modal with yes/no buttons

---

DataTable fixes

- [ ] granular callbacks — the biggest pain point. onChange gives you back the whole array every time anything changes, so you have to diff old vs new yourself to figure out what was added/deleted/updated. job-tracker has a whole tableUtils.ts file just for this. Should add onRowAdd, onRowDelete, onRowChange so you just get the one row that changed
- [ ] loading prop — DataTable has no loading state. When data is fetching you can't tell the table "hey show a spinner". Table
      has it, DataTable doesn't. Just add loading?: boolean and show a spinner in the table body
- [ ] emptyMessage prop — same thing, Table has it, DataTable doesn't. When there's no data the table is just... empty. Should be able to pass a message like "No applications yet"
- [ ] sorting — Table supports sorting, DataTable doesn't. For any real list you want to be able to click a column header to sort. Should be the same API as Table
- [ ] onRowClick — right now if you want clicking a row to do something (e.g. navigate to detail page) you add a fake last column with a button in it. Should just be onRowClick?: (row) => void
- [ ] stickyHeader — Table has it, DataTable doesn't. When the list gets long you lose the headers. One line fix probably

---

Form / useForm fixes

- [ ] document that name prop is required — handleChange from useForm reads event.target.name to know which field changed. If you forget to put name on your Input nothing updates and it's confusing why. Should either be in docs, or the hook should warn in dev mode
- [ ] reset should accept new values — right now reset() always goes back to the initialValues you passed when the hook was created. But often you load data async (from an API) and want to populate the form after it loads. You have to call setFieldValue for every single field in a useEffect. Should be reset(newValues?) so you can just do reset(fetchedData) when data arrives
