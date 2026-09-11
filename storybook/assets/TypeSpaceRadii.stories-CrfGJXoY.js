import{j as e}from"./jsx-runtime-DF2Pcvd1.js";import{r as p}from"./index-B2-qRKKC.js";import"./_commonjsHelpers-Cpj98o6Y.js";const b={title:"Foundations/Typography, spacing, radii"},v=[["22 / 500","var(--cg-text-22)",500,"Threat monitoring","page title, page metric values"],["18 / 500","var(--cg-text-18)",500,"$12.80","drawer values, visitor IP in the drawer"],["16 / 500","var(--cg-text-16)",500,"Nothing to block yet. We're watching.","empty-state headline, dialog title"],["14 / 500","var(--cg-text-14)",500,"Journey","section titles"],["13 / 400","var(--cg-text-13)",400,"Table text, body, verdict sentence, buttons","the default"],["12 / 400","var(--cg-text-12)",400,"Sublines, chips, baselines, sync status","supporting"],["11 / 400","var(--cg-text-11)",400,"Column labels, tags","the floor"]],n={render:()=>e.jsxs("div",{children:[e.jsx("h2",{className:"sb-section-title",children:"Type scale"}),e.jsxs("div",{className:"sb-type",children:[v.map(([s,r,a,m,h])=>e.jsxs(p.Fragment,{children:[e.jsxs("div",{className:"sb-type__meta",children:[s,e.jsx("div",{style:{color:"var(--cg-text-muted)"},children:h})]}),e.jsx("div",{style:{fontSize:r,fontWeight:a,lineHeight:1.25},children:m})]},s)),e.jsxs("div",{className:"sb-type__meta",children:["mono 13",e.jsx("div",{style:{color:"var(--cg-text-muted)"},children:"IP addresses only"})]}),e.jsx("div",{style:{fontFamily:"var(--cg-font-mono)",fontSize:"var(--cg-text-13)"},children:"185.220.101.42"})]}),e.jsx("p",{className:"sb-note",children:"Two weights, seven sizes. IBM Plex Sans throughout; IBM Plex Mono is reserved for IP addresses so that the one string a customer might copy, paste or compare digit-by-digit is the one string that aligns. Every number that can change — scores, counts, money — is set in tabular figures so a sorted column does not shimmer."})]})},t={render:()=>e.jsxs("div",{children:[e.jsx("h2",{className:"sb-section-title",children:"Spacing"}),e.jsx("div",{style:{display:"flex",alignItems:"flex-end",gap:16},children:[4,8,12,16,24,32].map(s=>e.jsxs("div",{children:[e.jsx("div",{style:{width:s,height:32,background:"var(--cg-accent-fill)",borderRadius:2}}),e.jsx("div",{className:"sb-swatch__meta",style:{marginTop:6},children:s})]},s))}),e.jsx("p",{className:"sb-note",children:"A 4px base. Half-steps (2, 6, 10, 14) exist as tokens but are only for optical alignment inside dense table rows, where a 4px jump is visible."}),e.jsx("h2",{className:"sb-section-title",children:"Radii"}),e.jsx("div",{style:{display:"flex",alignItems:"flex-end",gap:16},children:[["var(--cg-radius-sm)","6 · inputs",56],["var(--cg-radius-md)","8 · controls",56],["var(--cg-radius-lg)","12 · cards, drawer",56],["var(--cg-radius-pill)","999 · pills",72]].map(([s,r,a])=>e.jsxs("div",{children:[e.jsx("div",{style:{width:a,height:r==="999 · pills"?24:40,borderRadius:s,border:"1px solid var(--cg-border-strong)",background:"var(--cg-surface-0)"}}),e.jsx("div",{className:"sb-swatch__meta",style:{marginTop:6},children:r})]},String(r)))}),e.jsx("p",{className:"sb-note",children:"Radius encodes hierarchy: the bigger the container, the rounder the corner. Pills are fully round so that a status never reads as a button you can press."})]})};var i,o,d;n.parameters={...n.parameters,docs:{...(i=n.parameters)==null?void 0:i.docs,source:{originalSource:`{
  render: () => <div>\r
      <h2 className="sb-section-title">Type scale</h2>\r
      <div className="sb-type">\r
        {TYPE.map(([meta_, size, weight, sample, use]) => <Fragment key={meta_}>\r
            <div className="sb-type__meta">\r
              {meta_}\r
              <div style={{
            color: "var(--cg-text-muted)"
          }}>{use}</div>\r
            </div>\r
            <div style={{
          fontSize: size,
          fontWeight: weight,
          lineHeight: 1.25
        }}>\r
              {sample}\r
            </div>\r
          </Fragment>)}\r
        <div className="sb-type__meta">\r
          mono 13\r
          <div style={{
          color: "var(--cg-text-muted)"
        }}>IP addresses only</div>\r
        </div>\r
        <div style={{
        fontFamily: "var(--cg-font-mono)",
        fontSize: "var(--cg-text-13)"
      }}>\r
          185.220.101.42\r
        </div>\r
      </div>\r
      <p className="sb-note">\r
        Two weights, seven sizes. IBM Plex Sans throughout; IBM Plex Mono is\r
        reserved for IP addresses so that the one string a customer might copy,\r
        paste or compare digit-by-digit is the one string that aligns. Every\r
        number that can change — scores, counts, money — is set in tabular\r
        figures so a sorted column does not shimmer.\r
      </p>\r
    </div>
}`,...(d=(o=n.parameters)==null?void 0:o.docs)==null?void 0:d.source}}};var l,c,g;t.parameters={...t.parameters,docs:{...(l=t.parameters)==null?void 0:l.docs,source:{originalSource:`{
  render: () => <div>\r
      <h2 className="sb-section-title">Spacing</h2>\r
      <div style={{
      display: "flex",
      alignItems: "flex-end",
      gap: 16
    }}>\r
        {[4, 8, 12, 16, 24, 32].map(n => <div key={n}>\r
            <div style={{
          width: n,
          height: 32,
          background: "var(--cg-accent-fill)",
          borderRadius: 2
        }} />\r
            <div className="sb-swatch__meta" style={{
          marginTop: 6
        }}>\r
              {n}\r
            </div>\r
          </div>)}\r
      </div>\r
      <p className="sb-note">\r
        A 4px base. Half-steps (2, 6, 10, 14) exist as tokens but are only for\r
        optical alignment inside dense table rows, where a 4px jump is visible.\r
      </p>\r
\r
      <h2 className="sb-section-title">Radii</h2>\r
      <div style={{
      display: "flex",
      alignItems: "flex-end",
      gap: 16
    }}>\r
        {[["var(--cg-radius-sm)", "6 · inputs", 56], ["var(--cg-radius-md)", "8 · controls", 56], ["var(--cg-radius-lg)", "12 · cards, drawer", 56], ["var(--cg-radius-pill)", "999 · pills", 72]].map(([r, label, w]) => <div key={String(label)}>\r
            <div style={{
          width: w as number,
          height: label === "999 · pills" ? 24 : 40,
          borderRadius: r as string,
          border: "1px solid var(--cg-border-strong)",
          background: "var(--cg-surface-0)"
        }} />\r
            <div className="sb-swatch__meta" style={{
          marginTop: 6
        }}>\r
              {label}\r
            </div>\r
          </div>)}\r
      </div>\r
      <p className="sb-note">\r
        Radius encodes hierarchy: the bigger the container, the rounder the\r
        corner. Pills are fully round so that a status never reads as a button\r
        you can press.\r
      </p>\r
    </div>
}`,...(g=(c=t.parameters)==null?void 0:c.docs)==null?void 0:g.source}}};const f=["Typography","SpacingAndRadii"];export{t as SpacingAndRadii,n as Typography,f as __namedExportsOrder,b as default};
