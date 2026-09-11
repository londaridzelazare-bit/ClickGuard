import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = { title: "Foundations/Color" };
export default meta;
type Story = StoryObj;

const NEUTRALS = [
  ["--cg-surface-0", "surface-0", "raised: cards, table, drawer"],
  ["--cg-surface-1", "surface-1", "page"],
  ["--cg-surface-2", "surface-2", "hover, inert fills"],
  ["--cg-surface-3", "surface-3", "tracks, skeletons"],
  ["--cg-text-primary", "text-primary", "headings, table text"],
  ["--cg-text-secondary", "text-secondary", "sublines, labels"],
  ["--cg-text-muted", "text-muted", "column heads, meta"],
  ["--cg-border-strong", "border-strong", "interactive outlines"],
];

const ROLES = [
  ["danger", "Blocked"],
  ["warning", "Flagged · the Paid tag"],
  ["success", "Clean · money saved"],
  ["accent", "Selection · links"],
  ["neutral", "Unblocked · the Organic tag"],
] as const;

export const Neutrals: Story = {
  render: () => (
    <div>
      <h2 className="sb-section-title">Neutral surfaces and ink</h2>
      <div className="sb-swatches">
        {NEUTRALS.map(([token, name, use]) => (
          <div key={token}>
            <div className="sb-swatch__chip" style={{ background: `var(${token})` }} />
            <div className="sb-swatch__name">{name}</div>
            <div className="sb-swatch__meta">{use}</div>
          </div>
        ))}
      </div>
      <p className="sb-note">
        A warm off-white ground rather than a cool grey. The screen is mostly a
        dense table of red and amber; a neutral with a little yellow in it keeps
        those from reading as alarm.
      </p>
    </div>
  ),
};

export const Roles: Story = {
  render: () => (
    <div>
      <h2 className="sb-section-title">Semantic roles</h2>
      <div className="sb-roles">
        <div className="sb-swatch__meta" />
        <div className="sb-swatch__meta">bg</div>
        <div className="sb-swatch__meta">border</div>
        <div className="sb-swatch__meta">text</div>
        <div className="sb-swatch__meta">fill</div>

        {ROLES.map(([role, use]) => (
          <Row key={role} role={role} use={use} />
        ))}
      </div>
      <p className="sb-note">
        Every role is the same four-part shape: a tinted <code>bg</code>, a{" "}
        <code>border</code> that separates it from the page, a darkened{" "}
        <code>text</code> that is the only one contrast-safe on its own bg, and a
        saturated <code>fill</code> for bars, dots and solid buttons. Components
        take a <code>tone</code> or a <code>status</code> and read the quadruple —
        they never receive a colour.
      </p>
    </div>
  ),
};

function Row({ role, use }: { role: string; use: string }) {
  return (
    <>
      <div style={{ color: "var(--cg-text-secondary)" }}>
        {role}
        <div className="sb-swatch__meta">{use}</div>
      </div>
      {["bg", "border", "text", "fill"].map((part) => (
        <div
          key={part}
          className="sb-role__chip"
          style={{ background: `var(--cg-${role}-${part})` }}
        />
      ))}
    </>
  );
}
