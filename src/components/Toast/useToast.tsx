import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";
import { Toast } from "./Toast";
import type {
  ToastContextValue,
  ToastFn,
  ToastOptions,
} from "./useToast.types";

const ToastContext = createContext<ToastContextValue | null>(null);

interface ActiveToast extends ToastOptions {
  id: number;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<ActiveToast | null>(null);

  const show = useCallback((options: ToastOptions) => {
    setActive({ ...options, id: Date.now() });
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

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {active && (
        <Toast
          key={active.id}
          open={true}
          onClose={() => setActive(null)}
          message={active.message}
          variant={active.variant}
          duration={active.duration}
          position={active.position}
        />
      )}
    </ToastContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);

  if (!ctx) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return ctx;
}
