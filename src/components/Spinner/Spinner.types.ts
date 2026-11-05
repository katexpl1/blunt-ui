export type SpinnerSize = "sm" | "md" | "lg";

export type SpinnerWeight = "thin" | "normal" | "bold";

export interface SpinnerProps {
  size?: SpinnerSize;
  weight?: SpinnerWeight;
  color?: string;
  label?: string;
}
