import type { Meta, StoryObj } from "@storybook/react";
import { PlatformSyncStatus } from "./PlatformSyncStatus";

const meta: Meta<typeof PlatformSyncStatus> = {
  title: "Threat monitoring/PlatformSyncStatus",
  component: PlatformSyncStatus,
  parameters: {
    docs: {
      description: {
        component:
          "Blocking does not happen in ClickGuard — it happens in Google Ads and Meta Ads, whenever those APIs get around to it. This component is the receipt that says whether the exclusion actually landed. Without it, *Blocked* is a claim the customer has to take on faith, which is precisely the problem the screen exists to solve.",
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof PlatformSyncStatus>;

export const AllStates: Story = {
  render: () => (
    <div className="sb-stack">
      <PlatformSyncStatus items={[{ platform: "Google Ads", state: "synced" }]} />
      <PlatformSyncStatus items={[{ platform: "Google Ads", state: "pending" }]} />
      <PlatformSyncStatus
        items={[{ platform: "Meta Ads", state: "failed", onRetry: () => {} }]}
      />
      <PlatformSyncStatus items={[{ platform: "Google Ads", state: "removed" }]} />
    </div>
  ),
};

export const BothPlatformsHealthy: Story = {
  args: {
    items: [
      { platform: "Google Ads", state: "synced" },
      { platform: "Meta Ads", state: "synced" },
    ],
  },
};

export const PartialFailure: Story = {
  name: "Edge case — one platform rejected the update",
  args: {
    items: [
      { platform: "Google Ads", state: "synced" },
      { platform: "Meta Ads", state: "failed", onRetry: () => {} },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "The realistic failure: an expired Meta access token. Google is blocking, Meta is not, and the customer is still paying for Meta clicks. Hiding this would be the single fastest way to lose their trust the first time they check their own ad spend.",
      },
    },
  },
};

export const NotOnAnyList: Story = {
  args: { items: [] },
};

export const RightAligned: Story = {
  name: "align=end (drawer footer)",
  args: {
    align: "end",
    items: [
      { platform: "Google Ads", state: "synced" },
      { platform: "Meta Ads", state: "pending" },
    ],
  },
};
