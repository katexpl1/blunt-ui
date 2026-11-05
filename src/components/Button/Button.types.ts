import type { ComponentPropsWithRef, ElementType } from "react";

export type ButtonVariant = "primary" | "secondary" | "outline";

export type ButtonSize = "sm" | "md" | "lg";

type ButtonOwnProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  href?: string;
  target?: string;
  rel?: string;
};

export type ButtonProps<T extends ElementType = "button"> = ButtonOwnProps & {
  as?: T;
} & Omit<ComponentPropsWithRef<T>, keyof ButtonOwnProps | "as">;
