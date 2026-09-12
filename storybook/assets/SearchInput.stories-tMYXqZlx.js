import{j as e}from"./jsx-runtime-DF2Pcvd1.js";import{r as l}from"./index-B2-qRKKC.js";import{c as N}from"./cx-DJxyWpib.js";import{I as d}from"./Icon-B6XEyylJ.js";import{C as r}from"./Checkbox-Ba_ZfiGZ.js";import"./_commonjsHelpers-Cpj98o6Y.js";function n({value:a,onValueChange:s,placeholder:x="Search",label:y="Search",width:C=280,className:S,style:j}){const i=l.useId();return e.jsxs("div",{className:N("cg-search",S),style:{width:C,...j},children:[e.jsx(d,{name:"search",size:"sm",className:"cg-search__icon"}),e.jsx("label",{className:"cg-sr-only",htmlFor:i,children:y}),e.jsx("input",{id:i,className:"cg-search__input",type:"search",value:a,placeholder:x,onChange:w=>s(w.target.value)}),a&&e.jsx("button",{type:"button",className:"cg-search__clear","aria-label":"Clear search",onClick:()=>s(""),children:e.jsx(d,{name:"close",size:"sm"})})]})}try{n.displayName="SearchInput",n.__docgenInfo={description:"",displayName:"SearchInput",props:{value:{defaultValue:null,description:"",name:"value",required:!0,type:{name:"string"}},onValueChange:{defaultValue:null,description:"",name:"onValueChange",required:!0,type:{name:"(next: string) => void"}},placeholder:{defaultValue:{value:"Search"},description:"",name:"placeholder",required:!1,type:{name:"string"}},label:{defaultValue:{value:"Search"},description:"",name:"label",required:!1,type:{name:"string"}},width:{defaultValue:{value:"280"},description:"",name:"width",required:!1,type:{name:"string | number"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},style:{defaultValue:null,description:"",name:"style",required:!1,type:{name:"CSSProperties"}}}}}catch{}const T={title:"Primitives/Inputs"},t={render:()=>{const[a,s]=l.useState("");return e.jsxs("div",{className:"sb-stack",children:[e.jsxs("div",{children:[e.jsx("div",{className:"sb-label",children:"Default — click in to see the focus treatment"}),e.jsx(n,{value:a,onValueChange:s,placeholder:"Search by IP or location",label:"Search visitors"})]}),e.jsxs("div",{children:[e.jsx("div",{className:"sb-label",children:"Filled, with its clear affordance"}),e.jsx(n,{value:"Frankfurt",onValueChange:()=>{},placeholder:"Search by IP or location",label:"Search visitors, filled"})]}),e.jsx("p",{className:"sb-note",children:"One search box covers IP, city, country, connection type and threat label — splitting them into five fields would make the user decide which one their string belongs to before they can look for it."})]})}},c={name:"Focus is one line, not three",render:()=>{const[a,s]=l.useState("");return e.jsxs("div",{className:"sb-stack",children:[e.jsx(n,{value:a,onValueChange:s,placeholder:"Tab or click into me",label:"Focus demonstration"}),e.jsxs("p",{className:"sb-note",children:["This field used to set ",e.jsx("code",{children:"border-color"})," ",e.jsx("em",{children:"and"})," a two-layer box-shadow ring on focus, which painted three concentric lines. It now draws a single black outline at a negative offset, so the outline lands exactly on top of the 1px border instead of around it. Hover is a separate, quieter signal: the border darkens and the surface tints, and it stands down as soon as the field takes focus so the two never stack."]}),e.jsxs("p",{className:"sb-note",children:["The focus colour comes from ",e.jsx("code",{children:"--cg-focus-color"}),", which is ink across the whole system — the same value the selected states use."]})]})}},o={render:()=>{const[a,s]=l.useState(!1);return e.jsxs("div",{className:"sb-row",children:[e.jsx(r,{checked:a,onChange:s,"aria-label":"Interactive"}),e.jsx(r,{checked:!1,onChange:()=>{},"aria-label":"Unchecked"}),e.jsx(r,{checked:!0,onChange:()=>{},"aria-label":"Checked"}),e.jsx(r,{checked:!1,indeterminate:!0,onChange:()=>{},"aria-label":"Some selected"}),e.jsx(r,{checked:!1,disabled:!0,onChange:()=>{},"aria-label":"Disabled"}),e.jsx("span",{className:"sb-swatch__meta",children:"interactive · unchecked · checked · indeterminate · disabled"})]})}};var h,u,m;t.parameters={...t.parameters,docs:{...(h=t.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState("");
    return <div className="sb-stack">\r
        <div>\r
          <div className="sb-label">Default — click in to see the focus treatment</div>\r
          <SearchInput value={value} onValueChange={setValue} placeholder="Search by IP or location" label="Search visitors" />\r
        </div>\r
        <div>\r
          <div className="sb-label">Filled, with its clear affordance</div>\r
          <SearchInput value="Frankfurt" onValueChange={() => {}} placeholder="Search by IP or location" label="Search visitors, filled" />\r
        </div>\r
        <p className="sb-note">\r
          One search box covers IP, city, country, connection type and threat label —\r
          splitting them into five fields would make the user decide which one their\r
          string belongs to before they can look for it.\r
        </p>\r
      </div>;
  }
}`,...(m=(u=t.parameters)==null?void 0:u.docs)==null?void 0:m.source}}};var p,b,f;c.parameters={...c.parameters,docs:{...(p=c.parameters)==null?void 0:p.docs,source:{originalSource:`{
  name: "Focus is one line, not three",
  render: () => {
    const [value, setValue] = useState("");
    return <div className="sb-stack">\r
        <SearchInput value={value} onValueChange={setValue} placeholder="Tab or click into me" label="Focus demonstration" />\r
        <p className="sb-note">\r
          This field used to set <code>border-color</code> <em>and</em> a two-layer\r
          box-shadow ring on focus, which painted three concentric lines. It now\r
          draws a single black outline at a negative offset, so the outline lands\r
          exactly on top of the 1px border instead of around it. Hover is a separate,\r
          quieter signal: the border darkens and the surface tints, and it stands\r
          down as soon as the field takes focus so the two never stack.\r
        </p>\r
        <p className="sb-note">\r
          The focus colour comes from <code>--cg-focus-color</code>, which is ink\r
          across the whole system — the same value the selected states use.\r
        </p>\r
      </div>;
  }
}`,...(f=(b=c.parameters)==null?void 0:b.docs)==null?void 0:f.source}}};var v,k,g;o.parameters={...o.parameters,docs:{...(v=o.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: () => {
    const [checked, setChecked] = useState(false);
    return <div className="sb-row">\r
        <Checkbox checked={checked} onChange={setChecked} aria-label="Interactive" />\r
        <Checkbox checked={false} onChange={() => {}} aria-label="Unchecked" />\r
        <Checkbox checked onChange={() => {}} aria-label="Checked" />\r
        <Checkbox checked={false} indeterminate onChange={() => {}} aria-label="Some selected" />\r
        <Checkbox checked={false} disabled onChange={() => {}} aria-label="Disabled" />\r
        <span className="sb-swatch__meta">\r
          interactive · unchecked · checked · indeterminate · disabled\r
        </span>\r
      </div>;
  }
}`,...(g=(k=o.parameters)==null?void 0:k.docs)==null?void 0:g.source}}};const D=["Search","FocusAndHover","Checkboxes"];export{o as Checkboxes,c as FocusAndHover,t as Search,D as __namedExportsOrder,T as default};
