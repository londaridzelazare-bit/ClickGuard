import type { Meta, StoryObj } from "@storybook/react";
import { StatusPill } from "./StatusPill";
import { VISITOR_STATUSES } from "../../tokens";

const meta: Meta<typeof StatusPill> = {
  title: "Threat monitoring/StatusPill",
  component: StatusPill,
  args: { status: "Blocked", size: "md" },
  parameters: {
    docs: {
      description: {
        component:
          "Always a word plus a colour — never colour alone. Pass `status` and the pill resolves its own tone from the design system's `statusTone` map, so no screen ever decides what colour *Blocked* is.",
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof StatusPill>;

export const Playground: Story = {};

export const VisitorStatuses: Story = {
  render: () => (
    <div className="sb-stack">
      <div className="sb-row">
        {VISITOR_STATUSES.map((status) => (
          <StatusPill key={status} status={status} />
        ))}
      </div>
      <p className="sb-note">
        The four states a visitor can be in. &ldquo;Unblocked by you&rdquo; is
        deliberately neutral rather than green: the customer overrode us, which is
        neither a success nor a failure, and colouring it green would read as the
        product congratulating itself for a decision it did not make.
      </p>
    </div>
  ),
};

export const SmallVariant: Story = {
  render: () => (
    <div className="sb-stack">
      <div className="sb-row">
        <StatusPill size="sm" tone="warning">
          Paid
        </StatusPill>
        <StatusPill size="sm" tone="neutral">
          Organic
        </StatusPill>
        <StatusPill size="sm" tone="warning">
          Sync pending
        </StatusPill>
        <StatusPill size="sm" tone="danger">
          Sync failed
        </StatusPill>
      </div>
      <p className="sb-note">
        11px variant for things that live inside a row: the paid/organic source
        tag and inline sync state. The source tag borrows the warning tone on
        purpose — a paid visit is the only kind that costs money, and amber is
        the system&rsquo;s &ldquo;this is costing you something&rdquo; colour.
      </p>
    </div>
  ),
};

export const AllTones: Story = {
  render: () => (
    <div className="sb-row">
      <StatusPill tone="danger">danger</StatusPill>
      <StatusPill tone="warning">warning</StatusPill>
      <StatusPill tone="success">success</StatusPill>
      <StatusPill tone="neutral">neutral</StatusPill>
      <StatusPill tone="accent">accent</StatusPill>
    </div>
  ),
};
