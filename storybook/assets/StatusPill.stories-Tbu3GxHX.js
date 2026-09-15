import{j as s}from"./jsx-runtime-DF2Pcvd1.js";import{S as e}from"./StatusPill-CmxwTPc2.js";import{V as b}from"./tokens-DxNgueAT.js";import"./index-B2-qRKKC.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./cx-DJxyWpib.js";const T={title:"Threat monitoring/StatusPill",component:e,args:{status:"Blocked",size:"md"},parameters:{docs:{description:{component:"Always a word plus a colour — never colour alone. Pass `status` and the pill resolves its own tone from the design system's `statusTone` map, so no screen ever decides what colour *Blocked* is."}}}},r={},n={render:()=>s.jsxs("div",{className:"sb-stack",children:[s.jsx("div",{className:"sb-row",children:b.map(i=>s.jsx(e,{status:i},i))}),s.jsx("p",{className:"sb-note",children:"The four states a visitor can be in. “Unblocked by you” is deliberately neutral rather than green: the customer overrode us, which is neither a success nor a failure, and colouring it green would read as the product congratulating itself for a decision it did not make."})]})},t={render:()=>s.jsxs("div",{className:"sb-stack",children:[s.jsxs("div",{className:"sb-row",children:[s.jsx(e,{size:"sm",tone:"warning",children:"Paid"}),s.jsx(e,{size:"sm",tone:"neutral",children:"Organic"}),s.jsx(e,{size:"sm",tone:"warning",children:"Sync pending"}),s.jsx(e,{size:"sm",tone:"danger",children:"Sync failed"})]}),s.jsx("p",{className:"sb-note",children:"11px variant for things that live inside a row: the paid/organic source tag and inline sync state. The source tag borrows the warning tone on purpose — a paid visit is the only kind that costs money, and amber is the system’s “this is costing you something” colour."})]})},a={render:()=>s.jsxs("div",{className:"sb-row",children:[s.jsx(e,{tone:"danger",children:"danger"}),s.jsx(e,{tone:"warning",children:"warning"}),s.jsx(e,{tone:"success",children:"success"}),s.jsx(e,{tone:"neutral",children:"neutral"}),s.jsx(e,{tone:"accent",children:"accent"})]})};var o,l,c;r.parameters={...r.parameters,docs:{...(o=r.parameters)==null?void 0:o.docs,source:{originalSource:"{}",...(c=(l=r.parameters)==null?void 0:l.docs)==null?void 0:c.source}}};var d,u,m;n.parameters={...n.parameters,docs:{...(d=n.parameters)==null?void 0:d.docs,source:{originalSource:`{
  render: () => <div className="sb-stack">\r
      <div className="sb-row">\r
        {VISITOR_STATUSES.map(status => <StatusPill key={status} status={status} />)}\r
      </div>\r
      <p className="sb-note">\r
        The four states a visitor can be in. &ldquo;Unblocked by you&rdquo; is\r
        deliberately neutral rather than green: the customer overrode us, which is\r
        neither a success nor a failure, and colouring it green would read as the\r
        product congratulating itself for a decision it did not make.\r
      </p>\r
    </div>
}`,...(m=(u=n.parameters)==null?void 0:u.docs)==null?void 0:m.source}}};var h,p,g;t.parameters={...t.parameters,docs:{...(h=t.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: () => <div className="sb-stack">\r
      <div className="sb-row">\r
        <StatusPill size="sm" tone="warning">\r
          Paid\r
        </StatusPill>\r
        <StatusPill size="sm" tone="neutral">\r
          Organic\r
        </StatusPill>\r
        <StatusPill size="sm" tone="warning">\r
          Sync pending\r
        </StatusPill>\r
        <StatusPill size="sm" tone="danger">\r
          Sync failed\r
        </StatusPill>\r
      </div>\r
      <p className="sb-note">\r
        11px variant for things that live inside a row: the paid/organic source\r
        tag and inline sync state. The source tag borrows the warning tone on\r
        purpose — a paid visit is the only kind that costs money, and amber is\r
        the system&rsquo;s &ldquo;this is costing you something&rdquo; colour.\r
      </p>\r
    </div>
}`,...(g=(p=t.parameters)==null?void 0:p.docs)==null?void 0:g.source}}};var S,v,w;a.parameters={...a.parameters,docs:{...(S=a.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: () => <div className="sb-row">\r
      <StatusPill tone="danger">danger</StatusPill>\r
      <StatusPill tone="warning">warning</StatusPill>\r
      <StatusPill tone="success">success</StatusPill>\r
      <StatusPill tone="neutral">neutral</StatusPill>\r
      <StatusPill tone="accent">accent</StatusPill>\r
    </div>
}`,...(w=(v=a.parameters)==null?void 0:v.docs)==null?void 0:w.source}}};const k=["Playground","VisitorStatuses","SmallVariant","AllTones"];export{a as AllTones,r as Playground,t as SmallVariant,n as VisitorStatuses,k as __namedExportsOrder,T as default};
