import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cx } from "../../utils/cx";
import "./Button.css";

export type ButtonVariant = "secondary" | "primary" | "danger" | "ghost" | "link";
export type ButtonSize = "sm" | "md";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * `secondary` is the workhorse. `primary` (solid ink) is deliberately
   * reserved for the confirming action inside a dialog — see Button.css.
   */
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  children?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "secondary", size = "md", fullWidth, className, type = "button", ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cx(
        "cg-button",
        `cg-button--${variant}`,
        size === "sm" && "cg-button--sm",
        fullWidth && "cg-button--full",
        className,
      )}
      {...rest}
    />
  );
});
