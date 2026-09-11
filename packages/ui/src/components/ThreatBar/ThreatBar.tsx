import { cx } from "../../utils/cx";
import { statusTone, type Tone, type VisitorStatus } from "../../tokens";
import "./ThreatBar.css";

export interface ThreatBarProps {
  /** 0–100. Drives the fill width only; it is not shown unless `showValue`. */
  score: number;
  /**
   * Two to four plain words. The label is the primary signal — the bar is
   * there to let the eye rank rows, not to be read precisely.
   */
  label: string;
  status?: VisitorStatus;
  tone?: Tone;
  /**
   * Off in the table by design: a bare "84" invites "84 what?" and erodes the
   * trust the screen exists to build. The drawer turns it on, where the
   * number sits next to the evidence that produced it.
   */
  showValue?: boolean;
  className?: string;
}

export function ThreatBar({
  score,
  label,
  status,
  tone,
  showValue = false,
  className,
}: ThreatBarProps) {
  const resolved: Tone = tone ?? (status ? statusTone[status] : "neutral");
  const pct = Math.max(0, Math.min(100, score));

  return (
    <div
      className={cx("cg-threatbar", className)}
      role="img"
      aria-label={`Threat: ${label}, score ${Math.round(score)} out of 100`}
    >
      <div className="cg-threatbar__track" aria-hidden="true">
        <div
          className={cx("cg-threatbar__fill", `cg-threatbar__fill--${resolved}`)}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="cg-threatbar__label">{label}</span>
      {showValue && <span className="cg-threatbar__value cg-num">{Math.round(score)}</span>}
    </div>
  );
}
