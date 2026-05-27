import styled, { css } from "styled-components";
import type { DefaultTheme } from "styled-components";
import type { ButtonVariants, ButtonSizes } from "./Button.types";

const brutalVariant = (theme: DefaultTheme, bg: string, color: string) => css`
  background-color: ${bg};
  color: ${color};
  border: ${theme.brutalism!.borderWidth} solid ${theme.colors.neutral[900]};
  box-shadow: ${theme.brutalism!.shadowOffset} ${theme.brutalism!.shadowOffset}
    0 ${theme.colors.neutral[900]};
  transition:
    transform 0.1s,
    box-shadow 0.1s;
  &:hover:not(:disabled) {
    transform: translate(2px, 2px);
    box-shadow: 2px 2px 0 ${theme.colors.neutral[900]};
  }
`;

export const StyledButton = styled.button<{
  $variant: ButtonVariants;
  $size: ButtonSizes;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.radius.md};
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary[500]};
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  ${({ $variant, theme }) => {
    if (theme.brutalism) {
      const styles: Record<ButtonVariants, ReturnType<typeof css>> = {
        primary: brutalVariant(
          theme,
          theme.colors.primary[500],
          theme.colors.primary.contrast,
        ),
        secondary: brutalVariant(
          theme,
          theme.colors.neutral[100],
          theme.colors.neutral[900],
        ),
        outline: brutalVariant(
          theme,
          theme.colors.neutral[0],
          theme.colors.neutral[900],
        ),
      };

      return styles[$variant];
    }

    const styles: Record<ButtonVariants, ReturnType<typeof css>> = {
      primary: css`
        background-color: ${theme.colors.primary[500]};
        color: ${theme.colors.neutral[0]};
        border: none;
        &:hover:not(:disabled) {
          background-color: ${theme.colors.primary[700]};
        }
      `,
      secondary: css`
        background-color: ${theme.colors.neutral[200]};
        color: ${theme.colors.neutral[600]};
        border: none;
        &:hover:not(:disabled) {
          background-color: ${theme.colors.neutral[300]};
        }
      `,
      outline: css`
        background-color: transparent;
        color: ${theme.colors.primary[500]};
        border: 2px solid ${theme.colors.primary[500]};
        &:hover:not(:disabled) {
          background-color: ${theme.colors.primary[50]};
        }
      `,
    };

    return styles[$variant];
  }}

  ${({ $size, theme }) => {
    const styles: Record<ButtonSizes, ReturnType<typeof css>> = {
      sm: css`
        padding: ${theme.spacing[1]} ${theme.spacing[3]};
        font-size: ${theme.fontSizes.sm};
      `,
      md: css`
        padding: ${theme.spacing[2]} ${theme.spacing[4]};
        font-size: ${theme.fontSizes.md};
      `,
      lg: css`
        padding: ${theme.spacing[3]} ${theme.spacing[6]};
        font-size: ${theme.fontSizes.lg};
      `,
    };

    return styles[$size];
  }}
`;
