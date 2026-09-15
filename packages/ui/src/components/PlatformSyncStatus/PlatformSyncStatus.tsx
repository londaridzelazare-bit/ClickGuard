import { cx } from "../../utils/cx";
import { Button } from "../Button/Button";
import { Icon } from "../Icon/Icon";
import "./PlatformSyncStatus.css";

export type SyncState = "synced" | "pending" | "failed" | "removed";

export const SYNC_LABEL: Record<SyncState, string> = {
  synced: "Synced",
  pending: "Sync pending",
  failed: "Sync failed",
  removed: "Removed",
};

export interface PlatformSync {
  platform: string;
  state: SyncState;
  onRetry?(): void;
}

export interface PlatformSyncStatusProps {
  items: PlatformSync[];
  /** Shown when the visitor is on no exclusion list at all. */
  emptyLabel?: string;
  align?: "start" | "end";
  className?: string;
}

export function PlatformSyncStatus({
  items,
  emptyLabel = "Not on any exclusion list",
  align = "start",
  className,
}: PlatformSyncStatusProps) {
  if (items.length === 0) {
    return (
      <div className={cx("cg-sync", align === "end" && "cg-sync--end", className)}>
        <span className="cg-sync__empty">{emptyLabel}</span>
      </div>
    );
  }

  return (
    <div className={cx("cg-sync", align === "end" && "cg-sync--end", className)}>
      {items.map((item) => {
        const canRetry = item.state === "failed" && Boolean(item.onRetry);
        return (
          <div
            key={item.platform}
            className={cx("cg-sync__row", canRetry && "cg-sync__row--failed")}
          >
            <span
              className={cx("cg-sync__dot", `cg-sync__dot--${item.state}`)}
              aria-hidden="true"
            />
            <span>{item.platform}</span>
            <span className={cx("cg-sync__state", `cg-sync__state--${item.state}`)}>
              · {SYNC_LABEL[item.state]}
            </span>
            {/* A failed sync means the customer is still paying for clicks
                from a visitor we've told them is blocked. Recovering from that
                is the most urgent thing in the panel, so it is a real button —
                not a text link that reads like a footnote. */}
            {canRetry && (
              <Button
                size="sm"
                className="cg-sync__retry"
                onClick={item.onRetry}
                aria-label={`Retry ${item.platform} sync`}
              >
                <Icon name="refresh" size="sm" />
                Retry
              </Button>
            )}
          </div>
        );
      })}
    </div>
  );
}
