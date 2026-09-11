import{j as e}from"./jsx-runtime-DF2Pcvd1.js";import{c as d}from"./cx-DJxyWpib.js";import"./index-B2-qRKKC.js";import"./_commonjsHelpers-Cpj98o6Y.js";function g(s){return s>0?`+${s}`:s<0?`−${Math.abs(s)}`:"0"}function m(s){return s>0?"cg-signals__pts--up":s<0?"cg-signals__pts--down":"cg-signals__pts--zero"}function h({title:s,signals:p,favor:t,showTotal:I=!1,className:C}){const R=p.reduce((a,c)=>a+c.points,0)+((t==null?void 0:t.points)??0);return e.jsxs("section",{className:d("cg-signals",C),children:[s&&e.jsx("h3",{className:"cg-signals__title",children:s}),e.jsxs("div",{className:"cg-signals__grid cg-signals__head","aria-hidden":"true",children:[e.jsx("div",{children:"What happened"}),e.jsx("div",{children:"Typical visitor"}),e.jsx("div",{style:{textAlign:"right"},children:"Score"})]}),p.map((a,c)=>e.jsxs("div",{className:"cg-signals__grid cg-signals__row",children:[e.jsx("div",{className:"cg-signals__what",children:a.what}),e.jsx("div",{className:"cg-signals__base",children:a.baseline}),e.jsx("div",{className:d("cg-signals__pts",m(a.points)),children:g(a.points)})]},`${a.what}-${c}`)),t&&e.jsxs("div",{className:"cg-signals__grid cg-signals__row",children:[e.jsxs("div",{children:[e.jsx("div",{className:"cg-signals__favor-label",children:"In this visitor’s favor"}),e.jsx("div",{className:"cg-signals__what",children:t.what})]}),e.jsx("div",{className:"cg-signals__base cg-signals__offset",children:t.baseline}),e.jsx("div",{className:d("cg-signals__pts","cg-signals__offset",m(t.points)),children:g(t.points)})]}),I&&e.jsxs("div",{className:"cg-signals__total",children:[e.jsx("div",{children:"Total"}),e.jsx("div",{}),e.jsx("div",{className:"cg-signals__total-value",children:R})]})]})}try{h.displayName="SignalTable",h.__docgenInfo={description:"",displayName:"SignalTable",props:{title:{defaultValue:null,description:"",name:"title",required:!1,type:{name:"ReactNode"}},signals:{defaultValue:null,description:"",name:"signals",required:!0,type:{name:"Signal[]"}},favor:{defaultValue:null,description:`The counter-evidence row. Always rendered when present, even when it is
"nothing in this visitor's favor" — the absence is itself informative.`,name:"favor",required:!1,type:{name:"Signal"}},showTotal:{defaultValue:{value:"false"},description:"Renders a summed total row. Off by default; the drawer turns it on.",name:"showTotal",required:!1,type:{name:"boolean"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}}}}}catch{}const B={title:"Threat monitoring/SignalTable",component:h,parameters:{layout:"padded",docs:{description:{component:"The evidence ledger. Three columns, and the middle one is the entire point: a number with nothing to compare it against means nothing to a customer. *4 ad clicks in 9 minutes* is only damning next to *1 per day*."}}}},n={args:{title:"What tipped it on visit 4",showTotal:!0,signals:[{what:"Datacenter IP (Hetzner range), not a home or mobile connection",baseline:"Residential or mobile",points:20},{what:"4 ad clicks in 9 minutes",baseline:"1 per day",points:24},{what:"Sessions lasted 2 seconds, never scrolled",baseline:"48 s, scrolls 60%",points:16},{what:"Headless browser markers present",baseline:"None",points:14},{what:"Frankfurt, campaign targets United States",baseline:"Location matches",points:10}],favor:{what:"Nothing in this visitor's favor",baseline:"No conversion, form fill or customer history",points:0}}},i={name:"Ambiguous — counter-evidence held the block back",args:{title:"What we've seen so far",showTotal:!0,signals:[{what:"3 ad clicks in 2 days on the same keyword",baseline:"1 per day",points:24},{what:"VPN exit node, real location can't be verified",baseline:"Residential or mobile",points:20},{what:"Sessions under 10 seconds, little scrolling",baseline:"48 s, scrolls 60%",points:16},{what:"Device fingerprint also seen on 1 other IP",baseline:"1 device per IP",points:16}],favor:{what:"Submitted your contact form on visit 4",baseline:"Bots almost never convert",points:-18}},parameters:{docs:{description:{story:"Showing what argues *against* a block is the strongest trust move in the whole screen. It proves the score is a weighing rather than a pile of reasons collected to justify a decision already made — and it is the only way a customer can tell the difference."}}}},o={args:{title:"What we checked",signals:[{what:"New visitor, no history with your site",baseline:"Most visitors are new",points:8},{what:"Stayed 2 min 10 s, scrolled 85% of the page",baseline:"48 s, scrolls 60%",points:0},{what:"Austin, campaign targets United States",baseline:"Location matches",points:0}],favor:{what:"Came back the next day from a Google search and viewed pricing",baseline:"Bots rarely return organically",points:-6}}},r={name:"Edge case — one visit, nothing decided",args:{title:"What we checked",signals:[{what:"1 ad click, first visit",baseline:"1 per day",points:12},{what:"Stayed 1 min 40 s, viewed 3 pages",baseline:"48 s",points:0}],favor:{what:"Nothing yet, but nothing against it either",baseline:"One visit is too early to judge",points:0}}},l={name:"Without the favor row",args:{title:"What we saw before you blocked it",signals:[{what:"IP appears on 3 public bot-network lists",baseline:"None",points:40},{what:"Datacenter IP (DigitalOcean)",baseline:"Residential or mobile",points:20},{what:"Page never rendered, session 0 seconds",baseline:"48 s, scrolls 60%",points:18}]}};var u,w,b;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    title: "What tipped it on visit 4",
    showTotal: true,
    signals: [{
      what: "Datacenter IP (Hetzner range), not a home or mobile connection",
      baseline: "Residential or mobile",
      points: 20
    }, {
      what: "4 ad clicks in 9 minutes",
      baseline: "1 per day",
      points: 24
    }, {
      what: "Sessions lasted 2 seconds, never scrolled",
      baseline: "48 s, scrolls 60%",
      points: 16
    }, {
      what: "Headless browser markers present",
      baseline: "None",
      points: 14
    }, {
      what: "Frankfurt, campaign targets United States",
      baseline: "Location matches",
      points: 10
    }],
    favor: {
      what: "Nothing in this visitor's favor",
      baseline: "No conversion, form fill or customer history",
      points: 0
    }
  }
}`,...(b=(w=n.parameters)==null?void 0:w.docs)==null?void 0:b.source}}};var v,f,y;i.parameters={...i.parameters,docs:{...(v=i.parameters)==null?void 0:v.docs,source:{originalSource:`{
  name: "Ambiguous — counter-evidence held the block back",
  args: {
    title: "What we've seen so far",
    showTotal: true,
    signals: [{
      what: "3 ad clicks in 2 days on the same keyword",
      baseline: "1 per day",
      points: 24
    }, {
      what: "VPN exit node, real location can't be verified",
      baseline: "Residential or mobile",
      points: 20
    }, {
      what: "Sessions under 10 seconds, little scrolling",
      baseline: "48 s, scrolls 60%",
      points: 16
    }, {
      what: "Device fingerprint also seen on 1 other IP",
      baseline: "1 device per IP",
      points: 16
    }],
    favor: {
      what: "Submitted your contact form on visit 4",
      baseline: "Bots almost never convert",
      points: -18
    }
  },
  parameters: {
    docs: {
      description: {
        story: "Showing what argues *against* a block is the strongest trust move in the whole screen. It proves the score is a weighing rather than a pile of reasons collected to justify a decision already made — and it is the only way a customer can tell the difference."
      }
    }
  }
}`,...(y=(f=i.parameters)==null?void 0:f.docs)==null?void 0:y.source}}};var _,N,k;o.parameters={...o.parameters,docs:{...(_=o.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    title: "What we checked",
    signals: [{
      what: "New visitor, no history with your site",
      baseline: "Most visitors are new",
      points: 8
    }, {
      what: "Stayed 2 min 10 s, scrolled 85% of the page",
      baseline: "48 s, scrolls 60%",
      points: 0
    }, {
      what: "Austin, campaign targets United States",
      baseline: "Location matches",
      points: 0
    }],
    favor: {
      what: "Came back the next day from a Google search and viewed pricing",
      baseline: "Bots rarely return organically",
      points: -6
    }
  }
}`,...(k=(N=o.parameters)==null?void 0:N.docs)==null?void 0:k.source}}};var x,S,j;r.parameters={...r.parameters,docs:{...(x=r.parameters)==null?void 0:x.docs,source:{originalSource:`{
  name: "Edge case — one visit, nothing decided",
  args: {
    title: "What we checked",
    signals: [{
      what: "1 ad click, first visit",
      baseline: "1 per day",
      points: 12
    }, {
      what: "Stayed 1 min 40 s, viewed 3 pages",
      baseline: "48 s",
      points: 0
    }],
    favor: {
      what: "Nothing yet, but nothing against it either",
      baseline: "One visit is too early to judge",
      points: 0
    }
  }
}`,...(j=(S=r.parameters)==null?void 0:S.docs)==null?void 0:j.source}}};var T,P,W;l.parameters={...l.parameters,docs:{...(T=l.parameters)==null?void 0:T.docs,source:{originalSource:`{
  name: "Without the favor row",
  args: {
    title: "What we saw before you blocked it",
    signals: [{
      what: "IP appears on 3 public bot-network lists",
      baseline: "None",
      points: 40
    }, {
      what: "Datacenter IP (DigitalOcean)",
      baseline: "Residential or mobile",
      points: 20
    }, {
      what: "Page never rendered, session 0 seconds",
      baseline: "48 s, scrolls 60%",
      points: 18
    }]
  }
}`,...(W=(P=l.parameters)==null?void 0:P.docs)==null?void 0:W.source}}};const O=["Blocked","AmbiguousCase","CleanVisitor","TooEarlyToJudge","WithoutCounterEvidence"];export{i as AmbiguousCase,n as Blocked,o as CleanVisitor,r as TooEarlyToJudge,l as WithoutCounterEvidence,O as __namedExportsOrder,B as default};
