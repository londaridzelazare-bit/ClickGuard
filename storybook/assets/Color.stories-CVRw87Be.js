import{j as e}from"./jsx-runtime-DF2Pcvd1.js";import"./index-B2-qRKKC.js";import"./_commonjsHelpers-Cpj98o6Y.js";const g={title:"Foundations/Color"},h=[["--cg-surface-0","surface-0","raised: cards, table, drawer"],["--cg-surface-1","surface-1","page"],["--cg-surface-2","surface-2","hover, inert fills"],["--cg-surface-3","surface-3","tracks, skeletons"],["--cg-text-primary","text-primary","headings, table text"],["--cg-text-secondary","text-secondary","sublines, labels"],["--cg-text-muted","text-muted","column heads, meta"],["--cg-border-strong","border-strong","interactive outlines"]],b=[["danger","Blocked"],["warning","Flagged · the Paid tag"],["success","Clean · money saved"],["accent","Selection · links"],["neutral","Unblocked · the Organic tag"]],t={render:()=>e.jsxs("div",{children:[e.jsx("h2",{className:"sb-section-title",children:"Neutral surfaces and ink"}),e.jsx("div",{className:"sb-swatches",children:h.map(([s,a,r])=>e.jsxs("div",{children:[e.jsx("div",{className:"sb-swatch__chip",style:{background:`var(${s})`}}),e.jsx("div",{className:"sb-swatch__name",children:a}),e.jsx("div",{className:"sb-swatch__meta",children:r})]},s))}),e.jsx("p",{className:"sb-note",children:"A warm off-white ground rather than a cool grey. The screen is mostly a dense table of red and amber; a neutral with a little yellow in it keeps those from reading as alarm."})]})},n={render:()=>e.jsxs("div",{children:[e.jsx("h2",{className:"sb-section-title",children:"Semantic roles"}),e.jsxs("div",{className:"sb-roles",children:[e.jsx("div",{className:"sb-swatch__meta"}),e.jsx("div",{className:"sb-swatch__meta",children:"bg"}),e.jsx("div",{className:"sb-swatch__meta",children:"border"}),e.jsx("div",{className:"sb-swatch__meta",children:"text"}),e.jsx("div",{className:"sb-swatch__meta",children:"fill"}),b.map(([s,a])=>e.jsx(u,{role:s,use:a},s))]}),e.jsxs("p",{className:"sb-note",children:["Every role is the same four-part shape: a tinted ",e.jsx("code",{children:"bg"}),", a"," ",e.jsx("code",{children:"border"})," that separates it from the page, a darkened"," ",e.jsx("code",{children:"text"})," that is the only one contrast-safe on its own bg, and a saturated ",e.jsx("code",{children:"fill"})," for bars, dots and solid buttons. Components take a ",e.jsx("code",{children:"tone"})," or a ",e.jsx("code",{children:"status"})," and read the quadruple — they never receive a colour."]})]})};function u({role:s,use:a}){return e.jsxs(e.Fragment,{children:[e.jsxs("div",{style:{color:"var(--cg-text-secondary)"},children:[s,e.jsx("div",{className:"sb-swatch__meta",children:a})]}),["bg","border","text","fill"].map(r=>e.jsx("div",{className:"sb-role__chip",style:{background:`var(--cg-${s}-${r})`}},r))]})}var c,d,o;t.parameters={...t.parameters,docs:{...(c=t.parameters)==null?void 0:c.docs,source:{originalSource:`{
  render: () => <div>\r
      <h2 className="sb-section-title">Neutral surfaces and ink</h2>\r
      <div className="sb-swatches">\r
        {NEUTRALS.map(([token, name, use]) => <div key={token}>\r
            <div className="sb-swatch__chip" style={{
          background: \`var(\${token})\`
        }} />\r
            <div className="sb-swatch__name">{name}</div>\r
            <div className="sb-swatch__meta">{use}</div>\r
          </div>)}\r
      </div>\r
      <p className="sb-note">\r
        A warm off-white ground rather than a cool grey. The screen is mostly a\r
        dense table of red and amber; a neutral with a little yellow in it keeps\r
        those from reading as alarm.\r
      </p>\r
    </div>
}`,...(o=(d=t.parameters)==null?void 0:d.docs)==null?void 0:o.source}}};var i,l,m;n.parameters={...n.parameters,docs:{...(i=n.parameters)==null?void 0:i.docs,source:{originalSource:`{
  render: () => <div>\r
      <h2 className="sb-section-title">Semantic roles</h2>\r
      <div className="sb-roles">\r
        <div className="sb-swatch__meta" />\r
        <div className="sb-swatch__meta">bg</div>\r
        <div className="sb-swatch__meta">border</div>\r
        <div className="sb-swatch__meta">text</div>\r
        <div className="sb-swatch__meta">fill</div>\r
\r
        {ROLES.map(([role, use]) => <Row key={role} role={role} use={use} />)}\r
      </div>\r
      <p className="sb-note">\r
        Every role is the same four-part shape: a tinted <code>bg</code>, a{" "}\r
        <code>border</code> that separates it from the page, a darkened{" "}\r
        <code>text</code> that is the only one contrast-safe on its own bg, and a\r
        saturated <code>fill</code> for bars, dots and solid buttons. Components\r
        take a <code>tone</code> or a <code>status</code> and read the quadruple —\r
        they never receive a colour.\r
      </p>\r
    </div>
}`,...(m=(l=n.parameters)==null?void 0:l.docs)==null?void 0:m.source}}};const _=["Neutrals","Roles"];export{t as Neutrals,n as Roles,_ as __namedExportsOrder,g as default};
