import type { CSSProperties, ReactNode } from "react";
import type { TableSizes } from "../Table/Table.types";

export type { TableSizes };

export interface DataTableColumn<T = Record<string, unknown>> {
  key: keyof T & string;
  header: string;
  width?: string;
  editable?: boolean | ((row: T, rowIndex: number) => boolean);
  render?: (value: unknown, row: T, rowIndex: number) => ReactNode;
}

export interface DataTableProps<
  T extends Record<string, unknown> = Record<string, unknown>,
> {
  columns: DataTableColumn<T>[];
  defaultData?: T[];
  data?: T[];
  rowKey?: string;
  onChange?: (data: T[]) => void;
  size?: TableSizes;
  borderColor?: string;
  headerColor?: string;
  addRowLabel?: string;
  newRowFactory?: () => T;
  deletable?: boolean;
  className?: string;
  style?: CSSProperties;
}
