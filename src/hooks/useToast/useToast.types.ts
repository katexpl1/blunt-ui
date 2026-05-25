import type { ToastVariants, ToastPosition } from "../../components/Toast";

export interface ToastOptions {
  message: string;
  variant?: ToastVariants;
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
