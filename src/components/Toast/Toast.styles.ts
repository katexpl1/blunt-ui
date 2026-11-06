import styled, { css, keyframes } from "styled-components";
import type { DefaultTheme } from "styled-components";
import type { ToastVariant, ToastPosition } from "./Toast.types";

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

const brutalToast = (theme: DefaultTheme, bg: string, accent: string) => css`
  background: ${bg};
  border: ${theme.brutalism!.borderWidth} solid ${accent};
  box-shadow: ${theme.brutalism!.shadowOffset} ${theme.brutalism!.shadowOffset}
    0 ${accent};
`;

function toastVariantStyles(variant: ToastVariant, theme: DefaultTheme) {
  if (theme.brutalism) {
    const variants: Record<ToastVariant, ReturnType<typeof css>> = {
      success: brutalToast(
        theme,
        theme.colors.success[50],
        theme.colors.success[500],
      ),
      error: brutalToast(
        theme,
        theme.colors.error[50],
        theme.colors.error[500],
      ),
      warning: brutalToast(
        theme,
        theme.colors.warning[50],
        theme.colors.warning[500],
      ),
      info: brutalToast(theme, theme.colors.info[50], theme.colors.info[500]),
    };
    return variants[variant];
  }

  const variants: Record<ToastVariant, ReturnType<typeof css>> = {
    success: css`
      background: ${theme.colors.success[50]};
      border-left: ${theme.spacing[1]} solid ${theme.colors.success[500]};
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
    `,
    error: css`
      background: ${theme.colors.error[50]};
      border-left: ${theme.spacing[1]} solid ${theme.colors.error[500]};
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
    `,
    warning: css`
      background: ${theme.colors.warning[50]};
      border-left: ${theme.spacing[1]} solid ${theme.colors.warning[500]};
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
    `,
    info: css`
      background: ${theme.colors.info[50]};
      border-left: ${theme.spacing[1]} solid ${theme.colors.info[500]};
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
    `,
  };
  return variants[variant];
}

const toastContentStyles = css`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  min-width: 280px;
  max-width: 400px;
  padding: ${({ theme }) => `${theme.spacing[3]} ${theme.spacing[4]}`};
  border-radius: ${({ theme }) => theme.radius.md};

  @media (max-width: 640px) {
    min-width: unset;
    max-width: unset;
    width: 100%;
  }
`;

const positionStyles: Record<ToastPosition, ReturnType<typeof css>> = {
  "bottom-right": css`
    bottom: 24px;
    right: 24px;
  `,
  "bottom-left": css`
    bottom: 24px;
    left: 24px;
  `,
  "top-right": css`
    top: 24px;
    right: 24px;
  `,
  "top-left": css`
    top: 24px;
    left: 24px;
  `,
};

/* Used by the standalone <Toast> component */
export const StyledToast = styled.div<{
  $position: ToastPosition;
  $variant: ToastVariant;
  $closing: boolean;
}>`
  position: fixed;
  z-index: ${({ theme }) => theme.zIndex.toast};
  ${toastContentStyles}

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

  ${({ $position }) => positionStyles[$position]}
  ${({ $variant, theme }) => toastVariantStyles($variant, theme)}
`;

/* Used inside ToastStack by the provider */
export const ToastItem = styled.div<{
  $variant: ToastVariant;
  $closing: boolean;
  $isTop: boolean;
}>`
  ${toastContentStyles}
  pointer-events: all;

  animation: ${({ $closing, $isTop }) =>
    $closing
      ? css`
          ${fadeOut} 0.2s ease forwards
        `
      : $isTop
        ? css`
            ${slideInTop} 0.2s ease forwards
          `
        : css`
            ${slideInBottom} 0.2s ease forwards
          `};

  ${({ $variant, theme }) => toastVariantStyles($variant, theme)}
`;

/* Fixed container that stacks multiple toasts */
export const ToastStack = styled.div<{ $position: ToastPosition }>`
  position: fixed;
  z-index: ${({ theme }) => theme.zIndex.toast};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
  pointer-events: none;

  ${({ $position, theme }) => {
    const styles: Record<ToastPosition, ReturnType<typeof css>> = {
      "bottom-right": css`
        bottom: ${theme.spacing[6]};
        right: ${theme.spacing[6]};
        align-items: flex-end;
      `,
      "bottom-left": css`
        bottom: ${theme.spacing[6]};
        left: ${theme.spacing[6]};
        align-items: flex-start;
      `,
      "top-right": css`
        top: ${theme.spacing[6]};
        right: ${theme.spacing[6]};
        align-items: flex-end;
      `,
      "top-left": css`
        top: ${theme.spacing[6]};
        left: ${theme.spacing[6]};
        align-items: flex-start;
      `,
    };
    return styles[$position];
  }}

  @media (max-width: 640px) {
    top: ${({ theme }) => theme.spacing[4]};
    left: ${({ theme }) => theme.spacing[3]};
    right: ${({ theme }) => theme.spacing[3]};
    bottom: auto;
    align-items: stretch;
  }
`;

export const ToastMessage = styled.p`
  flex: 1;
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) =>
    theme.brutalism ? theme.fontWeights.semibold : theme.fontWeights.normal};
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
