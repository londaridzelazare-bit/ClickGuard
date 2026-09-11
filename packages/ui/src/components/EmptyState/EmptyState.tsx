import type { ReactNode } from "react";
import { cx } from "../../utils/cx";
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
          {icon === "success" ? (
            <svg viewBox="0 0 14 14" width="13" height="13" fill="none">
              <path
                d="M2.5 7.2 5.6 10 11.5 3.8"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg viewBox="0 0 14 14" width="13" height="13" fill="none">
              <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          )}
        </span>
      )}
      <h3 className="cg-empty__title">{title}</h3>
      {description && <p className="cg-empty__description">{description}</p>}
      {action && <div className="cg-empty__action">{action}</div>}
      {footnote && <div className="cg-empty__footnote">{footnote}</div>}
    </div>
  );
}
