import type { ReactNode } from "react";
import { cx } from "../../utils/cx";
import "./SignalTable.css";

export interface Signal {
  /** What we actually observed, in the customer's language. */
  what: string;
  /** What a normal visitor does. The comparison is what makes it evidence. */
  baseline: string;
  /** Positive pushes toward a block, negative pulls away from one. */
  points: number;
}

export interface SignalTableProps {
  title?: ReactNode;
  signals: Signal[];
  /**
   * The counter-evidence row. Always rendered when present, even when it is
   * "nothing in this visitor's favor" — the absence is itself informative.
   */
  favor?: Signal;
  /** Renders a summed total row. Off by default; the drawer turns it on. */
  showTotal?: boolean;
  className?: string;
}

function formatPoints(points: number): string {
  if (points > 0) return `+${points}`;
  if (points < 0) return `−${Math.abs(points)}`;
  return "0";
}

function pointsClass(points: number): string {
  if (points > 0) return "cg-signals__pts--up";
  if (points < 0) return "cg-signals__pts--down";
  return "cg-signals__pts--zero";
}

export function SignalTable({
  title,
  signals,
  favor,
  showTotal = false,
  className,
}: SignalTableProps) {
  const total = signals.reduce((sum, s) => sum + s.points, 0) + (favor?.points ?? 0);

  return (
    <section className={cx("cg-signals", className)}>
      {title && <h3 className="cg-signals__title">{title}</h3>}

      <div className="cg-signals__grid cg-signals__head" aria-hidden="true">
        <div>What happened</div>
        <div>Typical visitor</div>
        <div style={{ textAlign: "right" }}>Score</div>
      </div>

      {signals.map((signal, index) => (
        <div key={`${signal.what}-${index}`} className="cg-signals__grid cg-signals__row">
          <div className="cg-signals__what">{signal.what}</div>
          <div className="cg-signals__base">{signal.baseline}</div>
          <div className={cx("cg-signals__pts", pointsClass(signal.points))}>
            {formatPoints(signal.points)}
          </div>
        </div>
      ))}

      {favor && (
        <div className="cg-signals__grid cg-signals__row">
          <div>
            <div className="cg-signals__favor-label">In this visitor&rsquo;s favor</div>
            <div className="cg-signals__what">{favor.what}</div>
          </div>
          <div className="cg-signals__base cg-signals__offset">{favor.baseline}</div>
          <div
            className={cx(
              "cg-signals__pts",
              "cg-signals__offset",
              pointsClass(favor.points),
            )}
          >
            {formatPoints(favor.points)}
          </div>
        </div>
      )}

      {showTotal && (
        <div className="cg-signals__total">
          <div>Total</div>
          <div />
          <div className="cg-signals__total-value">{total}</div>
        </div>
      )}
    </section>
  );
}
