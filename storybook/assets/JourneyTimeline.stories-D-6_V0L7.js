import{j as e}from"./jsx-runtime-DF2Pcvd1.js";import{r as I}from"./index-B2-qRKKC.js";import{c as p}from"./cx-DJxyWpib.js";import{B as q}from"./tokens-DxNgueAT.js";import{S as L}from"./StatusPill-CmxwTPc2.js";import{I as P}from"./Icon-4ZrsAClT.js";import"./_commonjsHelpers-Cpj98o6Y.js";function h({items:s,threshold:n=q,order:t="newest-first",title:i="Journey",summary:y,className:r}){const C=t==="newest-first"?[...s].reverse():s;return e.jsxs("div",{className:p("cg-journey",r),children:[e.jsxs("div",{className:"cg-journey__header",children:[e.jsx("h3",{className:"cg-journey__title",children:i}),e.jsx("span",{className:"cg-journey__order",children:t==="newest-first"?"Newest first":"Oldest first"}),y&&e.jsx("span",{className:"cg-journey__summary",children:y})]}),e.jsxs("div",{className:"cg-journey__grid cg-journey__labels","aria-hidden":"true",children:[e.jsx("div",{children:"Visit"}),e.jsx("div",{children:"Source"}),e.jsx("div",{className:"cg-journey__threshold-label",children:e.jsx("span",{style:{left:`${n}%`},children:"Block threshold"})}),e.jsx("div",{className:"cg-journey__right",children:"Score"})]}),e.jsx("ol",{style:{listStyle:"none",margin:0,padding:0},children:C.map(a=>a.kind==="gap"?e.jsx("li",{children:e.jsxs("button",{type:"button",className:"cg-journey__gap",onClick:a.onExpand,children:[e.jsx("span",{className:"cg-journey__dots","aria-hidden":"true",children:"···"}),e.jsxs("span",{className:"cg-journey__gap-label",children:[a.count," more ",a.count===1?"visit":"visits",e.jsx(P,{name:"chevronDown",size:"sm"})]})]})},a.id):e.jsx(R,{visit:a,threshold:n},a.id))})]})}function R({visit:s,threshold:n}){const t=s.score>=n,i=s.source==="organic"?"organic":t?"paid-over":"paid-under";return e.jsxs("li",{className:p("cg-journey__grid","cg-journey__row",s.crossed&&"cg-journey__row--cross",s.afterBlock&&"cg-journey__row--post"),children:[e.jsxs("div",{className:"cg-journey__date",children:[e.jsx("div",{children:s.date}),s.crossed&&e.jsx("div",{className:"cg-journey__marker",children:"Crossed threshold"}),s.afterBlock&&!s.crossed&&e.jsx("div",{className:"cg-journey__marker cg-journey__marker--muted",children:"After block"})]}),e.jsx("div",{children:e.jsx(L,{size:"sm",tone:s.source==="paid"?"warning":"neutral",children:s.source==="paid"?"Paid":"Organic"})}),e.jsxs("div",{className:"cg-journey__bar",children:[e.jsx("div",{className:"cg-journey__track"}),e.jsx("div",{className:p("cg-journey__fill",`cg-journey__fill--${i}`),style:{width:`${Math.max(0,Math.min(100,s.score))}%`}}),e.jsx("div",{className:"cg-journey__threshold",style:{left:`${n}%`}})]}),e.jsx("div",{className:p("cg-journey__score",t&&"cg-journey__score--over",s.crossed&&"cg-journey__score--cross"),children:s.score})]})}try{h.displayName="JourneyTimeline",h.__docgenInfo={description:"",displayName:"JourneyTimeline",props:{items:{defaultValue:null,description:"Always supplied oldest → newest; the component decides display order.",name:"items",required:!0,type:{name:"JourneyItem[]"}},threshold:{defaultValue:{value:"70"},description:"0–100. Drawn as a dashed vertical line across every bar.",name:"threshold",required:!1,type:{name:"number"}},order:{defaultValue:{value:"newest-first"},description:`Newest first by default: the question a customer opens a visitor with is
"what is it doing now?", so the latest arrival belongs at the top. The
running score then reads downward from where the visitor stands today to
how it started.`,name:"order",required:!1,type:{name:"enum",value:[{value:'"newest-first"'},{value:'"oldest-first"'}]}},title:{defaultValue:{value:"Journey"},description:"",name:"title",required:!1,type:{name:"ReactNode"}},summary:{defaultValue:null,description:"",name:"summary",required:!1,type:{name:"ReactNode"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}}}}}catch{}const K={title:"Threat monitoring/JourneyTimeline",component:h,parameters:{layout:"padded",docs:{description:{component:`Every arrival by this visitor, as a score bar against a fixed block threshold. This is the component that makes the product's core mechanic visible: blocking is **cumulative across the journey**, not a judgement on any one visit. Paid below the line is amber, paid at or over is red, organic is always grey — because an organic visit can raise suspicion but never costs the advertiser money.

Visits are **newest first** by default: a customer opens a visitor asking what it is doing now. Callers always pass items oldest → newest and the component decides display order, so data never has to know about presentation.`}}}},A=[{kind:"visit",id:"1",date:"Sep 9 · 14:23",source:"paid",score:28},{kind:"visit",id:"2",date:"Sep 9 · 14:25",source:"paid",score:46},{kind:"visit",id:"3",date:"Sep 9 · 14:28",source:"paid",score:62},{kind:"visit",id:"4",date:"Sep 9 · 14:32",source:"paid",score:84,crossed:!0},{kind:"visit",id:"5",date:"Sep 10 · 20:22",source:"organic",score:88,afterBlock:!0}],o={args:{items:A,summary:"5 visits · 4 paid · blocks at 70"}},d={name:"Oldest first",args:{items:A,order:"oldest-first",summary:"5 visits · 4 paid · blocks at 70"},parameters:{docs:{description:{story:"The same journey in chronological order. Useful where the story of how suspicion built up matters more than the current state — an audit export, say. The header pill always states the order, because a reader assumes a timeline starts at the top."}}}},c={args:{summary:"2 visits · 1 paid · blocks at 70",items:[{kind:"visit",id:"1",date:"Sep 11 · 09:41",source:"paid",score:8},{kind:"visit",id:"2",date:"Sep 12 · 08:12",source:"organic",score:2}]}},l={name:"Edge case — blocked on the first visit",args:{summary:"1 visit · 1 paid · blocks at 70",items:[{kind:"visit",id:"1",date:"Sep 11 · 03:07",source:"paid",score:78,crossed:!0}]},parameters:{docs:{description:{story:"A known bot-network IP can cross on arrival. The timeline still renders the threshold line, so a one-row journey does not look like a different component."}}}},u={name:"Edge case — never cost anything",args:{summary:"4 visits · 0 paid · blocks at 70",items:[{kind:"visit",id:"1",date:"Aug 30 · 11:02",source:"organic",score:4},{kind:"visit",id:"2",date:"Sep 2 · 16:40",source:"organic",score:4},{kind:"visit",id:"3",date:"Sep 6 · 10:18",source:"organic",score:2},{kind:"visit",id:"4",date:"Sep 9 · 19:55",source:"organic",score:2}]}},m={name:"Long journey — collapsed run, interactive",render:()=>{const[s,n]=I.useState(!1),t=Array.from({length:12},(y,r)=>({kind:"visit",id:`mid-${r}`,date:`Sep ${8+Math.floor(r/4)} · 1${r%6}:2${r%9}`,source:r%3===0?"paid":"organic",score:78+r%5,afterBlock:!0})),i=[{kind:"visit",id:"a",date:"Sep 6 · 02:11",source:"paid",score:18},{kind:"visit",id:"b",date:"Sep 6 · 08:30",source:"paid",score:34},{kind:"visit",id:"c",date:"Sep 7 · 05:02",source:"paid",score:64},{kind:"visit",id:"d",date:"Sep 7 · 11:44",source:"paid",score:78,crossed:!0},...s?t:[{kind:"gap",id:"gap",count:12,onExpand:()=>n(!0)}],{kind:"visit",id:"y",date:"Sep 11 · 22:10",source:"organic",score:96,afterBlock:!0},{kind:"visit",id:"z",date:"Sep 12 · 06:31",source:"organic",score:98,afterBlock:!0}];return e.jsxs("div",{className:"sb-stack",style:{maxWidth:512},children:[e.jsx(h,{items:i,summary:"18 visits · 9 paid · blocks at 70"}),e.jsx("p",{className:"sb-note",children:"A 40-visit click farm would bury the one row that matters. The timeline always keeps the first two visits, the visit that crossed the threshold with its immediate neighbours, and the two most recent — and folds the rest into a row-shaped button. Click it to expand."})]})}};var g,v,k;o.parameters={...o.parameters,docs:{...(g=o.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    items: shortJourney,
    summary: "5 visits · 4 paid · blocks at 70"
  }
}`,...(k=(v=o.parameters)==null?void 0:v.docs)==null?void 0:k.source}}};var f,j,_;d.parameters={...d.parameters,docs:{...(f=d.parameters)==null?void 0:f.docs,source:{originalSource:`{
  name: "Oldest first",
  args: {
    items: shortJourney,
    order: "oldest-first",
    summary: "5 visits · 4 paid · blocks at 70"
  },
  parameters: {
    docs: {
      description: {
        story: "The same journey in chronological order. Useful where the story of how suspicion built up matters more than the current state — an audit export, say. The header pill always states the order, because a reader assumes a timeline starts at the top."
      }
    }
  }
}`,...(_=(j=d.parameters)==null?void 0:j.docs)==null?void 0:_.source}}};var w,x,b;c.parameters={...c.parameters,docs:{...(w=c.parameters)==null?void 0:w.docs,source:{originalSource:`{
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
}`,...(b=(x=c.parameters)==null?void 0:x.docs)==null?void 0:b.source}}};var S,N,T;l.parameters={...l.parameters,docs:{...(S=l.parameters)==null?void 0:S.docs,source:{originalSource:`{
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
}`,...(T=(N=l.parameters)==null?void 0:N.docs)==null?void 0:T.source}}};var J,E,V;u.parameters={...u.parameters,docs:{...(J=u.parameters)==null?void 0:J.docs,source:{originalSource:`{
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
}`,...(V=(E=u.parameters)==null?void 0:E.docs)==null?void 0:V.source}}};var B,O,$;m.parameters={...m.parameters,docs:{...(B=m.parameters)==null?void 0:B.docs,source:{originalSource:`{
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
}`,...($=(O=m.parameters)==null?void 0:O.docs)==null?void 0:$.source}}};const G=["BlockedVisitor","OldestFirst","CleanVisitor","SingleVisit","OrganicOnly","LongJourneyCollapsed"];export{o as BlockedVisitor,c as CleanVisitor,m as LongJourneyCollapsed,d as OldestFirst,u as OrganicOnly,l as SingleVisit,G as __namedExportsOrder,K as default};
