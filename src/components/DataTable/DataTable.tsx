import { useState, useRef, useEffect, useCallback } from "react";
import { flushSync } from "react-dom";
import type { KeyboardEvent } from "react";
import type { DataTableProps, DataTableColumn } from "./DataTable.types";
import {
  TableWrapper,
  StyledDataTable,
  Thead,
  Tbody,
  Tr,
  Th,
  EditableTd,
  CellInput,
  CellSelect,
  ActionsTh,
  ActionsTd,
  DeleteButton,
  AddRowRow,
  AddRowButton,
} from "./DataTable.styles";

function isColEditable<T>(
  col: DataTableColumn<T>,
  row: T,
  rowIndex: number,
): boolean {
  return typeof col.editable === "function"
    ? col.editable(row, rowIndex)
    : !!col.editable;
}

export function DataTable<
  T extends Record<string, unknown> = Record<string, unknown>,
>({
  columns,
  defaultData,
  data: controlledData,
  rowKey,
  onChange,
  size = "md",
  borderColor,
  headerColor,
  addRowLabel = "Add row",
  newRowFactory,
  deletable = false,
  className,
  style,
}: DataTableProps<T>) {
  const isControlled = controlledData !== undefined;
  const [internalData, setInternalData] = useState<T[]>(defaultData ?? []);
  const rows = isControlled ? controlledData! : internalData;

  const [editingCell, setEditingCell] = useState<{
    rowIndex: number;
    colKey: string;
  } | null>(null);
  const [draftValue, setDraftValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    if (!editingCell) {
      return;
    }

    const col = columns.find((c) => c.key === editingCell.colKey);

    if (col?.options) {
      selectRef.current?.focus();
    } else {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [editingCell, columns]);

  const updateData = useCallback(
    (newData: T[]) => {
      if (!isControlled) {
        setInternalData(newData);
      }
      onChange?.(newData);
    },
    [isControlled, onChange],
  );

  const makeNewRow = useCallback(
    (): T =>
      newRowFactory
        ? newRowFactory()
        : (Object.fromEntries(columns.map((col) => [col.key, ""])) as T),
    [newRowFactory, columns],
  );

  const getEditableCells = useCallback(
    (currentRows: T[]) => {
      const cells: { rowIndex: number; colKey: string }[] = [];

      currentRows.forEach((row, rowIndex) => {
        columns.forEach((col) => {
          if (isColEditable(col, row, rowIndex)) {
            cells.push({ rowIndex, colKey: col.key });
          }
        });
      });

      return cells;
    },
    [columns],
  );

  const startEditing = (rowIndex: number, colKey: string, value: unknown) => {
    setEditingCell({ rowIndex, colKey });
    setDraftValue(String(value ?? ""));
  };

  const commitEdit = useCallback(() => {
    if (!editingCell) {
      return;
    }

    const { rowIndex, colKey } = editingCell;
    const newData = rows.map((row, i) =>
      i === rowIndex ? ({ ...row, [colKey]: draftValue } as T) : row,
    );

    updateData(newData);
    setEditingCell(null);
  }, [editingCell, rows, draftValue, updateData]);

  const cancelEdit = () => {
    setEditingCell(null);
    setDraftValue("");
  };

  const handleTabNavigation = (e: KeyboardEvent<HTMLElement>) => {
    if (!editingCell) {
      return;
    }
    e.preventDefault();

    const { rowIndex, colKey } = editingCell;
    const committedData = rows.map((row, i) =>
      i === rowIndex ? ({ ...row, [colKey]: draftValue } as T) : row,
    );

    updateData(committedData);

    const cells = getEditableCells(committedData);
    const currentIndex = cells.findIndex(
      (c) => c.rowIndex === rowIndex && c.colKey === colKey,
    );
    const nextIndex = e.shiftKey ? currentIndex - 1 : currentIndex + 1;

    if (nextIndex >= 0 && nextIndex < cells.length) {
      const next = cells[nextIndex];

      setEditingCell(next);
      setDraftValue(String(committedData[next.rowIndex][next.colKey] ?? ""));

      return;
    }

    if (!e.shiftKey && nextIndex >= cells.length) {
      const newRow = makeNewRow();
      const newRows = [...committedData, newRow];

      updateData(newRows);

      const newRowIdx = newRows.length - 1;

      const firstEditableCol = columns.find((col) =>
        isColEditable(col, newRow, newRowIdx),
      );

      setEditingCell(
        firstEditableCol
          ? { rowIndex: newRowIdx, colKey: firstEditableCol.key }
          : null,
      );

      setDraftValue("");

      return;
    }

    setEditingCell(null);
    setDraftValue("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") {
      const col = columns.find((c) => c.key === editingCell?.colKey);

      if (col?.options) {
        selectRef.current?.showPicker();

        return;
      }

      commitEdit();

      return;
    }
    if (e.key === "Escape") {
      cancelEdit();

      return;
    }
    if (e.key === "Tab") {
      handleTabNavigation(e);
    }
  };

  const addRow = () => updateData([...rows, makeNewRow()]);

  const deleteRow = (rowIndex: number) => {
    if (editingCell?.rowIndex === rowIndex) {
      setEditingCell(null);
    }

    updateData(rows.filter((_, i) => i !== rowIndex));
  };

  const getRowKey = (row: T, index: number) =>
    rowKey ? String(row[rowKey]) : String(index);

  const totalColumns = deletable ? columns.length + 1 : columns.length;

  return (
    <TableWrapper
      $borderColor={borderColor}
      className={className}
      style={style}
    >
      <StyledDataTable $size={size}>
        <Thead $headerColor={headerColor} $borderColor={borderColor}>
          <Tr>
            {columns.map((col) => (
              <Th
                key={col.key}
                $size={size}
                scope="col"
                style={col.width ? { width: col.width } : undefined}
              >
                {col.header}
              </Th>
            ))}
            {deletable && <ActionsTh $size={size} aria-label="Actions" />}
          </Tr>
        </Thead>
        <Tbody>
          {rows.map((row, rowIndex) => (
            <Tr key={getRowKey(row, rowIndex)}>
              {columns.map((col) => {
                const isEditing =
                  editingCell?.rowIndex === rowIndex &&
                  editingCell.colKey === col.key;
                const value = row[col.key as keyof T];
                const editable = isColEditable(col, row, rowIndex);

                const displayValue = col.options
                  ? (col.options.find((o) => o.value === String(value ?? ""))
                      ?.label ??
                      String(value ?? "")) ||
                    " "
                  : col.render
                    ? col.render(value, row, rowIndex)
                    : String(value ?? "") || " ";

                return (
                  <EditableTd
                    key={col.key}
                    $size={size}
                    $borderColor={borderColor}
                    $editable={editable && !isEditing}
                    onClick={
                      editable && !isEditing
                        ? () => {
                            if (col.options) {
                              flushSync(() =>
                                startEditing(rowIndex, col.key, value),
                              );
                              selectRef.current?.showPicker();
                            } else {
                              startEditing(rowIndex, col.key, value);
                            }
                          }
                        : undefined
                    }
                  >
                    {isEditing && col.options ? (
                      <CellSelect
                        ref={selectRef}
                        $size={size}
                        value={draftValue}
                        onChange={(e) => setDraftValue(e.target.value)}
                        onBlur={commitEdit}
                        onKeyDown={handleKeyDown}
                        aria-label={`Edit ${col.header}`}
                      >
                        {col.options.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </CellSelect>
                    ) : isEditing ? (
                      <CellInput
                        ref={inputRef}
                        $size={size}
                        value={draftValue}
                        onChange={(e) => setDraftValue(e.target.value)}
                        onBlur={commitEdit}
                        onKeyDown={handleKeyDown}
                        aria-label={`Edit ${col.header}`}
                      />
                    ) : (
                      displayValue
                    )}
                  </EditableTd>
                );
              })}
              {deletable && (
                <ActionsTd $size={size} $borderColor={borderColor}>
                  <DeleteButton
                    type="button"
                    onClick={() => deleteRow(rowIndex)}
                    aria-label="Delete row"
                  >
                    ✕
                  </DeleteButton>
                </ActionsTd>
              )}
            </Tr>
          ))}
          <AddRowRow>
            <td colSpan={totalColumns}>
              <AddRowButton type="button" onClick={addRow}>
                + {addRowLabel}
              </AddRowButton>
            </td>
          </AddRowRow>
        </Tbody>
      </StyledDataTable>
    </TableWrapper>
  );
}

DataTable.displayName = "DataTable";
