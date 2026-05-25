import type { ComponentPropsWithRef, ElementType } from "react";

export type ButtonVariants = "primary" | "secondary" | "outline";
export type ButtonSizes = "sm" | "md" | "lg";

type ButtonOwnProps = {
  variant?: ButtonVariants;
  size?: ButtonSizes;
  isLoading?: boolean;
  href?: string;
  target?: string;
  rel?: string;
};

export type ButtonProps<T extends ElementType = "button"> = ButtonOwnProps & {
  as?: T;
} & Omit<ComponentPropsWithRef<T>, keyof ButtonOwnProps | "as">;
