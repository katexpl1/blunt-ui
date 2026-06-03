import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  Backdrop,
  CloseButton,
  Dialog,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "./Modal.styles";
import type { ModalProps } from "./Modal.types";

const FOCUSABLE_SELECTORS = [
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "a[href]",
  '[tabindex]:not([tabindex="-1"])',
].join(", ");

function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(
    container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS),
  );
}

export function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  size = "md",
  closeOnBackdrop = true,
  closeOnEscape = true,
  ariaLabelledBy,
  ariaDescribedBy,
}: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const mouseDownTargetRef = useRef<EventTarget | null>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  const titleId = useId();
  const labelledBy = ariaLabelledBy ?? (title ? titleId : undefined);

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
      }, 150);

      return () => clearTimeout(t);
    }
  }, [open, isVisible]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const original = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  useEffect(() => {
    if (!open || !dialogRef.current) {
      return;
    }

    const dialog = dialogRef.current;
    const previousFocus = document.activeElement as HTMLElement | null;

    const focusable = getFocusableElements(dialog);

    (focusable[0] ?? dialog).focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && closeOnEscape) {
        onCloseRef.current();

        return;
      }

      if (e.key !== "Tab") {
        return;
      }

      const elements = getFocusableElements(dialog);

      if (elements.length === 0) {
        e.preventDefault();

        return;
      }

      const first = elements[0];
      const last = elements[elements.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previousFocus?.focus();
    };
  }, [open, closeOnEscape, isVisible]);

  if (!isVisible) {
    return null;
  }

  return createPortal(
    <Backdrop
      $closing={isClosing}
      onMouseDown={(e) => {
        mouseDownTargetRef.current = e.target;
      }}
      onClick={(e) => {
        if (closeOnBackdrop && mouseDownTargetRef.current === e.currentTarget) {
          onClose();
        }
      }}
    >
      <Dialog
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        aria-describedby={ariaDescribedBy}
        $size={size}
        $closing={isClosing}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <ModalHeader>
          {title && <ModalTitle id={titleId}>{title}</ModalTitle>}
          <CloseButton onClick={onClose} aria-label="Close modal">
            ×
          </CloseButton>
        </ModalHeader>

        <ModalBody>{children}</ModalBody>

        {footer && <ModalFooter>{footer}</ModalFooter>}
      </Dialog>
    </Backdrop>,
    document.body,
  );
}

Modal.displayName = "Modal";
