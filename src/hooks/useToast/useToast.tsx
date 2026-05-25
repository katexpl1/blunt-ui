import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";
import { Toast } from "../../components/Toast";
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
    const fn = (options: ToastOptions) => show(options);
    type ShortOpts = Omit<ToastOptions, "message" | "variant">;
    fn.success = (message: string, opts?: ShortOpts) =>
      show({ ...opts, message, variant: "success" });
    fn.error = (message: string, opts?: ShortOpts) =>
      show({ ...opts, message, variant: "error" });
    fn.warning = (message: string, opts?: ShortOpts) =>
      show({ ...opts, message, variant: "warning" });
    fn.info = (message: string, opts?: ShortOpts) =>
      show({ ...opts, message, variant: "info" });
    return fn as ToastFn;
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

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return ctx;
}
