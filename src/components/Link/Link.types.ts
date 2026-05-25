import type { ComponentPropsWithRef } from "react";

export type LinkVariants = "default" | "subtle";

export interface LinkProps extends ComponentPropsWithRef<"a"> {
  variant?: LinkVariants;
  external?: boolean;
}
