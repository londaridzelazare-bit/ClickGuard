import type { ReactNode } from "react";
import { cx } from "../../utils/cx";
import "./Toast.css";

export interface ToastItem {
  id: string;
  message: ReactNode;
  tone?: "success" | "danger" | "neutral";
  actionLabel?: string;
  onAction?(): void;
}

export interface ToastRegionProps {
  toasts: ToastItem[];
  onDismiss(id: string): void;
  className?: string;
}

export function ToastRegion({ toasts, onDismiss, className }: ToastRegionProps) {
  return (
    <div
      className={cx("cg-toast-region", className)}
      role="status"
      aria-live="polite"
      aria-atomic="false"
    >
      {toasts.map((toast) => (
        <div key={toast.id} className="cg-toast">
          <span
            className={cx("cg-toast__dot", `cg-toast__dot--${toast.tone ?? "neutral"}`)}
            aria-hidden="true"
          />
          <span className="cg-toast__message">{toast.message}</span>
          {toast.actionLabel && toast.onAction && (
            <button type="button" className="cg-toast__action" onClick={toast.onAction}>
              {toast.actionLabel}
            </button>
          )}
          <button
            type="button"
            className="cg-toast__dismiss"
            aria-label="Dismiss notification"
            onClick={() => onDismiss(toast.id)}
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
