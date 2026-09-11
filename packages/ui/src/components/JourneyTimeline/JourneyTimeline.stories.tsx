import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { JourneyTimeline, type JourneyItem } from "./JourneyTimeline";

const meta: Meta<typeof JourneyTimeline> = {
  title: "Threat monitoring/JourneyTimeline",
  component: JourneyTimeline,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Every arrival by this visitor, as a score bar against a fixed block threshold. This is the component that makes the product's core mechanic visible: blocking is **cumulative across the journey**, not a judgement on any one visit. Paid below the line is amber, paid at or over is red, organic is always grey — because an organic visit can raise suspicion but never costs the advertiser money.",
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof JourneyTimeline>;

const shortJourney: JourneyItem[] = [
  { kind: "visit", id: "1", date: "Sep 9 · 14:23", source: "paid", score: 28 },
  { kind: "visit", id: "2", date: "Sep 9 · 14:25", source: "paid", score: 46 },
  { kind: "visit", id: "3", date: "Sep 9 · 14:28", source: "paid", score: 62 },
  { kind: "visit", id: "4", date: "Sep 9 · 14:32", source: "paid", score: 84, crossed: true },
  { kind: "visit", id: "5", date: "Sep 10 · 20:22", source: "organic", score: 88, afterBlock: true },
];

export const BlockedVisitor: Story = {
  args: {
    items: shortJourney,
    summary: "5 visits · 4 paid · blocks at 70",
  },
};

export const CleanVisitor: Story = {
  args: {
    summary: "2 visits · 1 paid · blocks at 70",
    items: [
      { kind: "visit", id: "1", date: "Sep 11 · 09:41", source: "paid", score: 8 },
      { kind: "visit", id: "2", date: "Sep 12 · 08:12", source: "organic", score: 2 },
    ],
  },
};

export const SingleVisit: Story = {
  name: "Edge case — blocked on the first visit",
  args: {
    summary: "1 visit · 1 paid · blocks at 70",
    items: [
      { kind: "visit", id: "1", date: "Sep 11 · 03:07", source: "paid", score: 78, crossed: true },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "A known bot-network IP can cross on arrival. The timeline still renders the threshold line, so a one-row journey does not look like a different component.",
      },
    },
  },
};

export const OrganicOnly: Story = {
  name: "Edge case — never cost anything",
  args: {
    summary: "4 visits · 0 paid · blocks at 70",
    items: [
      { kind: "visit", id: "1", date: "Aug 30 · 11:02", source: "organic", score: 4 },
      { kind: "visit", id: "2", date: "Sep 2 · 16:40", source: "organic", score: 4 },
      { kind: "visit", id: "3", date: "Sep 6 · 10:18", source: "organic", score: 2 },
      { kind: "visit", id: "4", date: "Sep 9 · 19:55", source: "organic", score: 2 },
    ],
  },
};

export const LongJourneyCollapsed: Story = {
  name: "Long journey — collapsed run, interactive",
  render: () => {
    const [expanded, setExpanded] = useState(false);

    const middle: JourneyItem[] = Array.from({ length: 12 }, (_, i) => ({
      kind: "visit" as const,
      id: `mid-${i}`,
      date: `Sep ${8 + Math.floor(i / 4)} · 1${i % 6}:2${i % 9}`,
      source: (i % 3 === 0 ? "paid" : "organic") as "paid" | "organic",
      score: 78 + (i % 5),
      afterBlock: true,
    }));

    const items: JourneyItem[] = [
      { kind: "visit", id: "a", date: "Sep 6 · 02:11", source: "paid", score: 18 },
      { kind: "visit", id: "b", date: "Sep 6 · 08:30", source: "paid", score: 34 },
      { kind: "visit", id: "c", date: "Sep 7 · 05:02", source: "paid", score: 64 },
      { kind: "visit", id: "d", date: "Sep 7 · 11:44", source: "paid", score: 78, crossed: true },
      ...(expanded
        ? middle
        : [{ kind: "gap" as const, id: "gap", count: 12, onExpand: () => setExpanded(true) }]),
      { kind: "visit", id: "y", date: "Sep 11 · 22:10", source: "organic", score: 96, afterBlock: true },
      { kind: "visit", id: "z", date: "Sep 12 · 06:31", source: "organic", score: 98, afterBlock: true },
    ];

    return (
      <div className="sb-stack" style={{ maxWidth: 512 }}>
        <JourneyTimeline items={items} summary="18 visits · 9 paid · blocks at 70" />
        <p className="sb-note">
          A 40-visit click farm would bury the one row that matters. The timeline
          always keeps the first two visits, the visit that crossed the threshold
          with its immediate neighbours, and the two most recent — and folds the rest
          into a row-shaped button. Click it to expand.
        </p>
      </div>
    );
  },
};
