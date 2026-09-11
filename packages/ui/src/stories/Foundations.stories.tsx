import type { Meta, StoryObj } from "@storybook/react";
import { BLOCK_THRESHOLD } from "../tokens";

const meta: Meta = {
  title: "Foundations/Introduction",
  parameters: {
    docs: {
      description: {
        component:
          "How the ClickGuard design system is put together, and the rules it enforces.",
      },
    },
  },
};
export default meta;

type Story = StoryObj;

export const Introduction: Story = {
  render: () => (
    <div style={{ maxWidth: 720, display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <h1 style={{ fontSize: "var(--cg-text-22)", fontWeight: 500, margin: 0 }}>
          ClickGuard design system
        </h1>
        <p className="sb-note" style={{ fontSize: "var(--cg-text-13)", color: "var(--cg-text-secondary)" }}>
          One package, <code>@clickguard/ui</code>, consumed by the Threat Monitoring
          prototype. Every value a component renders — colour, spacing, radius, type
          size, duration — comes from a CSS custom property defined once in{" "}
          <code>src/styles/tokens.css</code>. No component file contains a literal hex,
          and no screen file contains one either.
        </p>
      </div>

      <section className="sb-panel" style={{ maxWidth: 720 }}>
        <h2 className="sb-section-title">The three rules</h2>
        <ol
          style={{
            margin: 0,
            paddingLeft: 20,
            fontSize: "var(--cg-text-13)",
            lineHeight: "var(--cg-leading-relaxed)",
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          <li>
            <strong>Colour never carries meaning alone.</strong> A status is always a
            word plus a colour. Red without &ldquo;Blocked&rdquo; next to it is not a
            state this system can express.
          </li>
          <li>
            <strong>Status colours and interface colours are different vocabularies.</strong>{" "}
            The five roles — danger, warning, success, neutral, accent — are split so
            that accent means &ldquo;you selected this&rdquo; and never
            &ldquo;this is dangerous&rdquo;. A filter chip and a verdict can sit in the
            same viewport without arguing.
          </li>
          <li>
            <strong>Numbers travel with their baseline.</strong> Any raw score a
            component shows must be next to what a normal visitor does. That rule is
            why <code>SignalTable</code> has a middle column and why{" "}
            <code>ThreatBar</code> hides its value by default.
          </li>
        </ol>
      </section>

      <section className="sb-panel" style={{ maxWidth: 720 }}>
        <h2 className="sb-section-title">Product constants that live here</h2>
        <p style={{ fontSize: "var(--cg-text-13)", margin: 0, lineHeight: "var(--cg-leading-relaxed)" }}>
          <code>BLOCK_THRESHOLD = {BLOCK_THRESHOLD}</code> is exported from the design
          system rather than the app, because three separate components draw it —
          the threat bar, the journey timeline&rsquo;s dashed line, and the evidence
          ledger. If they disagreed about where the line sits, the screen would be
          lying. Same reasoning for <code>statusTone</code>, which maps the four
          visitor statuses onto roles so a screen never picks a colour itself.
        </p>
      </section>

      <section className="sb-panel" style={{ maxWidth: 720 }}>
        <h2 className="sb-section-title">Consuming it</h2>
        <pre
          style={{
            margin: 0,
            fontFamily: "var(--cg-font-mono)",
            fontSize: "var(--cg-text-12)",
            background: "var(--cg-surface-2)",
            padding: "var(--cg-space-12)",
            borderRadius: "var(--cg-radius-md)",
            overflowX: "auto",
          }}
        >{`import { DataTable, VerdictBox, StatusPill } from "@clickguard/ui";
import "@clickguard/ui/styles.css";   // tokens + every component
// or, tokens only:
import "@clickguard/ui/tokens.css";`}</pre>
      </section>
    </div>
  ),
};
