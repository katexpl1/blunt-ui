import { useState } from "react";
import type { SortState } from "./Table.types";

export interface UseTableOptions {
  defaultSort?: SortState;
  defaultPage?: number;
}

export interface UseTableReturn {
  sort: SortState | null;
  page: number;
  onSortChange: (sort: SortState | null) => void;
  onPageChange: (page: number) => void;
}

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
