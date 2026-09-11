/**
 * The prototype pins "now" so that every relative timestamp on the screen is
 * stable across reloads and identical for anyone opening the deployed link.
 */
export const NOW = new Date(2026, 8, 12, 10, 40);

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const pad = (n: number) => String(n).padStart(2, "0");

/** `Sep 9 · 14:32` — used in the journey timeline. */
export function formatVisit(d: Date): string {
  return `${MONTHS[d.getMonth()]} ${d.getDate()} · ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

/** `Sep 9, 14:32` — used in verdict headlines. */
export function formatLong(d: Date): string {
  return `${MONTHS[d.getMonth()]} ${d.getDate()}, ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

/** `Sep 9` */
export function formatDay(d: Date): string {
  return `${MONTHS[d.getMonth()]} ${d.getDate()}`;
}

/**
 * Relative time, rounded the way a person would say it. Minutes under an hour,
 * hours up to two days, then days — because "38 h ago" is how an advertiser
 * thinks about yesterday's spend, and "1.58 d ago" is how nobody does.
 */
export function formatRelative(d: Date, now: Date = NOW): string {
  const minutes = Math.round((now.getTime() - d.getTime()) / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 48) return `${hours} h ago`;
  return `${Math.round(hours / 24)} d ago`;
}

export function formatMoney(n: number): string {
  return `$${n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}

export function plural(n: number, one: string, many = `${one}s`): string {
  return n === 1 ? one : many;
}
