import type { CSSProperties, ReactNode } from "react";

export type TableSize = "sm" | "md" | "lg";

export type SortDirection = "asc" | "desc";

export interface SortState {
  key: string;
  direction: SortDirection;
}

export interface TableColumn<T = Record<string, unknown>> {
  key: keyof T & string;
  header: string;
  width?: string;
  sortable?: boolean;
  render?: (value: unknown, row: T, rowIndex: number) => ReactNode;
}

export interface TableChangeState {
  sort: SortState | null;
  page: number;
}

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

export interface TableProps<
  T extends Record<string, unknown> = Record<string, unknown>,
> {
  columns: TableColumn<T>[];
  data: T[];
  rowKey?: string;
  size?: TableSize;
  striped?: boolean;
  bordered?: boolean;
  stickyHeader?: boolean;
  stickyPagination?: boolean;
  caption?: string;
  emptyMessage?: string;
  loading?: boolean;
  sort?: SortState | null;
  defaultSort?: SortState;
  onSortChange?: (sort: SortState | null) => void;
  pageSize?: number;
  page?: number;
  defaultPage?: number;
  totalRows?: number;
  onPageChange?: (page: number) => void;
  pageSizeOptions?: number[];
  onPageSizeChange?: (pageSize: number) => void;
  onChange?: (state: TableChangeState) => void;
  borderColor?: string;
  headerColor?: string;
  rowColor?: string;
  stripeColor?: string;
  onRowClick?: (row: T) => void;
  className?: string;
  style?: CSSProperties;
}
