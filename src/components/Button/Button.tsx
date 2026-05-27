import type { ElementType } from "react";
import type { ButtonProps } from "./Button.types";
import { StyledButton } from "./Button.styles";

export function Button<T extends ElementType = "button">({
  ref,
  as,
  href,
  variant = "primary",
  size = "md",
  isLoading,
  disabled,
  children,
  ...props
}: ButtonProps<T>) {
  const element = (as ?? (href ? "a" : "button")) as ElementType;

  return (
    <StyledButton
      ref={ref}
      as={element}
      href={href}
      $variant={variant}
      $size={size}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? "Loading..." : children}
    </StyledButton>
  );
}

Button.displayName = "Button";
