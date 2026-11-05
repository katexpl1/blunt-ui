import type { ComponentPropsWithRef } from "react";

export type TextareaSize = "sm" | "md" | "lg";

export type TextareaVariant = "default" | "outlined";

export interface TextareaProps extends Omit<
  ComponentPropsWithRef<"textarea">,
  "size"
> {
  size?: TextareaSize;
  variant?: TextareaVariant;
  label?: string;
  helperText?: string;
  error?: boolean | string;
  fullWidth?: boolean;
}
