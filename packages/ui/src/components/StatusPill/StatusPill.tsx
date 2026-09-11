import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../../utils/cx";
import { statusTone, type Tone, type VisitorStatus } from "../../tokens";
import "./StatusPill.css";

export interface StatusPillProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Pass `status` for the four visitor states and the pill picks its own tone
   * from the design system's mapping — screens never choose the color.
   * Pass `tone` directly for everything else (source tags, sync state).
   */
  status?: VisitorStatus;
  tone?: Tone;
  size?: "sm" | "md";
  children?: ReactNode;
}

export function StatusPill({
  status,
  tone,
  size = "md",
  children,
  className,
  ...rest
}: StatusPillProps) {
  const resolved: Tone = tone ?? (status ? statusTone[status] : "neutral");
  return (
    <span
      className={cx("cg-pill", `cg-pill--${size}`, `cg-pill--${resolved}`, className)}
      {...rest}
    >
      {children ?? status}
    </span>
  );
}
