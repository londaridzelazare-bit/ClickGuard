/**
 * Typed mirror of `styles/tokens.css`.
 *
 * These are *references* (`var(--cg-…)`), never literal values, so there is
 * exactly one source of truth. Use them when a value has to cross into JS —
 * an inline `style` for a computed width, a Storybook swatch, a chart fill.
 */

export const color = {
  surface0: "var(--cg-surface-0)",
  surface1: "var(--cg-surface-1)",
  surface2: "var(--cg-surface-2)",
  surface3: "var(--cg-surface-3)",

  textPrimary: "var(--cg-text-primary)",
  textSecondary: "var(--cg-text-secondary)",
  textMuted: "var(--cg-text-muted)",
  textInverse: "var(--cg-text-inverse)",

  border: "var(--cg-border)",
  borderStrong: "var(--cg-border-strong)",
  borderSubtle: "var(--cg-border-subtle)",
} as const;

/** The five semantic roles, each a bg / border / text / fill quadruple. */
export const role = {
  danger: {
    bg: "var(--cg-danger-bg)",
    border: "var(--cg-danger-border)",
    text: "var(--cg-danger-text)",
    fill: "var(--cg-danger-fill)",
  },
  warning: {
    bg: "var(--cg-warning-bg)",
    border: "var(--cg-warning-border)",
    text: "var(--cg-warning-text)",
    fill: "var(--cg-warning-fill)",
  },
  success: {
    bg: "var(--cg-success-bg)",
    border: "var(--cg-success-border)",
    text: "var(--cg-success-text)",
    fill: "var(--cg-success-fill)",
  },
  accent: {
    bg: "var(--cg-accent-bg)",
    border: "var(--cg-accent-border)",
    text: "var(--cg-accent-text)",
    fill: "var(--cg-accent-fill)",
  },
  neutral: {
    bg: "var(--cg-neutral-bg)",
    border: "var(--cg-neutral-border)",
    text: "var(--cg-neutral-text)",
    fill: "var(--cg-neutral-fill)",
  },
} as const;

export type Tone = keyof typeof role;

/**
 * The product's four visitor statuses, mapped onto roles.
 *
 * This mapping lives in the design system on purpose: it is the reason a
 * "Blocked" pill, a "Blocked" threat bar and a "Blocked" verdict box are the
 * same red without any screen ever naming that red.
 */
export const statusTone = {
  Blocked: "danger",
  Flagged: "warning",
  Clean: "success",
  "Unblocked by you": "neutral",
} as const satisfies Record<string, Tone>;

export type VisitorStatus = keyof typeof statusTone;

export const VISITOR_STATUSES = Object.keys(statusTone) as VisitorStatus[];

export const space = {
  2: "var(--cg-space-2)",
  4: "var(--cg-space-4)",
  6: "var(--cg-space-6)",
  8: "var(--cg-space-8)",
  10: "var(--cg-space-10)",
  12: "var(--cg-space-12)",
  16: "var(--cg-space-16)",
  20: "var(--cg-space-20)",
  24: "var(--cg-space-24)",
  32: "var(--cg-space-32)",
  40: "var(--cg-space-40)",
  48: "var(--cg-space-48)",
} as const;

export const radius = {
  xs: "var(--cg-radius-xs)",
  sm: "var(--cg-radius-sm)",
  md: "var(--cg-radius-md)",
  lg: "var(--cg-radius-lg)",
  pill: "var(--cg-radius-pill)",
} as const;

export const font = {
  sans: "var(--cg-font-sans)",
  mono: "var(--cg-font-mono)",
  size: {
    11: "var(--cg-text-11)",
    12: "var(--cg-text-12)",
    13: "var(--cg-text-13)",
    14: "var(--cg-text-14)",
    16: "var(--cg-text-16)",
    18: "var(--cg-text-18)",
    22: "var(--cg-text-22)",
  },
  weight: { regular: "var(--cg-weight-regular)", medium: "var(--cg-weight-medium)" },
} as const;

/**
 * The score at which the engine adds an IP to the platform exclusion lists.
 * Exported from the design system because three components draw it —
 * ThreatBar, JourneyTimeline and SignalTable all have to agree on where
 * the line is.
 */
export const BLOCK_THRESHOLD = 70;
