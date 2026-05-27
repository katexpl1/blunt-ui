import { useState, useMemo } from "react";
import type { SortState } from "./Table.types";

function nextSort(active: SortState | null, key: string): SortState | null {
  if (active?.key !== key) {
    return { key, direction: "asc" };
  }
  if (active.direction === "asc") {
    return { key, direction: "desc" };
  }

  return null;
}

interface UseTableSortProps<T> {
  data: T[];
  sort?: SortState;
  defaultSort?: SortState;
  onSortChange?: (sort: SortState | null) => void;
}

export function useTableSort<T extends Record<string, unknown>>({
  data,
  sort,
  defaultSort,
  onSortChange,
}: UseTableSortProps<T>) {
  const isControlled = sort !== undefined;
  const [internalSort, setInternalSort] = useState<SortState | null>(
    defaultSort ?? null,
  );
  const activeSort = isControlled ? (sort ?? null) : internalSort;

  const handleSort = (key: string): SortState | null => {
    const newSort = nextSort(activeSort, key);

    if (!isControlled) {
      setInternalSort(newSort);
    }

    onSortChange?.(newSort);

    return newSort;
  };

  const sortedData = useMemo(() => {
    if (isControlled || !activeSort) {
      return data;
    }

    return [...data].sort((a, b) => {
      const av = a[activeSort.key] as string | number;
      const bv = b[activeSort.key] as string | number;
      const cmp = av < bv ? -1 : av > bv ? 1 : 0;

      return activeSort.direction === "asc" ? cmp : -cmp;
    });
  }, [data, activeSort, isControlled]);

  return { activeSort, sortedData, handleSort };
}
