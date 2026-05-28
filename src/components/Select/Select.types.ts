import type { ComponentPropsWithRef } from "react";

export type SelectSizes = "sm" | "md" | "lg";
export type SelectVariants = "default" | "outlined";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<
  ComponentPropsWithRef<"select">,
  "size"
> {
  options: SelectOption[];
  placeholder?: string;
  size?: SelectSizes;
  variant?: SelectVariants;
  error?: boolean | string;
  fullWidth?: boolean;
  clearable?: boolean;
  onClear?: () => void;
}
