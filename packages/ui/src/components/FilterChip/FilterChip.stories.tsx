import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { FilterChip } from "./FilterChip";
import { Checkbox } from "../Checkbox/Checkbox";

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
      <div className="sb-row sb-stack--inline">
        <FilterChip>Default</FilterChip>
        <FilterChip active>Selected</FilterChip>
        <FilterChip disabled>Disabled</FilterChip>
        <FilterChip count={8}>With count</FilterChip>
        <FilterChip active count={8}>
          Selected with count
        </FilterChip>
      </div>
      <p className="sb-note">
        Selected is solid ink — the same treatment as a checked checkbox, because
        it means the same thing. It is deliberately not a status colour (a filter
        is a selection, not a verdict) and no longer accent: accent now means
        &ldquo;link&rdquo; and nothing else, anywhere in the system. Hover, focus and
        disabled all stay distinguishable from selected: hover tints the surface,
        focus draws an ink ring, disabled drops opacity.
      </p>
    </div>
  ),
};

export const SelectionIsOneColour: Story = {
  name: "Selection is one colour",
  render: () => (
    <div className="sb-stack">
      <div className="sb-row sb-stack--inline">
        <Checkbox checked onChange={() => {}} aria-label="Checked" />
        <FilterChip active>Blocked</FilterChip>
        <span className="sb-swatch__meta">checkbox · chip · (and calendar endpoints)</span>
      </div>
      <p className="sb-note">
        Every control that can be selected uses <code>--cg-selected-fill</code>. That
        single token is why a checked row, an active filter and a chosen date all
        read as the same gesture rather than three unrelated highlights.
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
