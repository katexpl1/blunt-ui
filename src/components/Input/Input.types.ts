import type { ComponentPropsWithRef, ReactNode } from "react";

export type InputTypes =
  | "text"
  | "email"
  | "password"
  | "number"
  | "search"
  | "tel"
  | "url";

export type InputSizes = "sm" | "md" | "lg";
export type InputVariants = "default" | "outlined";

export interface InputProps extends Omit<
  ComponentPropsWithRef<"input">,
  "size" | "type"
> {
  type?: InputTypes;
  size?: InputSizes;
  variant?: InputVariants;
  label?: string;
  helperText?: string;
  error?: boolean | string;
  leftElement?: ReactNode;
  rightElement?: ReactNode;
  clearable?: boolean;
  onClear?: () => void;
  fullWidth?: boolean;
}
