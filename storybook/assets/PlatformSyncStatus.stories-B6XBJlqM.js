import{j as e}from"./jsx-runtime-DF2Pcvd1.js";import{P as t}from"./PlatformSyncStatus-SiUUiv4D.js";import"./index-B2-qRKKC.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./cx-DJxyWpib.js";import"./Button-BhRfCGa_.js";import"./Icon-C9i3uB6W.js";const j={title:"Threat monitoring/PlatformSyncStatus",component:t,parameters:{docs:{description:{component:"Blocking does not happen in ClickGuard — it happens in Google Ads and Meta Ads, whenever those APIs get around to it. This component is the receipt that says whether the exclusion actually landed. Without it, *Blocked* is a claim the customer has to take on faith, which is precisely the problem the screen exists to solve."}}}},s={render:()=>e.jsxs("div",{className:"sb-stack",children:[e.jsx(t,{items:[{platform:"Google Ads",state:"synced"}]}),e.jsx(t,{items:[{platform:"Google Ads",state:"pending"}]}),e.jsx(t,{items:[{platform:"Meta Ads",state:"failed",onRetry:()=>{}}]}),e.jsx(t,{items:[{platform:"Google Ads",state:"removed"}]})]})},a={args:{items:[{platform:"Google Ads",state:"synced"},{platform:"Meta Ads",state:"synced"}]}},n={name:"Edge case — one platform rejected the update",args:{items:[{platform:"Google Ads",state:"synced"},{platform:"Meta Ads",state:"failed",onRetry:()=>{}}]},parameters:{docs:{description:{story:"The realistic failure: an expired Meta access token. Google is blocking, Meta is not, and the customer is still paying for Meta clicks. Hiding this would be the single fastest way to lose their trust the first time they check their own ad spend.\n\nRecovery is a real button, not a text link: a failed sync is the most urgent thing in the panel, and a link reads like a footnote. It appears on any failed row that supplies `onRetry`; rows that are synced, pending or removed stay compact."}}}},o={args:{items:[]}},r={name:"align=end (drawer footer)",args:{align:"end",items:[{platform:"Google Ads",state:"synced"},{platform:"Meta Ads",state:"pending"}]}};var i,l,d;s.parameters={...s.parameters,docs:{...(i=s.parameters)==null?void 0:i.docs,source:{originalSource:`{
  render: () => <div className="sb-stack">\r
      <PlatformSyncStatus items={[{
      platform: "Google Ads",
      state: "synced"
    }]} />\r
      <PlatformSyncStatus items={[{
      platform: "Google Ads",
      state: "pending"
    }]} />\r
      <PlatformSyncStatus items={[{
      platform: "Meta Ads",
      state: "failed",
      onRetry: () => {}
    }]} />\r
      <PlatformSyncStatus items={[{
      platform: "Google Ads",
      state: "removed"
    }]} />\r
    </div>
}`,...(d=(l=s.parameters)==null?void 0:l.docs)==null?void 0:d.source}}};var c,m,p;a.parameters={...a.parameters,docs:{...(c=a.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    items: [{
      platform: "Google Ads",
      state: "synced"
    }, {
      platform: "Meta Ads",
      state: "synced"
    }]
  }
}`,...(p=(m=a.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};var g,h,f;n.parameters={...n.parameters,docs:{...(g=n.parameters)==null?void 0:g.docs,source:{originalSource:`{
  name: "Edge case — one platform rejected the update",
  args: {
    items: [{
      platform: "Google Ads",
      state: "synced"
    }, {
      platform: "Meta Ads",
      state: "failed",
      onRetry: () => {}
    }]
  },
  parameters: {
    docs: {
      description: {
        story: "The realistic failure: an expired Meta access token. Google is blocking, Meta is not, and the customer is still paying for Meta clicks. Hiding this would be the single fastest way to lose their trust the first time they check their own ad spend.\\n\\nRecovery is a real button, not a text link: a failed sync is the most urgent thing in the panel, and a link reads like a footnote. It appears on any failed row that supplies \`onRetry\`; rows that are synced, pending or removed stay compact."
      }
    }
  }
}`,...(f=(h=n.parameters)==null?void 0:h.docs)==null?void 0:f.source}}};var u,y,A;o.parameters={...o.parameters,docs:{...(u=o.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    items: []
  }
}`,...(A=(y=o.parameters)==null?void 0:y.docs)==null?void 0:A.source}}};var k,S,G;r.parameters={...r.parameters,docs:{...(k=r.parameters)==null?void 0:k.docs,source:{originalSource:`{
  name: "align=end (drawer footer)",
  args: {
    align: "end",
    items: [{
      platform: "Google Ads",
      state: "synced"
    }, {
      platform: "Meta Ads",
      state: "pending"
    }]
  }
}`,...(G=(S=r.parameters)==null?void 0:S.docs)==null?void 0:G.source}}};const B=["AllStates","BothPlatformsHealthy","PartialFailure","NotOnAnyList","RightAligned"];export{s as AllStates,a as BothPlatformsHealthy,o as NotOnAnyList,n as PartialFailure,r as RightAligned,B as __namedExportsOrder,j as default};
