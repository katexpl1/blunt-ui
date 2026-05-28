export type SpinnerSizes = "sm" | "md" | "lg";
export type SpinnerWeights = "thin" | "normal" | "bold";

export interface SpinnerProps {
  size?: SpinnerSizes;
  weight?: SpinnerWeights;
  color?: string;
  label?: string;
}
