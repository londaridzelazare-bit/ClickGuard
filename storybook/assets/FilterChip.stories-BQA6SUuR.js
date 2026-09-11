import{j as e}from"./jsx-runtime-DF2Pcvd1.js";import{r as f}from"./index-B2-qRKKC.js";import{c as x}from"./cx-DJxyWpib.js";import"./_commonjsHelpers-Cpj98o6Y.js";function t({active:r=!1,count:a,children:c,className:s,...l}){return e.jsxs("button",{type:"button","aria-pressed":r,className:x("cg-chip",s),...l,children:[c,a!==void 0&&e.jsx("span",{className:"cg-chip__count",children:a})]})}try{t.displayName="FilterChip",t.__docgenInfo={description:"",displayName:"FilterChip",props:{active:{defaultValue:{value:"false"},description:"",name:"active",required:!1,type:{name:"boolean"}},count:{defaultValue:null,description:`Optional matching-row count. Showing it turns the toolbar into a preview
of the result set, so the user can tell a filter is empty before clicking
it and landing on a blank table.`,name:"count",required:!1,type:{name:"number"}}}}}catch{}const F={title:"Primitives/FilterChip",component:t,args:{children:"Blocked",active:!1}},n={},i={render:()=>e.jsxs("div",{className:"sb-stack",children:[e.jsxs("div",{className:"sb-row",children:[e.jsx(t,{children:"Default"}),e.jsx(t,{active:!0,children:"Active"}),e.jsx(t,{disabled:!0,children:"Disabled"})]}),e.jsx("p",{className:"sb-note",children:"Active uses the accent role, never a status colour. A filter is a selection, not a verdict — if the “Blocked” chip turned red when you picked it, the toolbar would start making claims about the data instead of describing what you asked to see."})]})},o={render:()=>{const[r,a]=f.useState("All"),c={All:22,Blocked:8,Flagged:4,Clean:9};return e.jsxs("div",{className:"sb-stack",children:[e.jsxs("div",{className:"sb-row",children:[Object.entries(c).map(([s,l])=>e.jsx(t,{active:r===s,count:l,onClick:()=>a(s),children:s},s)),e.jsx(t,{count:0,disabled:!0,children:"Unblocked by you"})]}),e.jsx("p",{className:"sb-note",children:"Showing the matching count turns the toolbar into a preview of the result set, so a customer can see a filter is empty before clicking it and landing on a blank table. A zero-count chip is disabled rather than hidden — hiding it would make the option look like it does not exist."})]})}};var d,u,h;n.parameters={...n.parameters,docs:{...(d=n.parameters)==null?void 0:d.docs,source:{originalSource:"{}",...(h=(u=n.parameters)==null?void 0:u.docs)==null?void 0:h.source}}};var p,m,b;i.parameters={...i.parameters,docs:{...(p=i.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: () => <div className="sb-stack">\r
      <div className="sb-row">\r
        <FilterChip>Default</FilterChip>\r
        <FilterChip active>Active</FilterChip>\r
        <FilterChip disabled>Disabled</FilterChip>\r
      </div>\r
      <p className="sb-note">\r
        Active uses the accent role, never a status colour. A filter is a\r
        selection, not a verdict — if the &ldquo;Blocked&rdquo; chip turned red when\r
        you picked it, the toolbar would start making claims about the data instead\r
        of describing what you asked to see.\r
      </p>\r
    </div>
}`,...(b=(m=i.parameters)==null?void 0:m.docs)==null?void 0:b.source}}};var g,v,k;o.parameters={...o.parameters,docs:{...(g=o.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: () => {
    const [status, setStatus] = useState("All");
    const counts: Record<string, number> = {
      All: 22,
      Blocked: 8,
      Flagged: 4,
      Clean: 9
    };
    return <div className="sb-stack">\r
        <div className="sb-row">\r
          {Object.entries(counts).map(([label, count]) => <FilterChip key={label} active={status === label} count={count} onClick={() => setStatus(label)}>\r
              {label}\r
            </FilterChip>)}\r
          <FilterChip count={0} disabled>\r
            Unblocked by you\r
          </FilterChip>\r
        </div>\r
        <p className="sb-note">\r
          Showing the matching count turns the toolbar into a preview of the result\r
          set, so a customer can see a filter is empty before clicking it and landing\r
          on a blank table. A zero-count chip is disabled rather than hidden —\r
          hiding it would make the option look like it does not exist.\r
        </p>\r
      </div>;
  }
}`,...(k=(v=o.parameters)==null?void 0:v.docs)==null?void 0:k.source}}};const N=["Playground","States","WithCounts"];export{n as Playground,i as States,o as WithCounts,N as __namedExportsOrder,F as default};
