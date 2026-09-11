import{j as e}from"./jsx-runtime-DF2Pcvd1.js";import{B as a}from"./tokens-DxNgueAT.js";import"./index-B2-qRKKC.js";import"./_commonjsHelpers-Cpj98o6Y.js";const d={title:"Foundations/Introduction",parameters:{docs:{description:{component:"How the ClickGuard design system is put together, and the rules it enforces."}}}},n={render:()=>e.jsxs("div",{style:{maxWidth:720,display:"flex",flexDirection:"column",gap:20},children:[e.jsxs("div",{children:[e.jsx("h1",{style:{fontSize:"var(--cg-text-22)",fontWeight:500,margin:0},children:"ClickGuard design system"}),e.jsxs("p",{className:"sb-note",style:{fontSize:"var(--cg-text-13)",color:"var(--cg-text-secondary)"},children:["One package, ",e.jsx("code",{children:"@clickguard/ui"}),", consumed by the Threat Monitoring prototype. Every value a component renders — colour, spacing, radius, type size, duration — comes from a CSS custom property defined once in"," ",e.jsx("code",{children:"src/styles/tokens.css"}),". No component file contains a literal hex, and no screen file contains one either."]})]}),e.jsxs("section",{className:"sb-panel",style:{maxWidth:720},children:[e.jsx("h2",{className:"sb-section-title",children:"The three rules"}),e.jsxs("ol",{style:{margin:0,paddingLeft:20,fontSize:"var(--cg-text-13)",lineHeight:"var(--cg-leading-relaxed)",display:"flex",flexDirection:"column",gap:10},children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Colour never carries meaning alone."})," A status is always a word plus a colour. Red without “Blocked” next to it is not a state this system can express."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Status colours and interface colours are different vocabularies."})," ","The five roles — danger, warning, success, neutral, accent — are split so that accent means “you selected this” and never “this is dangerous”. A filter chip and a verdict can sit in the same viewport without arguing."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Numbers travel with their baseline."})," Any raw score a component shows must be next to what a normal visitor does. That rule is why ",e.jsx("code",{children:"SignalTable"})," has a middle column and why"," ",e.jsx("code",{children:"ThreatBar"})," hides its value by default."]})]})]}),e.jsxs("section",{className:"sb-panel",style:{maxWidth:720},children:[e.jsx("h2",{className:"sb-section-title",children:"Product constants that live here"}),e.jsxs("p",{style:{fontSize:"var(--cg-text-13)",margin:0,lineHeight:"var(--cg-leading-relaxed)"},children:[e.jsxs("code",{children:["BLOCK_THRESHOLD = ",a]})," is exported from the design system rather than the app, because three separate components draw it — the threat bar, the journey timeline’s dashed line, and the evidence ledger. If they disagreed about where the line sits, the screen would be lying. Same reasoning for ",e.jsx("code",{children:"statusTone"}),", which maps the four visitor statuses onto roles so a screen never picks a colour itself."]})]}),e.jsxs("section",{className:"sb-panel",style:{maxWidth:720},children:[e.jsx("h2",{className:"sb-section-title",children:"Consuming it"}),e.jsx("pre",{style:{margin:0,fontFamily:"var(--cg-font-mono)",fontSize:"var(--cg-text-12)",background:"var(--cg-surface-2)",padding:"var(--cg-space-12)",borderRadius:"var(--cg-radius-md)",overflowX:"auto"},children:`import { DataTable, VerdictBox, StatusPill } from "@clickguard/ui";
import "@clickguard/ui/styles.css";   // tokens + every component
// or, tokens only:
import "@clickguard/ui/tokens.css";`})]})]})};var t,s,r;n.parameters={...n.parameters,docs:{...(t=n.parameters)==null?void 0:t.docs,source:{originalSource:`{
  render: () => <div style={{
    maxWidth: 720,
    display: "flex",
    flexDirection: "column",
    gap: 20
  }}>\r
      <div>\r
        <h1 style={{
        fontSize: "var(--cg-text-22)",
        fontWeight: 500,
        margin: 0
      }}>\r
          ClickGuard design system\r
        </h1>\r
        <p className="sb-note" style={{
        fontSize: "var(--cg-text-13)",
        color: "var(--cg-text-secondary)"
      }}>\r
          One package, <code>@clickguard/ui</code>, consumed by the Threat Monitoring\r
          prototype. Every value a component renders — colour, spacing, radius, type\r
          size, duration — comes from a CSS custom property defined once in{" "}\r
          <code>src/styles/tokens.css</code>. No component file contains a literal hex,\r
          and no screen file contains one either.\r
        </p>\r
      </div>\r
\r
      <section className="sb-panel" style={{
      maxWidth: 720
    }}>\r
        <h2 className="sb-section-title">The three rules</h2>\r
        <ol style={{
        margin: 0,
        paddingLeft: 20,
        fontSize: "var(--cg-text-13)",
        lineHeight: "var(--cg-leading-relaxed)",
        display: "flex",
        flexDirection: "column",
        gap: 10
      }}>\r
          <li>\r
            <strong>Colour never carries meaning alone.</strong> A status is always a\r
            word plus a colour. Red without &ldquo;Blocked&rdquo; next to it is not a\r
            state this system can express.\r
          </li>\r
          <li>\r
            <strong>Status colours and interface colours are different vocabularies.</strong>{" "}\r
            The five roles — danger, warning, success, neutral, accent — are split so\r
            that accent means &ldquo;you selected this&rdquo; and never\r
            &ldquo;this is dangerous&rdquo;. A filter chip and a verdict can sit in the\r
            same viewport without arguing.\r
          </li>\r
          <li>\r
            <strong>Numbers travel with their baseline.</strong> Any raw score a\r
            component shows must be next to what a normal visitor does. That rule is\r
            why <code>SignalTable</code> has a middle column and why{" "}\r
            <code>ThreatBar</code> hides its value by default.\r
          </li>\r
        </ol>\r
      </section>\r
\r
      <section className="sb-panel" style={{
      maxWidth: 720
    }}>\r
        <h2 className="sb-section-title">Product constants that live here</h2>\r
        <p style={{
        fontSize: "var(--cg-text-13)",
        margin: 0,
        lineHeight: "var(--cg-leading-relaxed)"
      }}>\r
          <code>BLOCK_THRESHOLD = {BLOCK_THRESHOLD}</code> is exported from the design\r
          system rather than the app, because three separate components draw it —\r
          the threat bar, the journey timeline&rsquo;s dashed line, and the evidence\r
          ledger. If they disagreed about where the line sits, the screen would be\r
          lying. Same reasoning for <code>statusTone</code>, which maps the four\r
          visitor statuses onto roles so a screen never picks a colour itself.\r
        </p>\r
      </section>\r
\r
      <section className="sb-panel" style={{
      maxWidth: 720
    }}>\r
        <h2 className="sb-section-title">Consuming it</h2>\r
        <pre style={{
        margin: 0,
        fontFamily: "var(--cg-font-mono)",
        fontSize: "var(--cg-text-12)",
        background: "var(--cg-surface-2)",
        padding: "var(--cg-space-12)",
        borderRadius: "var(--cg-radius-md)",
        overflowX: "auto"
      }}>{\`import { DataTable, VerdictBox, StatusPill } from "@clickguard/ui";
import "@clickguard/ui/styles.css";   // tokens + every component
// or, tokens only:
import "@clickguard/ui/tokens.css";\`}</pre>\r
      </section>\r
    </div>
}`,...(r=(s=n.parameters)==null?void 0:s.docs)==null?void 0:r.source}}};const h=["Introduction"];export{n as Introduction,h as __namedExportsOrder,d as default};
