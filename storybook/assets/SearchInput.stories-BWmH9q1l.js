import{j as e}from"./jsx-runtime-DF2Pcvd1.js";import{r as l}from"./index-B2-qRKKC.js";import{c as v}from"./cx-DJxyWpib.js";import{C as n}from"./Checkbox-BT3GuAiA.js";import"./_commonjsHelpers-Cpj98o6Y.js";function c({value:a,onValueChange:r,placeholder:b="Search",label:k="Search",width:f=280,className:g,style:x}){const o=l.useId();return e.jsxs("div",{className:v("cg-search",g),style:{width:f,...x},children:[e.jsxs("svg",{className:"cg-search__icon",viewBox:"0 0 14 14",fill:"none","aria-hidden":"true",children:[e.jsx("circle",{cx:"6",cy:"6",r:"4.4",stroke:"currentColor",strokeWidth:"1.4"}),e.jsx("path",{d:"M9.4 9.4 12.5 12.5",stroke:"currentColor",strokeWidth:"1.4",strokeLinecap:"round"})]}),e.jsx("label",{className:"cg-sr-only",htmlFor:o,children:k}),e.jsx("input",{id:o,className:"cg-search__input",type:"search",value:a,placeholder:b,onChange:C=>r(C.target.value)}),a&&e.jsx("button",{type:"button",className:"cg-search__clear","aria-label":"Clear search",onClick:()=>r(""),children:e.jsx("svg",{viewBox:"0 0 10 10",fill:"none","aria-hidden":"true",width:"8",height:"8",children:e.jsx("path",{d:"M2 2 8 8M8 2 2 8",stroke:"currentColor",strokeWidth:"1.6",strokeLinecap:"round"})})})]})}try{c.displayName="SearchInput",c.__docgenInfo={description:"",displayName:"SearchInput",props:{value:{defaultValue:null,description:"",name:"value",required:!0,type:{name:"string"}},onValueChange:{defaultValue:null,description:"",name:"onValueChange",required:!0,type:{name:"(next: string) => void"}},placeholder:{defaultValue:{value:"Search"},description:"",name:"placeholder",required:!1,type:{name:"string"}},label:{defaultValue:{value:"Search"},description:"",name:"label",required:!1,type:{name:"string"}},width:{defaultValue:{value:"280"},description:"",name:"width",required:!1,type:{name:"string | number"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},style:{defaultValue:null,description:"",name:"style",required:!1,type:{name:"CSSProperties"}}}}}catch{}const I={title:"Primitives/Inputs"},t={render:()=>{const[a,r]=l.useState("");return e.jsxs("div",{className:"sb-stack",children:[e.jsx(c,{value:a,onValueChange:r,placeholder:"Search by IP or location",label:"Search visitors"}),e.jsx(c,{value:"Frankfurt",onValueChange:()=>{},placeholder:"Search by IP or location",label:"Search visitors, filled"}),e.jsx("p",{className:"sb-note",children:"Empty, and filled with its clear affordance. One search box covers IP, city, country and connection type — splitting them into four fields would make the user decide which one their string belongs to before they can look for it."})]})}},s={render:()=>{const[a,r]=l.useState(!1);return e.jsxs("div",{className:"sb-row",children:[e.jsx(n,{checked:a,onChange:r,"aria-label":"Interactive"}),e.jsx(n,{checked:!1,onChange:()=>{},"aria-label":"Unchecked"}),e.jsx(n,{checked:!0,onChange:()=>{},"aria-label":"Checked"}),e.jsx(n,{checked:!1,indeterminate:!0,onChange:()=>{},"aria-label":"Some selected"}),e.jsx(n,{checked:!1,disabled:!0,onChange:()=>{},"aria-label":"Disabled"}),e.jsx("span",{className:"sb-swatch__meta",children:"interactive · unchecked · checked · indeterminate · disabled"})]})}};var i,d,h;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState("");
    return <div className="sb-stack">\r
        <SearchInput value={value} onValueChange={setValue} placeholder="Search by IP or location" label="Search visitors" />\r
        <SearchInput value="Frankfurt" onValueChange={() => {}} placeholder="Search by IP or location" label="Search visitors, filled" />\r
        <p className="sb-note">\r
          Empty, and filled with its clear affordance. One search box covers IP,\r
          city, country and connection type — splitting them into four fields would\r
          make the user decide which one their string belongs to before they can\r
          look for it.\r
        </p>\r
      </div>;
  }
}`,...(h=(d=t.parameters)==null?void 0:d.docs)==null?void 0:h.source}}};var u,p,m;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
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
}`,...(m=(p=s.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};const w=["Search","Checkboxes"];export{s as Checkboxes,t as Search,w as __namedExportsOrder,I as default};
