import type { BadgeProps } from "./Badge.types";
import { StyledBadge } from "./Badge.styles";

export function Badge({
  variant = "primary",
  size = "md",
  children,
  ...props
}: BadgeProps) {
  return (
    <StyledBadge $variant={variant} $size={size} {...props}>
      {children}
    </StyledBadge>
  );
}

Badge.displayName = "Badge";
