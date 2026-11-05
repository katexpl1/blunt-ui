export type ToastVariant = "success" | "error" | "warning" | "info";

export type ToastPosition =
  | "bottom-right"
  | "bottom-left"
  | "top-right"
  | "top-left";

export interface ToastProps {
  open: boolean;
  onClose: () => void;
  message: string;
  variant?: ToastVariant;
  duration?: number;
  position?: ToastPosition;
}

export interface ToastOptions {
  message: string;
  variant?: ToastVariant;
  duration?: number;
  position?: ToastPosition;
}

export interface ToastFn {
  (options: ToastOptions): void;
  success: (
    message: string,
    options?: Omit<ToastOptions, "message" | "variant">,
  ) => void;
  error: (
    message: string,
    options?: Omit<ToastOptions, "message" | "variant">,
  ) => void;
  warning: (
    message: string,
    options?: Omit<ToastOptions, "message" | "variant">,
  ) => void;
  info: (
    message: string,
    options?: Omit<ToastOptions, "message" | "variant">,
  ) => void;
}

export interface ToastContextValue {
  toast: ToastFn;
}
