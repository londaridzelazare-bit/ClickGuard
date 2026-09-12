import type { Meta, StoryObj } from "@storybook/react";
import { MetricCard } from "./MetricCard";

const meta: Meta<typeof MetricCard> = {
  title: "Primitives/MetricCard",
  component: MetricCard,
  args: {
    label: "Blocked visitors",
    value: "6",
    sub: "of 22 visitors seen",
    size: "page",
    valueTone: "default",
  },
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof MetricCard>;

export const Playground: Story = {};

export const PageHeader: Story = {
  name: "Page header — the three product metrics",
  render: () => (
    <div className="sb-stack" style={{ maxWidth: "none" }}>
      <div className="sb-grid-3">
        <MetricCard
          label="Blocked visitors"
          value="6"
          sub="of 22 visitors seen"
          icon="shieldBlock"
          iconTone="danger"
        />
        <MetricCard
          label="Spend protected"
          value="$142.40"
          sub="45 attempts stopped"
          valueTone="success"
          icon="shieldCheck"
          iconTone="success"
        />
        <MetricCard
          label="Flagged, not yet blocked"
          value="4"
          sub="Review when you have a minute"
          icon="flag"
          iconTone="warning"
        />
      </div>
      <p className="sb-note">
        Three distinct shapes, three semantic tones drawn from the same role
        tokens the statuses use — a blocked visitor is red here for the same
        reason the pill is. The text label is never dropped, so the icon and the
        colour are both reinforcement rather than the message.
      </p>
    </div>
  ),
};

export const WithoutIcons: Story = {
  name: "Without icons",
  render: () => (
    <div className="sb-grid-3">
      <MetricCard label="Blocked visitors" value="6" sub="of 22 visitors seen" />
      <MetricCard label="Spend protected" value="$142.40" sub="45 attempts stopped" valueTone="success" />
      <MetricCard label="Flagged, not yet blocked" value="4" sub="Review when you have a minute" />
    </div>
  ),
};

export const DrawerSize: Story = {
  render: () => (
    <div className="sb-stack">
      <div className="sb-grid-2" style={{ maxWidth: 480 }}>
        <MetricCard size="drawer" label="Spent before block" value="$12.80" sub="4 paid clicks" />
        <MetricCard
          size="drawer"
          label="Blocked since"
          value="$0.00"
          sub="3 attempts stopped"
          valueTone="success"
        />
      </div>
      <p className="sb-note">
        Green is only ever money the product saved; red is only ever money that
        leaked through. A plain count never gets a colour — colouring
        &ldquo;6 blocked visitors&rdquo; green would be the product claiming credit
        for a number the customer has not agreed is good yet.
      </p>
    </div>
  ),
};

export const MoneyLeaked: Story = {
  name: "Edge case — money leaked while a sync was pending",
  render: () => (
    <div className="sb-grid-2" style={{ maxWidth: 480 }}>
      <MetricCard size="drawer" label="Spent before block" value="$19.20" sub="6 paid clicks" />
      <MetricCard
        size="drawer"
        label="Blocked since"
        value="$25.60"
        sub="8 clicks slipped through while Google sync pending"
        valueTone="danger"
      />
    </div>
  ),
};

export const ZeroState: Story = {
  render: () => (
    <div className="sb-grid-3">
      <MetricCard
        label="Blocked visitors"
        value="0"
        sub="Your ads are live"
        icon="shieldBlock"
        iconTone="danger"
      />
      <MetricCard
        label="Spend protected"
        value="$0.00"
        sub="Nothing to protect yet"
        icon="shieldCheck"
        iconTone="success"
      />
      <MetricCard
        label="Flagged, not yet blocked"
        value="0"
        sub="Nothing to review"
        icon="flag"
        iconTone="warning"
      />
    </div>
  ),
};

export const FilteredScope: Story = {
  name: "Scoped to a filtered view",
  render: () => (
    <div className="sb-stack" style={{ maxWidth: "none" }}>
      <div className="sb-grid-3">
        <MetricCard
          label="Blocked visitors"
          value="3"
          sub="of 3 visitors in view"
          icon="shieldBlock"
          iconTone="danger"
        />
        <MetricCard
          label="Spend protected"
          value="$41.60"
          sub="16 attempts stopped · $25.60 still leaked"
          valueTone="success"
          icon="shieldCheck"
          iconTone="success"
        />
        <MetricCard
          label="Flagged, not yet blocked"
          value="0"
          sub="Nothing to review"
          icon="flag"
          iconTone="warning"
        />
      </div>
      <p className="sb-note">
        The sub-label switches from &ldquo;visitors seen&rdquo; to &ldquo;visitors in
        view&rdquo; once filters narrow the set, so the number above it is never
        mistaken for an account-wide total.
      </p>
    </div>
  ),
};
