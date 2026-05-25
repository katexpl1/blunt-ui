import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { StyledToast, ToastMessage, CloseButton } from "./Toast.styles";
import type { ToastProps } from "./Toast.types";

export function Toast({
  open,
  onClose,
  message,
  variant = "info",
  duration = 4000,
  position = "bottom-right",
}: ToastProps) {
  const [isVisible, setIsVisible] = useState(open);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (open) {
      setIsVisible(true);
      setIsClosing(false);
    } else if (isVisible) {
      setIsClosing(true);
      const t = setTimeout(() => {
        setIsVisible(false);
        setIsClosing(false);
      }, 200);
      return () => clearTimeout(t);
    }
  }, [open, isVisible]);

  useEffect(() => {
    if (!open || duration === 0) {
      return;
    }

    const t = setTimeout(onClose, duration);
    return () => clearTimeout(t);
  }, [open, duration, onClose]);

  if (!isVisible) {
    return null;
  }

  return createPortal(
    <StyledToast
      $position={position}
      $variant={variant}
      $closing={isClosing}
      role="alert"
      aria-live="polite"
    >
      <ToastMessage>{message}</ToastMessage>
      <CloseButton onClick={onClose} aria-label="Close notification">
        <X size={14} strokeWidth={2.5} />
      </CloseButton>
    </StyledToast>,
    document.body,
  );
}

Toast.displayName = "Toast";
