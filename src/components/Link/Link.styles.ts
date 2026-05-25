import styled, { css } from "styled-components";
import type { LinkVariants } from "./Link.types";

export const StyledLink = styled.a<{ $variant: LinkVariants }>`
  text-decoration: underline;
  text-underline-offset: 2px;
  transition: color 0.15s;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary[500]};
    outline-offset: 2px;
    border-radius: 2px;
  }

  ${({ $variant, theme }) => {
    const styles: Record<LinkVariants, ReturnType<typeof css>> = {
      default: css`
        color: ${theme.colors.primary[500]};
        &:hover {
          color: ${theme.colors.primary[700]};
        }
      `,
      subtle: css`
        color: ${theme.colors.neutral[500]};
        &:hover {
          color: ${theme.colors.neutral[900]};
        }
      `,
    };
    return styles[$variant];
  }}
`;
