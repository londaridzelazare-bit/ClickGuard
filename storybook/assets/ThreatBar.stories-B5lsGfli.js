import{j as e}from"./jsx-runtime-DF2Pcvd1.js";import{T as a}from"./ThreatBar-LJK4kNhv.js";import"./index-B2-qRKKC.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./cx-DJxyWpib.js";import"./tokens-DxNgueAT.js";const T={title:"Threat monitoring/ThreatBar",component:a,args:{score:84,label:"Automated traffic",status:"Blocked",showValue:!1},argTypes:{score:{control:{type:"range",min:0,max:100,step:1}}},parameters:{docs:{description:{component:"Fill = score / 100, coloured by status. The label is two to four plain words and does the actual communicating; the bar only exists so the eye can rank rows at a glance. **The number is hidden by default** — see the *Why the number is hidden* story."}}}},s={},r={render:()=>e.jsxs("div",{className:"sb-stack",children:[e.jsx(a,{score:84,label:"Automated traffic",status:"Blocked"}),e.jsx(a,{score:96,label:"Click farm pattern",status:"Blocked"}),e.jsx(a,{score:58,label:"Repeat clicks, but converted",status:"Flagged"}),e.jsx(a,{score:8,label:"Normal behavior",status:"Clean"}),e.jsx(a,{score:66,label:"Repeat clicks, but converted",status:"Unblocked by you"})]})},t={name:"Why the number is hidden",render:()=>e.jsxs("div",{className:"sb-stack",children:[e.jsxs("div",{children:[e.jsx("div",{className:"sb-label",children:"In the table — label only"}),e.jsx(a,{score:84,label:"Automated traffic",status:"Blocked"})]}),e.jsxs("div",{children:[e.jsx("div",{className:"sb-label",children:"In the drawer — value shown, next to its evidence"}),e.jsx(a,{score:84,label:"Automated traffic",status:"Blocked",showValue:!0})]}),e.jsx("p",{className:"sb-note",children:"A bare “84” in a table invites “84 out of what, and why?” — a question the row cannot answer, which costs exactly the trust this screen exists to build. The number appears only in the drawer, where the signal ledger underneath it accounts for every point."})]})},o={render:()=>e.jsxs("div",{className:"sb-stack",children:[e.jsx(a,{score:0,label:"Nothing recorded",status:"Clean",showValue:!0}),e.jsx(a,{score:100,label:"Known bot network",status:"Blocked",showValue:!0}),e.jsx(a,{score:140,label:"Clamped above 100",status:"Blocked",showValue:!0}),e.jsx(a,{score:-20,label:"Clamped below 0",status:"Clean",showValue:!0})]})};var l,n,c;s.parameters={...s.parameters,docs:{...(l=s.parameters)==null?void 0:l.docs,source:{originalSource:"{}",...(c=(n=s.parameters)==null?void 0:n.docs)==null?void 0:c.source}}};var d,i,u;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`{
  render: () => <div className="sb-stack">\r
      <ThreatBar score={84} label="Automated traffic" status="Blocked" />\r
      <ThreatBar score={96} label="Click farm pattern" status="Blocked" />\r
      <ThreatBar score={58} label="Repeat clicks, but converted" status="Flagged" />\r
      <ThreatBar score={8} label="Normal behavior" status="Clean" />\r
      <ThreatBar score={66} label="Repeat clicks, but converted" status="Unblocked by you" />\r
    </div>
}`,...(u=(i=r.parameters)==null?void 0:i.docs)==null?void 0:u.source}}};var h,b,m;t.parameters={...t.parameters,docs:{...(h=t.parameters)==null?void 0:h.docs,source:{originalSource:`{
  name: "Why the number is hidden",
  render: () => <div className="sb-stack">\r
      <div>\r
        <div className="sb-label">In the table — label only</div>\r
        <ThreatBar score={84} label="Automated traffic" status="Blocked" />\r
      </div>\r
      <div>\r
        <div className="sb-label">In the drawer — value shown, next to its evidence</div>\r
        <ThreatBar score={84} label="Automated traffic" status="Blocked" showValue />\r
      </div>\r
      <p className="sb-note">\r
        A bare &ldquo;84&rdquo; in a table invites &ldquo;84 out of what, and why?&rdquo;\r
        — a question the row cannot answer, which costs exactly the trust this screen\r
        exists to build. The number appears only in the drawer, where the signal\r
        ledger underneath it accounts for every point.\r
      </p>\r
    </div>
}`,...(m=(b=t.parameters)==null?void 0:b.docs)==null?void 0:m.source}}};var p,w,v;o.parameters={...o.parameters,docs:{...(p=o.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: () => <div className="sb-stack">\r
      <ThreatBar score={0} label="Nothing recorded" status="Clean" showValue />\r
      <ThreatBar score={100} label="Known bot network" status="Blocked" showValue />\r
      <ThreatBar score={140} label="Clamped above 100" status="Blocked" showValue />\r
      <ThreatBar score={-20} label="Clamped below 0" status="Clean" showValue />\r
    </div>
}`,...(v=(w=o.parameters)==null?void 0:w.docs)==null?void 0:v.source}}};const j=["Playground","ByStatus","WhyTheNumberIsHidden","EdgeValues"];export{r as ByStatus,o as EdgeValues,s as Playground,t as WhyTheNumberIsHidden,j as __namedExportsOrder,T as default};
