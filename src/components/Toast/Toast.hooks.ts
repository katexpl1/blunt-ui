import { useContext } from "react";
import { ToastContext } from "./Toast.provider";
import type { ToastContextValue } from "./Toast.types";

export function useToast(): ToastContextValue {
  const toastContext = useContext(ToastContext);

  if (!toastContext) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return toastContext;
}
