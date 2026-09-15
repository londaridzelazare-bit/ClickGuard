import{j as e}from"./jsx-runtime-DF2Pcvd1.js";import{r as g}from"./index-B2-qRKKC.js";import{P as d}from"./Pagination-BOGBHBTr.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./cx-DJxyWpib.js";import"./Icon-C9i3uB6W.js";const G={title:"Primitives/Pagination",component:d,parameters:{layout:"padded",docs:{description:{component:"Range label, rows-per-page, and page buttons. The current page uses the system's one selection treatment — solid ink, like a checked checkbox or an active filter. Beyond seven pages it shows the first, the last and a window around the current page, so the control never grows wider than about nine slots."}}}};function I({children:a}){return e.jsx("div",{style:{maxWidth:820,padding:"var(--cg-space-10) var(--cg-space-16)",background:"var(--cg-surface-1)",border:"1px solid var(--cg-border)",borderRadius:"var(--cg-radius-lg)",display:"flex"},children:a})}function t({total:a,initialPage:p=1,initialSize:N=10}){const[L,l]=g.useState(p),[C,M]=g.useState(N);return e.jsx(I,{children:e.jsx(d,{page:L,pageSize:C,total:a,onPageChange:l,pageSizeOptions:[10,25,50],onPageSizeChange:R=>{M(R),l(1)},itemLabel:"visitors"})})}const s={name:"Two pages — the prototype's default view",render:()=>e.jsx(t,{total:16})},r={name:"Many pages — gaps keep it compact",render:()=>e.jsxs("div",{className:"sb-stack",style:{maxWidth:"none"},children:[e.jsx(t,{total:480,initialPage:12}),e.jsx("p",{className:"sb-note",children:"Forty-eight pages at 10 rows. The first and last pages are always one click away; the current page sits in a window of its neighbours, and everything else collapses into an ellipsis. Step through to the ends to see the window widen so the control keeps a steady width."})]})},n={name:"Edge case — first page (Previous disabled)",render:()=>e.jsx(t,{total:120,initialPage:1})},o={name:"Edge case — last page (Next disabled, short final page)",render:()=>e.jsx(t,{total:123,initialPage:13})},i={name:"Edge case — everything fits on one page",render:()=>e.jsx(t,{total:7})},c={name:"Without the rows-per-page control",render:()=>{const[a,p]=g.useState(2);return e.jsx(I,{children:e.jsx(d,{page:a,pageSize:10,total:42,onPageChange:p,itemLabel:"reports"})})}};var m,h,u;s.parameters={...s.parameters,docs:{...(m=s.parameters)==null?void 0:m.docs,source:{originalSource:`{
  name: "Two pages — the prototype's default view",
  render: () => <Interactive total={16} />
}`,...(u=(h=s.parameters)==null?void 0:h.docs)==null?void 0:u.source}}};var P,w,v;r.parameters={...r.parameters,docs:{...(P=r.parameters)==null?void 0:P.docs,source:{originalSource:`{
  name: "Many pages — gaps keep it compact",
  render: () => <div className="sb-stack" style={{
    maxWidth: "none"
  }}>\r
      <Interactive total={480} initialPage={12} />\r
      <p className="sb-note">\r
        Forty-eight pages at 10 rows. The first and last pages are always one click\r
        away; the current page sits in a window of its neighbours, and everything\r
        else collapses into an ellipsis. Step through to the ends to see the window\r
        widen so the control keeps a steady width.\r
      </p>\r
    </div>
}`,...(v=(w=r.parameters)==null?void 0:w.docs)==null?void 0:v.source}}};var x,y,f;n.parameters={...n.parameters,docs:{...(x=n.parameters)==null?void 0:x.docs,source:{originalSource:`{
  name: "Edge case — first page (Previous disabled)",
  render: () => <Interactive total={120} initialPage={1} />
}`,...(f=(y=n.parameters)==null?void 0:y.docs)==null?void 0:f.source}}};var S,b,j;o.parameters={...o.parameters,docs:{...(S=o.parameters)==null?void 0:S.docs,source:{originalSource:`{
  name: "Edge case — last page (Next disabled, short final page)",
  render: () => <Interactive total={123} initialPage={13} />
}`,...(j=(b=o.parameters)==null?void 0:b.docs)==null?void 0:j.source}}};var k,z,E;i.parameters={...i.parameters,docs:{...(k=i.parameters)==null?void 0:k.docs,source:{originalSource:`{
  name: "Edge case — everything fits on one page",
  render: () => <Interactive total={7} />
}`,...(E=(z=i.parameters)==null?void 0:z.docs)==null?void 0:E.source}}};var F,T,W;c.parameters={...c.parameters,docs:{...(F=c.parameters)==null?void 0:F.docs,source:{originalSource:`{
  name: "Without the rows-per-page control",
  render: () => {
    const [page, setPage] = useState(2);
    return <Frame>\r
        <Pagination page={page} pageSize={10} total={42} onPageChange={setPage} itemLabel="reports" />\r
      </Frame>;
  }
}`,...(W=(T=c.parameters)==null?void 0:T.docs)==null?void 0:W.source}}};const H=["TwoPages","ManyPages","FirstPage","LastPage","SinglePage","WithoutPageSize"];export{n as FirstPage,o as LastPage,r as ManyPages,i as SinglePage,s as TwoPages,c as WithoutPageSize,H as __namedExportsOrder,G as default};
