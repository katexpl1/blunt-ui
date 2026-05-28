import type { ConfirmVariant } from "./ConfirmDialog.types";
import type { ModalSizes } from "../Modal";

export interface ConfirmOptions {
  title?: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: ConfirmVariant;
  size?: ModalSizes;
}

export type ConfirmFn = (options: ConfirmOptions) => Promise<boolean>;

export interface ConfirmContextValue {
  confirm: ConfirmFn;
}
