import { forwardRef, useId, type ReactNode, type TextareaHTMLAttributes } from "react";
import { cx } from "../../utils/cx";
import "./TextArea.css";

export interface TextAreaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange" | "value"> {
  label: ReactNode;
  value: string;
  onValueChange(next: string): void;
  hint?: ReactNode;
  /** Renders a plain "Optional" marker next to the label. */
  optional?: boolean;
  /** Shows a live character count. Does not itself block submission. */
  maxLength?: number;
  rows?: number;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea(
  { label, value, onValueChange, hint, optional, maxLength, rows = 4, className, id, ...rest },
  ref,
) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const hintId = `${fieldId}-hint`;
  const over = maxLength !== undefined && value.length > maxLength;

  return (
    <div className={cx("cg-field", className)}>
      <label className="cg-field__label" htmlFor={fieldId}>
        {label}
        {optional && <span className="cg-field__optional">Optional</span>}
      </label>

      {hint && (
        <p className="cg-field__hint" id={hintId}>
          {hint}
        </p>
      )}

      <textarea
        ref={ref}
        id={fieldId}
        className="cg-textarea"
        value={value}
        rows={rows}
        aria-describedby={hint ? hintId : undefined}
        onChange={(event) => onValueChange(event.target.value)}
        {...rest}
      />

      {maxLength !== undefined && (
        <div className="cg-field__footer">
          <span className={cx("cg-field__count", over && "cg-field__count--over")}>
            {value.length} / {maxLength}
          </span>
        </div>
      )}
    </div>
  );
});
