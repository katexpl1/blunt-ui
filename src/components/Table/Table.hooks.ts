import { useState, useMemo } from "react";
import type { SortState, UseTableOptions, UseTableReturn } from "./Table.types";
import {
  MAX_PAGES_WITHOUT_ELLIPSIS,
  ELLIPSIS_THRESHOLD,
  SIBLING_COUNT,
} from "./Table.consts";

export function useTable({
  defaultSort,
  defaultPage = 1,
}: UseTableOptions = {}): UseTableReturn {
  const [sort, setSort] = useState<SortState | null>(defaultSort ?? null);
  const [page, setPage] = useState(defaultPage);

  const onSortChange = (newSort: SortState | null) => {
    setSort(newSort);
    setPage(1);
  };

  const onPageChange = (newPage: number) => {
    setPage(newPage);
  };

  return { sort, page, onSortChange, onPageChange };
}

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
  sort?: SortState | null;
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

export function getPageNumbers(
  current: number,
  total: number,
): (number | "...")[] {
  if (total <= MAX_PAGES_WITHOUT_ELLIPSIS) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | "...")[] = [1];
  if (current > ELLIPSIS_THRESHOLD) {
    pages.push("...");
  }
  for (
    let i = Math.max(2, current - SIBLING_COUNT);
    i <= Math.min(total - 1, current + SIBLING_COUNT);
    i++
  ) {
    pages.push(i);
  }
  if (current < total - ELLIPSIS_THRESHOLD + 1) {
    pages.push("...");
  }
  pages.push(total);
  return pages;
}

interface UseTablePaginationProps<T> {
  data: T[];
  pageSize?: number;
  page?: number;
  defaultPage?: number;
  totalRows?: number;
  onPageChange?: (page: number) => void;
}

export function useTablePagination<T>({
  data,
  pageSize,
  page,
  defaultPage,
  totalRows,
  onPageChange,
}: UseTablePaginationProps<T>) {
  const isControlled = page !== undefined;
  const [internalPage, setInternalPage] = useState(defaultPage ?? 1);
  const activePage = isControlled ? page! : internalPage;

  const handlePageChange = (newPage: number): void => {
    if (!isControlled) {
      setInternalPage(newPage);
    }
    onPageChange?.(newPage);
  };

  const isServerPagination = totalRows !== undefined;
  const effectiveTotal = totalRows ?? data.length;
  const totalPages = pageSize
    ? Math.max(1, Math.ceil(effectiveTotal / pageSize))
    : 1;

  const displayData = useMemo(() => {
    if (!pageSize || isServerPagination) {
      return data;
    }
    const start = (activePage - 1) * pageSize;
    return data.slice(start, start + pageSize);
  }, [data, pageSize, activePage, isServerPagination]);

  return { activePage, totalPages, displayData, handlePageChange };
}
