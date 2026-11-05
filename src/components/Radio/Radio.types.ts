import type { ComponentPropsWithRef } from "react";

export type RadioSize = "sm" | "md";

export interface RadioProps extends Omit<
  ComponentPropsWithRef<"input">,
  "type" | "size"
> {
  label?: string;
  size?: RadioSize;
  error?: boolean;
  helperText?: string;
  color?: string;
  borderColor?: string;
}
