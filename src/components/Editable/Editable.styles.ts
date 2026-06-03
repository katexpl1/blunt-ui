import styled, { css } from "styled-components";

export const Wrapper = styled.span`
  display: inline-block;
`;

export const Preview = styled.span<{ $disabled?: boolean; $empty?: boolean }>`
  display: inline-block;
  min-width: 60px;
  padding: ${({ theme }) => `${theme.spacing[1]} ${theme.spacing[2]}`};
  border-radius: ${({ theme }) => theme.radius.md};
  color: ${({ $empty, theme }) =>
    $empty ? theme.colors.neutral[400] : "inherit"};

  ${({ theme }) =>
    theme.brutalism
      ? css`
          border: ${theme.brutalism.borderWidth} solid transparent;
        `
      : css`
          border: 1px solid transparent;
        `}

  ${({ $disabled, theme }) =>
    $disabled
      ? css`
          opacity: 0.5;
        `
      : css`
          cursor: text;
          transition:
            border-color 0.15s ease,
            box-shadow 0.15s ease;

          &:hover {
            ${theme.brutalism
              ? css`
                  border-color: ${theme.colors.neutral[900]};
                  box-shadow: ${theme.brutalism.shadowOffset}
                    ${theme.brutalism.shadowOffset} 0
                    ${theme.colors.neutral[900]};
                `
              : css`
                  border-color: ${theme.colors.primary[500]};
                  box-shadow: ${theme.shadows.focusRing};
                `}
          }

          &:focus {
            outline: none;
            box-shadow: ${theme.shadows.focusRing};
          }
        `}
`;

export const EditInput = styled.input`
  display: inline-block;
  min-width: 60px;
  padding: ${({ theme }) => `${theme.spacing[1]} ${theme.spacing[2]}`};
  border-radius: ${({ theme }) => theme.radius.md};
  font: inherit;
  color: inherit;
  background: ${({ theme }) => theme.colors.neutral[0]};
  outline: none;

  ${({ theme }) =>
    theme.brutalism
      ? css`
          border: ${theme.brutalism.borderWidth} solid
            ${theme.colors.neutral[900]};
          box-shadow: ${theme.brutalism.shadowOffset}
            ${theme.brutalism.shadowOffset} 0 ${theme.colors.neutral[900]};
        `
      : css`
          border: 1px solid ${theme.colors.primary[500]};
          box-shadow: ${theme.shadows.focusRing};
        `}
`;
