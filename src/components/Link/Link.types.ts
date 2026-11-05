import type { ComponentPropsWithRef } from "react";

export type LinkVariant = "default" | "subtle";

export interface LinkProps extends ComponentPropsWithRef<"a"> {
  variant?: LinkVariant;
  external?: boolean;
}
