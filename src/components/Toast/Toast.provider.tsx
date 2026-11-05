import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { createPortal } from "react-dom";
import type { ReactNode } from "react";
import { X } from "lucide-react";
import {
  ToastStack,
  ToastItem,
  ToastMessage,
  CloseButton,
} from "./Toast.styles";
import type {
  ToastContextValue,
  ToastFn,
  ToastOptions,
  ToastPosition,
} from "./Toast.types";

export const ToastContext = createContext<ToastContextValue | null>(null);

interface ActiveToast extends ToastOptions {
  id: number;
  closing: boolean;
}

const MAX_TOASTS = 5;
const DEFAULT_POSITION: ToastPosition = "bottom-right";

function ToastEntry({
  toast,
  isTop,
  onClose,
}: {
  toast: ActiveToast;
  isTop: boolean;
  onClose: (id: number) => void;
}) {
  useEffect(() => {
    const duration = toast.duration ?? 4000;
    if (duration === 0) {
      return;
    }
    const timer = setTimeout(() => onClose(toast.id), duration);
    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, onClose]);

  return (
    <ToastItem
      $variant={toast.variant ?? "info"}
      $closing={toast.closing}
      $isTop={isTop}
      role="alert"
      aria-live="polite"
    >
      <ToastMessage>{toast.message}</ToastMessage>
      <CloseButton
        onClick={() => onClose(toast.id)}
        aria-label="Close notification"
      >
        <X size={14} strokeWidth={2.5} />
      </CloseButton>
    </ToastItem>
  );
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ActiveToast[]>([]);

  const dismiss = useCallback((id: number) => {
    setToasts((previous) =>
      previous.map((toastItem) =>
        toastItem.id === id ? { ...toastItem, closing: true } : toastItem,
      ),
    );
    setTimeout(() => {
      setToasts((previous) =>
        previous.filter((toastItem) => toastItem.id !== id),
      );
    }, 200);
  }, []);

  const show = useCallback((options: ToastOptions) => {
    const id = Date.now();
    setToasts((previous) => {
      const updated = [...previous, { ...options, id, closing: false }];
      return updated.length > MAX_TOASTS
        ? updated.slice(updated.length - MAX_TOASTS)
        : updated;
    });
  }, []);

  const toast = useMemo<ToastFn>(() => {
    type ShortOpts = Omit<ToastOptions, "message" | "variant">;

    return Object.assign((options: ToastOptions) => show(options), {
      success: (message: string, opts?: ShortOpts) =>
        show({ ...opts, message, variant: "success" }),
      error: (message: string, opts?: ShortOpts) =>
        show({ ...opts, message, variant: "error" }),
      warning: (message: string, opts?: ShortOpts) =>
        show({ ...opts, message, variant: "warning" }),
      info: (message: string, opts?: ShortOpts) =>
        show({ ...opts, message, variant: "info" }),
    }) as ToastFn;
  }, [show]);

  const position = toasts[toasts.length - 1]?.position ?? DEFAULT_POSITION;
  const isTop = position.startsWith("top");

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {toasts.length > 0 &&
        createPortal(
          <ToastStack $position={position}>
            {toasts.map((activeToast) => (
              <ToastEntry
                key={activeToast.id}
                toast={activeToast}
                isTop={isTop}
                onClose={dismiss}
              />
            ))}
          </ToastStack>,
          document.body,
        )}
    </ToastContext.Provider>
  );
}
