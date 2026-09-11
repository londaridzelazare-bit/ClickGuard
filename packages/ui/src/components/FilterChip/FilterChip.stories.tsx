import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { FilterChip } from "./FilterChip";

const meta: Meta<typeof FilterChip> = {
  title: "Primitives/FilterChip",
  component: FilterChip,
  args: { children: "Blocked", active: false },
};
export default meta;
type Story = StoryObj<typeof FilterChip>;

export const Playground: Story = {};

export const States: Story = {
  render: () => (
    <div className="sb-stack">
      <div className="sb-row">
        <FilterChip>Default</FilterChip>
        <FilterChip active>Active</FilterChip>
        <FilterChip disabled>Disabled</FilterChip>
      </div>
      <p className="sb-note">
        Active uses the accent role, never a status colour. A filter is a
        selection, not a verdict — if the &ldquo;Blocked&rdquo; chip turned red when
        you picked it, the toolbar would start making claims about the data instead
        of describing what you asked to see.
      </p>
    </div>
  ),
};

export const WithCounts: Story = {
  render: () => {
    const [status, setStatus] = useState("All");
    const counts: Record<string, number> = { All: 22, Blocked: 8, Flagged: 4, Clean: 9 };
    return (
      <div className="sb-stack">
        <div className="sb-row">
          {Object.entries(counts).map(([label, count]) => (
            <FilterChip
              key={label}
              active={status === label}
              count={count}
              onClick={() => setStatus(label)}
            >
              {label}
            </FilterChip>
          ))}
          <FilterChip count={0} disabled>
            Unblocked by you
          </FilterChip>
        </div>
        <p className="sb-note">
          Showing the matching count turns the toolbar into a preview of the result
          set, so a customer can see a filter is empty before clicking it and landing
          on a blank table. A zero-count chip is disabled rather than hidden —
          hiding it would make the option look like it does not exist.
        </p>
      </div>
    );
  },
};
