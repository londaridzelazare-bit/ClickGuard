import{j as r}from"./jsx-runtime-DF2Pcvd1.js";import{B as n}from"./Button-CXnI-UZF.js";import"./index-B2-qRKKC.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./cx-DJxyWpib.js";const f={title:"Primitives/Button",component:n,args:{children:"Unblock visitor",variant:"secondary",size:"md"},parameters:{docs:{description:{component:"Secondary is the default action everywhere in the product. Solid ink (`primary`) is reserved for the confirming button inside a dialog, so a filled button always means *this is the thing you came here to do*. `danger` is for actions that start blocking."}}}},s={},e={render:()=>r.jsxs("div",{className:"sb-stack",children:[r.jsxs("div",{className:"sb-row",children:[r.jsx(n,{variant:"secondary",children:"Unblock visitor"}),r.jsx(n,{variant:"danger",children:"Block now"}),r.jsx(n,{variant:"primary",children:"Unblock visitor"}),r.jsx(n,{variant:"ghost",children:"Report as mistake"}),r.jsx(n,{variant:"link",children:"Retry"})]}),r.jsx("p",{className:"sb-note",children:"secondary · danger · primary (confirmations only) · ghost · link"})]})},a={render:()=>r.jsxs("div",{className:"sb-row",children:[r.jsx(n,{size:"md",children:"Medium (default)"}),r.jsx(n,{size:"sm",children:"Small"})]})},t={render:()=>r.jsxs("div",{className:"sb-row",children:[r.jsx(n,{disabled:!0,children:"Unblock visitor"}),r.jsx(n,{variant:"danger",disabled:!0,children:"Block now"}),r.jsx(n,{variant:"primary",disabled:!0,children:"Confirm"})]})};var o,i,d;s.parameters={...s.parameters,docs:{...(o=s.parameters)==null?void 0:o.docs,source:{originalSource:"{}",...(d=(i=s.parameters)==null?void 0:i.docs)==null?void 0:d.source}}};var c,l,m;e.parameters={...e.parameters,docs:{...(c=e.parameters)==null?void 0:c.docs,source:{originalSource:`{
  render: () => <div className="sb-stack">\r
      <div className="sb-row">\r
        <Button variant="secondary">Unblock visitor</Button>\r
        <Button variant="danger">Block now</Button>\r
        <Button variant="primary">Unblock visitor</Button>\r
        <Button variant="ghost">Report as mistake</Button>\r
        <Button variant="link">Retry</Button>\r
      </div>\r
      <p className="sb-note">\r
        secondary · danger · primary (confirmations only) · ghost · link\r
      </p>\r
    </div>
}`,...(m=(l=e.parameters)==null?void 0:l.docs)==null?void 0:m.source}}};var u,p,v;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: () => <div className="sb-row">\r
      <Button size="md">Medium (default)</Button>\r
      <Button size="sm">Small</Button>\r
    </div>
}`,...(v=(p=a.parameters)==null?void 0:p.docs)==null?void 0:v.source}}};var h,b,B;t.parameters={...t.parameters,docs:{...(h=t.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: () => <div className="sb-row">\r
      <Button disabled>Unblock visitor</Button>\r
      <Button variant="danger" disabled>\r
        Block now\r
      </Button>\r
      <Button variant="primary" disabled>\r
        Confirm\r
      </Button>\r
    </div>
}`,...(B=(b=t.parameters)==null?void 0:b.docs)==null?void 0:B.source}}};const w=["Playground","Variants","Sizes","Disabled"];export{t as Disabled,s as Playground,a as Sizes,e as Variants,w as __namedExportsOrder,f as default};
