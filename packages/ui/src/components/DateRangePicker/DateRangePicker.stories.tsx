import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { DateRangePicker, DEFAULT_PRESETS, presetRange } from "./DateRangePicker";
import { formatRange, type DateRange } from "./dates";

/** Pinned so the stories are identical for every reviewer. */
const TODAY = new Date(2026, 8, 12);

const meta: Meta<typeof DateRangePicker> = {
  title: "Threat monitoring/DateRangePicker",
  component: DateRangePicker,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Two months, presets, and an explicit Apply. The draft range lives inside the panel and nothing reaches the page until Apply, so a half-made selection can never filter the table out from under the user — and Cancel is always a true revert.",
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof DateRangePicker>;

function Harness({
  initial,
  ...props
}: { initial: DateRange } & Partial<React.ComponentProps<typeof DateRangePicker>>) {
  const [value, setValue] = useState<DateRange>(initial);
  return (
    <div className="sb-stack" style={{ maxWidth: "none" }}>
      {/* `align-items: flex-start` matters: the picker root is inline-block and
          would otherwise stretch to the row height, pushing its popover away
          from the trigger. */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          minHeight: 420,
        }}
      >
        <DateRangePicker
          value={value}
          onChange={setValue}
          today={TODAY}
          align="start"
          {...props}
        />
      </div>
      <p className="sb-note">
        Applied value: <strong>{formatRange(value)}</strong>
      </p>
    </div>
  );
}

export const Closed: Story = {
  name: "Closed — the trigger",
  render: () => (
    <Harness initial={presetRange(DEFAULT_PRESETS[2], TODAY)} />
  ),
};

export const Open: Story = {
  name: "Open — full interaction",
  render: () => (
    <Harness initial={presetRange(DEFAULT_PRESETS[2], TODAY)} defaultOpen />
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Click a preset, or click a start day then an end day. Hovering after picking a start previews the band you are about to create. Arrow keys move a day at a time, Up/Down a week, PageUp/PageDown a month, Home/End to the ends of the week — and the view follows the focused day across month boundaries.",
      },
    },
  },
};

export const IncompleteSelection: Story = {
  name: "Incomplete selection — Apply is held back",
  render: () => (
    <div className="sb-stack" style={{ maxWidth: "none" }}>
      <Harness initial={{ start: new Date(2026, 8, 3), end: null }} defaultOpen />
      <p className="sb-note">
        With only a start chosen, Apply is disabled and the footer says{" "}
        <em>&ldquo;Now pick an end date&rdquo;</em> rather than leaving the user
        staring at a dead button. Clicking a day <em>before</em> the current start
        restarts the selection instead of producing an inverted range — invalid
        ranges are made unreachable rather than validated after the fact.
      </p>
    </div>
  ),
};

export const AllTime: Story = {
  name: "All time — no bounds",
  render: () => <Harness initial={{ start: null, end: null }} defaultOpen />,
};

export const WithMinimum: Story = {
  name: "Bounded — nothing before the account existed",
  render: () => (
    <div className="sb-stack" style={{ maxWidth: "none" }}>
      <Harness
        initial={presetRange(DEFAULT_PRESETS[0], TODAY)}
        minDate={new Date(2026, 7, 20)}
        defaultOpen
      />
      <p className="sb-note">
        Days outside <code>minDate</code>…today are disabled rather than hidden, so
        the calendar keeps its shape and the user can see <em>why</em> a date is not
        available. Future days are always disabled — there is no traffic there yet.
      </p>
    </div>
  ),
};

export const CustomRange: Story = {
  name: "Custom range — no preset matches",
  render: () => (
    <Harness
      initial={{ start: new Date(2026, 7, 2), end: new Date(2026, 8, 4) }}
      defaultOpen
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          "When the applied range does not match a preset, the trigger drops the preset name and shows the dates alone. No preset is marked selected.",
      },
    },
  },
};
