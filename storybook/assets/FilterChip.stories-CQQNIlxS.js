import{j as e}from"./jsx-runtime-DF2Pcvd1.js";import{r as w}from"./index-B2-qRKKC.js";import{c as j}from"./cx-DJxyWpib.js";import{C as N}from"./Checkbox-Ba_ZfiGZ.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./Icon-B6XEyylJ.js";function t({active:n=!1,count:a,children:l,className:s,...d}){return e.jsxs("button",{type:"button","aria-pressed":n,className:j("cg-chip",s),...d,children:[l,a!==void 0&&e.jsx("span",{className:"cg-chip__count",children:a})]})}try{t.displayName="FilterChip",t.__docgenInfo={description:"",displayName:"FilterChip",props:{active:{defaultValue:{value:"false"},description:"",name:"active",required:!1,type:{name:"boolean"}},count:{defaultValue:null,description:`Optional matching-row count. Showing it turns the toolbar into a preview
of the result set, so the user can tell a filter is empty before clicking
it and landing on a blank table.`,name:"count",required:!1,type:{name:"number"}}}}}catch{}const E={title:"Primitives/FilterChip",component:t,args:{children:"Blocked",active:!1}},r={},i={render:()=>e.jsxs("div",{className:"sb-stack",children:[e.jsxs("div",{className:"sb-row sb-stack--inline",children:[e.jsx(t,{children:"Default"}),e.jsx(t,{active:!0,children:"Selected"}),e.jsx(t,{disabled:!0,children:"Disabled"}),e.jsx(t,{count:8,children:"With count"}),e.jsx(t,{active:!0,count:8,children:"Selected with count"})]}),e.jsx("p",{className:"sb-note",children:"Selected is solid ink — the same treatment as a checked checkbox, because it means the same thing. It is deliberately not a status colour (a filter is a selection, not a verdict) and no longer accent: accent now means “link” and nothing else, anywhere in the system. Hover, focus and disabled all stay distinguishable from selected: hover tints the surface, focus draws an ink ring, disabled drops opacity."})]})},c={name:"Selection is one colour",render:()=>e.jsxs("div",{className:"sb-stack",children:[e.jsxs("div",{className:"sb-row sb-stack--inline",children:[e.jsx(N,{checked:!0,onChange:()=>{},"aria-label":"Checked"}),e.jsx(t,{active:!0,children:"Blocked"}),e.jsx("span",{className:"sb-swatch__meta",children:"checkbox · chip · (and calendar endpoints)"})]}),e.jsxs("p",{className:"sb-note",children:["Every control that can be selected uses ",e.jsx("code",{children:"--cg-selected-fill"}),". That single token is why a checked row, an active filter and a chosen date all read as the same gesture rather than three unrelated highlights."]})]})},o={render:()=>{const[n,a]=w.useState("All"),l={All:22,Blocked:8,Flagged:4,Clean:9};return e.jsxs("div",{className:"sb-stack",children:[e.jsxs("div",{className:"sb-row",children:[Object.entries(l).map(([s,d])=>e.jsx(t,{active:n===s,count:d,onClick:()=>a(s),children:s},s)),e.jsx(t,{count:0,disabled:!0,children:"Unblocked by you"})]}),e.jsx("p",{className:"sb-note",children:"Showing the matching count turns the toolbar into a preview of the result set, so a customer can see a filter is empty before clicking it and landing on a blank table. A zero-count chip is disabled rather than hidden — hiding it would make the option look like it does not exist."})]})}};var h,u,p;r.parameters={...r.parameters,docs:{...(h=r.parameters)==null?void 0:h.docs,source:{originalSource:"{}",...(p=(u=r.parameters)==null?void 0:u.docs)==null?void 0:p.source}}};var m,b,k;i.parameters={...i.parameters,docs:{...(m=i.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: () => <div className="sb-stack">\r
      <div className="sb-row sb-stack--inline">\r
        <FilterChip>Default</FilterChip>\r
        <FilterChip active>Selected</FilterChip>\r
        <FilterChip disabled>Disabled</FilterChip>\r
        <FilterChip count={8}>With count</FilterChip>\r
        <FilterChip active count={8}>\r
          Selected with count\r
        </FilterChip>\r
      </div>\r
      <p className="sb-note">\r
        Selected is solid ink — the same treatment as a checked checkbox, because\r
        it means the same thing. It is deliberately not a status colour (a filter\r
        is a selection, not a verdict) and no longer accent: accent now means\r
        &ldquo;link&rdquo; and nothing else, anywhere in the system. Hover, focus and\r
        disabled all stay distinguishable from selected: hover tints the surface,\r
        focus draws an ink ring, disabled drops opacity.\r
      </p>\r
    </div>
}`,...(k=(b=i.parameters)==null?void 0:b.docs)==null?void 0:k.source}}};var g,v,f;c.parameters={...c.parameters,docs:{...(g=c.parameters)==null?void 0:g.docs,source:{originalSource:`{
  name: "Selection is one colour",
  render: () => <div className="sb-stack">\r
      <div className="sb-row sb-stack--inline">\r
        <Checkbox checked onChange={() => {}} aria-label="Checked" />\r
        <FilterChip active>Blocked</FilterChip>\r
        <span className="sb-swatch__meta">checkbox · chip · (and calendar endpoints)</span>\r
      </div>\r
      <p className="sb-note">\r
        Every control that can be selected uses <code>--cg-selected-fill</code>. That\r
        single token is why a checked row, an active filter and a chosen date all\r
        read as the same gesture rather than three unrelated highlights.\r
      </p>\r
    </div>
}`,...(f=(v=c.parameters)==null?void 0:v.docs)==null?void 0:f.source}}};var x,C,y;o.parameters={...o.parameters,docs:{...(x=o.parameters)==null?void 0:x.docs,source:{originalSource:`{
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
}`,...(y=(C=o.parameters)==null?void 0:C.docs)==null?void 0:y.source}}};const I=["Playground","States","SelectionIsOneColour","WithCounts"];export{r as Playground,c as SelectionIsOneColour,i as States,o as WithCounts,I as __namedExportsOrder,E as default};
