import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Drawer, DrawerCloseButton } from "./Drawer";
import { Button } from "../Button/Button";
import { StatusPill } from "../StatusPill/StatusPill";
import { VerdictBox } from "../VerdictBox/VerdictBox";
import { PlatformSyncStatus } from "../PlatformSyncStatus/PlatformSyncStatus";

const meta: Meta<typeof Drawer> = {
  title: "Primitives/Drawer",
  component: Drawer,
  parameters: { layout: "fullscreen" },
};
export default meta;
type Story = StoryObj<typeof Drawer>;

export const VisitorDetail: Story = {
  render: () => {
    const [open, setOpen] = useState(true);

    return (
      <div
        style={{
          position: "relative",
          height: 560,
          background: "var(--cg-surface-1)",
          borderRadius: "var(--cg-radius-lg)",
          overflow: "hidden",
          border: "1px solid var(--cg-border)",
        }}
      >
        <div style={{ padding: 24 }}>
          <Button onClick={() => setOpen((o) => !o)}>
            {open ? "Close drawer" : "Open drawer"}
          </Button>
          <p className="sb-note">
            Escape closes. The panel slides rather than appearing, so the customer
            keeps hold of where it came from — and the table row it belongs to keeps
            its accent rail behind it. When closed it is marked <code>inert</code>,
            which keeps a panel that is merely off-screen out of the tab order.
          </p>
        </div>

        <Drawer
          open={open}
          onClose={() => setOpen(false)}
          ariaLabel="Visitor 185.220.101.42"
          header={
            <>
              <div className="cg-drawer__heading">
                <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                  <span
                    className="cg-mono"
                    style={{ fontSize: "var(--cg-text-18)", fontWeight: 500 }}
                  >
                    185.220.101.42
                  </span>
                  <StatusPill status="Blocked" />
                </div>
                <div
                  style={{
                    fontSize: "var(--cg-text-13)",
                    color: "var(--cg-text-secondary)",
                    marginTop: 6,
                  }}
                >
                  Datacenter · Frankfurt, Germany
                </div>
                <div
                  style={{
                    fontSize: "var(--cg-text-12)",
                    color: "var(--cg-text-muted)",
                    marginTop: 2,
                  }}
                >
                  Headless Chrome 128 on Linux · fingerprint shared with 3 other IPs
                </div>
              </div>
              <DrawerCloseButton onClick={() => setOpen(false)} />
            </>
          }
          footer={
            <>
              <Button onClick={() => {}}>Unblock visitor</Button>
              <Button variant="ghost" onClick={() => {}}>
                Report as mistake
              </Button>
              <PlatformSyncStatus
                align="end"
                className="cg-drawer__sync"
                items={[
                  { platform: "Google Ads", state: "synced" },
                  { platform: "Meta Ads", state: "synced" },
                ]}
              />
            </>
          }
        >
          <div className="cg-drawer__inset">
            <VerdictBox status="Blocked" title="Blocked on Google Ads and Meta Ads · Sep 9, 14:32">
              A datacenter server clicked your ads 4 times in 9 minutes, never
              scrolled, and never converted. That pattern doesn&rsquo;t come from a
              person.
            </VerdictBox>
          </div>
          <div className="cg-drawer__section">
            <p style={{ color: "var(--cg-text-secondary)", margin: 0 }}>
              Journey, evidence and spend sections follow here in the prototype.
            </p>
          </div>
        </Drawer>
      </div>
    );
  },
};

export const Closed: Story = {
  render: () => (
    <div
      style={{
        position: "relative",
        height: 320,
        background: "var(--cg-surface-1)",
        borderRadius: "var(--cg-radius-lg)",
        overflow: "hidden",
        border: "1px solid var(--cg-border)",
      }}
    >
      <div style={{ padding: 24, color: "var(--cg-text-secondary)" }}>
        Closed state — the panel is parked at <code>translateX(105%)</code> and inert.
      </div>
      <Drawer open={false} onClose={() => {}} ariaLabel="Closed drawer">
        <div className="cg-drawer__section">Hidden</div>
      </Drawer>
    </div>
  ),
};
