import type { ComponentPropsWithRef, ReactNode } from "react";

export type InputType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "search"
  | "tel"
  | "url";

export type InputSize = "sm" | "md" | "lg";

export type InputVariant = "default" | "outlined";

export interface InputProps extends Omit<
  ComponentPropsWithRef<"input">,
  "size" | "type"
> {
  type?: InputType;
  size?: InputSize;
  variant?: InputVariant;
  label?: string;
  helperText?: string;
  error?: boolean | string;
  leftElement?: ReactNode;
  rightElement?: ReactNode;
  clearable?: boolean;
  onClear?: () => void;
  fullWidth?: boolean;
}
