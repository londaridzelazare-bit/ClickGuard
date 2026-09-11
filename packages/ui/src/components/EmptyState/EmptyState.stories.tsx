import type { Meta, StoryObj } from "@storybook/react";
import { EmptyState } from "./EmptyState";
import { Button } from "../Button/Button";

const meta: Meta<typeof EmptyState> = {
  title: "Primitives/EmptyState",
  component: EmptyState,
  parameters: { layout: "padded", backgrounds: { default: "raised" } },
};
export default meta;
type Story = StoryObj<typeof EmptyState>;

export const NothingToBlockYet: Story = {
  name: "New account — good news",
  args: {
    icon: "success",
    title: "Nothing to block yet. We're watching.",
    description:
      "Your ads are live and every click is being checked. Visitors appear here the moment we see one, and anything that looks automated gets blocked before it can click again.",
    footnote: "Connected: Google Ads · Meta Ads",
  },
  parameters: {
    docs: {
      description: {
        story:
          "An empty threat table is good news, so it gets a green check rather than the usual grey shrug. It also says what *is* happening, because the anxious reading of an empty security screen is 'is this thing even switched on?' — and an advertiser who thinks it is off turns it off.",
      },
    },
  },
};

export const NoResults: Story = {
  name: "Filters match nothing — the user's own doing",
  args: {
    compact: true,
    title: "No visitors match these filters",
    description:
      'Nothing matches "Tokyo" with the current status and platform filters. Try a shorter search, or clear the filters.',
    action: <Button>Clear filters</Button>,
  },
  parameters: {
    docs: {
      description: {
        story:
          "No icon here. This is not a product state, it is the user's own filter — dressing it up with an illustration would imply something went wrong. It names the actual search term so the fix is obvious, and hands over the one button that fixes it.",
      },
    },
  },
};

export const NoBlockedYet: Story = {
  args: {
    icon: "neutral",
    compact: true,
    title: "No visitors blocked in this period",
    description:
      "We've seen 22 visitors in the last 30 days and none of them crossed the block threshold. Widen the date range to look further back.",
  },
};
