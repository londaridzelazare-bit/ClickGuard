import type { Meta, StoryObj } from "@storybook/react";
import { Icon, IconBadge } from "./Icon";
import { ICON_NAMES } from "./paths";
import type { Tone } from "../../tokens";

const meta: Meta<typeof Icon> = {
  title: "Foundations/Icons",
  component: Icon,
  args: { name: "shieldBlock", size: "md", tone: "inherit" },
  parameters: {
    docs: {
      description: {
        component:
          "One 16×16 grid, stroked rather than filled, one stroke weight. Components never inline their own SVG — if an icon is missing, it gets added to `paths.ts`, which is the only way the set stays coherent.",
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Icon>;

export const Playground: Story = {};

export const AllIcons: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(96px, 1fr))",
        gap: "var(--cg-space-16)",
        maxWidth: 640,
      }}
    >
      {ICON_NAMES.map((name) => (
        <div key={name} style={{ textAlign: "center" }}>
          <div
            style={{
              height: 44,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid var(--cg-border)",
              borderRadius: "var(--cg-radius-md)",
              background: "var(--cg-surface-0)",
            }}
          >
            <Icon name={name} size="lg" />
          </div>
          <div className="sb-swatch__meta" style={{ marginTop: 6 }}>
            {name}
          </div>
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="sb-row sb-stack--inline">
      <Icon name="flag" size="sm" />
      <Icon name="flag" size="md" />
      <Icon name="flag" size="lg" />
      <span className="sb-swatch__meta">12 · 16 · 20</span>
    </div>
  ),
};

export const Tones: Story = {
  render: () => (
    <div className="sb-row sb-stack--inline">
      {(["danger", "warning", "success", "accent", "neutral"] as Tone[]).map((tone) => (
        <Icon key={tone} name="shieldCheck" size="lg" tone={tone} />
      ))}
      <Icon name="shieldCheck" size="lg" tone="muted" />
    </div>
  ),
};

export const Badges: Story = {
  name: "IconBadge — used on metric cards",
  render: () => (
    <div className="sb-stack">
      <div className="sb-row sb-stack--inline">
        <IconBadge name="shieldBlock" tone="danger" />
        <IconBadge name="shieldCheck" tone="success" />
        <IconBadge name="flag" tone="warning" />
        <IconBadge name="info" tone="accent" />
        <IconBadge name="circle" tone="neutral" />
      </div>
      <p className="sb-note">
        Each metric gets a distinct <em>shape</em> as well as a colour, and the card
        keeps its text label — so the meaning survives for anyone who cannot
        separate the reds from the greens. Badges are <code>aria-hidden</code> for
        exactly that reason: the label already says it.
      </p>
    </div>
  ),
};
