import type { ComponentPropsWithRef } from "react";
import type { InputSizes, InputVariants } from "../Input/Input.types";

export type SelectSizes = InputSizes;
export type SelectVariants = InputVariants;

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
