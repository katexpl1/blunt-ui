import styled, { css } from "styled-components";
import type { SelectSizes, SelectVariants } from "./Select.types";

export const Wrapper = styled.div<{ $fullWidth?: boolean }>`
  display: inline-flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[1]};
  width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "auto")};
`;

export const SelectWrapper = styled.div`
  position: relative;
  display: flex;
  width: 100%;
`;

export const HelperText = styled.span<{ $error?: boolean }>`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ $error, theme }) =>
    $error ? theme.colors.error[500] : theme.colors.neutral[500]};
`;

export const StyledSelect = styled.select<{
  $size: SelectSizes;
  $variant: SelectVariants;
  $error?: boolean;
}>`
  appearance: none;
  width: 100%;
  border-radius: ${({ theme }) => theme.radius.md};
  cursor: pointer;
  font: inherit;
  color: ${({ theme }) => theme.colors.neutral[900]};
  transition:
    border-color 0.2s,
    box-shadow 0.2s;

  ${({ $size, theme }) => {
    const styles: Record<SelectSizes, ReturnType<typeof css>> = {
      sm: css`
        padding: ${theme.spacing[1]} ${theme.spacing[2]};
        font-size: ${theme.fontSizes.sm};
      `,
      md: css`
        padding: ${theme.spacing[2]} ${theme.spacing[3]};
        font-size: ${theme.fontSizes.md};
      `,
      lg: css`
        padding: ${theme.spacing[3]} ${theme.spacing[4]};
        font-size: ${theme.fontSizes.lg};
      `,
    };

    return styles[$size];
  }}

  padding-right: 2.5rem;

  ${({ $variant, theme }) => {
    if (theme.brutalism) {
      return css`
        border: ${theme.brutalism.borderWidth} solid
          ${theme.colors.neutral[900]};
        background-color: ${theme.colors.neutral[0]};
        box-shadow: 3px 3px 0 ${theme.colors.neutral[900]};
      `;
    }

    const styles: Record<SelectVariants, ReturnType<typeof css>> = {
      default: css`
        border: 1px solid ${theme.colors.neutral[400]};
        background-color: ${theme.colors.neutral[0]};
      `,
      outlined: css`
        border: 2px solid ${theme.colors.primary[500]};
        background-color: ${theme.colors.neutral[0]};
      `,
      filled: css`
        border: 1px solid transparent;
        background-color: ${theme.colors.neutral[100]};
      `,
    };

    return styles[$variant];
  }}

  ${({ $error, theme }) =>
    $error &&
    css`
      border-color: ${theme.colors.error[500]};
    `}

  &:focus {
    outline: none;
    box-shadow: ${({ theme }) => theme.shadows.focusRing};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export const ClearButton = styled.button`
  position: absolute;
  right: ${({ theme }) => theme.spacing[3]};
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.neutral[500]};

  &:hover {
    color: ${({ theme }) => theme.colors.neutral[900]};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary[500]};
    outline-offset: 2px;
    border-radius: 2px;
  }
`;

export const Chevron = styled.span`
  position: absolute;
  right: ${({ theme }) => theme.spacing[3]};
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.neutral[500]};
`;
