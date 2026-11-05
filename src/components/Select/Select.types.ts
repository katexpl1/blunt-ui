import type { ChangeEvent } from "react";

export type SelectSize = "sm" | "md" | "lg";

export type SelectVariant = "default" | "outlined";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  options: SelectOption[];
  placeholder?: string;
  size?: SelectSize;
  variant?: SelectVariant;
  error?: boolean | string;
  fullWidth?: boolean;
  clearable?: boolean;
  onClear?: () => void;
  id?: string;
  name?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
  searchable?: boolean;
  "aria-label"?: string;
  "aria-describedby"?: string;
}
