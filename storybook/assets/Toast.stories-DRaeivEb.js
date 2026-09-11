import{j as e}from"./jsx-runtime-DF2Pcvd1.js";import{r as y}from"./index-B2-qRKKC.js";import{c as d}from"./cx-DJxyWpib.js";import{B as f}from"./Button-CXnI-UZF.js";import"./_commonjsHelpers-Cpj98o6Y.js";function r({toasts:n,onDismiss:t,className:i}){return e.jsx("div",{className:d("cg-toast-region",i),role:"status","aria-live":"polite","aria-atomic":"false",children:n.map(s=>e.jsxs("div",{className:"cg-toast",children:[e.jsx("span",{className:d("cg-toast__dot",`cg-toast__dot--${s.tone??"neutral"}`),"aria-hidden":"true"}),e.jsx("span",{className:"cg-toast__message",children:s.message}),s.actionLabel&&s.onAction&&e.jsx("button",{type:"button",className:"cg-toast__action",onClick:s.onAction,children:s.actionLabel}),e.jsx("button",{type:"button",className:"cg-toast__dismiss","aria-label":"Dismiss notification",onClick:()=>t(s.id),children:"✕"})]},s.id))})}try{r.displayName="ToastRegion",r.__docgenInfo={description:"",displayName:"ToastRegion",props:{toasts:{defaultValue:null,description:"",name:"toasts",required:!0,type:{name:"ToastItem[]"}},onDismiss:{defaultValue:null,description:"",name:"onDismiss",required:!0,type:{name:"(id: string) => void"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}}}}}catch{}const j={title:"Primitives/Toast",component:r,parameters:{layout:"fullscreen"}};function b({toasts:n,onDismiss:t}){return e.jsx("div",{style:{position:"relative",height:260,background:"var(--cg-surface-1)",border:"1px solid var(--cg-border)",borderRadius:"var(--cg-radius-lg)",overflow:"hidden"},children:e.jsx(r,{toasts:n,onDismiss:t})})}const a={render:()=>e.jsx(b,{onDismiss:()=>{},toasts:[{id:"1",tone:"neutral",message:"185.220.101.42 unblocked. Removing from Google Ads and Meta Ads.",actionLabel:"Undo",onAction:()=>{}},{id:"2",tone:"danger",message:"77.111.246.19 blocked. Syncing to Google Ads and Meta Ads.",actionLabel:"Undo",onAction:()=>{}},{id:"3",tone:"success",message:"Retrying the Meta Ads sync."}]}),parameters:{docs:{description:{story:"Every action on this screen changes what an external ad platform does, which makes it slow to observe and awkward to reverse by hand. So the toast always carries Undo rather than a bare confirmation — the receipt and the way back are the same control."}}}},o={render:()=>{const[n,t]=y.useState([]),i=s=>t(c=>c.filter(v=>v.id!==s));return e.jsxs("div",{children:[e.jsx("div",{style:{padding:24},children:e.jsx(f,{onClick:()=>t(s=>[...s,{id:String(Date.now()),tone:"neutral",message:"185.220.101.42 unblocked.",actionLabel:"Undo",onAction:()=>t(c=>c.slice(0,-1))}]),children:"Unblock visitor"})}),e.jsx(b,{toasts:n,onDismiss:i})]})}};var l,m,u;a.parameters={...a.parameters,docs:{...(l=a.parameters)==null?void 0:l.docs,source:{originalSource:`{
  render: () => <Stage onDismiss={() => {}} toasts={[{
    id: "1",
    tone: "neutral",
    message: "185.220.101.42 unblocked. Removing from Google Ads and Meta Ads.",
    actionLabel: "Undo",
    onAction: () => {}
  }, {
    id: "2",
    tone: "danger",
    message: "77.111.246.19 blocked. Syncing to Google Ads and Meta Ads.",
    actionLabel: "Undo",
    onAction: () => {}
  }, {
    id: "3",
    tone: "success",
    message: "Retrying the Meta Ads sync."
  }]} />,
  parameters: {
    docs: {
      description: {
        story: "Every action on this screen changes what an external ad platform does, which makes it slow to observe and awkward to reverse by hand. So the toast always carries Undo rather than a bare confirmation — the receipt and the way back are the same control."
      }
    }
  }
}`,...(u=(m=a.parameters)==null?void 0:m.docs)==null?void 0:u.source}}};var g,p,h;o.parameters={...o.parameters,docs:{...(g=o.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: () => {
    const [toasts, setToasts] = useState<ToastItem[]>([]);
    const dismiss = (id: string) => setToasts(t => t.filter(x => x.id !== id));
    return <div>\r
        <div style={{
        padding: 24
      }}>\r
          <Button onClick={() => setToasts(t => [...t, {
          id: String(Date.now()),
          tone: "neutral",
          message: "185.220.101.42 unblocked.",
          actionLabel: "Undo",
          onAction: () => setToasts(cur => cur.slice(0, -1))
        }])}>\r
            Unblock visitor\r
          </Button>\r
        </div>\r
        <Stage toasts={toasts} onDismiss={dismiss} />\r
      </div>;
  }
}`,...(h=(p=o.parameters)==null?void 0:p.docs)==null?void 0:h.source}}};const S=["States","Interactive"];export{o as Interactive,a as States,S as __namedExportsOrder,j as default};
