import type { ComponentPropsWithRef } from "react";

export type SwitchSize = "sm" | "md";

export interface SwitchProps extends Omit<
  ComponentPropsWithRef<"input">,
  "type" | "size"
> {
  label?: string;
  size?: SwitchSize;
  color?: string;
  borderColor?: string;
}
