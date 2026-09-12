import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { TextArea } from "./TextArea";

const meta: Meta<typeof TextArea> = {
  title: "Primitives/TextArea",
  component: TextArea,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof TextArea>;

export const States: Story = {
  render: () => {
    const [a, setA] = useState("");
    const [b, setB] = useState("This is our office VPN, not a bot. Three of us share it.");
    return (
      <div className="sb-stack">
        <TextArea
          label="What did we get wrong?"
          optional
          hint="A sentence is plenty. You can also send this empty."
          value={a}
          onValueChange={setA}
          placeholder="e.g. This is our office VPN, not a bot."
          maxLength={400}
        />
        <TextArea label="Filled" value={b} onValueChange={setB} maxLength={400} />
        <TextArea label="Disabled" value="" onValueChange={() => {}} disabled />
        <p className="sb-note">
          Focus uses the same single ink outline as SearchInput, drawn over the
          border rather than around it. &ldquo;Optional&rdquo; is spelled out next to
          the label instead of marking required fields with an asterisk — in a form
          where every field is optional, an asterisk convention says nothing.
        </p>
      </div>
    );
  },
};

export const OverLimit: Story = {
  name: "Edge case — over the character count",
  render: () => (
    <TextArea
      label="What did we get wrong?"
      optional
      value={"x".repeat(412)}
      onValueChange={() => {}}
      maxLength={400}
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          "The count turns red but submission is not blocked. This is optional feedback on a goodwill form; hard-failing someone for a long explanation would be the wrong trade.",
      },
    },
  },
};
