import type { Meta, StoryObj } from "@storybook/react";
import { ThreatBar } from "./ThreatBar";

const meta: Meta<typeof ThreatBar> = {
  title: "Threat monitoring/ThreatBar",
  component: ThreatBar,
  args: { score: 84, label: "Automated traffic", status: "Blocked", showValue: false },
  argTypes: { score: { control: { type: "range", min: 0, max: 100, step: 1 } } },
  parameters: {
    docs: {
      description: {
        component:
          "Fill = score / 100, coloured by status. The label is two to four plain words and does the actual communicating; the bar only exists so the eye can rank rows at a glance. **The number is hidden by default** — see the *Why the number is hidden* story.",
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof ThreatBar>;

export const Playground: Story = {};

export const ByStatus: Story = {
  render: () => (
    <div className="sb-stack">
      <ThreatBar score={84} label="Automated traffic" status="Blocked" />
      <ThreatBar score={96} label="Click farm pattern" status="Blocked" />
      <ThreatBar score={58} label="Repeat clicks, but converted" status="Flagged" />
      <ThreatBar score={8} label="Normal behavior" status="Clean" />
      <ThreatBar score={66} label="Repeat clicks, but converted" status="Unblocked by you" />
    </div>
  ),
};

export const WhyTheNumberIsHidden: Story = {
  name: "Why the number is hidden",
  render: () => (
    <div className="sb-stack">
      <div>
        <div className="sb-label">In the table — label only</div>
        <ThreatBar score={84} label="Automated traffic" status="Blocked" />
      </div>
      <div>
        <div className="sb-label">In the drawer — value shown, next to its evidence</div>
        <ThreatBar score={84} label="Automated traffic" status="Blocked" showValue />
      </div>
      <p className="sb-note">
        A bare &ldquo;84&rdquo; in a table invites &ldquo;84 out of what, and why?&rdquo;
        — a question the row cannot answer, which costs exactly the trust this screen
        exists to build. The number appears only in the drawer, where the signal
        ledger underneath it accounts for every point.
      </p>
    </div>
  ),
};

export const EdgeValues: Story = {
  render: () => (
    <div className="sb-stack">
      <ThreatBar score={0} label="Nothing recorded" status="Clean" showValue />
      <ThreatBar score={100} label="Known bot network" status="Blocked" showValue />
      <ThreatBar score={140} label="Clamped above 100" status="Blocked" showValue />
      <ThreatBar score={-20} label="Clamped below 0" status="Clean" showValue />
    </div>
  ),
};
