import type { LinkProps } from "./Link.types";
import { StyledLink } from "./Link.styles";

export function Link({
  variant = "default",
  external,
  children,
  ...props
}: LinkProps) {
  return (
    <StyledLink
      $variant={variant}
      {...(external && { target: "_blank", rel: "noreferrer" })}
      {...props}
    >
      {children}
    </StyledLink>
  );
}

Link.displayName = "Link";
