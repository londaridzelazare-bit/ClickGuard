import{j as e}from"./jsx-runtime-DF2Pcvd1.js";import{r as B}from"./index-B2-qRKKC.js";import{M as r,a as M}from"./Modal-q24Ziux5.js";import{B as n}from"./Button-DMpeJ588.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./cx-DJxyWpib.js";import"./Icon-4ZrsAClT.js";const D={title:"Primitives/Modal",component:r,parameters:{layout:"fullscreen",docs:{description:{component:"The shared dialog primitive. It owns the three behaviours every modal owes a keyboard user — focus moves in on open, Tab is trapped while it is open, and focus returns to whatever opened it on close. `ConfirmDialog` and `ReportDialog` are both thin compositions over this, so there is exactly one implementation to fix."}}}};function o({children:d}){return e.jsx("div",{style:{position:"relative",height:420,background:"var(--cg-surface-1)",border:"1px solid var(--cg-border)",borderRadius:"var(--cg-radius-lg)",overflow:"hidden"},children:d})}const s={render:()=>e.jsx(o,{children:e.jsx(r,{open:!0,onClose:()=>{},title:"Unblock 185.220.101.42?",footer:e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"Cancel"}),e.jsx(n,{variant:"primary",children:"Unblock visitor"})]}),children:"Your ads will show to this visitor again on Google Ads and Meta Ads. If it clicks, you pay for those clicks."})})},a={name:"Split footer",render:()=>e.jsx(o,{children:e.jsx(r,{open:!0,onClose:()=>{},size:"md",title:"Report a mistake",footerAlign:"split",footer:e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"sb-swatch__meta",children:"No reason needed"}),e.jsxs("span",{style:{display:"flex",gap:8},children:[e.jsx(n,{children:"Cancel"}),e.jsx(n,{variant:"primary",children:"Submit report"})]})]}),children:"Used when a modal needs a status or hint on the left of its actions."})})},i={name:"Success panel",render:()=>e.jsx(o,{children:e.jsx(r,{open:!0,onClose:()=>{},title:"Report a mistake",footer:e.jsx(n,{variant:"primary",children:"Done"}),children:e.jsx(M,{title:"Report sent",children:"Thanks — we’ll review this decision and use it to tune your account. Nothing changes for this visitor right now."})})})},l={name:"Focus trap and restoration",render:()=>{const[d,t]=B.useState(!1);return e.jsxs("div",{children:[e.jsxs("div",{style:{padding:24,display:"flex",gap:12},children:[e.jsx(n,{onClick:()=>t(!0),children:"Open the modal"}),e.jsx(n,{variant:"ghost",children:"A button that should not receive Tab"})]}),e.jsx(o,{children:e.jsx(r,{open:d,onClose:()=>t(!1),title:"Try tabbing",footer:e.jsxs(e.Fragment,{children:[e.jsx(n,{onClick:()=>t(!1),children:"Cancel"}),e.jsx(n,{variant:"primary",onClick:()=>t(!1),children:"Confirm"})]}),children:"Tab cycles between Cancel and Confirm and never reaches the page behind. Escape closes. Either way, focus returns to “Open the modal”."})})]})}},c={name:"Edge case — not dismissible",render:()=>e.jsx(o,{children:e.jsx(r,{open:!0,dismissible:!1,onClose:()=>{},title:"Syncing to Google Ads",footer:e.jsx(n,{variant:"primary",children:"Got it"}),children:"Escape and scrim clicks are ignored, so a flow that must be acknowledged cannot be dismissed by accident."})})};var p,u,m;s.parameters={...s.parameters,docs:{...(p=s.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: () => <Stage>\r
      <Modal open onClose={() => {}} title="Unblock 185.220.101.42?" footer={<>\r
            <Button>Cancel</Button>\r
            <Button variant="primary">Unblock visitor</Button>\r
          </>}>\r
        Your ads will show to this visitor again on Google Ads and Meta Ads. If it\r
        clicks, you pay for those clicks.\r
      </Modal>\r
    </Stage>
}`,...(m=(u=s.parameters)==null?void 0:u.docs)==null?void 0:m.source}}};var h,g,f;a.parameters={...a.parameters,docs:{...(h=a.parameters)==null?void 0:h.docs,source:{originalSource:`{
  name: "Split footer",
  render: () => <Stage>\r
      <Modal open onClose={() => {}} size="md" title="Report a mistake" footerAlign="split" footer={<>\r
            <span className="sb-swatch__meta">No reason needed</span>\r
            <span style={{
        display: "flex",
        gap: 8
      }}>\r
              <Button>Cancel</Button>\r
              <Button variant="primary">Submit report</Button>\r
            </span>\r
          </>}>\r
        Used when a modal needs a status or hint on the left of its actions.\r
      </Modal>\r
    </Stage>
}`,...(f=(g=a.parameters)==null?void 0:g.docs)==null?void 0:f.source}}};var v,b,x;i.parameters={...i.parameters,docs:{...(v=i.parameters)==null?void 0:v.docs,source:{originalSource:`{
  name: "Success panel",
  render: () => <Stage>\r
      <Modal open onClose={() => {}} title="Report a mistake" footer={<Button variant="primary">Done</Button>}>\r
        <ModalSuccess title="Report sent">\r
          Thanks — we&rsquo;ll review this decision and use it to tune your account.\r
          Nothing changes for this visitor right now.\r
        </ModalSuccess>\r
      </Modal>\r
    </Stage>
}`,...(x=(b=i.parameters)==null?void 0:b.docs)==null?void 0:x.source}}};var y,S,j;l.parameters={...l.parameters,docs:{...(y=l.parameters)==null?void 0:y.docs,source:{originalSource:`{
  name: "Focus trap and restoration",
  render: () => {
    const [open, setOpen] = useState(false);
    return <div>\r
        <div style={{
        padding: 24,
        display: "flex",
        gap: 12
      }}>\r
          <Button onClick={() => setOpen(true)}>Open the modal</Button>\r
          <Button variant="ghost">A button that should not receive Tab</Button>\r
        </div>\r
        <Stage>\r
          <Modal open={open} onClose={() => setOpen(false)} title="Try tabbing" footer={<>\r
                <Button onClick={() => setOpen(false)}>Cancel</Button>\r
                <Button variant="primary" onClick={() => setOpen(false)}>\r
                  Confirm\r
                </Button>\r
              </>}>\r
            Tab cycles between Cancel and Confirm and never reaches the page behind.\r
            Escape closes. Either way, focus returns to &ldquo;Open the modal&rdquo;.\r
          </Modal>\r
        </Stage>\r
      </div>;
  }
}`,...(j=(S=l.parameters)==null?void 0:S.docs)==null?void 0:j.source}}};var C,w,k;c.parameters={...c.parameters,docs:{...(C=c.parameters)==null?void 0:C.docs,source:{originalSource:`{
  name: "Edge case — not dismissible",
  render: () => <Stage>\r
      <Modal open dismissible={false} onClose={() => {}} title="Syncing to Google Ads" footer={<Button variant="primary">Got it</Button>}>\r
        Escape and scrim clicks are ignored, so a flow that must be acknowledged\r
        cannot be dismissed by accident.\r
      </Modal>\r
    </Stage>
}`,...(k=(w=c.parameters)==null?void 0:w.docs)==null?void 0:k.source}}};const G=["Basic","SplitFooter","Success","FocusBehaviour","NotDismissible"];export{s as Basic,l as FocusBehaviour,c as NotDismissible,a as SplitFooter,i as Success,G as __namedExportsOrder,D as default};
