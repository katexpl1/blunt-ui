export type ToastVariants = "success" | "error" | "warning" | "info";
export type ToastPosition =
  | "bottom-right"
  | "bottom-left"
  | "top-right"
  | "top-left";

export interface ToastProps {
  open: boolean;
  onClose: () => void;
  message: string;
  variant?: ToastVariants;
  duration?: number;
  position?: ToastPosition;
}
