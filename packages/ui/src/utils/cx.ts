export type ClassValue = string | false | null | undefined;

/** Tiny classnames joiner. Keeps component files free of `.filter(Boolean).join(" ")`. */
export function cx(...values: ClassValue[]): string {
  let out = "";
  for (const v of values) {
    if (!v) continue;
    out = out ? `${out} ${v}` : v;
  }
  return out;
}
