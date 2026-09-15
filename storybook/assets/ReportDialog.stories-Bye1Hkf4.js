import{j as e}from"./jsx-runtime-DF2Pcvd1.js";import{r as n}from"./index-B2-qRKKC.js";import{B as u}from"./Button-DMpeJ588.js";import{M as v,a as I}from"./Modal-q24Ziux5.js";import{T as M}from"./TextArea-DSD0HlVV.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./cx-DJxyWpib.js";import"./Icon-4ZrsAClT.js";function s({open:t,subject:r,subjectLabel:o="Reporting",onSubmit:p,onClose:a,title:i="Report a mistake",intro:L="Tell us we got this one wrong. We review every report and use it to tune the rules on your account.",reasonLabel:V="What did we get wrong?",reasonHint:q="A sentence is plenty. You can also send this empty — we'll still review the decision.",placeholder:C="e.g. This is our office VPN, not a bot.",submitLabel:A="Submit report",cancelLabel:B="Cancel",successTitle:O="Report sent",successBody:D="Thanks — we'll review this decision and use it to tune your account. Nothing changes for this visitor right now.",initialPhase:m="form"}){const[h,f]=n.useState(""),[E,b]=n.useState(m),y=n.useRef(null);n.useEffect(()=>{t&&(f(""),b(m))},[t,m,r]);function F(){p(h.trim()),b("sent")}return E==="sent"?e.jsx(v,{open:t,onClose:a,title:i,footer:e.jsx(u,{variant:"primary",onClick:a,children:"Done"}),children:e.jsx(I,{title:O,children:D})}):e.jsxs(v,{open:t,onClose:a,title:i,size:"md",initialFocusRef:y,footerAlign:"split",footer:e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"cg-report__note",children:h.trim()?"Reason included":"No reason needed"}),e.jsxs("span",{style:{display:"flex",gap:"var(--cg-space-8)"},children:[e.jsx(u,{onClick:a,children:B}),e.jsx(u,{variant:"primary",onClick:F,children:A})]})]}),children:[e.jsxs("div",{className:"cg-report__subject",children:[e.jsx("span",{className:"cg-report__subject-label",children:o}),e.jsx("span",{className:"cg-report__subject-value",children:r})]}),e.jsx("p",{className:"cg-report__intro",children:L}),e.jsx(M,{ref:y,label:V,optional:!0,hint:q,value:h,onValueChange:f,placeholder:C,maxLength:400,rows:4})]})}try{s.displayName="ReportDialog",s.__docgenInfo={description:`"Report a mistake" — a one-field form in a modal.

The reason is genuinely optional and there is no separate "skip" path:
Submit is always enabled, and sending an empty reason is a valid report.
A disabled Submit would turn a goodwill gesture into a chore, and most
useful signal here is simply *that* a customer disagreed, not why.

Focus trapping, Escape and focus restoration come from \`Modal\`.`,displayName:"ReportDialog",props:{open:{defaultValue:null,description:"",name:"open",required:!0,type:{name:"boolean"}},subject:{defaultValue:null,description:"The thing being reported — rendered so the user can confirm the target.",name:"subject",required:!0,type:{name:"ReactNode"}},subjectLabel:{defaultValue:{value:"Reporting"},description:"",name:"subjectLabel",required:!1,type:{name:"string"}},onSubmit:{defaultValue:null,description:"Receives the trimmed reason, which may be an empty string.",name:"onSubmit",required:!0,type:{name:"(reason: string) => void"}},onClose:{defaultValue:null,description:"",name:"onClose",required:!0,type:{name:"() => void"}},title:{defaultValue:{value:"Report a mistake"},description:"",name:"title",required:!1,type:{name:"string"}},intro:{defaultValue:{value:"Tell us we got this one wrong. We review every report and use it to tune the rules on your account."},description:"",name:"intro",required:!1,type:{name:"ReactNode"}},reasonLabel:{defaultValue:{value:"What did we get wrong?"},description:"",name:"reasonLabel",required:!1,type:{name:"string"}},reasonHint:{defaultValue:{value:"A sentence is plenty. You can also send this empty — we'll still review the decision."},description:"",name:"reasonHint",required:!1,type:{name:"ReactNode"}},placeholder:{defaultValue:{value:"e.g. This is our office VPN, not a bot."},description:"",name:"placeholder",required:!1,type:{name:"string"}},submitLabel:{defaultValue:{value:"Submit report"},description:"",name:"submitLabel",required:!1,type:{name:"string"}},cancelLabel:{defaultValue:{value:"Cancel"},description:"",name:"cancelLabel",required:!1,type:{name:"string"}},successTitle:{defaultValue:{value:"Report sent"},description:"",name:"successTitle",required:!1,type:{name:"string"}},successBody:{defaultValue:{value:"Thanks — we'll review this decision and use it to tune your account. Nothing changes for this visitor right now."},description:"",name:"successBody",required:!1,type:{name:"ReactNode"}},initialPhase:{defaultValue:{value:"form"},description:"Storybook uses this to document the confirmation state directly.",name:"initialPhase",required:!1,type:{name:"enum",value:[{value:'"form"'},{value:'"sent"'}]}}}}}catch{}const K={title:"Threat monitoring/ReportDialog",component:s,parameters:{layout:"fullscreen",docs:{description:{component:"The reason field is genuinely optional and there is no separate 'skip' path: Submit is always enabled, and an empty reason is a valid report. A disabled Submit would turn a goodwill gesture into a chore — and the most useful signal here is *that* a customer disagreed, not why."}}}};function g({children:t}){return e.jsx("div",{style:{position:"relative",height:560,background:"var(--cg-surface-1)",border:"1px solid var(--cg-border)",borderRadius:"var(--cg-radius-lg)",overflow:"hidden"},children:t})}const l={name:"Open — empty reason",render:()=>e.jsx(g,{children:e.jsx(s,{open:!0,subject:"185.220.101.42",subjectLabel:"Blocked · Automated traffic",onSubmit:()=>{},onClose:()=>{}})})},c={name:"Submitted — success confirmation",render:()=>e.jsx(g,{children:e.jsx(s,{open:!0,initialPhase:"sent",subject:"185.220.101.42",subjectLabel:"Blocked · Automated traffic",onSubmit:()=>{},onClose:()=>{}})}),parameters:{docs:{description:{story:"The confirmation replaces the form in place, so it lands where the user is already looking rather than in a toast they may miss. The prototype also raises a toast, but this panel is the primary receipt."}}}},d={name:"Interactive — keyboard and focus",render:()=>{const[t,r]=n.useState(!1),[o,p]=n.useState([]);return e.jsxs("div",{children:[e.jsxs("div",{style:{padding:24,display:"flex",gap:12,alignItems:"center"},children:[e.jsx(u,{onClick:()=>r(!0),children:"Report a mistake"}),e.jsx("span",{className:"sb-swatch__meta",children:o.length?o[o.length-1]:"nothing submitted yet"})]}),e.jsx(g,{children:e.jsx(s,{open:t,subject:"77.111.246.19",subjectLabel:"Flagged · Repeat clicks, but converted",onSubmit:a=>p(i=>[...i,a?`submitted with: "${a}"`:"submitted with no reason"]),onClose:()=>r(!1)})}),e.jsxs("p",{className:"sb-note",style:{padding:"0 24px"},children:["Opening moves focus into the reason field. Tab cycles inside the dialog and cannot escape it. Escape closes without submitting, and focus returns to the button that opened it — all of which come from the shared"," ",e.jsx("code",{children:"Modal"})," primitive rather than being re-implemented here."]})]})}};var j,w,x;l.parameters={...l.parameters,docs:{...(j=l.parameters)==null?void 0:j.docs,source:{originalSource:`{
  name: "Open — empty reason",
  render: () => <Stage>\r
      <ReportDialog open subject="185.220.101.42" subjectLabel="Blocked · Automated traffic" onSubmit={() => {}} onClose={() => {}} />\r
    </Stage>
}`,...(x=(w=l.parameters)==null?void 0:w.docs)==null?void 0:x.source}}};var S,R,k;c.parameters={...c.parameters,docs:{...(S=c.parameters)==null?void 0:S.docs,source:{originalSource:`{
  name: "Submitted — success confirmation",
  render: () => <Stage>\r
      <ReportDialog open initialPhase="sent" subject="185.220.101.42" subjectLabel="Blocked · Automated traffic" onSubmit={() => {}} onClose={() => {}} />\r
    </Stage>,
  parameters: {
    docs: {
      description: {
        story: "The confirmation replaces the form in place, so it lands where the user is already looking rather than in a toast they may miss. The prototype also raises a toast, but this panel is the primary receipt."
      }
    }
  }
}`,...(k=(R=c.parameters)==null?void 0:R.docs)==null?void 0:k.source}}};var _,N,T;d.parameters={...d.parameters,docs:{...(_=d.parameters)==null?void 0:_.docs,source:{originalSource:`{
  name: "Interactive — keyboard and focus",
  render: () => {
    const [open, setOpen] = useState(false);
    const [log, setLog] = useState<string[]>([]);
    return <div>\r
        <div style={{
        padding: 24,
        display: "flex",
        gap: 12,
        alignItems: "center"
      }}>\r
          <Button onClick={() => setOpen(true)}>Report a mistake</Button>\r
          <span className="sb-swatch__meta">\r
            {log.length ? log[log.length - 1] : "nothing submitted yet"}\r
          </span>\r
        </div>\r
        <Stage>\r
          <ReportDialog open={open} subject="77.111.246.19" subjectLabel="Flagged · Repeat clicks, but converted" onSubmit={reason => setLog(l => [...l, reason ? \`submitted with: "\${reason}"\` : "submitted with no reason"])} onClose={() => setOpen(false)} />\r
        </Stage>\r
        <p className="sb-note" style={{
        padding: "0 24px"
      }}>\r
          Opening moves focus into the reason field. Tab cycles inside the dialog and\r
          cannot escape it. Escape closes without submitting, and focus returns to the\r
          button that opened it — all of which come from the shared{" "}\r
          <code>Modal</code> primitive rather than being re-implemented here.\r
        </p>\r
      </div>;
  }
}`,...(T=(N=d.parameters)==null?void 0:N.docs)==null?void 0:T.source}}};const Q=["Form","Submitted","Interactive"];export{l as Form,d as Interactive,c as Submitted,Q as __namedExportsOrder,K as default};
