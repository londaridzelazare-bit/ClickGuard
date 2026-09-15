import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Button,
  ConfirmDialog,
  DataTable,
  DateRangePicker,
  DEFAULT_PRESETS,
  EmptyState,
  FilterChip,
  MetricCard,
  Pagination,
  ReportDialog,
  SearchInput,
  StatusPill,
  ThreatBar,
  ToastRegion,
  VISITOR_STATUSES,
  isWithin,
  presetRange,
  type DataTableColumn,
  type DateRange,
  type SortState,
  type ToastItem,
  type VisitorStatus,
} from "@clickguard/ui";

import { VisitorDetail } from "./VisitorDetail";
import { VISITORS, derive, type Override } from "./data/visitors";
import type { DerivedVisitor, Platform } from "./data/types";
import { NOW, formatMoney } from "./data/format";
import "./app.css";

/* Scenarios exist so a reviewer can reach the loading, empty and no-match
   states without waiting for them or reverse-engineering a filter combination.
   They are prototype scaffolding and are labelled as such in the UI. */
type Scenario = "live" | "loading" | "empty" | "noResults";

type StatusFilter = "All" | VisitorStatus;

const SORT_KEYS = ["visitor", "status", "threat", "visits", "blocked", "lastSeen"] as const;
type SortKey = (typeof SORT_KEYS)[number];

const STATUS_ORDER: Record<VisitorStatus, number> = {
  Blocked: 0,
  Flagged: 1,
  Clean: 2,
  "Unblocked by you": 3,
};

interface HistoryEntry {
  overrides: Record<string, Override>;
}

/** Stable identity so the `all` memo below doesn't churn every render. */
const EMPTY: DerivedVisitor[] = [];

const PAGE_SIZES = [10, 25, 50];

/** The period the screen opens on. */
const DEFAULT_RANGE: DateRange = presetRange(
  DEFAULT_PRESETS.find((p) => p.id === "30d")!,
  NOW,
);

export default function App() {
  const [scenario, setScenario] = useState<Scenario>("live");

  const [dateRange, setDateRange] = useState<DateRange>(DEFAULT_RANGE);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
  const [paidOnly, setPaidOnly] = useState(false);
  const [platformFilter, setPlatformFilter] = useState<Record<Platform, boolean>>({
    "Google Ads": false,
    "Meta Ads": false,
  });

  const [sort, setSort] = useState<SortState>({ key: "lastSeen", dir: "desc" });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [selectedIp, setSelectedIp] = useState<string | null>(null);
  const [checkedKeys, setCheckedKeys] = useState<string[]>([]);
  const [overrides, setOverrides] = useState<Record<string, Override>>({});
  const [expandedRuns, setExpandedRuns] = useState<Record<string, boolean>>({});
  const [confirm, setConfirm] = useState<{ kind: "unblock"; visitor: DerivedVisitor } | null>(
    null,
  );
  const [reporting, setReporting] = useState<DerivedVisitor | null>(null);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const history = useRef<HistoryEntry[]>([]);

  /* --- scenario wiring -------------------------------------------------- */

  useEffect(() => {
    if (scenario === "noResults") {
      setSearch("Tokyo");
      setStatusFilter("Blocked");
    } else if (scenario === "live" || scenario === "empty" || scenario === "loading") {
      setSearch("");
      setStatusFilter("All");
      setPaidOnly(false);
      setPlatformFilter({ "Google Ads": false, "Meta Ads": false });
    }
    setSelectedIp(null);
    setCheckedKeys([]);
  }, [scenario]);

  /* --- derived data ----------------------------------------------------- */

  const derived = useMemo(
    () => VISITORS.map((v) => derive(v, overrides[v.ip])),
    [overrides],
  );

  /* The "new account" scenario has genuinely seen no traffic, so it must empty
     the counts and the chips too — not just the table body. A zero table under
     a toolbar that still says "22 visitors" is the kind of detail that tells a
     customer the screen is a mock-up. */
  const dated = scenario === "empty" ? EMPTY : derived;

  /**
   * The date range scopes the whole screen. A visitor belongs to the period if
   * they actually *arrived* during it — not merely if their journey straddles
   * it. A visitor who came on Sep 1 and again on Sep 20 was not present in a
   * Sep 5–10 window, and counting them there would inflate every metric above
   * the table.
   *
   * Note this is "any visit in range", not "last seen in range": a click farm
   * that started before the window and is still running belongs to the period,
   * and dropping it would hide exactly the traffic the period is meant to
   * surface.
   */
  const all = useMemo(() => {
    const { start, end } = dateRange;
    if (!start || !end) return dated;
    return dated.filter((v) => v.visits.some((visit) => isWithin(visit.at, start, end)));
  }, [dated, dateRange]);

  const query = search.trim().toLowerCase();

  const filtered = useMemo(() => {
    const activePlatforms = (Object.keys(platformFilter) as Platform[]).filter(
      (p) => platformFilter[p],
    );

    const rows = all.filter((v) => {
      if (statusFilter !== "All" && v.status !== statusFilter) return false;
      if (paidOnly && v.paidCount === 0) return false;
      if (activePlatforms.length && !activePlatforms.every((p) => v.platforms.includes(p))) {
        return false;
      }
      if (query) {
        const haystack =
          `${v.ip} ${v.city} ${v.country} ${v.connection} ${v.threatLabel}`.toLowerCase();
        if (!haystack.includes(query)) return false;
      }
      return true;
    });

    const value = (v: DerivedVisitor): number | string => {
      switch (sort.key as SortKey) {
        case "visitor":
          // Sort by numeric octets so 24.x lands before 185.x, the way an
          // engineer scanning a list of IPs expects.
          return v.ip
            .split(".")
            .map((part) => part.padStart(3, "0"))
            .join(".");
        case "status":
          return STATUS_ORDER[v.status];
        case "threat":
          return v.score;
        case "visits":
          return v.visitCount;
        case "blocked":
          return v.blockedAt ? v.blockedAt.getTime() : 0;
        case "lastSeen":
        default:
          return -v.minutesSinceLastSeen;
      }
    };

    return [...rows].sort((a, b) => {
      const x = value(a);
      const y = value(b);
      const cmp = x < y ? -1 : x > y ? 1 : 0;
      return sort.dir === "asc" ? cmp : -cmp;
    });
  }, [all, statusFilter, paidOnly, platformFilter, query, sort]);

  /* Any change to what the list contains or how it is ordered starts again
     from page 1 — staying on page 3 of a result set that now has one page
     would show an empty table for no visible reason. */
  useEffect(() => {
    setPage(1);
  }, [scenario, dateRange, statusFilter, paidOnly, platformFilter, query, sort, pageSize]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));

  /* An action can shrink the list under the current page — unblocking the
     last Blocked visitor while filtered to Blocked, say. Step back rather
     than strand the user on a page that no longer exists. */
  useEffect(() => {
    if (page > pageCount) setPage(pageCount);
  }, [page, pageCount]);

  const pageRows = useMemo(
    () => filtered.slice((page - 1) * pageSize, page * pageSize),
    [filtered, page, pageSize],
  );

  const selected = selectedIp ? (all.find((v) => v.ip === selectedIp) ?? null) : null;

  const hasFilters =
    statusFilter !== "All" ||
    paidOnly ||
    platformFilter["Google Ads"] ||
    platformFilter["Meta Ads"] ||
    query.length > 0;

  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = { All: all.length };
    for (const status of VISITOR_STATUSES) {
      counts[status] = all.filter((v) => v.status === status).length;
    }
    return counts;
  }, [all]);

  /**
   * Metrics describe exactly the rows on screen — the same set the table
   * renders, after the date range, chips and search. Summarising a wider set
   * than the one below them is how a dashboard ends up contradicting itself.
   */
  const metrics = useMemo(() => {
    const scope = filtered;
    if (scope.length === 0) {
      return {
        blocked: "0",
        blockedSub: all.length === 0 ? "Your ads are live" : "None in this view",
        protected: "$0.00",
        protectedSub: all.length === 0 ? "Nothing to protect yet" : "Nothing in this view",
        flagged: "0",
        flaggedSub: "Nothing to review",
      };
    }
    const blocked = scope.filter((v) => v.status === "Blocked");
    const flagged = scope.filter((v) => v.status === "Flagged");
    const protectedTotal = scope.reduce((sum, v) => sum + v.protectedAmount, 0);
    const stoppedTotal = scope.reduce((sum, v) => sum + v.stopped, 0);
    const leaked = scope.reduce((sum, v) => sum + v.spentSince, 0);
    const scoped = scope.length !== all.length;
    return {
      blocked: String(blocked.length),
      blockedSub: `of ${scope.length} ${scoped ? "visitors in view" : "visitors seen"}`,
      protected: formatMoney(protectedTotal),
      protectedSub:
        leaked > 0
          ? `${stoppedTotal} attempts stopped · ${formatMoney(leaked)} still leaked`
          : `${stoppedTotal} attempts stopped`,
      flagged: String(flagged.length),
      flaggedSub: flagged.length ? "Review when you have a minute" : "Nothing to review",
    };
  }, [filtered, all.length]);

  /* --- mutations -------------------------------------------------------- */

  const pushToast = useCallback((toast: Omit<ToastItem, "id">) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    setToasts((current) => [...current.slice(-2), { ...toast, id }]);
    window.setTimeout(() => {
      setToasts((current) => current.filter((t) => t.id !== id));
    }, 9000);
  }, []);

  const applyOverrides = useCallback(
    (next: Record<string, Override>, message: string, tone: ToastItem["tone"]) => {
      history.current.push({ overrides });
      setOverrides(next);
      pushToast({
        message,
        tone,
        actionLabel: "Undo",
        onAction: () => {
          const previous = history.current.pop();
          if (previous) setOverrides(previous.overrides);
          setToasts([]);
        },
      });
    },
    [overrides, pushToast],
  );

  const blockVisitor = useCallback(
    (visitor: DerivedVisitor) => {
      applyOverrides(
        {
          ...overrides,
          [visitor.ip]: {
            status: "Blocked",
            manual: true,
            platforms: ["Google Ads", "Meta Ads"],
            sync: { "Google Ads": "pending", "Meta Ads": "pending" },
          },
        },
        `${visitor.ip} blocked. Sending the exclusion to Google Ads and Meta Ads.`,
        "danger",
      );
    },
    [applyOverrides, overrides],
  );

  const unblockVisitor = useCallback(
    (visitor: DerivedVisitor) => {
      applyOverrides(
        { ...overrides, [visitor.ip]: { status: "Unblocked by you" } },
        `${visitor.ip} unblocked. Removing it from ${visitor.platforms.join(" and ")}.`,
        "neutral",
      );
    },
    [applyOverrides, overrides],
  );

  const markSafe = useCallback(
    (visitor: DerivedVisitor) => {
      applyOverrides(
        { ...overrides, [visitor.ip]: { status: "Clean" } },
        `${visitor.ip} marked as safe. We'll keep watching but won't flag this pattern again.`,
        "success",
      );
    },
    [applyOverrides, overrides],
  );

  /** The report is attached to the visitor whose drawer raised it. */
  const submitReport = useCallback(
    (visitor: DerivedVisitor, reason: string) => {
      pushToast({
        tone: "success",
        message: reason
          ? `Report sent for ${visitor.ip}, with your note.`
          : `Report sent for ${visitor.ip}.`,
      });
      // A real build would POST { ip, status, reason } here.
      // eslint-disable-next-line no-console
      console.info("[report]", { ip: visitor.ip, status: visitor.status, reason });
    },
    [pushToast],
  );

  const retrySync = useCallback(
    (visitor: DerivedVisitor, platform: Platform) => {
      setOverrides((current) => ({
        ...current,
        [visitor.ip]: {
          ...current[visitor.ip],
          sync: { ...(current[visitor.ip]?.sync ?? {}), [platform]: "pending" },
        },
      }));
      pushToast({ tone: "success", message: `Retrying the ${platform} sync.` });
    },
    [pushToast],
  );

  const checkedVisitors = all.filter((v) => checkedKeys.includes(v.ip));
  const checkedBlocked = checkedVisitors.filter((v) => v.status === "Blocked");
  const checkedUnblocked = checkedVisitors.filter((v) => v.status !== "Blocked");

  function bulkUnblock() {
    const next = { ...overrides };
    for (const v of checkedBlocked) next[v.ip] = { status: "Unblocked by you" };
    applyOverrides(
      next,
      `${checkedBlocked.length} visitors unblocked. Removing them from your exclusion lists.`,
      "neutral",
    );
    setCheckedKeys([]);
  }

  function bulkBlock() {
    const next = { ...overrides };
    for (const v of checkedUnblocked) {
      if (v.connection === "Verified crawler") continue;
      next[v.ip] = {
        status: "Blocked",
        manual: true,
        platforms: ["Google Ads", "Meta Ads"],
        sync: { "Google Ads": "pending", "Meta Ads": "pending" },
      };
    }
    const count = checkedUnblocked.filter((v) => v.connection !== "Verified crawler").length;
    applyOverrides(next, `${count} visitors blocked. Syncing to both platforms.`, "danger");
    setCheckedKeys([]);
  }

  function clearFilters() {
    setSearch("");
    setStatusFilter("All");
    setPaidOnly(false);
    setPlatformFilter({ "Google Ads": false, "Meta Ads": false });
    if (scenario === "noResults") setScenario("live");
  }

  /* --- keyboard: move between visitors without closing the drawer -------- */

  useEffect(() => {
    if (!selectedIp) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
      const target = event.target as HTMLElement | null;
      if (target && /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) return;
      event.preventDefault();
      const index = filtered.findIndex((v) => v.ip === selectedIp);
      if (index === -1) return;
      const nextIndex = event.key === "ArrowDown" ? index + 1 : index - 1;
      const next = filtered[nextIndex];
      if (!next) return;
      setSelectedIp(next.ip);
      // Walking off the end of a page turns the page, so the row whose detail
      // is open is always one you can see in the table.
      setPage(Math.floor(nextIndex / pageSize) + 1);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [selectedIp, filtered, pageSize]);

  /* --- columns ----------------------------------------------------------- */

  const columns: DataTableColumn<DerivedVisitor>[] = [
    {
      key: "visitor",
      label: "Visitor",
      width: "minmax(0, 1.35fr)",
      sortable: true,
      render: (v) => (
        <div className="cg-truncate">
          <div className="cell-ip">{v.ip}</div>
          <div className="cell-sub">
            {v.connection} · {v.city}
          </div>
        </div>
      ),
      skeleton: (i) => (
        <div>
          <div className="cg-table__bone" style={{ height: 10, width: 84 + ((i * 13) % 32) }} />
          <div
            className="cg-table__bone cg-table__bone--faint"
            style={{ height: 8, width: 60 + ((i * 7) % 24), marginTop: 8 }}
          />
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      width: "132px",
      sortable: true,
      render: (v) => <StatusPill status={v.status} />,
      skeleton: () => (
        <div className="cg-table__bone" style={{ height: 18, width: 64, borderRadius: 999 }} />
      ),
    },
    {
      key: "threat",
      label: "Threat",
      width: "minmax(0, 1.6fr)",
      sortable: true,
      render: (v) => <ThreatBar score={v.score} label={v.threatLabel} status={v.status} />,
      skeleton: (i) => (
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div className="cg-table__bone" style={{ height: 4, width: 64 }} />
          <div className="cg-table__bone" style={{ height: 10, width: 70 + ((i * 11) % 40) }} />
        </div>
      ),
    },
    {
      key: "visits",
      label: "Visits",
      width: "96px",
      sortable: true,
      render: (v) => (
        <div>
          <div className="cg-num">{v.visitCount}</div>
          <div className="cell-sub">{v.paidCount} paid</div>
        </div>
      ),
      skeleton: () => (
        <div>
          <div className="cg-table__bone" style={{ height: 10, width: 16 }} />
          <div
            className="cg-table__bone cg-table__bone--faint"
            style={{ height: 8, width: 36, marginTop: 8 }}
          />
        </div>
      ),
    },
    {
      key: "blocked",
      label: "Blocked on",
      width: "minmax(0, 1.5fr)",
      sortable: true,
      render: (v) => (
        <div className="cg-truncate">
          <div className="cell-blocked">
            <span>{v.blockedMain}</span>
            {v.status === "Blocked" && (v.syncPending || v.syncFailed) && (
              <StatusPill size="sm" tone={v.syncFailed ? "danger" : "warning"}>
                {v.syncFailed ? "Sync failed" : "Sync pending"}
              </StatusPill>
            )}
          </div>
          {v.blockedSub && <div className="cell-sub">{v.blockedSub}</div>}
        </div>
      ),
      skeleton: (i) => (
        <div className="cg-table__bone" style={{ height: 10, width: 60 + ((i * 17) % 60) }} />
      ),
    },
    {
      key: "lastSeen",
      label: "Last seen",
      width: "110px",
      sortable: true,
      render: (v) => <span className="cell-muted">{v.lastSeenLabel}</span>,
      skeleton: () => <div className="cg-table__bone" style={{ height: 10, width: 52 }} />,
    },
  ];

  function toggleSort(key: string) {
    setSort((current) =>
      current.key === key
        ? { key, dir: current.dir === "asc" ? "desc" : "asc" }
        : { key, dir: key === "visitor" ? "asc" : "desc" },
    );
  }

  /* --- render ------------------------------------------------------------ */

  const loading = scenario === "loading";

  const emptySlot =
    scenario === "empty" ? (
      <EmptyState
        icon="success"
        title="Nothing to block yet. We're watching."
        description="Your ads are live and every click is being checked. Visitors appear here the moment we see one, and anything that looks automated gets blocked before it can click again."
        footnote="Connected: Google Ads · Meta Ads"
      />
    ) : (
      <EmptyState
        compact
        title="No visitors match these filters"
        description={
          all.length === 0
            ? "No visitors arrived in this period. Widen the date range to look further back."
            : query
              ? `Nothing matches "${search.trim()}" with the current status and platform filters. Try a shorter search, or clear the filters.`
              : "No visitors match this combination of status and platform filters."
        }
        action={
          all.length === 0 ? undefined : <Button onClick={clearFilters}>Clear filters</Button>
        }
      />
    );

  return (
    <div className="app cg-root">
      <header className="topbar">
        <div className="topbar__brand">
          <span className="topbar__mark" aria-hidden="true" />
          ClickGuard
        </div>
        <nav className="topbar__nav" aria-label="Main">
          {["Overview", "Threat monitoring", "Campaigns", "Reports", "Settings"].map((item) => (
            <span
              key={item}
              className={`topbar__link ${item === "Threat monitoring" ? "topbar__link--active" : ""}`}
              aria-current={item === "Threat monitoring" ? "page" : undefined}
            >
              {item}
            </span>
          ))}
        </nav>
        <div className="topbar__right">
          <label className="scenario">
            Prototype state
            <select
              value={scenario}
              onChange={(event) => setScenario(event.target.value as Scenario)}
              aria-label="Prototype state"
            >
              <option value="live">Live data (22 visitors)</option>
              <option value="loading">Loading</option>
              <option value="empty">New account — nothing seen yet</option>
              <option value="noResults">Filters match nothing</option>
            </select>
          </label>
          <span>Acme Dental · Pro plan</span>
          <span className="topbar__avatar" aria-hidden="true" />
        </div>
      </header>

      <div className="workspace">
        <main className="page">
        <div className="page__head">
          <h1 className="page__title">Threat monitoring</h1>
          <div className="page__head-right">
            <span className="freshness">
              <span className="freshness__dot" aria-hidden="true" />
              Synced 4 min ago
            </span>
            <DateRangePicker
              value={dateRange}
              onChange={setDateRange}
              today={NOW}
              align="end"
            />
          </div>
        </div>

        <div className="metrics">
          <MetricCard
            label="Blocked visitors"
            value={metrics.blocked}
            sub={metrics.blockedSub}
            icon="shieldBlock"
            iconTone="danger"
          />
          <MetricCard
            label="Spend protected"
            value={metrics.protected}
            sub={metrics.protectedSub}
            valueTone="success"
            icon="shieldCheck"
            iconTone="success"
          />
          <MetricCard
            label="Flagged, not yet blocked"
            value={metrics.flagged}
            sub={metrics.flaggedSub}
            icon="flag"
            iconTone="warning"
          />
        </div>

        <div className="toolbar">
          <SearchInput
            value={search}
            onValueChange={setSearch}
            placeholder="Search by IP or location"
            label="Search visitors"
          />

          <span className="toolbar__divider" aria-hidden="true" />

          {(["All", ...VISITOR_STATUSES] as StatusFilter[]).map((status) => (
            <FilterChip
              key={status}
              active={statusFilter === status}
              count={statusCounts[status]}
              disabled={statusCounts[status] === 0 && statusFilter !== status}
              onClick={() => setStatusFilter(status)}
            >
              {status}
            </FilterChip>
          ))}

          <span className="toolbar__divider" aria-hidden="true" />

          <FilterChip active={paidOnly} onClick={() => setPaidOnly((p) => !p)}>
            Cost me money
          </FilterChip>
          {(["Google Ads", "Meta Ads"] as Platform[]).map((platform) => (
            <FilterChip
              key={platform}
              active={platformFilter[platform]}
              onClick={() =>
                setPlatformFilter((current) => ({
                  ...current,
                  [platform]: !current[platform],
                }))
              }
            >
              {platform}
            </FilterChip>
          ))}

          <div className="toolbar__right">
            {checkedBlocked.length > 0 && (
              <Button size="sm" onClick={bulkUnblock}>
                Unblock selected ({checkedBlocked.length})
              </Button>
            )}
            {checkedUnblocked.length > 0 && (
              <Button size="sm" variant="danger" onClick={bulkBlock}>
                Block selected ({checkedUnblocked.length})
              </Button>
            )}
            <span className="toolbar__count">
              {loading
                ? "Loading visitors…"
                : hasFilters
                  ? `${filtered.length} of ${all.length} visitors`
                  : `${all.length} visitors`}
            </span>
            {!loading && hasFilters && (
              <Button variant="link" onClick={clearFilters}>
                Clear filters
              </Button>
            )}
          </div>
        </div>

        <DataTable
          className="page__table"
          caption="Visitors scored by ClickGuard"
          columns={columns}
          rows={pageRows}
          scrollable
          scrollResetKey={`${page}-${pageSize}`}
          footer={
            !loading && filtered.length > 0 ? (
              <Pagination
                page={page}
                pageSize={pageSize}
                total={filtered.length}
                onPageChange={setPage}
                pageSizeOptions={PAGE_SIZES}
                onPageSizeChange={setPageSize}
                itemLabel="visitors"
              />
            ) : undefined
          }
          rowKey={(v) => v.ip}
          sort={sort}
          onSortChange={toggleSort}
          selectable
          checkedKeys={checkedKeys}
          onCheckedChange={setCheckedKeys}
          activeKey={selectedIp}
          onRowActivate={(v) => setSelectedIp((current) => (current === v.ip ? null : v.ip))}
          loading={loading}
          skeletonRows={8}
          empty={emptySlot}
        />
        </main>

        <VisitorDetail
          visitor={selected}
          open={Boolean(selected)}
          // The drawer stays open behind the scrim: the customer is confirming
          // a decision about *this* visitor, and taking the evidence away at
          // the moment of commitment is the opposite of what we want.
          closeOnEscape={!confirm && !reporting}
          onClose={() => setSelectedIp(null)}
          expandedRuns={expandedRuns}
          onExpandRun={(key) => setExpandedRuns((current) => ({ ...current, [key]: true }))}
          onUnblock={(v) => setConfirm({ kind: "unblock", visitor: v })}
          onBlock={blockVisitor}
          onMarkSafe={markSafe}
          onReportMistake={setReporting}
          onRetrySync={retrySync}
        />
      </div>

      <ConfirmDialog
        open={Boolean(confirm)}
        title={
          <>
            Unblock <span className="cg-mono">{confirm?.visitor.ip}</span>?
          </>
        }
        confirmLabel="Unblock visitor"
        onCancel={() => setConfirm(null)}
        onConfirm={() => {
          if (confirm) unblockVisitor(confirm.visitor);
          setConfirm(null);
        }}
      >
        Your ads will show to this visitor again on{" "}
        {confirm?.visitor.platforms.join(" and ")}. If it clicks, you pay for those
        clicks — this visitor has already cost you{" "}
        {formatMoney(confirm?.visitor.spentBefore ?? 0)}. We&rsquo;ll keep watching and
        flag it if the pattern comes back, but we won&rsquo;t block it again unless you
        ask.
      </ConfirmDialog>

      <ReportDialog
        open={Boolean(reporting)}
        subject={reporting?.ip ?? ""}
        subjectLabel={`${reporting?.status ?? ""} · ${reporting?.threatLabel ?? ""}`}
        onSubmit={(reason) => {
          if (reporting) submitReport(reporting, reason);
        }}
        onClose={() => setReporting(null)}
      />

      <ToastRegion
        toasts={toasts}
        onDismiss={(id) => setToasts((current) => current.filter((t) => t.id !== id))}
      />
    </div>
  );
}
