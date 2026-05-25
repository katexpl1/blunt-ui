import styled, { css, keyframes } from "styled-components";
import type { ModalSizes } from "./Modal.types";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const scaleIn = keyframes`
  from { opacity: 0; transform: scale(0.95) translateY(-8px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
`;

const scaleOut = keyframes`
  from { opacity: 1; transform: scale(1) translateY(0); }
  to { opacity: 0; transform: scale(0.95) translateY(-8px); }
`;

export const Backdrop = styled.div<{ $closing: boolean }>`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${({ theme }) => theme.zIndex.modal};
  animation: ${({ $closing }) => ($closing ? fadeOut : fadeIn)} 0.15s ease
    forwards;
`;

export const Dialog = styled.div<{ $size: ModalSizes; $closing: boolean }>`
  position: relative;
  background: ${({ theme }) => theme.colors.neutral[0]};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) =>
    theme.brutalism
      ? `${theme.brutalism.shadowOffset} ${theme.brutalism.shadowOffset} 0 ${theme.colors.neutral[900]}`
      : "0 20px 60px rgba(0,0,0,0.3)"};
  border: ${({ theme }) =>
    theme.brutalism
      ? `${theme.brutalism.borderWidth} solid ${theme.colors.neutral[900]}`
      : "none"};
  display: flex;
  flex-direction: column;
  max-height: 90vh;
  animation: ${({ $closing }) => ($closing ? scaleOut : scaleIn)} 0.15s ease
    forwards;

  ${({ $size }) =>
    $size === "sm" &&
    css`
      width: min(400px, 90vw);
    `}
  ${({ $size }) =>
    $size === "md" &&
    css`
      width: min(560px, 90vw);
    `}
  ${({ $size }) =>
    $size === "lg" &&
    css`
      width: min(720px, 90vw);
    `}
  ${({ $size }) =>
    $size === "fullscreen" &&
    css`
      width: 100vw;
      height: 100vh;
      max-height: 100vh;
      border-radius: 0;
    `}
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  padding: ${({ theme }) => theme.spacing[4]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral[200]};
  flex-shrink: 0;
`;

export const ModalTitle = styled.h2`
  flex: 1;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 600;
  margin: 0;
`;

export const CloseButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  border: none;
  background: none;
  cursor: pointer;
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: 20px;
  line-height: 1;
  color: ${({ theme }) => theme.colors.neutral[500]};

  &:hover {
    background-color: ${({ theme }) => theme.colors.neutral[100]};
    color: ${({ theme }) => theme.colors.neutral[900]};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary[500]};
    outline-offset: 2px;
  }
`;

export const ModalBody = styled.div`
  padding: ${({ theme }) => theme.spacing[4]};
  overflow-y: auto;
  flex: 1;
`;

export const ModalFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing[2]};
  padding: ${({ theme }) => theme.spacing[4]};
  border-top: 1px solid ${({ theme }) => theme.colors.neutral[200]};
  flex-shrink: 0;
`;
