import { Button } from "../Button";
import { Modal } from "../Modal";
import { ConfirmMessage, DangerButton } from "./ConfirmDialog.styles";
import type { ConfirmDialogProps } from "./ConfirmDialog.types";

export function ConfirmDialog({
  open,
  title = "Are you sure?",
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "default",
  size = "sm",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <Modal
      open={open}
      onClose={onCancel}
      title={title}
      size={size}
      closeOnBackdrop={false}
      footer={
        <>
          <Button variant="outline" onClick={onCancel}>
            {cancelLabel}
          </Button>
          {variant === "danger" ? (
            <DangerButton type="button" onClick={onConfirm}>
              {confirmLabel}
            </DangerButton>
          ) : (
            <Button variant="primary" onClick={onConfirm}>
              {confirmLabel}
            </Button>
          )}
        </>
      }
    >
      <ConfirmMessage>{message}</ConfirmMessage>
    </Modal>
  );
}

ConfirmDialog.displayName = "ConfirmDialog";
