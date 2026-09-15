import{j as e}from"./jsx-runtime-DF2Pcvd1.js";import{r as b}from"./index-B2-qRKKC.js";import{B as s}from"./Button-BhRfCGa_.js";import{M as U}from"./Modal-DPvEIXCo.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./cx-DJxyWpib.js";import"./Icon-C9i3uB6W.js";function o({open:n,title:a,children:v,confirmLabel:C,cancelLabel:x="Cancel",confirmVariant:j="primary",onConfirm:B,onCancel:c}){const d=b.useRef(null);return e.jsx(U,{open:n,onClose:c,title:a,initialFocusRef:d,footer:e.jsxs(e.Fragment,{children:[e.jsx(s,{variant:"secondary",onClick:c,children:x}),e.jsx(s,{ref:d,variant:j,onClick:B,children:C})]}),children:v})}try{o.displayName="ConfirmDialog",o.__docgenInfo={description:"A yes/no dialog. Thin composition over `Modal`, which owns the scrim, the\nfocus trap, Escape handling and focus restoration — this component only\ndecides what the two buttons say and which one is loud.",displayName:"ConfirmDialog",props:{open:{defaultValue:null,description:"",name:"open",required:!0,type:{name:"boolean"}},title:{defaultValue:null,description:"",name:"title",required:!0,type:{name:"ReactNode"}},confirmLabel:{defaultValue:null,description:"",name:"confirmLabel",required:!0,type:{name:"string"}},cancelLabel:{defaultValue:{value:"Cancel"},description:"",name:"cancelLabel",required:!1,type:{name:"string"}},confirmVariant:{defaultValue:{value:"primary"},description:"Solid ink by default. `danger` for anything that blocks or deletes.",name:"confirmVariant",required:!1,type:{name:"enum",value:[{value:'"danger"'},{value:'"secondary"'},{value:'"primary"'},{value:'"ghost"'},{value:'"link"'}]}},onConfirm:{defaultValue:null,description:"",name:"onConfirm",required:!0,type:{name:"() => void"}},onCancel:{defaultValue:null,description:"",name:"onCancel",required:!0,type:{name:"() => void"}}}}}catch{}const q={title:"Primitives/ConfirmDialog",component:o,parameters:{layout:"fullscreen"}};function l({children:n}){return e.jsx("div",{style:{position:"relative",height:420,background:"var(--cg-surface-1)",borderRadius:"var(--cg-radius-lg)",overflow:"hidden"},children:n})}const t={name:"Unblock — states the cost",render:()=>e.jsx(l,{children:e.jsx(o,{open:!0,title:e.jsxs(e.Fragment,{children:["Unblock ",e.jsx("span",{className:"cg-mono",children:"185.220.101.42"}),"?"]}),confirmLabel:"Unblock visitor",onConfirm:()=>{},onCancel:()=>{},children:"Your ads will show to this visitor again on Google Ads and Meta Ads. If it clicks, you pay for those clicks. We’ll keep watching and flag it if the pattern comes back, but we won’t block it again unless you ask."})}),parameters:{docs:{description:{story:"A confirm step that only asks 'are you sure?' transfers no information and buys no trust. This one names the platforms, says plainly that clicks will cost money again, and commits to what the product will do afterwards — so the customer is deciding rather than guessing."}}}},r={name:"Block now — danger variant",render:()=>e.jsx(l,{children:e.jsx(o,{open:!0,title:e.jsxs(e.Fragment,{children:["Block ",e.jsx("span",{className:"cg-mono",children:"77.111.246.19"})," now?"]}),confirmLabel:"Block now",confirmVariant:"danger",onConfirm:()=>{},onCancel:()=>{},children:"This visitor submitted your contact form on visit 4, so we were holding off. Blocking it now adds the IP to Google Ads and Meta Ads within a few minutes, and it will stop seeing your ads entirely. You can undo this at any time."})})},i={render:()=>{const[n,a]=b.useState(!1);return e.jsxs(l,{children:[e.jsxs("div",{style:{padding:24},children:[e.jsx(s,{onClick:()=>a(!0),children:"Unblock visitor"}),e.jsx("p",{className:"sb-note",children:"Escape cancels. The confirming button takes focus on open."})]}),e.jsx(o,{open:n,title:"Unblock this visitor?",confirmLabel:"Unblock visitor",onConfirm:()=>a(!1),onCancel:()=>a(!1),children:"Your ads will show to this visitor again. If it clicks, you pay for those clicks."})]})}};var m,u,p;t.parameters={...t.parameters,docs:{...(m=t.parameters)==null?void 0:m.docs,source:{originalSource:`{
  name: "Unblock — states the cost",
  render: () => <Stage>\r
      <ConfirmDialog open title={<>\r
            Unblock <span className="cg-mono">185.220.101.42</span>?\r
          </>} confirmLabel="Unblock visitor" onConfirm={() => {}} onCancel={() => {}}>\r
        Your ads will show to this visitor again on Google Ads and Meta Ads. If it\r
        clicks, you pay for those clicks. We&rsquo;ll keep watching and flag it if the\r
        pattern comes back, but we won&rsquo;t block it again unless you ask.\r
      </ConfirmDialog>\r
    </Stage>,
  parameters: {
    docs: {
      description: {
        story: "A confirm step that only asks 'are you sure?' transfers no information and buys no trust. This one names the platforms, says plainly that clicks will cost money again, and commits to what the product will do afterwards — so the customer is deciding rather than guessing."
      }
    }
  }
}`,...(p=(u=t.parameters)==null?void 0:u.docs)==null?void 0:p.source}}};var f,h,g;r.parameters={...r.parameters,docs:{...(f=r.parameters)==null?void 0:f.docs,source:{originalSource:`{
  name: "Block now — danger variant",
  render: () => <Stage>\r
      <ConfirmDialog open title={<>\r
            Block <span className="cg-mono">77.111.246.19</span> now?\r
          </>} confirmLabel="Block now" confirmVariant="danger" onConfirm={() => {}} onCancel={() => {}}>\r
        This visitor submitted your contact form on visit 4, so we were holding off.\r
        Blocking it now adds the IP to Google Ads and Meta Ads within a few minutes,\r
        and it will stop seeing your ads entirely. You can undo this at any time.\r
      </ConfirmDialog>\r
    </Stage>
}`,...(g=(h=r.parameters)==null?void 0:h.docs)==null?void 0:g.source}}};var y,k,w;i.parameters={...i.parameters,docs:{...(y=i.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: () => {
    const [open, setOpen] = useState(false);
    return <Stage>\r
        <div style={{
        padding: 24
      }}>\r
          <Button onClick={() => setOpen(true)}>Unblock visitor</Button>\r
          <p className="sb-note">Escape cancels. The confirming button takes focus on open.</p>\r
        </div>\r
        <ConfirmDialog open={open} title="Unblock this visitor?" confirmLabel="Unblock visitor" onConfirm={() => setOpen(false)} onCancel={() => setOpen(false)}>\r
          Your ads will show to this visitor again. If it clicks, you pay for those\r
          clicks.\r
        </ConfirmDialog>\r
      </Stage>;
  }
}`,...(w=(k=i.parameters)==null?void 0:k.docs)==null?void 0:w.source}}};const I=["Unblock","BlockNow","Interactive"];export{r as BlockNow,i as Interactive,t as Unblock,I as __namedExportsOrder,q as default};
