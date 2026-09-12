import type { ReactNode } from "react";
import { cx } from "../../utils/cx";
import { ICON_PATHS, type IconName } from "./paths";
import type { Tone } from "../../tokens";
import "./Icon.css";

export type { IconName };
export { ICON_NAMES } from "./paths";

export type IconSize = "sm" | "md" | "lg";
export type IconTone = Tone | "muted" | "inherit";

export interface IconProps {
  name: IconName;
  size?: IconSize;
  /** `inherit` (the default) takes the colour of the surrounding text. */
  tone?: IconTone;
  /**
   * Supplying a title makes the icon an `img` to assistive tech. Leave it out
   * whenever a visible text label already carries the meaning — which, in this
   * product, is almost always.
   */
  title?: string;
  className?: string;
}

export function Icon({ name, size = "md", tone = "inherit", title, className }: IconProps) {
  return (
    <svg
      className={cx("cg-icon", `cg-icon--${size}`, tone !== "inherit" && `cg-icon--${tone}`, className)}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="var(--cg-icon-stroke)"
      strokeLinecap="round"
      strokeLinejoin="round"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      focusable="false"
    >
      {title && <title>{title}</title>}
      <path d={ICON_PATHS[name]} />
    </svg>
  );
}

export interface IconBadgeProps {
  name: IconName;
  tone: Tone;
  className?: string;
  children?: ReactNode;
}

/**
 * A tinted square behind an icon. The shape distinguishes the metric; the
 * colour only reinforces it — the card's text label still says what it is, so
 * nothing depends on colour alone.
 */
export function IconBadge({ name, tone, className }: IconBadgeProps) {
  return (
    <span className={cx("cg-icon-badge", `cg-icon-badge--${tone}`, className)} aria-hidden="true">
      <Icon name={name} size="md" />
    </span>
  );
}
