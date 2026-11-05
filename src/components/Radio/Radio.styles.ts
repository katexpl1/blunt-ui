import styled, { css } from "styled-components";
import type { RadioSize } from "./Radio.types";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[1]};
`;

export const RadioLabel = styled.label<{ $disabled?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  opacity: ${({ $disabled }) => ($disabled ? 0.6 : 1)};
`;

export const HiddenInput = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  margin: 0;
  padding: 0;

  &:focus-visible + div {
    box-shadow: ${({ theme }) => theme.shadows.focusRing};
  }
`;

export const RadioCircle = styled.div<{
  $checked?: boolean;
  $error?: boolean;
  $disabled?: boolean;
  $size?: RadioSize;
  $color?: string;
  $borderColor?: string;
}>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border-radius: 50%;
  border: ${({ theme }) => theme.brutalism?.borderWidth ?? "2px"} solid
    ${({ $error, $borderColor, theme }) =>
      $error
        ? theme.colors.error[500]
        : ($borderColor ?? theme.colors.neutral[900])};
  background-color: ${({ theme }) => theme.colors.neutral[0]};
  transition:
    background-color 0.1s,
    border-color 0.1s;

  ${({ $size = "md", theme }) => {
    const sizes: Record<RadioSize, ReturnType<typeof css>> = {
      sm: css`
        width: ${theme.spacing[4]};
        height: ${theme.spacing[4]};
      `,
      md: css`
        width: ${theme.spacing[5]};
        height: ${theme.spacing[5]};
      `,
    };

    return sizes[$size];
  }}

  ${({ $checked, $color, theme }) =>
    $checked &&
    css`
      &::after {
        content: "";
        display: block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: ${$color ?? theme.colors.primary[500]};
      }
    `}
`;

export const LabelText = styled.span<{ $size?: RadioSize }>`
  font-size: ${({ $size = "md", theme }) =>
    $size === "sm" ? theme.fontSizes.sm : theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

export const HelperText = styled.span<{ $error?: boolean }>`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ $error, theme }) =>
    $error ? theme.colors.error[500] : theme.colors.neutral[500]};
`;
