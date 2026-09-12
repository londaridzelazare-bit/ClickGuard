import { useRef, type ReactNode } from "react";
import { Button, type ButtonVariant } from "../Button/Button";
import { Modal } from "../Modal/Modal";

export interface ConfirmDialogProps {
  open: boolean;
  title: ReactNode;
  children: ReactNode;
  confirmLabel: string;
  cancelLabel?: string;
  /** Solid ink by default. `danger` for anything that blocks or deletes. */
  confirmVariant?: ButtonVariant;
  onConfirm(): void;
  onCancel(): void;
}

/**
 * A yes/no dialog. Thin composition over `Modal`, which owns the scrim, the
 * focus trap, Escape handling and focus restoration — this component only
 * decides what the two buttons say and which one is loud.
 */
export function ConfirmDialog({
  open,
  title,
  children,
  confirmLabel,
  cancelLabel = "Cancel",
  confirmVariant = "primary",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const confirmRef = useRef<HTMLButtonElement>(null);

  return (
    <Modal
      open={open}
      onClose={onCancel}
      title={title}
      initialFocusRef={confirmRef}
      footer={
        <>
          <Button variant="secondary" onClick={onCancel}>
            {cancelLabel}
          </Button>
          <Button ref={confirmRef} variant={confirmVariant} onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </>
      }
    >
      {children}
    </Modal>
  );
}
