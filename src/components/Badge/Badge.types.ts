import type { ComponentPropsWithRef } from "react";

export type BadgeVariants =
  | "primary"
  | "neutral"
  | "success"
  | "error"
  | "warning"
  | "info";
export type BadgeSizes = "sm" | "md";

export type BadgeProps = ComponentPropsWithRef<"span"> & {
  variant?: BadgeVariants;
  size?: BadgeSizes;
};
