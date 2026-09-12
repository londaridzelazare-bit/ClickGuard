/**
 * Day-granularity date helpers for the range picker.
 *
 * Everything here works on local-time calendar days, never timestamps: a range
 * the user picked on a calendar means whole days, and comparing raw
 * `getTime()` values would make "Sep 12" exclude most of Sep 12.
 */

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export const MONTHS_LONG = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export const MONTHS_SHORT = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

/** Sunday-first, so index 0 lines up with `Date.getDay()`. */
export const WEEKDAYS_MIN = ["S", "M", "T", "W", "T", "F", "S"];

export function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

export function addDays(d: Date, n: number): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
}

export function startOfMonth(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

export function addMonths(d: Date, n: number): Date {
  return new Date(d.getFullYear(), d.getMonth() + n, 1);
}

/** Whole days between two dates, ignoring time of day and DST shifts. */
export function daysBetween(a: Date, b: Date): number {
  const ms = startOfDay(b).getTime() - startOfDay(a).getTime();
  return Math.round(ms / 86_400_000);
}

export function isSameDay(a: Date | null, b: Date | null): boolean {
  if (!a || !b) return false;
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function isSameMonth(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
}

/** Day-granularity `a < b`. */
export function isBeforeDay(a: Date, b: Date): boolean {
  return startOfDay(a).getTime() < startOfDay(b).getTime();
}

/** Day-granularity `a > b`. */
export function isAfterDay(a: Date, b: Date): boolean {
  return startOfDay(a).getTime() > startOfDay(b).getTime();
}

/** Inclusive on both ends — the whole of `start` and the whole of `end`. */
export function isWithin(day: Date, start: Date, end: Date): boolean {
  const t = startOfDay(day).getTime();
  return t >= startOfDay(start).getTime() && t <= startOfDay(end).getTime();
}

/**
 * True when any part of `[aStart, aEnd]` overlaps `[bStart, bEnd]`.
 * Used to decide whether a visitor's journey touches the selected period.
 */
export function rangesOverlap(
  aStart: Date,
  aEnd: Date,
  bStart: Date,
  bEnd: Date,
): boolean {
  return (
    startOfDay(aStart).getTime() <= startOfDay(bEnd).getTime() &&
    startOfDay(aEnd).getTime() >= startOfDay(bStart).getTime()
  );
}

export function clampDay(day: Date, min?: Date, max?: Date): Date {
  if (min && isBeforeDay(day, min)) return startOfDay(min);
  if (max && isAfterDay(day, max)) return startOfDay(max);
  return startOfDay(day);
}

/**
 * Six weeks of cells for one month, padded with the neighbouring months so
 * every grid is the same height and the footer never jumps between months.
 */
export function buildMonthGrid(month: Date, weekStartsOn: 0 | 1 = 0): Date[] {
  const first = startOfMonth(month);
  const offset = (first.getDay() - weekStartsOn + 7) % 7;
  const gridStart = addDays(first, -offset);
  return Array.from({ length: 42 }, (_, i) => addDays(gridStart, i));
}

export function orderWeekdays(weekStartsOn: 0 | 1 = 0): string[] {
  return weekStartsOn === 0
    ? WEEKDAYS_MIN
    : [...WEEKDAYS_MIN.slice(1), WEEKDAYS_MIN[0]];
}

export function formatDay(d: Date): string {
  return `${MONTHS_SHORT[d.getMonth()]} ${d.getDate()}`;
}

export function formatDayLong(d: Date): string {
  return `${MONTHS_SHORT[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

export function formatMonthYear(d: Date): string {
  return `${MONTHS_LONG[d.getMonth()]} ${d.getFullYear()}`;
}

/**
 * `Aug 13 – Sep 12, 2026`, collapsing the year when both ends share one.
 */
export function formatRange(range: DateRange): string {
  const { start, end } = range;
  if (!start && !end) return "All time";
  if (start && !end) return `${formatDayLong(start)} – …`;
  if (!start || !end) return "All time";
  if (start.getFullYear() === end.getFullYear()) {
    return `${formatDay(start)} – ${formatDay(end)}, ${end.getFullYear()}`;
  }
  return `${formatDayLong(start)} – ${formatDayLong(end)}`;
}

export function isCompleteRange(range: DateRange): range is { start: Date; end: Date } {
  return Boolean(range.start && range.end);
}
