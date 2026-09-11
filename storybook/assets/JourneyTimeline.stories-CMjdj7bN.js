import{j as e}from"./jsx-runtime-DF2Pcvd1.js";import{r as B}from"./index-B2-qRKKC.js";import{c as u}from"./cx-DJxyWpib.js";import{B as V}from"./tokens-DxNgueAT.js";import{S as T}from"./StatusPill-CmxwTPc2.js";import"./_commonjsHelpers-Cpj98o6Y.js";function m({items:s,threshold:n=V,title:i="Journey",summary:a,className:p}){return e.jsxs("div",{className:u("cg-journey",p),children:[e.jsxs("div",{className:"cg-journey__header",children:[e.jsx("h3",{className:"cg-journey__title",children:i}),a&&e.jsx("span",{className:"cg-journey__summary",children:a})]}),e.jsxs("div",{className:"cg-journey__grid cg-journey__labels","aria-hidden":"true",children:[e.jsx("div",{children:"Visit"}),e.jsx("div",{children:"Source"}),e.jsx("div",{className:"cg-journey__threshold-label",children:e.jsx("span",{style:{left:`${n}%`},children:"Block threshold"})}),e.jsx("div",{className:"cg-journey__right",children:"Score"})]}),e.jsx("ol",{style:{listStyle:"none",margin:0,padding:0},children:s.map(r=>r.kind==="gap"?e.jsx("li",{children:e.jsxs("button",{type:"button",className:"cg-journey__gap",onClick:r.onExpand,children:[e.jsx("span",{className:"cg-journey__dots","aria-hidden":"true",children:"···"}),e.jsxs("span",{className:"cg-journey__gap-label",children:[r.count," more ",r.count===1?"visit":"visits"," ▾"]})]})},r.id):e.jsx($,{visit:r,threshold:n},r.id))})]})}function $({visit:s,threshold:n}){const i=s.score>=n,a=s.source==="organic"?"organic":i?"paid-over":"paid-under";return e.jsxs("li",{className:u("cg-journey__grid","cg-journey__row",s.crossed&&"cg-journey__row--cross",s.afterBlock&&"cg-journey__row--post"),children:[e.jsxs("div",{className:"cg-journey__date",children:[e.jsx("div",{children:s.date}),s.crossed&&e.jsx("div",{className:"cg-journey__marker",children:"Crossed threshold"}),s.afterBlock&&!s.crossed&&e.jsx("div",{className:"cg-journey__marker cg-journey__marker--muted",children:"After block"})]}),e.jsx("div",{children:e.jsx(T,{size:"sm",tone:s.source==="paid"?"warning":"neutral",children:s.source==="paid"?"Paid":"Organic"})}),e.jsxs("div",{className:"cg-journey__bar",children:[e.jsx("div",{className:"cg-journey__track"}),e.jsx("div",{className:u("cg-journey__fill",`cg-journey__fill--${a}`),style:{width:`${Math.max(0,Math.min(100,s.score))}%`}}),e.jsx("div",{className:"cg-journey__threshold",style:{left:`${n}%`}})]}),e.jsx("div",{className:u("cg-journey__score",i&&"cg-journey__score--over",s.crossed&&"cg-journey__score--cross"),children:s.score})]})}try{m.displayName="JourneyTimeline",m.__docgenInfo={description:"",displayName:"JourneyTimeline",props:{items:{defaultValue:null,description:"",name:"items",required:!0,type:{name:"JourneyItem[]"}},threshold:{defaultValue:{value:"70"},description:"0–100. Drawn as a dashed vertical line across every bar.",name:"threshold",required:!1,type:{name:"number"}},title:{defaultValue:{value:"Journey"},description:"",name:"title",required:!1,type:{name:"ReactNode"}},summary:{defaultValue:null,description:"",name:"summary",required:!1,type:{name:"ReactNode"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}}}}}catch{}const R={title:"Threat monitoring/JourneyTimeline",component:m,parameters:{layout:"padded",docs:{description:{component:"Every arrival by this visitor, as a score bar against a fixed block threshold. This is the component that makes the product's core mechanic visible: blocking is **cumulative across the journey**, not a judgement on any one visit. Paid below the line is amber, paid at or over is red, organic is always grey — because an organic visit can raise suspicion but never costs the advertiser money."}}}},A=[{kind:"visit",id:"1",date:"Sep 9 · 14:23",source:"paid",score:28},{kind:"visit",id:"2",date:"Sep 9 · 14:25",source:"paid",score:46},{kind:"visit",id:"3",date:"Sep 9 · 14:28",source:"paid",score:62},{kind:"visit",id:"4",date:"Sep 9 · 14:32",source:"paid",score:84,crossed:!0},{kind:"visit",id:"5",date:"Sep 10 · 20:22",source:"organic",score:88,afterBlock:!0}],o={args:{items:A,summary:"5 visits · 4 paid · blocks at 70"}},t={args:{summary:"2 visits · 1 paid · blocks at 70",items:[{kind:"visit",id:"1",date:"Sep 11 · 09:41",source:"paid",score:8},{kind:"visit",id:"2",date:"Sep 12 · 08:12",source:"organic",score:2}]}},c={name:"Edge case — blocked on the first visit",args:{summary:"1 visit · 1 paid · blocks at 70",items:[{kind:"visit",id:"1",date:"Sep 11 · 03:07",source:"paid",score:78,crossed:!0}]},parameters:{docs:{description:{story:"A known bot-network IP can cross on arrival. The timeline still renders the threshold line, so a one-row journey does not look like a different component."}}}},d={name:"Edge case — never cost anything",args:{summary:"4 visits · 0 paid · blocks at 70",items:[{kind:"visit",id:"1",date:"Aug 30 · 11:02",source:"organic",score:4},{kind:"visit",id:"2",date:"Sep 2 · 16:40",source:"organic",score:4},{kind:"visit",id:"3",date:"Sep 6 · 10:18",source:"organic",score:2},{kind:"visit",id:"4",date:"Sep 9 · 19:55",source:"organic",score:2}]}},l={name:"Long journey — collapsed run, interactive",render:()=>{const[s,n]=B.useState(!1),i=Array.from({length:12},(p,r)=>({kind:"visit",id:`mid-${r}`,date:`Sep ${8+Math.floor(r/4)} · 1${r%6}:2${r%9}`,source:r%3===0?"paid":"organic",score:78+r%5,afterBlock:!0})),a=[{kind:"visit",id:"a",date:"Sep 6 · 02:11",source:"paid",score:18},{kind:"visit",id:"b",date:"Sep 6 · 08:30",source:"paid",score:34},{kind:"visit",id:"c",date:"Sep 7 · 05:02",source:"paid",score:64},{kind:"visit",id:"d",date:"Sep 7 · 11:44",source:"paid",score:78,crossed:!0},...s?i:[{kind:"gap",id:"gap",count:12,onExpand:()=>n(!0)}],{kind:"visit",id:"y",date:"Sep 11 · 22:10",source:"organic",score:96,afterBlock:!0},{kind:"visit",id:"z",date:"Sep 12 · 06:31",source:"organic",score:98,afterBlock:!0}];return e.jsxs("div",{className:"sb-stack",style:{maxWidth:512},children:[e.jsx(m,{items:a,summary:"18 visits · 9 paid · blocks at 70"}),e.jsx("p",{className:"sb-note",children:"A 40-visit click farm would bury the one row that matters. The timeline always keeps the first two visits, the visit that crossed the threshold with its immediate neighbours, and the two most recent — and folds the rest into a row-shaped button. Click it to expand."})]})}};var g,h,y;o.parameters={...o.parameters,docs:{...(g=o.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    items: shortJourney,
    summary: "5 visits · 4 paid · blocks at 70"
  }
}`,...(y=(h=o.parameters)==null?void 0:h.docs)==null?void 0:y.source}}};var k,v,j;t.parameters={...t.parameters,docs:{...(k=t.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    summary: "2 visits · 1 paid · blocks at 70",
    items: [{
      kind: "visit",
      id: "1",
      date: "Sep 11 · 09:41",
      source: "paid",
      score: 8
    }, {
      kind: "visit",
      id: "2",
      date: "Sep 12 · 08:12",
      source: "organic",
      score: 2
    }]
  }
}`,...(j=(v=t.parameters)==null?void 0:v.docs)==null?void 0:j.source}}};var _,f,x;c.parameters={...c.parameters,docs:{...(_=c.parameters)==null?void 0:_.docs,source:{originalSource:`{
  name: "Edge case — blocked on the first visit",
  args: {
    summary: "1 visit · 1 paid · blocks at 70",
    items: [{
      kind: "visit",
      id: "1",
      date: "Sep 11 · 03:07",
      source: "paid",
      score: 78,
      crossed: true
    }]
  },
  parameters: {
    docs: {
      description: {
        story: "A known bot-network IP can cross on arrival. The timeline still renders the threshold line, so a one-row journey does not look like a different component."
      }
    }
  }
}`,...(x=(f=c.parameters)==null?void 0:f.docs)==null?void 0:x.source}}};var S,b,w;d.parameters={...d.parameters,docs:{...(S=d.parameters)==null?void 0:S.docs,source:{originalSource:`{
  name: "Edge case — never cost anything",
  args: {
    summary: "4 visits · 0 paid · blocks at 70",
    items: [{
      kind: "visit",
      id: "1",
      date: "Aug 30 · 11:02",
      source: "organic",
      score: 4
    }, {
      kind: "visit",
      id: "2",
      date: "Sep 2 · 16:40",
      source: "organic",
      score: 4
    }, {
      kind: "visit",
      id: "3",
      date: "Sep 6 · 10:18",
      source: "organic",
      score: 2
    }, {
      kind: "visit",
      id: "4",
      date: "Sep 9 · 19:55",
      source: "organic",
      score: 2
    }]
  }
}`,...(w=(b=d.parameters)==null?void 0:b.docs)==null?void 0:w.source}}};var N,E,J;l.parameters={...l.parameters,docs:{...(N=l.parameters)==null?void 0:N.docs,source:{originalSource:`{
  name: "Long journey — collapsed run, interactive",
  render: () => {
    const [expanded, setExpanded] = useState(false);
    const middle: JourneyItem[] = Array.from({
      length: 12
    }, (_, i) => ({
      kind: "visit" as const,
      id: \`mid-\${i}\`,
      date: \`Sep \${8 + Math.floor(i / 4)} · 1\${i % 6}:2\${i % 9}\`,
      source: (i % 3 === 0 ? "paid" : "organic") as "paid" | "organic",
      score: 78 + i % 5,
      afterBlock: true
    }));
    const items: JourneyItem[] = [{
      kind: "visit",
      id: "a",
      date: "Sep 6 · 02:11",
      source: "paid",
      score: 18
    }, {
      kind: "visit",
      id: "b",
      date: "Sep 6 · 08:30",
      source: "paid",
      score: 34
    }, {
      kind: "visit",
      id: "c",
      date: "Sep 7 · 05:02",
      source: "paid",
      score: 64
    }, {
      kind: "visit",
      id: "d",
      date: "Sep 7 · 11:44",
      source: "paid",
      score: 78,
      crossed: true
    }, ...(expanded ? middle : [{
      kind: "gap" as const,
      id: "gap",
      count: 12,
      onExpand: () => setExpanded(true)
    }]), {
      kind: "visit",
      id: "y",
      date: "Sep 11 · 22:10",
      source: "organic",
      score: 96,
      afterBlock: true
    }, {
      kind: "visit",
      id: "z",
      date: "Sep 12 · 06:31",
      source: "organic",
      score: 98,
      afterBlock: true
    }];
    return <div className="sb-stack" style={{
      maxWidth: 512
    }}>\r
        <JourneyTimeline items={items} summary="18 visits · 9 paid · blocks at 70" />\r
        <p className="sb-note">\r
          A 40-visit click farm would bury the one row that matters. The timeline\r
          always keeps the first two visits, the visit that crossed the threshold\r
          with its immediate neighbours, and the two most recent — and folds the rest\r
          into a row-shaped button. Click it to expand.\r
        </p>\r
      </div>;
  }
}`,...(J=(E=l.parameters)==null?void 0:E.docs)==null?void 0:J.source}}};const M=["BlockedVisitor","CleanVisitor","SingleVisit","OrganicOnly","LongJourneyCollapsed"];export{o as BlockedVisitor,t as CleanVisitor,l as LongJourneyCollapsed,d as OrganicOnly,c as SingleVisit,M as __namedExportsOrder,R as default};
