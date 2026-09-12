import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ReportDialog } from "./ReportDialog";
import { Button } from "../Button/Button";

const meta: Meta<typeof ReportDialog> = {
  title: "Threat monitoring/ReportDialog",
  component: ReportDialog,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "The reason field is genuinely optional and there is no separate 'skip' path: Submit is always enabled, and an empty reason is a valid report. A disabled Submit would turn a goodwill gesture into a chore — and the most useful signal here is *that* a customer disagreed, not why.",
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof ReportDialog>;

function Stage({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        position: "relative",
        height: 560,
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

export const Form: Story = {
  name: "Open — empty reason",
  render: () => (
    <Stage>
      <ReportDialog
        open
        subject="185.220.101.42"
        subjectLabel="Blocked · Automated traffic"
        onSubmit={() => {}}
        onClose={() => {}}
      />
    </Stage>
  ),
};

export const Submitted: Story = {
  name: "Submitted — success confirmation",
  render: () => (
    <Stage>
      <ReportDialog
        open
        initialPhase="sent"
        subject="185.220.101.42"
        subjectLabel="Blocked · Automated traffic"
        onSubmit={() => {}}
        onClose={() => {}}
      />
    </Stage>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "The confirmation replaces the form in place, so it lands where the user is already looking rather than in a toast they may miss. The prototype also raises a toast, but this panel is the primary receipt.",
      },
    },
  },
};

export const Interactive: Story = {
  name: "Interactive — keyboard and focus",
  render: () => {
    const [open, setOpen] = useState(false);
    const [log, setLog] = useState<string[]>([]);
    return (
      <div>
        <div style={{ padding: 24, display: "flex", gap: 12, alignItems: "center" }}>
          <Button onClick={() => setOpen(true)}>Report a mistake</Button>
          <span className="sb-swatch__meta">
            {log.length ? log[log.length - 1] : "nothing submitted yet"}
          </span>
        </div>
        <Stage>
          <ReportDialog
            open={open}
            subject="77.111.246.19"
            subjectLabel="Flagged · Repeat clicks, but converted"
            onSubmit={(reason) =>
              setLog((l) => [...l, reason ? `submitted with: "${reason}"` : "submitted with no reason"])
            }
            onClose={() => setOpen(false)}
          />
        </Stage>
        <p className="sb-note" style={{ padding: "0 24px" }}>
          Opening moves focus into the reason field. Tab cycles inside the dialog and
          cannot escape it. Escape closes without submitting, and focus returns to the
          button that opened it — all of which come from the shared{" "}
          <code>Modal</code> primitive rather than being re-implemented here.
        </p>
      </div>
    );
  },
};
