import type { ReactNode } from "react";

export type ModalSize = "sm" | "md" | "lg" | "fullscreen";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: ModalSize;
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
}
