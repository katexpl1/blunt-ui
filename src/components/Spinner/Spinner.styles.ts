import styled, { keyframes, css } from "styled-components";
import type { SpinnerSizes, SpinnerWeights } from "./Spinner.types";

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const sizeMap: Record<SpinnerSizes, string> = {
  sm: "16px",
  md: "24px",
  lg: "40px",
};

const weightMap: Record<SpinnerWeights, string> = {
  thin: "2px",
  normal: "3px",
  bold: "5px",
};

export const StyledSpinner = styled.span<{
  $size?: SpinnerSizes;
  $weight?: SpinnerWeights;
  $color?: string;
}>`
  display: inline-block;
  border-radius: 50%;
  animation: ${spin} 0.7s linear infinite;

  ${({ $size = "md", $weight = "normal", $color, theme }) => {
    const s = sizeMap[$size];
    const w = weightMap[$weight];
    const trackColor = theme.colors.neutral[200];
    const activeColor = $color ?? theme.colors.primary[500];

    return css`
      width: ${s};
      height: ${s};
      border: ${w} solid ${trackColor};
      border-top-color: ${activeColor};
    `;
  }}
`;
