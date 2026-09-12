import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { SearchInput } from "./SearchInput";
import { Checkbox } from "../Checkbox/Checkbox";

const meta: Meta = { title: "Primitives/Inputs" };
export default meta;
type Story = StoryObj;

export const Search: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <div className="sb-stack">
        <div>
          <div className="sb-label">Default — click in to see the focus treatment</div>
          <SearchInput
            value={value}
            onValueChange={setValue}
            placeholder="Search by IP or location"
            label="Search visitors"
          />
        </div>
        <div>
          <div className="sb-label">Filled, with its clear affordance</div>
          <SearchInput
            value="Frankfurt"
            onValueChange={() => {}}
            placeholder="Search by IP or location"
            label="Search visitors, filled"
          />
        </div>
        <p className="sb-note">
          One search box covers IP, city, country, connection type and threat label —
          splitting them into five fields would make the user decide which one their
          string belongs to before they can look for it.
        </p>
      </div>
    );
  },
};

export const FocusAndHover: Story = {
  name: "Focus is one line, not three",
  render: () => {
    const [value, setValue] = useState("");
    return (
      <div className="sb-stack">
        <SearchInput
          value={value}
          onValueChange={setValue}
          placeholder="Tab or click into me"
          label="Focus demonstration"
        />
        <p className="sb-note">
          This field used to set <code>border-color</code> <em>and</em> a two-layer
          box-shadow ring on focus, which painted three concentric lines. It now
          draws a single black outline at a negative offset, so the outline lands
          exactly on top of the 1px border instead of around it. Hover is a separate,
          quieter signal: the border darkens and the surface tints, and it stands
          down as soon as the field takes focus so the two never stack.
        </p>
        <p className="sb-note">
          The focus colour comes from <code>--cg-focus-color</code>, which is ink
          across the whole system — the same value the selected states use.
        </p>
      </div>
    );
  },
};

export const Checkboxes: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <div className="sb-row">
        <Checkbox checked={checked} onChange={setChecked} aria-label="Interactive" />
        <Checkbox checked={false} onChange={() => {}} aria-label="Unchecked" />
        <Checkbox checked onChange={() => {}} aria-label="Checked" />
        <Checkbox checked={false} indeterminate onChange={() => {}} aria-label="Some selected" />
        <Checkbox checked={false} disabled onChange={() => {}} aria-label="Disabled" />
        <span className="sb-swatch__meta">
          interactive · unchecked · checked · indeterminate · disabled
        </span>
      </div>
    );
  },
};
