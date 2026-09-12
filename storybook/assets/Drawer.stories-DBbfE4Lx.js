import{j as e}from"./jsx-runtime-DF2Pcvd1.js";import{r as d}from"./index-B2-qRKKC.js";import{c as j}from"./cx-DJxyWpib.js";import{I as C}from"./Icon-B6XEyylJ.js";import{B as l}from"./Button-Cq6t4pF2.js";import{S as N}from"./StatusPill-CmxwTPc2.js";import{V as B}from"./VerdictBox-BkUyjdzj.js";import{P as S}from"./PlatformSyncStatus-CngrLUb_.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./tokens-DxNgueAT.js";function t({open:r,onClose:n,header:s,footer:p,children:_,ariaLabel:m,closeOnEscape:u=!0,className:b}){const g=d.useRef(null);return d.useEffect(()=>{if(!r||!u)return;function a(k){k.key==="Escape"&&n()}return document.addEventListener("keydown",a),()=>document.removeEventListener("keydown",a)},[r,u,n]),d.useEffect(()=>{var a;r&&((a=g.current)==null||a.scrollTo({top:0}))},[r,m]),e.jsxs("aside",{className:j("cg-drawer",r&&"cg-drawer--open",b),role:"complementary","aria-label":m,"aria-hidden":!r,...r?{}:{inert:""},children:[s&&e.jsx("div",{className:"cg-drawer__header",children:s}),e.jsx("div",{className:"cg-drawer__body",ref:g,children:_}),p&&e.jsx("div",{className:"cg-drawer__footer",children:p})]})}function c({onClick:r}){return e.jsx("button",{type:"button",className:"cg-drawer__close","aria-label":"Close panel",onClick:r,children:e.jsx(C,{name:"close",size:"sm"})})}try{t.displayName="Drawer",t.__docgenInfo={description:"",displayName:"Drawer",props:{open:{defaultValue:null,description:"",name:"open",required:!0,type:{name:"boolean"}},onClose:{defaultValue:null,description:"",name:"onClose",required:!0,type:{name:"() => void"}},header:{defaultValue:null,description:"Rendered in the header, left of the close button.",name:"header",required:!1,type:{name:"ReactNode"}},footer:{defaultValue:null,description:"",name:"footer",required:!1,type:{name:"ReactNode"}},ariaLabel:{defaultValue:null,description:"",name:"ariaLabel",required:!0,type:{name:"string"}},closeOnEscape:{defaultValue:{value:"true"},description:"Set false to keep Escape from closing (e.g. a dialog is on top).",name:"closeOnEscape",required:!1,type:{name:"boolean"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}}}}}catch{}try{c.displayName="DrawerCloseButton",c.__docgenInfo={description:"",displayName:"DrawerCloseButton",props:{onClick:{defaultValue:null,description:"",name:"onClick",required:!0,type:{name:"() => void"}}}}}catch{}const P={title:"Primitives/Drawer",component:t,parameters:{layout:"fullscreen"}},o={render:()=>{const[r,n]=d.useState(!0);return e.jsxs("div",{style:{position:"relative",height:560,background:"var(--cg-surface-1)",borderRadius:"var(--cg-radius-lg)",overflow:"hidden",border:"1px solid var(--cg-border)"},children:[e.jsxs("div",{style:{padding:24},children:[e.jsx(l,{onClick:()=>n(s=>!s),children:r?"Close drawer":"Open drawer"}),e.jsxs("p",{className:"sb-note",children:["Escape closes. The panel slides rather than appearing, so the customer keeps hold of where it came from — and the table row it belongs to keeps its accent rail behind it. When closed it is marked ",e.jsx("code",{children:"inert"}),", which keeps a panel that is merely off-screen out of the tab order."]})]}),e.jsxs(t,{open:r,onClose:()=>n(!1),ariaLabel:"Visitor 185.220.101.42",header:e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"cg-drawer__heading",children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10,flexWrap:"wrap"},children:[e.jsx("span",{className:"cg-mono",style:{fontSize:"var(--cg-text-18)",fontWeight:500},children:"185.220.101.42"}),e.jsx(N,{status:"Blocked"})]}),e.jsx("div",{style:{fontSize:"var(--cg-text-13)",color:"var(--cg-text-secondary)",marginTop:6},children:"Datacenter · Frankfurt, Germany"}),e.jsx("div",{style:{fontSize:"var(--cg-text-12)",color:"var(--cg-text-muted)",marginTop:2},children:"Headless Chrome 128 on Linux · fingerprint shared with 3 other IPs"})]}),e.jsx(c,{onClick:()=>n(!1)})]}),footer:e.jsxs(e.Fragment,{children:[e.jsx(l,{onClick:()=>{},children:"Unblock visitor"}),e.jsx(l,{variant:"ghost",onClick:()=>{},children:"Report as mistake"}),e.jsx(S,{align:"end",className:"cg-drawer__sync",items:[{platform:"Google Ads",state:"synced"},{platform:"Meta Ads",state:"synced"}]})]}),children:[e.jsx("div",{className:"cg-drawer__inset",children:e.jsx(B,{status:"Blocked",title:"Blocked on Google Ads and Meta Ads · Sep 9, 14:32",children:"A datacenter server clicked your ads 4 times in 9 minutes, never scrolled, and never converted. That pattern doesn’t come from a person."})}),e.jsx("div",{className:"cg-drawer__section",children:e.jsx("p",{style:{color:"var(--cg-text-secondary)",margin:0},children:"Journey, evidence and spend sections follow here in the prototype."})})]})]})}},i={render:()=>e.jsxs("div",{style:{position:"relative",height:320,background:"var(--cg-surface-1)",borderRadius:"var(--cg-radius-lg)",overflow:"hidden",border:"1px solid var(--cg-border)"},children:[e.jsxs("div",{style:{padding:24,color:"var(--cg-text-secondary)"},children:["Closed state — the panel is parked at ",e.jsx("code",{children:"translateX(105%)"})," and inert."]}),e.jsx(t,{open:!1,onClose:()=>{},ariaLabel:"Closed drawer",children:e.jsx("div",{className:"cg-drawer__section",children:"Hidden"})})]})};var h,f,v;o.parameters={...o.parameters,docs:{...(h=o.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: () => {
    const [open, setOpen] = useState(true);
    return <div style={{
      position: "relative",
      height: 560,
      background: "var(--cg-surface-1)",
      borderRadius: "var(--cg-radius-lg)",
      overflow: "hidden",
      border: "1px solid var(--cg-border)"
    }}>\r
        <div style={{
        padding: 24
      }}>\r
          <Button onClick={() => setOpen(o => !o)}>\r
            {open ? "Close drawer" : "Open drawer"}\r
          </Button>\r
          <p className="sb-note">\r
            Escape closes. The panel slides rather than appearing, so the customer\r
            keeps hold of where it came from — and the table row it belongs to keeps\r
            its accent rail behind it. When closed it is marked <code>inert</code>,\r
            which keeps a panel that is merely off-screen out of the tab order.\r
          </p>\r
        </div>\r
\r
        <Drawer open={open} onClose={() => setOpen(false)} ariaLabel="Visitor 185.220.101.42" header={<>\r
              <div className="cg-drawer__heading">\r
                <div style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            flexWrap: "wrap"
          }}>\r
                  <span className="cg-mono" style={{
              fontSize: "var(--cg-text-18)",
              fontWeight: 500
            }}>\r
                    185.220.101.42\r
                  </span>\r
                  <StatusPill status="Blocked" />\r
                </div>\r
                <div style={{
            fontSize: "var(--cg-text-13)",
            color: "var(--cg-text-secondary)",
            marginTop: 6
          }}>\r
                  Datacenter · Frankfurt, Germany\r
                </div>\r
                <div style={{
            fontSize: "var(--cg-text-12)",
            color: "var(--cg-text-muted)",
            marginTop: 2
          }}>\r
                  Headless Chrome 128 on Linux · fingerprint shared with 3 other IPs\r
                </div>\r
              </div>\r
              <DrawerCloseButton onClick={() => setOpen(false)} />\r
            </>} footer={<>\r
              <Button onClick={() => {}}>Unblock visitor</Button>\r
              <Button variant="ghost" onClick={() => {}}>\r
                Report as mistake\r
              </Button>\r
              <PlatformSyncStatus align="end" className="cg-drawer__sync" items={[{
          platform: "Google Ads",
          state: "synced"
        }, {
          platform: "Meta Ads",
          state: "synced"
        }]} />\r
            </>}>\r
          <div className="cg-drawer__inset">\r
            <VerdictBox status="Blocked" title="Blocked on Google Ads and Meta Ads · Sep 9, 14:32">\r
              A datacenter server clicked your ads 4 times in 9 minutes, never\r
              scrolled, and never converted. That pattern doesn&rsquo;t come from a\r
              person.\r
            </VerdictBox>\r
          </div>\r
          <div className="cg-drawer__section">\r
            <p style={{
            color: "var(--cg-text-secondary)",
            margin: 0
          }}>\r
              Journey, evidence and spend sections follow here in the prototype.\r
            </p>\r
          </div>\r
        </Drawer>\r
      </div>;
  }
}`,...(v=(f=o.parameters)==null?void 0:f.docs)==null?void 0:v.source}}};var y,x,w;i.parameters={...i.parameters,docs:{...(y=i.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: () => <div style={{
    position: "relative",
    height: 320,
    background: "var(--cg-surface-1)",
    borderRadius: "var(--cg-radius-lg)",
    overflow: "hidden",
    border: "1px solid var(--cg-border)"
  }}>\r
      <div style={{
      padding: 24,
      color: "var(--cg-text-secondary)"
    }}>\r
        Closed state — the panel is parked at <code>translateX(105%)</code> and inert.\r
      </div>\r
      <Drawer open={false} onClose={() => {}} ariaLabel="Closed drawer">\r
        <div className="cg-drawer__section">Hidden</div>\r
      </Drawer>\r
    </div>
}`,...(w=(x=i.parameters)==null?void 0:x.docs)==null?void 0:w.source}}};const z=["VisitorDetail","Closed"];export{i as Closed,o as VisitorDetail,z as __namedExportsOrder,P as default};
