import styled, { css } from "styled-components";
import type { InputSizes, InputVariants } from "./Input.types";

export const Wrapper = styled.div<{ $fullWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[1]};
  width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "auto")};
`;

export const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => (theme.brutalism ? "700" : "500")};
`;

export const HelperText = styled.span<{ $error?: boolean }>`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ $error, theme }) =>
    $error ? theme.colors.error[500] : theme.colors.neutral[500]};
`;

export const InputContainer = styled.div<{
  $size?: InputSizes;
  $variant?: InputVariants;
  $error?: boolean;
}>`
  display: flex;
  align-items: center;
  border-radius: ${({ theme }) => theme.radius.md};
  transition:
    border-color 0.2s,
    box-shadow 0.2s;

  ${({ $size = "md", theme }) => {
    const styles: Record<InputSizes, ReturnType<typeof css>> = {
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

  ${({ $variant = "default", theme }) => {
    if (theme.brutalism) {
      return css`
        border: ${theme.brutalism.borderWidth} solid
          ${theme.colors.neutral[900]};
        background-color: ${theme.colors.neutral[0]};
        box-shadow: 3px 3px 0 ${theme.colors.neutral[900]};
      `;
    }
    const styles: Record<InputVariants, ReturnType<typeof css>> = {
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
      ${theme.brutalism &&
      css`
        box-shadow: 3px 3px 0 ${theme.colors.error[500]};
      `}
    `}

  &:focus-within {
    box-shadow: ${({ theme }) => theme.shadows.focusRing};
  }
`;

export const StyledInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font: inherit;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export const Slot = styled.div`
  display: inline-flex;
  align-items: center;
  margin: 0 ${({ theme }) => theme.spacing[1]};
`;

export const SlotButton = styled.button`
  display: inline-flex;
  align-items: center;
  margin: 0 ${({ theme }) => theme.spacing[1]};
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  font: inherit;

  &:hover {
    opacity: 0.8;
  }
`;
