import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ToastRegion, type ToastItem } from "./Toast";
import { Button } from "../Button/Button";

const meta: Meta<typeof ToastRegion> = {
  title: "Primitives/Toast",
  component: ToastRegion,
  parameters: { layout: "fullscreen" },
};
export default meta;
type Story = StoryObj<typeof ToastRegion>;

function Stage({ toasts, onDismiss }: { toasts: ToastItem[]; onDismiss(id: string): void }) {
  return (
    <div
      style={{
        position: "relative",
        height: 260,
        background: "var(--cg-surface-1)",
        border: "1px solid var(--cg-border)",
        borderRadius: "var(--cg-radius-lg)",
        overflow: "hidden",
      }}
    >
      <ToastRegion toasts={toasts} onDismiss={onDismiss} />
    </div>
  );
}

export const States: Story = {
  render: () => (
    <Stage
      onDismiss={() => {}}
      toasts={[
        {
          id: "1",
          tone: "neutral",
          message: "185.220.101.42 unblocked. Removing from Google Ads and Meta Ads.",
          actionLabel: "Undo",
          onAction: () => {},
        },
        {
          id: "2",
          tone: "danger",
          message: "77.111.246.19 blocked. Syncing to Google Ads and Meta Ads.",
          actionLabel: "Undo",
          onAction: () => {},
        },
        { id: "3", tone: "success", message: "Retrying the Meta Ads sync." },
      ]}
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Every action on this screen changes what an external ad platform does, which makes it slow to observe and awkward to reverse by hand. So the toast always carries Undo rather than a bare confirmation — the receipt and the way back are the same control.",
      },
    },
  },
};

export const Interactive: Story = {
  render: () => {
    const [toasts, setToasts] = useState<ToastItem[]>([]);
    const dismiss = (id: string) => setToasts((t) => t.filter((x) => x.id !== id));
    return (
      <div>
        <div style={{ padding: 24 }}>
          <Button
            onClick={() =>
              setToasts((t) => [
                ...t,
                {
                  id: String(Date.now()),
                  tone: "neutral",
                  message: "185.220.101.42 unblocked.",
                  actionLabel: "Undo",
                  onAction: () => setToasts((cur) => cur.slice(0, -1)),
                },
              ])
            }
          >
            Unblock visitor
          </Button>
        </div>
        <Stage toasts={toasts} onDismiss={dismiss} />
      </div>
    );
  },
};
