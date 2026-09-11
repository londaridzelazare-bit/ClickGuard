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
        <SearchInput
          value={value}
          onValueChange={setValue}
          placeholder="Search by IP or location"
          label="Search visitors"
        />
        <SearchInput
          value="Frankfurt"
          onValueChange={() => {}}
          placeholder="Search by IP or location"
          label="Search visitors, filled"
        />
        <p className="sb-note">
          Empty, and filled with its clear affordance. One search box covers IP,
          city, country and connection type — splitting them into four fields would
          make the user decide which one their string belongs to before they can
          look for it.
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
