import type { ComponentPropsWithRef } from "react";

export type CheckboxSize = "sm" | "md";

export interface CheckboxProps extends Omit<
  ComponentPropsWithRef<"input">,
  "type" | "size"
> {
  label?: string;
  size?: CheckboxSize;
  error?: boolean | string;
  helperText?: string;
  color?: string;
  borderColor?: string;
  checkColor?: string;
}
