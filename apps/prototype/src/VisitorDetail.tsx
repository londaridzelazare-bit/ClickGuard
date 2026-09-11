import {
  BLOCK_THRESHOLD,
  Button,
  Drawer,
  DrawerCloseButton,
  JourneyTimeline,
  MetricCard,
  PlatformSyncStatus,
  SignalTable,
  StatusPill,
  VerdictBox,
  type JourneyItem,
  type PlatformSync,
} from "@clickguard/ui";
import type { DerivedVisitor, Platform } from "./data/types";
import { formatMoney, formatVisit } from "./data/format";
import { journeySummary } from "./data/visitors";

export interface VisitorDetailProps {
  visitor: DerivedVisitor | null;
  open: boolean;
  /** False while a dialog is on top, so Escape dismisses the dialog first. */
  closeOnEscape?: boolean;
  onClose(): void;
  expandedRuns: Record<string, boolean>;
  onExpandRun(key: string): void;
  onUnblock(v: DerivedVisitor): void;
  onBlock(v: DerivedVisitor): void;
  onMarkSafe(v: DerivedVisitor): void;
  onReportMistake(v: DerivedVisitor): void;
  onRetrySync(v: DerivedVisitor, platform: Platform): void;
}

/**
 * Collapses a long journey down to the rows that carry the argument: the first
 * two visits, the visit that crossed the threshold with its immediate
 * neighbours, and the two most recent. Everything else folds into an
 * expandable run.
 *
 * A 40-visit click farm rendered in full buries the one row that explains the
 * decision — which is the opposite of what this screen is for.
 */
function buildJourneyItems(
  visitor: DerivedVisitor,
  expandedRuns: Record<string, boolean>,
  onExpandRun: (key: string) => void,
): JourneyItem[] {
  const n = visitor.visitCount;
  const keep = new Set<number>([0, 1, n - 2, n - 1]);
  if (visitor.crossAt) {
    const c = visitor.crossAt - 1;
    keep.add(c - 1);
    keep.add(c);
    keep.add(c + 1);
  }

  const shouldCollapse = n > 10;
  const crossIndex = visitor.crossAt ? visitor.crossAt - 1 : -1;
  const items: JourneyItem[] = [];

  const toVisit = (i: number): JourneyItem => {
    const visit = visitor.visits[i];
    return {
      kind: "visit",
      id: `${visitor.ip}-${i}`,
      date: formatVisit(visit.at),
      source: visit.source,
      score: visit.score,
      crossed: i === crossIndex,
      afterBlock: crossIndex >= 0 && i > crossIndex,
    };
  };

  let i = 0;
  while (i < n) {
    if (!shouldCollapse || keep.has(i)) {
      items.push(toVisit(i));
      i++;
      continue;
    }
    let j = i;
    while (j < n && !keep.has(j)) j++;
    const key = `${visitor.ip}:${i}`;
    if (expandedRuns[key]) {
      for (let k = i; k < j; k++) items.push(toVisit(k));
    } else {
      items.push({
        kind: "gap",
        id: key,
        count: j - i,
        onExpand: () => onExpandRun(key),
      });
    }
    i = j;
  }

  return items;
}

export function VisitorDetail({
  visitor,
  open,
  closeOnEscape = true,
  onClose,
  expandedRuns,
  onExpandRun,
  onUnblock,
  onBlock,
  onMarkSafe,
  onReportMistake,
  onRetrySync,
}: VisitorDetailProps) {
  if (!visitor) {
    return <Drawer open={false} onClose={onClose} ariaLabel="Visitor detail" />;
  }

  const blocked = visitor.status === "Blocked";
  const isProtectedCrawler = visitor.connection === "Verified crawler";

  const syncItems: PlatformSync[] =
    blocked || visitor.status === "Unblocked by you"
      ? visitor.platforms.map((platform) => ({
          platform,
          state:
            visitor.status === "Unblocked by you"
              ? ("removed" as const)
              : (visitor.sync[platform] ?? "synced"),
          onRetry: () => onRetrySync(visitor, platform),
        }))
      : [];

  const actions = (() => {
    if (blocked) {
      return (
        <>
          <Button onClick={() => onUnblock(visitor)}>Unblock visitor</Button>
          <Button variant="ghost" onClick={() => onReportMistake(visitor)}>
            Report as mistake
          </Button>
        </>
      );
    }
    if (visitor.status === "Flagged") {
      return (
        <>
          <Button variant="danger" onClick={() => onBlock(visitor)}>
            Block now
          </Button>
          <Button variant="ghost" onClick={() => onMarkSafe(visitor)}>
            Mark as safe
          </Button>
        </>
      );
    }
    if (visitor.status === "Clean") {
      return (
        <Button
          onClick={() => onBlock(visitor)}
          disabled={isProtectedCrawler}
          title={
            isProtectedCrawler
              ? "Verified search and ad-platform crawlers are protected. Blocking this would hurt your organic traffic or get your ads disapproved."
              : undefined
          }
        >
          Block visitor
        </Button>
      );
    }
    return (
      <>
        <Button variant="danger" onClick={() => onBlock(visitor)}>
          Block again
        </Button>
        <Button variant="ghost" onClick={() => onReportMistake(visitor)}>
          Report as mistake
        </Button>
      </>
    );
  })();

  return (
    <Drawer
      open={open}
      onClose={onClose}
      closeOnEscape={closeOnEscape}
      ariaLabel={`Visitor ${visitor.ip}`}
      header={
        <>
          <div className="cg-drawer__heading">
            <div className="detail__id">
              <span className="detail__ip">{visitor.ip}</span>
              <StatusPill status={visitor.status} />
            </div>
            <div className="detail__identity">{visitor.identity}</div>
            <div className="detail__device">{visitor.device}</div>
          </div>
          <DrawerCloseButton onClick={onClose} />
        </>
      }
      footer={
        <>
          {actions}
          <PlatformSyncStatus
            className="cg-drawer__sync"
            align="end"
            items={syncItems}
            emptyLabel="Not on any exclusion list"
          />
        </>
      }
    >
      <div className="cg-drawer__inset">
        <VerdictBox
          status={visitor.status}
          title={visitor.verdictTitle}
          note={visitor.syncNote}
        >
          {visitor.sentence}
        </VerdictBox>
      </div>

      <div className="cg-drawer__section">
        <JourneyTimeline
          items={buildJourneyItems(visitor, expandedRuns, onExpandRun)}
          threshold={BLOCK_THRESHOLD}
          summary={journeySummary(visitor)}
        />
      </div>

      <div className="cg-drawer__section">
        <SignalTable
          title={visitor.evidenceTitle}
          signals={visitor.signals}
          favor={visitor.favor}
          showTotal
        />
      </div>

      <div className="detail__money">
        <MetricCard
          size="drawer"
          label={blocked ? "Spent before block" : "Spent so far"}
          value={formatMoney(visitor.spentBefore)}
          sub={`${visitor.spentClicks} paid ${visitor.spentClicks === 1 ? "click" : "clicks"}`}
        />
        {blocked ? (
          <MetricCard
            size="drawer"
            label="Spent since block"
            value={formatMoney(visitor.spentSince)}
            sub={visitor.sinceSub}
            valueTone={visitor.spentSince > 0 ? "danger" : "success"}
          />
        ) : (
          <MetricCard
            size="drawer"
            label="Protected so far"
            value={formatMoney(visitor.protectedAmount)}
            sub={visitor.sinceSub}
            valueTone={visitor.protectedAmount > 0 ? "success" : "default"}
          />
        )}
      </div>

      {isProtectedCrawler && (
        <p className="detail__hint">
          Verified crawlers are on a protected list. Even if their behaviour scored
          above {BLOCK_THRESHOLD}, we would not add them to an exclusion list —
          blocking Googlebot removes you from organic search, and blocking Meta&rsquo;s
          crawler gets your ads disapproved.
        </p>
      )}
    </Drawer>
  );
}
