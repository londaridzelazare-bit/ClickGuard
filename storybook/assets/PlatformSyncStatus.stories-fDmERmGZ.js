import{j as e}from"./jsx-runtime-DF2Pcvd1.js";import{P as t}from"./PlatformSyncStatus-DqwFvGsj.js";import"./index-B2-qRKKC.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./cx-DJxyWpib.js";import"./Button-Buk3GhZ-.js";const v={title:"Threat monitoring/PlatformSyncStatus",component:t,parameters:{docs:{description:{component:"Blocking does not happen in ClickGuard — it happens in Google Ads and Meta Ads, whenever those APIs get around to it. This component is the receipt that says whether the exclusion actually landed. Without it, *Blocked* is a claim the customer has to take on faith, which is precisely the problem the screen exists to solve."}}}},s={render:()=>e.jsxs("div",{className:"sb-stack",children:[e.jsx(t,{items:[{platform:"Google Ads",state:"synced"}]}),e.jsx(t,{items:[{platform:"Google Ads",state:"pending"}]}),e.jsx(t,{items:[{platform:"Meta Ads",state:"failed",onRetry:()=>{}}]}),e.jsx(t,{items:[{platform:"Google Ads",state:"removed"}]})]})},a={args:{items:[{platform:"Google Ads",state:"synced"},{platform:"Meta Ads",state:"synced"}]}},r={name:"Edge case — one platform rejected the update",args:{items:[{platform:"Google Ads",state:"synced"},{platform:"Meta Ads",state:"failed",onRetry:()=>{}}]},parameters:{docs:{description:{story:"The realistic failure: an expired Meta access token. Google is blocking, Meta is not, and the customer is still paying for Meta clicks. Hiding this would be the single fastest way to lose their trust the first time they check their own ad spend."}}}},o={args:{items:[]}},n={name:"align=end (drawer footer)",args:{align:"end",items:[{platform:"Google Ads",state:"synced"},{platform:"Meta Ads",state:"pending"}]}};var i,d,l;s.parameters={...s.parameters,docs:{...(i=s.parameters)==null?void 0:i.docs,source:{originalSource:`{
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
}`,...(l=(d=s.parameters)==null?void 0:d.docs)==null?void 0:l.source}}};var c,m,p;a.parameters={...a.parameters,docs:{...(c=a.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    items: [{
      platform: "Google Ads",
      state: "synced"
    }, {
      platform: "Meta Ads",
      state: "synced"
    }]
  }
}`,...(p=(m=a.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};var g,f,h;r.parameters={...r.parameters,docs:{...(g=r.parameters)==null?void 0:g.docs,source:{originalSource:`{
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
        story: "The realistic failure: an expired Meta access token. Google is blocking, Meta is not, and the customer is still paying for Meta clicks. Hiding this would be the single fastest way to lose their trust the first time they check their own ad spend."
      }
    }
  }
}`,...(h=(f=r.parameters)==null?void 0:f.docs)==null?void 0:h.source}}};var u,y,A;o.parameters={...o.parameters,docs:{...(u=o.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    items: []
  }
}`,...(A=(y=o.parameters)==null?void 0:y.docs)==null?void 0:A.source}}};var S,G,M;n.parameters={...n.parameters,docs:{...(S=n.parameters)==null?void 0:S.docs,source:{originalSource:`{
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
}`,...(M=(G=n.parameters)==null?void 0:G.docs)==null?void 0:M.source}}};const R=["AllStates","BothPlatformsHealthy","PartialFailure","NotOnAnyList","RightAligned"];export{s as AllStates,a as BothPlatformsHealthy,o as NotOnAnyList,r as PartialFailure,n as RightAligned,R as __namedExportsOrder,v as default};
