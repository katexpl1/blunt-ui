import type { ModalSize } from "../Modal";

export type ConfirmVariant = "default" | "danger";

export interface ConfirmDialogProps {
  open: boolean;
  title?: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: ConfirmVariant;
  size?: ModalSize;
  onConfirm: () => void;
  onCancel: () => void;
}

export interface ConfirmOptions {
  title?: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: ConfirmVariant;
  size?: ModalSize;
}

export type ConfirmFn = (options: ConfirmOptions) => Promise<boolean>;

export interface ConfirmContextValue {
  confirm: ConfirmFn;
}
