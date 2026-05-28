import type { ModalSizes } from "../Modal";

export type ConfirmVariant = "default" | "danger";

export interface ConfirmDialogProps {
  open: boolean;
  title?: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: ConfirmVariant;
  size?: ModalSizes;
  onConfirm: () => void;
  onCancel: () => void;
}
