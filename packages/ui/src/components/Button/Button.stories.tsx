import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Primitives/Button",
  component: Button,
  args: { children: "Unblock visitor", variant: "secondary", size: "md" },
  parameters: {
    docs: {
      description: {
        component:
          "Secondary is the default action everywhere in the product. Solid ink (`primary`) is reserved for the confirming button inside a dialog, so a filled button always means *this is the thing you came here to do*. `danger` is for actions that start blocking.",
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Button>;

export const Playground: Story = {};

export const Variants: Story = {
  render: () => (
    <div className="sb-stack">
      <div className="sb-row">
        <Button variant="secondary">Unblock visitor</Button>
        <Button variant="danger">Block now</Button>
        <Button variant="primary">Unblock visitor</Button>
        <Button variant="ghost">Report as mistake</Button>
        <Button variant="link">Retry</Button>
      </div>
      <p className="sb-note">
        secondary · danger · primary (confirmations only) · ghost · link
      </p>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="sb-row">
      <Button size="md">Medium (default)</Button>
      <Button size="sm">Small</Button>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="sb-row">
      <Button disabled>Unblock visitor</Button>
      <Button variant="danger" disabled>
        Block now
      </Button>
      <Button variant="primary" disabled>
        Confirm
      </Button>
    </div>
  ),
};
