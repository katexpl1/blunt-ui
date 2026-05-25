import styled, { css, keyframes } from "styled-components";
import type { ToastVariants, ToastPosition } from "./Toast.types";

const slideInBottom = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const slideInTop = keyframes`
  from { opacity: 0; transform: translateY(-12px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to   { opacity: 0; }
`;

export const ToastWrapper = styled.div<{
  $position: ToastPosition;
  $closing: boolean;
}>`
  position: fixed;
  z-index: ${({ theme }) => theme.zIndex.toast};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  min-width: 280px;
  max-width: 400px;
  padding: ${({ theme }) => `${theme.spacing[3]} ${theme.spacing[4]}`};
  border-radius: ${({ theme }) => theme.radius.md};
  border-left: 4px solid transparent;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  animation: ${({ $closing, $position }) =>
    $closing
      ? css`
          ${fadeOut} 0.2s ease forwards
        `
      : $position.startsWith("top")
        ? css`
            ${slideInTop} 0.2s ease forwards
          `
        : css`
            ${slideInBottom} 0.2s ease forwards
          `};

  ${({ $position, theme }) => {
    const styles: Record<ToastPosition, ReturnType<typeof css>> = {
      "bottom-right": css`
        bottom: ${theme.spacing[6]};
        right: ${theme.spacing[6]};
      `,
      "bottom-left": css`
        bottom: ${theme.spacing[6]};
        left: ${theme.spacing[6]};
      `,
      "top-right": css`
        top: ${theme.spacing[6]};
        right: ${theme.spacing[6]};
      `,
      "top-left": css`
        top: ${theme.spacing[6]};
        left: ${theme.spacing[6]};
      `,
    };
    return styles[$position];
  }}
`;

export const StyledToast = styled(ToastWrapper)<{ $variant: ToastVariants }>`
  ${({ $variant, theme }) => {
    const styles: Record<ToastVariants, ReturnType<typeof css>> = {
      success: css`
        background: ${theme.colors.success[50]};
        border-left-color: ${theme.colors.success[500]};
      `,
      error: css`
        background: ${theme.colors.error[50]};
        border-left-color: ${theme.colors.error[500]};
      `,
      warning: css`
        background: ${theme.colors.warning[50]};
        border-left-color: ${theme.colors.warning[500]};
      `,
      info: css`
        background: ${theme.colors.info[50]};
        border-left-color: ${theme.colors.info[500]};
      `,
    };
    return styles[$variant];
  }}
`;

export const ToastMessage = styled.p`
  flex: 1;
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.neutral[900]};
`;

export const CloseButton = styled.button`
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: none;
  background: none;
  cursor: pointer;
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: 18px;
  line-height: 1;
  color: ${({ theme }) => theme.colors.neutral[500]};

  &:hover {
    background-color: rgba(0, 0, 0, 0.06);
    color: ${({ theme }) => theme.colors.neutral[900]};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary[500]};
    outline-offset: 2px;
  }
`;
