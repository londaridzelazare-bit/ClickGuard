import type { ReactNode } from "react";
import { cx } from "../../utils/cx";
import { IconBadge, type IconName } from "../Icon/Icon";
import type { Tone } from "../../tokens";
import "./MetricCard.css";

export interface MetricCardProps {
  label: ReactNode;
  value: ReactNode;
  sub?: ReactNode;
  /** `page` = 22px value for the header row. `drawer` = 18px inside a panel. */
  size?: "page" | "drawer";
  /** Reserve `success` for money saved and `danger` for money lost. */
  valueTone?: "default" | "success" | "danger";
  /**
   * Identifies the metric by shape as well as colour. The text label still
   * carries the meaning, so the icon is decorative and hidden from assistive
   * tech — nothing here depends on colour or glyph alone.
   */
  icon?: IconName;
  /** Tone of the icon badge. Defaults to neutral. */
  iconTone?: Tone;
  bare?: boolean;
  className?: string;
}

export function MetricCard({
  label,
  value,
  sub,
  size = "page",
  valueTone = "default",
  icon,
  iconTone = "neutral",
  bare = false,
  className,
}: MetricCardProps) {
  return (
    <div
      className={cx("cg-metric", `cg-metric--${size}`, bare && "cg-metric--bare", className)}
    >
      <div className="cg-metric__head">
        <div className="cg-metric__label">{label}</div>
        {icon && <IconBadge name={icon} tone={iconTone} />}
      </div>
      <div
        className={cx(
          "cg-metric__value",
          valueTone !== "default" && `cg-metric__value--${valueTone}`,
        )}
      >
        {value}
      </div>
      {sub !== undefined && sub !== null && sub !== "" && (
        <div className="cg-metric__sub">{sub}</div>
      )}
    </div>
  );
}
