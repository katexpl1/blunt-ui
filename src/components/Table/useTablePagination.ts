import { useState, useMemo } from "react";

interface UseTablePaginationProps<T> {
  data: T[];
  pageSize?: number;
  page?: number;
  defaultPage?: number;
  totalRows?: number;
  onPageChange?: (page: number) => void;
}

const MAX_PAGES_WITHOUT_ELLIPSIS = 7;
const ELLIPSIS_THRESHOLD = 3;
const SIBLING_COUNT = 1;

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

  const isServerPagination = isControlled || totalRows !== undefined;
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
