import styled, { css } from "styled-components";
import type { DefaultTheme } from "styled-components";
import type { BadgeVariants, BadgeSizes } from "./Badge.types";

const brutalBadge = (theme: DefaultTheme, bg: string, color: string) => css`
  background: ${bg};
  color: ${color};
  border: ${theme.brutalism!.borderWidth} solid ${theme.colors.neutral[900]};
  box-shadow: 2px 2px 0 ${theme.colors.neutral[900]};
`;

export const StyledBadge = styled.span<{
  $variant: BadgeVariants;
  $size: BadgeSizes;
}>`
  display: inline-flex;
  align-items: center;
  font-weight: 700;
  letter-spacing: 0.04em;
  cursor: default;
  border-radius: ${({ theme }) => theme.radius.md};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 20ch;

  ${({ $size, theme }) => {
    const sizes: Record<BadgeSizes, ReturnType<typeof css>> = {
      sm: css`
        padding: 2px 8px;
        font-size: ${theme.fontSizes.xs};
      `,
      md: css`
        padding: 4px 10px;
        font-size: ${theme.fontSizes.sm};
      `,
    };

    return sizes[$size];
  }}

  ${({ $variant, theme }) => {
    if (theme.brutalism) {
      const variants: Record<BadgeVariants, ReturnType<typeof css>> = {
        primary: brutalBadge(
          theme,
          theme.colors.primary[500],
          theme.colors.primary.contrast,
        ),
        neutral: brutalBadge(
          theme,
          theme.colors.neutral[200],
          theme.colors.neutral[900],
        ),
        success: brutalBadge(
          theme,
          theme.colors.success[50],
          theme.colors.success[500],
        ),
        error: brutalBadge(
          theme,
          theme.colors.error[50],
          theme.colors.error[500],
        ),
        warning: brutalBadge(
          theme,
          theme.colors.warning[50],
          theme.colors.warning[500],
        ),
        info: brutalBadge(theme, theme.colors.info[50], theme.colors.info[500]),
      };

      return variants[$variant];
    }

    const variants: Record<BadgeVariants, ReturnType<typeof css>> = {
      primary: css`
        background: ${theme.colors.primary[50]};
        color: ${theme.colors.primary[500]};
      `,
      neutral: css`
        background: ${theme.colors.neutral[200]};
        color: ${theme.colors.neutral[600]};
      `,
      success: css`
        background: ${theme.colors.success[50]};
        color: ${theme.colors.success[500]};
      `,
      error: css`
        background: ${theme.colors.error[50]};
        color: ${theme.colors.error[500]};
      `,
      warning: css`
        background: ${theme.colors.warning[50]};
        color: ${theme.colors.warning[500]};
      `,
      info: css`
        background: ${theme.colors.info[50]};
        color: ${theme.colors.info[500]};
      `,
    };

    return variants[$variant];
  }}
`;
