import type { ComponentPropsWithRef } from "react";

export type BadgeVariant =
  | "primary"
  | "neutral"
  | "success"
  | "error"
  | "warning"
  | "info";
export type BadgeSize = "sm" | "md";

export type BadgeProps = ComponentPropsWithRef<"span"> & {
  variant?: BadgeVariant;
  size?: BadgeSize;
};
