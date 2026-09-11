import { Fragment } from "react";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = { title: "Foundations/Typography, spacing, radii" };
export default meta;
type Story = StoryObj;

const TYPE = [
  ["22 / 500", "var(--cg-text-22)", 500, "Threat monitoring", "page title, page metric values"],
  ["18 / 500", "var(--cg-text-18)", 500, "$12.80", "drawer values, visitor IP in the drawer"],
  ["16 / 500", "var(--cg-text-16)", 500, "Nothing to block yet. We're watching.", "empty-state headline, dialog title"],
  ["14 / 500", "var(--cg-text-14)", 500, "Journey", "section titles"],
  ["13 / 400", "var(--cg-text-13)", 400, "Table text, body, verdict sentence, buttons", "the default"],
  ["12 / 400", "var(--cg-text-12)", 400, "Sublines, chips, baselines, sync status", "supporting"],
  ["11 / 400", "var(--cg-text-11)", 400, "Column labels, tags", "the floor"],
] as const;

export const Typography: Story = {
  render: () => (
    <div>
      <h2 className="sb-section-title">Type scale</h2>
      <div className="sb-type">
        {TYPE.map(([meta_, size, weight, sample, use]) => (
          <Fragment key={meta_}>
            <div className="sb-type__meta">
              {meta_}
              <div style={{ color: "var(--cg-text-muted)" }}>{use}</div>
            </div>
            <div style={{ fontSize: size, fontWeight: weight, lineHeight: 1.25 }}>
              {sample}
            </div>
          </Fragment>
        ))}
        <div className="sb-type__meta">
          mono 13
          <div style={{ color: "var(--cg-text-muted)" }}>IP addresses only</div>
        </div>
        <div style={{ fontFamily: "var(--cg-font-mono)", fontSize: "var(--cg-text-13)" }}>
          185.220.101.42
        </div>
      </div>
      <p className="sb-note">
        Two weights, seven sizes. IBM Plex Sans throughout; IBM Plex Mono is
        reserved for IP addresses so that the one string a customer might copy,
        paste or compare digit-by-digit is the one string that aligns. Every
        number that can change — scores, counts, money — is set in tabular
        figures so a sorted column does not shimmer.
      </p>
    </div>
  ),
};

export const SpacingAndRadii: Story = {
  render: () => (
    <div>
      <h2 className="sb-section-title">Spacing</h2>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 16 }}>
        {[4, 8, 12, 16, 24, 32].map((n) => (
          <div key={n}>
            <div
              style={{
                width: n,
                height: 32,
                background: "var(--cg-accent-fill)",
                borderRadius: 2,
              }}
            />
            <div className="sb-swatch__meta" style={{ marginTop: 6 }}>
              {n}
            </div>
          </div>
        ))}
      </div>
      <p className="sb-note">
        A 4px base. Half-steps (2, 6, 10, 14) exist as tokens but are only for
        optical alignment inside dense table rows, where a 4px jump is visible.
      </p>

      <h2 className="sb-section-title">Radii</h2>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 16 }}>
        {[
          ["var(--cg-radius-sm)", "6 · inputs", 56],
          ["var(--cg-radius-md)", "8 · controls", 56],
          ["var(--cg-radius-lg)", "12 · cards, drawer", 56],
          ["var(--cg-radius-pill)", "999 · pills", 72],
        ].map(([r, label, w]) => (
          <div key={String(label)}>
            <div
              style={{
                width: w as number,
                height: label === "999 · pills" ? 24 : 40,
                borderRadius: r as string,
                border: "1px solid var(--cg-border-strong)",
                background: "var(--cg-surface-0)",
              }}
            />
            <div className="sb-swatch__meta" style={{ marginTop: 6 }}>
              {label}
            </div>
          </div>
        ))}
      </div>
      <p className="sb-note">
        Radius encodes hierarchy: the bigger the container, the rounder the
        corner. Pills are fully round so that a status never reads as a button
        you can press.
      </p>
    </div>
  ),
};
