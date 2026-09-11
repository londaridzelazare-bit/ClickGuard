import type { Meta, StoryObj } from "@storybook/react";
import { SignalTable } from "./SignalTable";

const meta: Meta<typeof SignalTable> = {
  title: "Threat monitoring/SignalTable",
  component: SignalTable,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "The evidence ledger. Three columns, and the middle one is the entire point: a number with nothing to compare it against means nothing to a customer. *4 ad clicks in 9 minutes* is only damning next to *1 per day*.",
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof SignalTable>;

export const Blocked: Story = {
  args: {
    title: "What tipped it on visit 4",
    showTotal: true,
    signals: [
      {
        what: "Datacenter IP (Hetzner range), not a home or mobile connection",
        baseline: "Residential or mobile",
        points: 20,
      },
      { what: "4 ad clicks in 9 minutes", baseline: "1 per day", points: 24 },
      {
        what: "Sessions lasted 2 seconds, never scrolled",
        baseline: "48 s, scrolls 60%",
        points: 16,
      },
      { what: "Headless browser markers present", baseline: "None", points: 14 },
      {
        what: "Frankfurt, campaign targets United States",
        baseline: "Location matches",
        points: 10,
      },
    ],
    favor: {
      what: "Nothing in this visitor's favor",
      baseline: "No conversion, form fill or customer history",
      points: 0,
    },
  },
};

export const AmbiguousCase: Story = {
  name: "Ambiguous — counter-evidence held the block back",
  args: {
    title: "What we've seen so far",
    showTotal: true,
    signals: [
      { what: "3 ad clicks in 2 days on the same keyword", baseline: "1 per day", points: 24 },
      {
        what: "VPN exit node, real location can't be verified",
        baseline: "Residential or mobile",
        points: 20,
      },
      {
        what: "Sessions under 10 seconds, little scrolling",
        baseline: "48 s, scrolls 60%",
        points: 16,
      },
      {
        what: "Device fingerprint also seen on 1 other IP",
        baseline: "1 device per IP",
        points: 16,
      },
    ],
    favor: {
      what: "Submitted your contact form on visit 4",
      baseline: "Bots almost never convert",
      points: -18,
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Showing what argues *against* a block is the strongest trust move in the whole screen. It proves the score is a weighing rather than a pile of reasons collected to justify a decision already made — and it is the only way a customer can tell the difference.",
      },
    },
  },
};

export const CleanVisitor: Story = {
  args: {
    title: "What we checked",
    signals: [
      { what: "New visitor, no history with your site", baseline: "Most visitors are new", points: 8 },
      {
        what: "Stayed 2 min 10 s, scrolled 85% of the page",
        baseline: "48 s, scrolls 60%",
        points: 0,
      },
      { what: "Austin, campaign targets United States", baseline: "Location matches", points: 0 },
    ],
    favor: {
      what: "Came back the next day from a Google search and viewed pricing",
      baseline: "Bots rarely return organically",
      points: -6,
    },
  },
};

export const TooEarlyToJudge: Story = {
  name: "Edge case — one visit, nothing decided",
  args: {
    title: "What we checked",
    signals: [
      { what: "1 ad click, first visit", baseline: "1 per day", points: 12 },
      { what: "Stayed 1 min 40 s, viewed 3 pages", baseline: "48 s", points: 0 },
    ],
    favor: {
      what: "Nothing yet, but nothing against it either",
      baseline: "One visit is too early to judge",
      points: 0,
    },
  },
};

export const WithoutCounterEvidence: Story = {
  name: "Without the favor row",
  args: {
    title: "What we saw before you blocked it",
    signals: [
      { what: "IP appears on 3 public bot-network lists", baseline: "None", points: 40 },
      { what: "Datacenter IP (DigitalOcean)", baseline: "Residential or mobile", points: 20 },
      { what: "Page never rendered, session 0 seconds", baseline: "48 s, scrolls 60%", points: 18 },
    ],
  },
};
