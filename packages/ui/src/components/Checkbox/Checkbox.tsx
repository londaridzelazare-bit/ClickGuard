import type { MouseEvent } from "react";
import { cx } from "../../utils/cx";
import { Icon } from "../Icon/Icon";
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
        <Icon name="minus" size="sm" className="cg-checkbox__mark" />
      ) : checked ? (
        <Icon name="check" size="sm" className="cg-checkbox__mark" />
      ) : null}
    </button>
  );
}
