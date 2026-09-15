/**
 * The ClickGuard icon set.
 *
 * One 16×16 grid, stroked (never filled), so every icon shares a weight and
 * optical size. Adding an icon means adding a path here — components must not
 * inline their own SVG, or the set drifts.
 */
export const ICON_PATHS = {
  /** Blocked — a shield with a bar through it. Used for blocked visitors. */
  shieldBlock:
    "M8 1.6 2.9 3.4v4.1c0 3.1 2.1 5.6 5.1 6.9 3-1.3 5.1-3.8 5.1-6.9V3.4L8 1.6Z M5.8 8h4.4",
  /** Protected — a shield with a check. Used for spend we saved. */
  shieldCheck:
    "M8 1.6 2.9 3.4v4.1c0 3.1 2.1 5.6 5.1 6.9 3-1.3 5.1-3.8 5.1-6.9V3.4L8 1.6Z M5.9 7.9 7.4 9.4l2.8-2.9",
  /** Flagged — watching, not yet blocked. */
  flag: "M4 14.2V2.2 M4 2.6h7.4l-1.5 2.6 1.5 2.6H4",
  search: "M7.2 12.4a5.2 5.2 0 1 0 0-10.4 5.2 5.2 0 0 0 0 10.4Z M11.1 11.1 14 14",
  check: "M3.2 8.4 6.3 11.5 12.8 4.8",
  minus: "M3.6 8h8.8",
  close: "M4 4l8 8M12 4l-8 8",
  chevronLeft: "M9.8 3.6 5.4 8l4.4 4.4",
  chevronRight: "M6.2 3.6 10.6 8l-4.4 4.4",
  chevronDown: "M3.6 6.2 8 10.6l4.4-4.4",
  calendar:
    "M2.6 4.6h10.8v9H2.6v-9Z M2.6 7.2h10.8 M5.4 2.2v2.6 M10.6 2.2v2.6",
  /** Neutral placeholder for empty states. */
  circle: "M8 13.4A5.4 5.4 0 1 0 8 2.6a5.4 5.4 0 0 0 0 10.8Z",
  /** Retry / refresh — a circular arrow. Used to re-send a failed sync. */
  refresh: "M13 8.4A5 5 0 1 1 11.5 4.4 M12.1 1.9v2.9H9.2",
  /** Undo / revert. */
  undo: "M3 8.2h6.6a3 3 0 0 1 0 6H6.8 M5.6 5.4 2.8 8.2l2.8 2.8",
  info: "M8 13.4A5.4 5.4 0 1 0 8 2.6a5.4 5.4 0 0 0 0 10.8Z M8 7.4v3.4 M8 5.3v.1",
} as const;

export type IconName = keyof typeof ICON_PATHS;

export const ICON_NAMES = Object.keys(ICON_PATHS) as IconName[];
