import { createContext, useCallback, useContext, useState } from "react";
import type { ReactNode } from "react";
import { ConfirmDialog } from "./ConfirmDialog";
import type {
  ConfirmContextValue,
  ConfirmFn,
  ConfirmOptions,
} from "./useConfirm.types";

const ConfirmContext = createContext<ConfirmContextValue | null>(null);

interface ActiveConfirm extends ConfirmOptions {
  resolve: (value: boolean) => void;
}

export function ConfirmProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<ActiveConfirm | null>(null);

  const confirm = useCallback<ConfirmFn>((options) => {
    return new Promise<boolean>((resolve) => {
      setActive({ ...options, resolve });
    });
  }, []);

  const handleConfirm = () => {
    active?.resolve(true);
    setActive(null);
  };

  const handleCancel = () => {
    active?.resolve(false);
    setActive(null);
  };

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}
      {active && (
        <ConfirmDialog
          open={true}
          title={active.title}
          message={active.message}
          confirmLabel={active.confirmLabel}
          cancelLabel={active.cancelLabel}
          variant={active.variant}
          size={active.size}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </ConfirmContext.Provider>
  );
}

export function useConfirm(): ConfirmFn {
  const ctx = useContext(ConfirmContext);

  if (!ctx) {
    throw new Error("useConfirm must be used within a ConfirmProvider");
  }

  return ctx.confirm;
}
