import{j as e}from"./jsx-runtime-DF2Pcvd1.js";import{I as s,a as w,b as n}from"./Icon-4ZrsAClT.js";import"./index-B2-qRKKC.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./cx-DJxyWpib.js";const S={title:"Foundations/Icons",component:s,args:{name:"shieldBlock",size:"md",tone:"inherit"},parameters:{docs:{description:{component:"One 16×16 grid, stroked rather than filled, one stroke weight. Components never inline their own SVG — if an icon is missing, it gets added to `paths.ts`, which is the only way the set stays coherent."}}}},r={},t={render:()=>e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(96px, 1fr))",gap:"var(--cg-space-16)",maxWidth:640},children:w.map(a=>e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx("div",{style:{height:44,display:"flex",alignItems:"center",justifyContent:"center",border:"1px solid var(--cg-border)",borderRadius:"var(--cg-radius-md)",background:"var(--cg-surface-0)"},children:e.jsx(s,{name:a,size:"lg"})}),e.jsx("div",{className:"sb-swatch__meta",style:{marginTop:6},children:a})]},a))})},c={render:()=>e.jsxs("div",{className:"sb-row sb-stack--inline",children:[e.jsx(s,{name:"flag",size:"sm"}),e.jsx(s,{name:"flag",size:"md"}),e.jsx(s,{name:"flag",size:"lg"}),e.jsx("span",{className:"sb-swatch__meta",children:"12 · 16 · 20"})]})},i={render:()=>e.jsxs("div",{className:"sb-row sb-stack--inline",children:[["danger","warning","success","accent","neutral"].map(a=>e.jsx(s,{name:"shieldCheck",size:"lg",tone:a},a)),e.jsx(s,{name:"shieldCheck",size:"lg",tone:"muted"})]})},o={name:"IconBadge — used on metric cards",render:()=>e.jsxs("div",{className:"sb-stack",children:[e.jsxs("div",{className:"sb-row sb-stack--inline",children:[e.jsx(n,{name:"shieldBlock",tone:"danger"}),e.jsx(n,{name:"shieldCheck",tone:"success"}),e.jsx(n,{name:"flag",tone:"warning"}),e.jsx(n,{name:"info",tone:"accent"}),e.jsx(n,{name:"circle",tone:"neutral"})]}),e.jsxs("p",{className:"sb-note",children:["Each metric gets a distinct ",e.jsx("em",{children:"shape"})," as well as a colour, and the card keeps its text label — so the meaning survives for anyone who cannot separate the reds from the greens. Badges are ",e.jsx("code",{children:"aria-hidden"})," for exactly that reason: the label already says it."]})]})};var d,l,m;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:"{}",...(m=(l=r.parameters)==null?void 0:l.docs)==null?void 0:m.source}}};var g,h,p;t.parameters={...t.parameters,docs:{...(g=t.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(96px, 1fr))",
    gap: "var(--cg-space-16)",
    maxWidth: 640
  }}>\r
      {ICON_NAMES.map(name => <div key={name} style={{
      textAlign: "center"
    }}>\r
          <div style={{
        height: 44,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid var(--cg-border)",
        borderRadius: "var(--cg-radius-md)",
        background: "var(--cg-surface-0)"
      }}>\r
            <Icon name={name} size="lg" />\r
          </div>\r
          <div className="sb-swatch__meta" style={{
        marginTop: 6
      }}>\r
            {name}\r
          </div>\r
        </div>)}\r
    </div>
}`,...(p=(h=t.parameters)==null?void 0:h.docs)==null?void 0:p.source}}};var u,x,v;c.parameters={...c.parameters,docs:{...(u=c.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: () => <div className="sb-row sb-stack--inline">\r
      <Icon name="flag" size="sm" />\r
      <Icon name="flag" size="md" />\r
      <Icon name="flag" size="lg" />\r
      <span className="sb-swatch__meta">12 · 16 · 20</span>\r
    </div>
}`,...(v=(x=c.parameters)==null?void 0:x.docs)==null?void 0:v.source}}};var b,f,y;i.parameters={...i.parameters,docs:{...(b=i.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: () => <div className="sb-row sb-stack--inline">\r
      {(["danger", "warning", "success", "accent", "neutral"] as Tone[]).map(tone => <Icon key={tone} name="shieldCheck" size="lg" tone={tone} />)}\r
      <Icon name="shieldCheck" size="lg" tone="muted" />\r
    </div>
}`,...(y=(f=i.parameters)==null?void 0:f.docs)==null?void 0:y.source}}};var j,k,I;o.parameters={...o.parameters,docs:{...(j=o.parameters)==null?void 0:j.docs,source:{originalSource:`{
  name: "IconBadge — used on metric cards",
  render: () => <div className="sb-stack">\r
      <div className="sb-row sb-stack--inline">\r
        <IconBadge name="shieldBlock" tone="danger" />\r
        <IconBadge name="shieldCheck" tone="success" />\r
        <IconBadge name="flag" tone="warning" />\r
        <IconBadge name="info" tone="accent" />\r
        <IconBadge name="circle" tone="neutral" />\r
      </div>\r
      <p className="sb-note">\r
        Each metric gets a distinct <em>shape</em> as well as a colour, and the card\r
        keeps its text label — so the meaning survives for anyone who cannot\r
        separate the reds from the greens. Badges are <code>aria-hidden</code> for\r
        exactly that reason: the label already says it.\r
      </p>\r
    </div>
}`,...(I=(k=o.parameters)==null?void 0:k.docs)==null?void 0:I.source}}};const T=["Playground","AllIcons","Sizes","Tones","Badges"];export{t as AllIcons,o as Badges,r as Playground,c as Sizes,i as Tones,T as __namedExportsOrder,S as default};
