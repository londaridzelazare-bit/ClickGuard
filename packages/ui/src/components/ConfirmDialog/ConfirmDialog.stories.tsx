import { useState, type ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ConfirmDialog } from "./ConfirmDialog";
import { Button } from "../Button/Button";

const meta: Meta<typeof ConfirmDialog> = {
  title: "Primitives/ConfirmDialog",
  component: ConfirmDialog,
  parameters: { layout: "fullscreen" },
};
export default meta;
type Story = StoryObj<typeof ConfirmDialog>;

/** The dialog positions itself absolutely, so stories give it a positioned host. */
function Stage({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        position: "relative",
        height: 420,
        background: "var(--cg-surface-1)",
        borderRadius: "var(--cg-radius-lg)",
        overflow: "hidden",
      }}
    >
      {children}
    </div>
  );
}

export const Unblock: Story = {
  name: "Unblock — states the cost",
  render: () => (
    <Stage>
      <ConfirmDialog
        open
        title={
          <>
            Unblock <span className="cg-mono">185.220.101.42</span>?
          </>
        }
        confirmLabel="Unblock visitor"
        onConfirm={() => {}}
        onCancel={() => {}}
      >
        Your ads will show to this visitor again on Google Ads and Meta Ads. If it
        clicks, you pay for those clicks. We&rsquo;ll keep watching and flag it if the
        pattern comes back, but we won&rsquo;t block it again unless you ask.
      </ConfirmDialog>
    </Stage>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "A confirm step that only asks 'are you sure?' transfers no information and buys no trust. This one names the platforms, says plainly that clicks will cost money again, and commits to what the product will do afterwards — so the customer is deciding rather than guessing.",
      },
    },
  },
};

export const BlockNow: Story = {
  name: "Block now — danger variant",
  render: () => (
    <Stage>
      <ConfirmDialog
        open
        title={
          <>
            Block <span className="cg-mono">77.111.246.19</span> now?
          </>
        }
        confirmLabel="Block now"
        confirmVariant="danger"
        onConfirm={() => {}}
        onCancel={() => {}}
      >
        This visitor submitted your contact form on visit 4, so we were holding off.
        Blocking it now adds the IP to Google Ads and Meta Ads within a few minutes,
        and it will stop seeing your ads entirely. You can undo this at any time.
      </ConfirmDialog>
    </Stage>
  ),
};

export const Interactive: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <Stage>
        <div style={{ padding: 24 }}>
          <Button onClick={() => setOpen(true)}>Unblock visitor</Button>
          <p className="sb-note">Escape cancels. The confirming button takes focus on open.</p>
        </div>
        <ConfirmDialog
          open={open}
          title="Unblock this visitor?"
          confirmLabel="Unblock visitor"
          onConfirm={() => setOpen(false)}
          onCancel={() => setOpen(false)}
        >
          Your ads will show to this visitor again. If it clicks, you pay for those
          clicks.
        </ConfirmDialog>
      </Stage>
    );
  },
};
