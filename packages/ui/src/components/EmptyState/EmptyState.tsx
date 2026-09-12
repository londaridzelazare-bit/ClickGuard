import type { ReactNode } from "react";
import { cx } from "../../utils/cx";
import { Icon } from "../Icon/Icon";
import "./EmptyState.css";

export interface EmptyStateProps {
  title: ReactNode;
  description?: ReactNode;
  /**
   * A checkmark for "nothing wrong yet" — an empty threat table is good news
   * and should not be dressed as a failure. Omitted for "no results", which
   * is the user's own filter, not a product state.
   */
  icon?: "success" | "neutral" | "none";
  action?: ReactNode;
  footnote?: ReactNode;
  compact?: boolean;
  className?: string;
}

export function EmptyState({
  title,
  description,
  icon = "none",
  action,
  footnote,
  compact = false,
  className,
}: EmptyStateProps) {
  return (
    <div className={cx("cg-empty", compact && "cg-empty--compact", className)}>
      {icon !== "none" && (
        <span className={cx("cg-empty__icon", `cg-empty__icon--${icon}`)} aria-hidden="true">
          <Icon name={icon === "success" ? "check" : "circle"} size="md" />
        </span>
      )}
      <h3 className="cg-empty__title">{title}</h3>
      {description && <p className="cg-empty__description">{description}</p>}
      {action && <div className="cg-empty__action">{action}</div>}
      {footnote && <div className="cg-empty__footnote">{footnote}</div>}
    </div>
  );
}
