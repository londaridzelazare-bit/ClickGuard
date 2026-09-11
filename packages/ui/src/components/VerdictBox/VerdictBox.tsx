import type { ReactNode } from "react";
import { cx } from "../../utils/cx";
import { statusTone, type Tone, type VisitorStatus } from "../../tokens";
import "./VerdictBox.css";

export interface VerdictBoxProps {
  /** Line 1: what happened and when. Always concrete, never "High risk". */
  title: ReactNode;
  /** The sentence. Plain English, no jargon, no score. */
  children: ReactNode;
  /**
   * Caveats the product owes the user — a pending sync, a failed token, the
   * clicks that got through while we waited.
   */
  note?: ReactNode;
  status?: VisitorStatus;
  tone?: Tone;
  className?: string;
}

export function VerdictBox({
  title,
  children,
  note,
  status,
  tone,
  className,
}: VerdictBoxProps) {
  const resolved: Tone = tone ?? (status ? statusTone[status] : "neutral");
  return (
    <section className={cx("cg-verdict", `cg-verdict--${resolved}`, className)}>
      <h3 className="cg-verdict__title">{title}</h3>
      <p className="cg-verdict__body">{children}</p>
      {note && <p className="cg-verdict__note">{note}</p>}
    </section>
  );
}
