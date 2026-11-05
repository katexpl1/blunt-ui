import { useContext } from "react";
import { ConfirmContext } from "./ConfirmDialog.provider";
import type { ConfirmFn } from "./ConfirmDialog.types";

export function useConfirm(): ConfirmFn {
  const confirmContext = useContext(ConfirmContext);

  if (!confirmContext) {
    throw new Error("useConfirm must be used within a ConfirmProvider");
  }

  return confirmContext.confirm;
}
