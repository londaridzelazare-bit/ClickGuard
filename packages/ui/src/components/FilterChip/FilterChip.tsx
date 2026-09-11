import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cx } from "../../utils/cx";
import "./FilterChip.css";

export interface FilterChipProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "aria-pressed"> {
  active?: boolean;
  /**
   * Optional matching-row count. Showing it turns the toolbar into a preview
   * of the result set, so the user can tell a filter is empty before clicking
   * it and landing on a blank table.
   */
  count?: number;
  children: ReactNode;
}

export function FilterChip({
  active = false,
  count,
  children,
  className,
  ...rest
}: FilterChipProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={cx("cg-chip", className)}
      {...rest}
    >
      {children}
      {count !== undefined && <span className="cg-chip__count">{count}</span>}
    </button>
  );
}
