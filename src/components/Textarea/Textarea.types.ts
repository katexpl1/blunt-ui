import type { ComponentPropsWithRef } from "react";

export type TextareaSizes = "sm" | "md" | "lg";
export type TextareaVariants = "default" | "outlined";

export interface TextareaProps extends Omit<
  ComponentPropsWithRef<"textarea">,
  "size"
> {
  size?: TextareaSizes;
  variant?: TextareaVariants;
  label?: string;
  helperText?: string;
  error?: boolean | string;
  fullWidth?: boolean;
}
