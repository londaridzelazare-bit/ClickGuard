import{j as e}from"./jsx-runtime-DF2Pcvd1.js";import{V as t}from"./VerdictBox-BkUyjdzj.js";import"./index-B2-qRKKC.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./cx-DJxyWpib.js";import"./tokens-DxNgueAT.js";const N={title:"Threat monitoring/VerdictBox",component:t,parameters:{layout:"padded",docs:{description:{component:"The first thing in the drawer and the most important component in the product. It answers *why* in one sentence of plain English before any evidence is shown. Rules: name the behaviour, not the score; say what a normal visitor does instead; never use the words *risk*, *anomaly*, *heuristic* or *confidence*."}}}},s={render:()=>e.jsx("div",{style:{maxWidth:512},children:e.jsx(t,{status:"Blocked",title:"Blocked on Google Ads and Meta Ads · Sep 9, 14:32",children:"A datacenter server clicked your ads 4 times in 9 minutes, never scrolled, and never converted. That pattern doesn’t come from a person."})})},r={render:()=>e.jsx("div",{style:{maxWidth:512},children:e.jsx(t,{status:"Flagged",title:"Flagged, not blocked · Watching since Sep 10",children:"Looks like repeat clicking, but it filled in your contact form on visit 4. We’re holding off until we see one more paid click without a real action."})})},n={render:()=>e.jsx("div",{style:{maxWidth:512},children:e.jsx(t,{status:"Clean",title:"Clean · Nothing to block",children:"One ad click, two minutes on pricing, back the next day from search. That’s what a real prospect looks like."})})},o={render:()=>e.jsx("div",{style:{maxWidth:512},children:e.jsx(t,{status:"Unblocked by you",title:"Unblocked by you · Sep 8, 11:20",children:"We’re still watching, but won’t block it again unless you ask."})})},a={name:"With a note — admitting a failure",render:()=>e.jsxs("div",{className:"sb-stack",style:{maxWidth:512},children:[e.jsx(t,{status:"Blocked",title:"Blocked on Google Ads and Meta Ads · Sep 10, 08:14",note:"Google Ads hasn't confirmed the block yet. 8 paid clicks came through while we waited; Meta Ads has been blocking since Sep 10.",children:"A mobile connection in Lagos clicked the same two campaigns 14 times over 4 days, in sessions under 3 seconds. Six other IPs share this phone’s fingerprint. That’s a click farm, not a customer."}),e.jsx("p",{className:"sb-note",children:"The note is where the product says something went wrong. It sits inside the verdict rather than in a separate banner, because a caveat the user has to hunt for reads as a caveat the product tried to hide. Counter-intuitively this is the state that earns the most trust: a tool that reports its own failures is a tool you can believe when it reports success."})]})},i={name:"Edge case — long sentence",render:()=>e.jsx("div",{style:{maxWidth:512},children:e.jsx(t,{status:"Flagged",title:"Flagged, not blocked · Watching since Aug 28",children:"This device shows up under three different IPs, which usually means someone is hiding where they are. But it browses like a person: long sessions, several pages, no burst of clicks, and it has never clicked two ads in the same hour. We need a clearer signal before blocking, because blocking a real customer costs you more than one wasted click does."})})};var c,d,l;s.parameters={...s.parameters,docs:{...(c=s.parameters)==null?void 0:c.docs,source:{originalSource:`{
  render: () => <div style={{
    maxWidth: 512
  }}>\r
      <VerdictBox status="Blocked" title="Blocked on Google Ads and Meta Ads · Sep 9, 14:32">\r
        A datacenter server clicked your ads 4 times in 9 minutes, never scrolled, and\r
        never converted. That pattern doesn&rsquo;t come from a person.\r
      </VerdictBox>\r
    </div>
}`,...(l=(d=s.parameters)==null?void 0:d.docs)==null?void 0:l.source}}};var h,u,m;r.parameters={...r.parameters,docs:{...(h=r.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: () => <div style={{
    maxWidth: 512
  }}>\r
      <VerdictBox status="Flagged" title="Flagged, not blocked · Watching since Sep 10">\r
        Looks like repeat clicking, but it filled in your contact form on visit 4.\r
        We&rsquo;re holding off until we see one more paid click without a real action.\r
      </VerdictBox>\r
    </div>
}`,...(m=(u=r.parameters)==null?void 0:u.docs)==null?void 0:m.source}}};var p,g,k;n.parameters={...n.parameters,docs:{...(p=n.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: () => <div style={{
    maxWidth: 512
  }}>\r
      <VerdictBox status="Clean" title="Clean · Nothing to block">\r
        One ad click, two minutes on pricing, back the next day from search.\r
        That&rsquo;s what a real prospect looks like.\r
      </VerdictBox>\r
    </div>
}`,...(k=(g=n.parameters)==null?void 0:g.docs)==null?void 0:k.source}}};var b,y,v;o.parameters={...o.parameters,docs:{...(b=o.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: () => <div style={{
    maxWidth: 512
  }}>\r
      <VerdictBox status="Unblocked by you" title="Unblocked by you · Sep 8, 11:20">\r
        We&rsquo;re still watching, but won&rsquo;t block it again unless you ask.\r
      </VerdictBox>\r
    </div>
}`,...(v=(y=o.parameters)==null?void 0:y.docs)==null?void 0:v.source}}};var w,x,f;a.parameters={...a.parameters,docs:{...(w=a.parameters)==null?void 0:w.docs,source:{originalSource:`{
  name: "With a note — admitting a failure",
  render: () => <div className="sb-stack" style={{
    maxWidth: 512
  }}>\r
      <VerdictBox status="Blocked" title="Blocked on Google Ads and Meta Ads · Sep 10, 08:14" note="Google Ads hasn't confirmed the block yet. 8 paid clicks came through while we waited; Meta Ads has been blocking since Sep 10.">\r
        A mobile connection in Lagos clicked the same two campaigns 14 times over 4\r
        days, in sessions under 3 seconds. Six other IPs share this phone&rsquo;s\r
        fingerprint. That&rsquo;s a click farm, not a customer.\r
      </VerdictBox>\r
      <p className="sb-note">\r
        The note is where the product says something went wrong. It sits inside the\r
        verdict rather than in a separate banner, because a caveat the user has to\r
        hunt for reads as a caveat the product tried to hide. Counter-intuitively\r
        this is the state that earns the most trust: a tool that reports its own\r
        failures is a tool you can believe when it reports success.\r
      </p>\r
    </div>
}`,...(f=(x=a.parameters)==null?void 0:x.docs)==null?void 0:f.source}}};var B,W,S;i.parameters={...i.parameters,docs:{...(B=i.parameters)==null?void 0:B.docs,source:{originalSource:`{
  name: "Edge case — long sentence",
  render: () => <div style={{
    maxWidth: 512
  }}>\r
      <VerdictBox status="Flagged" title="Flagged, not blocked · Watching since Aug 28">\r
        This device shows up under three different IPs, which usually means someone is\r
        hiding where they are. But it browses like a person: long sessions, several\r
        pages, no burst of clicks, and it has never clicked two ads in the same hour.\r
        We need a clearer signal before blocking, because blocking a real customer\r
        costs you more than one wasted click does.\r
      </VerdictBox>\r
    </div>
}`,...(S=(W=i.parameters)==null?void 0:W.docs)==null?void 0:S.source}}};const q=["Blocked","Flagged","Clean","Unblocked","WithSyncNote","LongSentence"];export{s as Blocked,n as Clean,r as Flagged,i as LongSentence,o as Unblocked,a as WithSyncNote,q as __namedExportsOrder,N as default};
