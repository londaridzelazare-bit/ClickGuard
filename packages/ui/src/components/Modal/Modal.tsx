import { useCallback, useEffect, useId, useRef, type ReactNode } from "react";
import { cx } from "../../utils/cx";
import { Icon } from "../Icon/Icon";
import "./Modal.css";

const FOCUSABLE = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled]):not([type=hidden])",
  "textarea:not([disabled])",
  "select:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

export interface ModalProps {
  open: boolean;
  onClose(): void;
  title: ReactNode;
  children?: ReactNode;
  /** Action row. Buttons live here so every modal aligns them identically. */
  footer?: ReactNode;
  footerAlign?: "end" | "split";
  size?: "sm" | "md";
  /** Escape and scrim clicks close by default; turn off for destructive flows. */
  dismissible?: boolean;
  /** Focused on open. Falls back to the first focusable element. */
  initialFocusRef?: React.RefObject<HTMLElement>;
  className?: string;
}

/**
 * The shared dialog primitive: scrim, chrome, and the three behaviours every
 * modal owes a keyboard user — focus moves in on open, Tab is trapped inside
 * while it is open, and focus returns to whatever opened it on close.
 *
 * `ConfirmDialog` and the prototype's report flow both build on this rather
 * than re-implementing the behaviour, so there is one place to fix it.
 */
export function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  footerAlign = "end",
  size = "sm",
  dismissible = true,
  initialFocusRef,
  className,
}: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);
  const titleId = useId();

  const focusables = useCallback(
    () =>
      Array.from(dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []).filter(
        (el) => el.offsetParent !== null || el === document.activeElement,
      ),
    [],
  );

  /* Remember the opener, move focus in, and restore it on the way out. */
  useEffect(() => {
    if (!open) return;
    restoreRef.current = document.activeElement as HTMLElement | null;

    // A tick's grace so the dialog is laid out before we focus into it.
    // Deliberately `setTimeout` and not `requestAnimationFrame`: rAF does not
    // fire in a backgrounded tab, so a modal opened there would never take
    // focus and the trap below would have nothing to trap.
    const timer = window.setTimeout(() => {
      const target = initialFocusRef?.current ?? focusables()[0] ?? dialogRef.current;
      target?.focus();
    }, 0);

    return () => {
      window.clearTimeout(timer);
      const opener = restoreRef.current;
      if (opener && document.contains(opener)) opener.focus();
    };
  }, [open, initialFocusRef, focusables]);

  /* Escape to close, Tab trapped inside. Capture phase so a modal stacked
     over a drawer takes the Escape first. */
  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && dismissible) {
        event.stopPropagation();
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      const items = focusables();
      if (items.length === 0) {
        event.preventDefault();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;

      if (!dialogRef.current?.contains(active)) {
        event.preventDefault();
        first.focus();
        return;
      }
      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown, true);
    return () => document.removeEventListener("keydown", onKeyDown, true);
  }, [open, dismissible, onClose, focusables]);

  if (!open) return null;

  return (
    <div
      className="cg-scrim"
      role="presentation"
      onMouseDown={(event) => {
        if (dismissible && event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        className={cx("cg-modal", `cg-modal--${size}`, className)}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <div className="cg-modal__header">
          <h2 className="cg-modal__title" id={titleId}>
            {title}
          </h2>
        </div>
        {children && <div className="cg-modal__body">{children}</div>}
        {footer && (
          <div
            className={cx(
              "cg-modal__footer",
              footerAlign === "split" && "cg-modal__footer--split",
            )}
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

export interface ModalSuccessProps {
  title: ReactNode;
  children?: ReactNode;
}

/** Success panel shown in place of a modal's form after submission. */
export function ModalSuccess({ title, children }: ModalSuccessProps) {
  return (
    <div className="cg-modal__success">
      <span className="cg-modal__success-icon" aria-hidden="true">
        <Icon name="check" size="md" />
      </span>
      <h3 className="cg-modal__success-title">{title}</h3>
      {children && <p className="cg-modal__success-body">{children}</p>}
    </div>
  );
}
