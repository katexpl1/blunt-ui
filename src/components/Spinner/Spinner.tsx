import { StyledSpinner } from "./Spinner.styles";
import type { SpinnerProps } from "./Spinner.types";

export function Spinner({
  size = "md",
  weight = "normal",
  color,
  label = "Loading...",
}: SpinnerProps) {
  return (
    <StyledSpinner
      $size={size}
      $weight={weight}
      $color={color}
      role="status"
      aria-label={label}
    />
  );
}

Spinner.displayName = "Spinner";
