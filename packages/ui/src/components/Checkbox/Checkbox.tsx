import type { MouseEvent } from "react";
import { cx } from "../../utils/cx";
import "./Checkbox.css";

export interface CheckboxProps {
  checked: boolean;
  /** Header checkbox when some — but not all — rows are selected. */
  indeterminate?: boolean;
  onChange(next: boolean, event: MouseEvent<HTMLButtonElement>): void;
  disabled?: boolean;
  /** Required: these sit in a grid with no visible label of their own. */
  "aria-label": string;
  className?: string;
}

export function Checkbox({
  checked,
  indeterminate = false,
  onChange,
  disabled,
  className,
  ...rest
}: CheckboxProps) {
  const state = indeterminate ? "mixed" : checked;
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={state}
      disabled={disabled}
      className={cx("cg-checkbox", className)}
      onClick={(event) => {
        event.stopPropagation();
        onChange(!checked, event);
      }}
      {...rest}
    >
      {indeterminate ? (
        <span className="cg-checkbox__dash" aria-hidden="true" />
      ) : checked ? (
        <svg
          className="cg-checkbox__mark"
          viewBox="0 0 10 10"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M1.5 5.2 3.9 7.5 8.5 2.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : null}
    </button>
  );
}
