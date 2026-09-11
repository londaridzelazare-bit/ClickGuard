import{j as e}from"./jsx-runtime-DF2Pcvd1.js";import{r as c}from"./index-B2-qRKKC.js";import{B as d}from"./Button-Cq6t4pF2.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./cx-DJxyWpib.js";function a({open:n,title:o,children:j,confirmLabel:N,cancelLabel:_="Cancel",confirmVariant:B="primary",onConfirm:U,onCancel:r}){const m=c.useRef(null);return c.useEffect(()=>{var p;if(!n)return;(p=m.current)==null||p.focus();function t(f){f.key==="Escape"&&(f.stopPropagation(),r())}return document.addEventListener("keydown",t,!0),()=>document.removeEventListener("keydown",t,!0)},[n,r]),n?e.jsx("div",{className:"cg-scrim",onClick:r,role:"presentation",children:e.jsxs("div",{className:"cg-dialog",role:"alertdialog","aria-modal":"true","aria-label":typeof o=="string"?o:void 0,onClick:t=>t.stopPropagation(),children:[e.jsx("h2",{className:"cg-dialog__title",children:o}),e.jsx("div",{className:"cg-dialog__body",children:j}),e.jsxs("div",{className:"cg-dialog__actions",children:[e.jsx(d,{variant:"secondary",onClick:r,children:_}),e.jsx(d,{ref:m,variant:B,onClick:U,children:N})]})]})}):null}try{a.displayName="ConfirmDialog",a.__docgenInfo={description:"",displayName:"ConfirmDialog",props:{open:{defaultValue:null,description:"",name:"open",required:!0,type:{name:"boolean"}},title:{defaultValue:null,description:"",name:"title",required:!0,type:{name:"ReactNode"}},confirmLabel:{defaultValue:null,description:"",name:"confirmLabel",required:!0,type:{name:"string"}},cancelLabel:{defaultValue:{value:"Cancel"},description:"",name:"cancelLabel",required:!1,type:{name:"string"}},confirmVariant:{defaultValue:{value:"primary"},description:"Solid ink by default. `danger` for anything that blocks or deletes.",name:"confirmVariant",required:!1,type:{name:"enum",value:[{value:'"secondary"'},{value:'"primary"'},{value:'"danger"'},{value:'"ghost"'},{value:'"link"'}]}},onConfirm:{defaultValue:null,description:"",name:"onConfirm",required:!0,type:{name:"() => void"}},onCancel:{defaultValue:null,description:"",name:"onCancel",required:!0,type:{name:"() => void"}}}}}catch{}const q={title:"Primitives/ConfirmDialog",component:a,parameters:{layout:"fullscreen"}};function u({children:n}){return e.jsx("div",{style:{position:"relative",height:420,background:"var(--cg-surface-1)",borderRadius:"var(--cg-radius-lg)",overflow:"hidden"},children:n})}const i={name:"Unblock — states the cost",render:()=>e.jsx(u,{children:e.jsx(a,{open:!0,title:e.jsxs(e.Fragment,{children:["Unblock ",e.jsx("span",{className:"cg-mono",children:"185.220.101.42"}),"?"]}),confirmLabel:"Unblock visitor",onConfirm:()=>{},onCancel:()=>{},children:"Your ads will show to this visitor again on Google Ads and Meta Ads. If it clicks, you pay for those clicks. We’ll keep watching and flag it if the pattern comes back, but we won’t block it again unless you ask."})}),parameters:{docs:{description:{story:"A confirm step that only asks 'are you sure?' transfers no information and buys no trust. This one names the platforms, says plainly that clicks will cost money again, and commits to what the product will do afterwards — so the customer is deciding rather than guessing."}}}},s={name:"Block now — danger variant",render:()=>e.jsx(u,{children:e.jsx(a,{open:!0,title:e.jsxs(e.Fragment,{children:["Block ",e.jsx("span",{className:"cg-mono",children:"77.111.246.19"})," now?"]}),confirmLabel:"Block now",confirmVariant:"danger",onConfirm:()=>{},onCancel:()=>{},children:"This visitor submitted your contact form on visit 4, so we were holding off. Blocking it now adds the IP to Google Ads and Meta Ads within a few minutes, and it will stop seeing your ads entirely. You can undo this at any time."})})},l={render:()=>{const[n,o]=c.useState(!1);return e.jsxs(u,{children:[e.jsxs("div",{style:{padding:24},children:[e.jsx(d,{onClick:()=>o(!0),children:"Unblock visitor"}),e.jsx("p",{className:"sb-note",children:"Escape cancels. The confirming button takes focus on open."})]}),e.jsx(a,{open:n,title:"Unblock this visitor?",confirmLabel:"Unblock visitor",onConfirm:()=>o(!1),onCancel:()=>o(!1),children:"Your ads will show to this visitor again. If it clicks, you pay for those clicks."})]})}};var g,h,y;i.parameters={...i.parameters,docs:{...(g=i.parameters)==null?void 0:g.docs,source:{originalSource:`{
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
}`,...(y=(h=i.parameters)==null?void 0:h.docs)==null?void 0:y.source}}};var k,v,w;s.parameters={...s.parameters,docs:{...(k=s.parameters)==null?void 0:k.docs,source:{originalSource:`{
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
}`,...(w=(v=s.parameters)==null?void 0:v.docs)==null?void 0:w.source}}};var b,C,x;l.parameters={...l.parameters,docs:{...(b=l.parameters)==null?void 0:b.docs,source:{originalSource:`{
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
}`,...(x=(C=l.parameters)==null?void 0:C.docs)==null?void 0:x.source}}};const E=["Unblock","BlockNow","Interactive"];export{s as BlockNow,l as Interactive,i as Unblock,E as __namedExportsOrder,q as default};
