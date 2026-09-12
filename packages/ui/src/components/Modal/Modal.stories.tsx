import { useState, type ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Modal, ModalSuccess } from "./Modal";
import { Button } from "../Button/Button";

const meta: Meta<typeof Modal> = {
  title: "Primitives/Modal",
  component: Modal,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "The shared dialog primitive. It owns the three behaviours every modal owes a keyboard user — focus moves in on open, Tab is trapped while it is open, and focus returns to whatever opened it on close. `ConfirmDialog` and `ReportDialog` are both thin compositions over this, so there is exactly one implementation to fix.",
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Modal>;

function Stage({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        position: "relative",
        height: 420,
        background: "var(--cg-surface-1)",
        border: "1px solid var(--cg-border)",
        borderRadius: "var(--cg-radius-lg)",
        overflow: "hidden",
      }}
    >
      {children}
    </div>
  );
}

export const Basic: Story = {
  render: () => (
    <Stage>
      <Modal
        open
        onClose={() => {}}
        title="Unblock 185.220.101.42?"
        footer={
          <>
            <Button>Cancel</Button>
            <Button variant="primary">Unblock visitor</Button>
          </>
        }
      >
        Your ads will show to this visitor again on Google Ads and Meta Ads. If it
        clicks, you pay for those clicks.
      </Modal>
    </Stage>
  ),
};

export const SplitFooter: Story = {
  name: "Split footer",
  render: () => (
    <Stage>
      <Modal
        open
        onClose={() => {}}
        size="md"
        title="Report a mistake"
        footerAlign="split"
        footer={
          <>
            <span className="sb-swatch__meta">No reason needed</span>
            <span style={{ display: "flex", gap: 8 }}>
              <Button>Cancel</Button>
              <Button variant="primary">Submit report</Button>
            </span>
          </>
        }
      >
        Used when a modal needs a status or hint on the left of its actions.
      </Modal>
    </Stage>
  ),
};

export const Success: Story = {
  name: "Success panel",
  render: () => (
    <Stage>
      <Modal
        open
        onClose={() => {}}
        title="Report a mistake"
        footer={<Button variant="primary">Done</Button>}
      >
        <ModalSuccess title="Report sent">
          Thanks — we&rsquo;ll review this decision and use it to tune your account.
          Nothing changes for this visitor right now.
        </ModalSuccess>
      </Modal>
    </Stage>
  ),
};

export const FocusBehaviour: Story = {
  name: "Focus trap and restoration",
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div>
        <div style={{ padding: 24, display: "flex", gap: 12 }}>
          <Button onClick={() => setOpen(true)}>Open the modal</Button>
          <Button variant="ghost">A button that should not receive Tab</Button>
        </div>
        <Stage>
          <Modal
            open={open}
            onClose={() => setOpen(false)}
            title="Try tabbing"
            footer={
              <>
                <Button onClick={() => setOpen(false)}>Cancel</Button>
                <Button variant="primary" onClick={() => setOpen(false)}>
                  Confirm
                </Button>
              </>
            }
          >
            Tab cycles between Cancel and Confirm and never reaches the page behind.
            Escape closes. Either way, focus returns to &ldquo;Open the modal&rdquo;.
          </Modal>
        </Stage>
      </div>
    );
  },
};

export const NotDismissible: Story = {
  name: "Edge case — not dismissible",
  render: () => (
    <Stage>
      <Modal
        open
        dismissible={false}
        onClose={() => {}}
        title="Syncing to Google Ads"
        footer={<Button variant="primary">Got it</Button>}
      >
        Escape and scrim clicks are ignored, so a flow that must be acknowledged
        cannot be dismissed by accident.
      </Modal>
    </Stage>
  ),
};
