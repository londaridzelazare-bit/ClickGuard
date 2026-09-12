import { useEffect, useRef, type ReactNode } from "react";
import { cx } from "../../utils/cx";
import { Icon } from "../Icon/Icon";
import "./Drawer.css";

export interface DrawerProps {
  open: boolean;
  onClose(): void;
  /** Rendered in the header, left of the close button. */
  header?: ReactNode;
  footer?: ReactNode;
  children?: ReactNode;
  ariaLabel: string;
  /** Set false to keep Escape from closing (e.g. a dialog is on top). */
  closeOnEscape?: boolean;
  className?: string;
}

export function Drawer({
  open,
  onClose,
  header,
  footer,
  children,
  ariaLabel,
  closeOnEscape = true,
  className,
}: DrawerProps) {
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open || !closeOnEscape) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, closeOnEscape, onClose]);

  // Scroll back to the top when a different visitor is opened — otherwise you
  // land halfway down someone else's evidence list.
  useEffect(() => {
    if (open) bodyRef.current?.scrollTo({ top: 0 });
  }, [open, ariaLabel]);

  return (
    <aside
      className={cx("cg-drawer", open && "cg-drawer--open", className)}
      role="complementary"
      aria-label={ariaLabel}
      aria-hidden={!open}
      // `inert` is the correct way to remove an off-screen-but-animating panel
      // from the tab order. React 18 does not type it, hence the cast.
      {...(!open ? ({ inert: "" } as Record<string, string>) : {})}
    >
      {header && <div className="cg-drawer__header">{header}</div>}
      <div className="cg-drawer__body" ref={bodyRef}>
        {children}
      </div>
      {footer && <div className="cg-drawer__footer">{footer}</div>}
    </aside>
  );
}

export interface DrawerCloseButtonProps {
  onClick(): void;
}

export function DrawerCloseButton({ onClick }: DrawerCloseButtonProps) {
  return (
    <button type="button" className="cg-drawer__close" aria-label="Close panel" onClick={onClick}>
      <Icon name="close" size="sm" />
    </button>
  );
}
