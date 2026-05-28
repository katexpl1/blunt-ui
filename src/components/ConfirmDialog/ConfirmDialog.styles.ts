import styled, { css } from "styled-components";

export const ConfirmMessage = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.neutral[600]};
  line-height: 1.5;
`;

export const DangerButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.radius.md};
  font-weight: 600;
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[4]};
  font-size: ${({ theme }) => theme.fontSizes.md};
  background-color: ${({ theme }) => theme.colors.error[500]};
  color: ${({ theme }) => theme.colors.neutral[0]};
  border: none;

  &:hover:not(:disabled) {
    opacity: 0.88;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.error[500]};
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  ${({ theme }) =>
    theme.brutalism &&
    css`
      border: ${theme.brutalism.borderWidth} solid ${theme.colors.neutral[900]};
      box-shadow: ${theme.brutalism.shadowOffset}
        ${theme.brutalism.shadowOffset} 0 ${theme.colors.neutral[900]};
      transition:
        transform 0.1s,
        box-shadow 0.1s;
      &:hover:not(:disabled) {
        opacity: 1;
        transform: translate(2px, 2px);
        box-shadow: 2px 2px 0 ${theme.colors.neutral[900]};
      }
    `}
`;
