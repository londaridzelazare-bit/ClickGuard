import type { ReactNode } from "react";
import { cx } from "../../utils/cx";
import { BLOCK_THRESHOLD } from "../../tokens";
import { StatusPill } from "../StatusPill/StatusPill";
import { Icon } from "../Icon/Icon";
import "./JourneyTimeline.css";

export interface JourneyVisit {
  kind: "visit";
  id: string;
  /** Pre-formatted — the design system does not own date formatting. */
  date: string;
  source: "paid" | "organic";
  score: number;
  /** The visit that pushed the cumulative score over the threshold. */
  crossed?: boolean;
  /** Arrived after the block landed — shown, but dimmed. */
  afterBlock?: boolean;
}

export interface JourneyGap {
  kind: "gap";
  id: string;
  count: number;
  onExpand(): void;
}

export type JourneyItem = JourneyVisit | JourneyGap;

export type JourneyOrder = "newest-first" | "oldest-first";

export interface JourneyTimelineProps {
  /** Always supplied oldest → newest; the component decides display order. */
  items: JourneyItem[];
  /** 0–100. Drawn as a dashed vertical line across every bar. */
  threshold?: number;
  /**
   * Newest first by default: the question a customer opens a visitor with is
   * "what is it doing now?", so the latest arrival belongs at the top. The
   * running score then reads downward from where the visitor stands today to
   * how it started.
   */
  order?: JourneyOrder;
  title?: ReactNode;
  summary?: ReactNode;
  className?: string;
}

export function JourneyTimeline({
  items,
  threshold = BLOCK_THRESHOLD,
  order = "newest-first",
  title = "Journey",
  summary,
  className,
}: JourneyTimelineProps) {
  // Callers pass chronological order so data never has to know about display.
  // Collapsed runs are items in the same sequence, so they stay in place.
  const ordered = order === "newest-first" ? [...items].reverse() : items;

  return (
    <div className={cx("cg-journey", className)}>
      <div className="cg-journey__header">
        <h3 className="cg-journey__title">{title}</h3>
        <span className="cg-journey__order">
          {order === "newest-first" ? "Newest first" : "Oldest first"}
        </span>
        {summary && <span className="cg-journey__summary">{summary}</span>}
      </div>

      <div className="cg-journey__grid cg-journey__labels" aria-hidden="true">
        <div>Visit</div>
        <div>Source</div>
        <div className="cg-journey__threshold-label">
          <span style={{ left: `${threshold}%` }}>Block threshold</span>
        </div>
        <div className="cg-journey__right">Score</div>
      </div>

      <ol style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {ordered.map((item) =>
          item.kind === "gap" ? (
            <li key={item.id}>
              <button type="button" className="cg-journey__gap" onClick={item.onExpand}>
                <span className="cg-journey__dots" aria-hidden="true">
                  ···
                </span>
                <span className="cg-journey__gap-label">
                  {item.count} more {item.count === 1 ? "visit" : "visits"}
                  <Icon name="chevronDown" size="sm" />
                </span>
              </button>
            </li>
          ) : (
            <JourneyRow key={item.id} visit={item} threshold={threshold} />
          ),
        )}
      </ol>
    </div>
  );
}

function JourneyRow({ visit, threshold }: { visit: JourneyVisit; threshold: number }) {
  const over = visit.score >= threshold;
  const fillVariant =
    visit.source === "organic" ? "organic" : over ? "paid-over" : "paid-under";

  return (
    <li
      className={cx(
        "cg-journey__grid",
        "cg-journey__row",
        visit.crossed && "cg-journey__row--cross",
        visit.afterBlock && "cg-journey__row--post",
      )}
    >
      <div className="cg-journey__date">
        <div>{visit.date}</div>
        {visit.crossed && <div className="cg-journey__marker">Crossed threshold</div>}
        {visit.afterBlock && !visit.crossed && (
          <div className="cg-journey__marker cg-journey__marker--muted">After block</div>
        )}
      </div>

      <div>
        <StatusPill size="sm" tone={visit.source === "paid" ? "warning" : "neutral"}>
          {visit.source === "paid" ? "Paid" : "Organic"}
        </StatusPill>
      </div>

      <div className="cg-journey__bar">
        <div className="cg-journey__track" />
        <div
          className={cx("cg-journey__fill", `cg-journey__fill--${fillVariant}`)}
          style={{ width: `${Math.max(0, Math.min(100, visit.score))}%` }}
        />
        <div className="cg-journey__threshold" style={{ left: `${threshold}%` }} />
      </div>

      <div
        className={cx(
          "cg-journey__score",
          over && "cg-journey__score--over",
          visit.crossed && "cg-journey__score--cross",
        )}
      >
        {visit.score}
      </div>
    </li>
  );
}
