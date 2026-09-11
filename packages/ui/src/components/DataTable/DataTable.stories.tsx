import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { DataTable, type DataTableColumn, type SortState } from "./DataTable";
import { StatusPill } from "../StatusPill/StatusPill";
import { ThreatBar } from "../ThreatBar/ThreatBar";
import { EmptyState } from "../EmptyState/EmptyState";
import { Button } from "../Button/Button";
import type { VisitorStatus } from "../../tokens";

interface Row {
  ip: string;
  sub: string;
  status: VisitorStatus;
  score: number;
  label: string;
  visits: number;
  paid: number;
  blockedOn: string;
  blockedDay: string;
  lastSeen: string;
}

const ROWS: Row[] = [
  {
    ip: "185.220.101.42",
    sub: "Datacenter · Frankfurt",
    status: "Blocked",
    score: 88,
    label: "Automated traffic",
    visits: 5,
    paid: 4,
    blockedOn: "Google Ads, Meta Ads",
    blockedDay: "Sep 9",
    lastSeen: "38 h ago",
  },
  {
    ip: "102.89.14.7",
    sub: "Mobile · Lagos",
    status: "Blocked",
    score: 96,
    label: "Click farm pattern",
    visits: 14,
    paid: 14,
    blockedOn: "Google Ads, Meta Ads",
    blockedDay: "Sep 10",
    lastSeen: "14 h ago",
  },
  {
    ip: "77.111.246.19",
    sub: "VPN · London",
    status: "Flagged",
    score: 58,
    label: "Repeat clicks, but converted",
    visits: 7,
    paid: 3,
    blockedOn: "—",
    blockedDay: "",
    lastSeen: "2 d ago",
  },
  {
    ip: "24.6.113.201",
    sub: "Residential · Austin",
    status: "Clean",
    score: 8,
    label: "Normal behavior",
    visits: 2,
    paid: 1,
    blockedOn: "—",
    blockedDay: "",
    lastSeen: "25 h ago",
  },
];

const columns: DataTableColumn<Row>[] = [
  {
    key: "visitor",
    label: "Visitor",
    width: "1.35fr",
    sortable: true,
    render: (r) => (
      <div className="cg-truncate">
        <div className="cg-mono" style={{ fontSize: "var(--cg-text-13)" }}>
          {r.ip}
        </div>
        <div style={{ fontSize: "var(--cg-text-12)", color: "var(--cg-text-muted)", marginTop: 2 }}>
          {r.sub}
        </div>
      </div>
    ),
    skeleton: () => (
      <div>
        <div className="cg-table__bone" style={{ height: 10, width: 96 }} />
        <div
          className="cg-table__bone cg-table__bone--faint"
          style={{ height: 8, width: 72, marginTop: 8 }}
        />
      </div>
    ),
  },
  {
    key: "status",
    label: "Status",
    width: "128px",
    sortable: true,
    render: (r) => <StatusPill status={r.status} />,
    skeleton: () => (
      <div className="cg-table__bone" style={{ height: 18, width: 64, borderRadius: 999 }} />
    ),
  },
  {
    key: "threat",
    label: "Threat",
    width: "1.6fr",
    sortable: true,
    render: (r) => <ThreatBar score={r.score} label={r.label} status={r.status} />,
  },
  {
    key: "visits",
    label: "Visits",
    width: "96px",
    sortable: true,
    render: (r) => (
      <div>
        <div className="cg-num">{r.visits}</div>
        <div style={{ fontSize: "var(--cg-text-12)", color: "var(--cg-text-muted)", marginTop: 2 }}>
          {r.paid} paid
        </div>
      </div>
    ),
  },
  {
    key: "blocked",
    label: "Blocked on",
    width: "1.5fr",
    sortable: true,
    render: (r) => (
      <div className="cg-truncate">
        <div>{r.blockedOn}</div>
        {r.blockedDay && (
          <div style={{ fontSize: "var(--cg-text-12)", color: "var(--cg-text-muted)", marginTop: 2 }}>
            {r.blockedDay}
          </div>
        )}
      </div>
    ),
  },
  {
    key: "lastSeen",
    label: "Last seen",
    width: "110px",
    sortable: true,
    render: (r) => <span style={{ color: "var(--cg-text-secondary)" }}>{r.lastSeen}</span>,
  },
];

const meta = {
  title: "Threat monitoring/DataTable",
  component: DataTable<Row>,
  args: {
    columns,
    rows: ROWS,
    rowKey: (r: Row) => r.ip,
    selectable: true,
  },
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A grid-based table that takes column definitions with their own track widths and renderers. It owns sorting affordances, row selection, the drilled-in row treatment, the loading skeleton and the empty slot — so a screen supplies data and columns, never layout.",
      },
    },
  },
} satisfies Meta<typeof DataTable<Row>>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
  render: () => {
    const [sort, setSort] = useState<SortState>({ key: "lastSeen", dir: "desc" });
    const [checked, setChecked] = useState<string[]>([]);
    const [active, setActive] = useState<string | null>("102.89.14.7");

    return (
      <div className="sb-stack" style={{ maxWidth: "none" }}>
        <DataTable
          columns={columns}
          rows={ROWS}
          rowKey={(r) => r.ip}
          sort={sort}
          onSortChange={(key) =>
            setSort((s) =>
              s.key === key
                ? { key, dir: s.dir === "asc" ? "desc" : "asc" }
                : { key, dir: key === "visitor" ? "asc" : "desc" },
            )
          }
          selectable
          checkedKeys={checked}
          onCheckedChange={setChecked}
          activeKey={active}
          onRowActivate={(r) => setActive((a) => (a === r.ip ? null : r.ip))}
          caption="Visitors"
        />
        <p className="sb-note">
          Click a row to drill in (accent rail), a checkbox to select for a bulk
          action (quieter fill), or a column header to sort. Select-all applies only
          to visible rows — a filtered view that silently selects hidden ones is how
          people accidentally unblock two hundred visitors.
        </p>
      </div>
    );
  },
};

export const Loading: Story = {
  args: { rows: [], loading: true },
};

export const EmptyNewAccount: Story = {
  name: "Empty — nothing to block yet",
  args: {
    rows: [],
    empty: (
      <EmptyState
        icon="success"
        title="Nothing to block yet. We're watching."
        description="Your ads are live and every click is being checked. Visitors appear here the moment we see one, and anything that looks automated gets blocked before it can click again."
        footnote="Connected: Google Ads · Meta Ads"
      />
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "An empty threat table is good news, so it gets a green check rather than the usual grey shrug. It also states what *is* happening, because the anxious reading of an empty security screen is 'is this thing even on?'.",
      },
    },
  },
};

export const EmptyNoResults: Story = {
  name: "Empty — filters match nothing",
  args: {
    rows: [],
    empty: (
      <EmptyState
        compact
        title="No visitors match these filters"
        description={'Nothing matches "Tokyo" with the current status and platform filters. Try a shorter search, or clear the filters.'}
        action={<Button>Clear filters</Button>}
      />
    ),
  },
};

export const WithFooter: Story = {
  args: { footer: "Showing 4 of 22 visitors" },
};
