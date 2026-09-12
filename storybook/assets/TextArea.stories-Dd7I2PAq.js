import{j as e}from"./jsx-runtime-DF2Pcvd1.js";import{r as o}from"./index-B2-qRKKC.js";import{T as a}from"./TextArea-DSD0HlVV.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./cx-DJxyWpib.js";const w={title:"Primitives/TextArea",component:a,parameters:{layout:"padded"}},t={render:()=>{const[c,h]=o.useState(""),[m,p]=o.useState("This is our office VPN, not a bot. Three of us share it.");return e.jsxs("div",{className:"sb-stack",children:[e.jsx(a,{label:"What did we get wrong?",optional:!0,hint:"A sentence is plenty. You can also send this empty.",value:c,onValueChange:h,placeholder:"e.g. This is our office VPN, not a bot.",maxLength:400}),e.jsx(a,{label:"Filled",value:m,onValueChange:p,maxLength:400}),e.jsx(a,{label:"Disabled",value:"",onValueChange:()=>{},disabled:!0}),e.jsx("p",{className:"sb-note",children:"Focus uses the same single ink outline as SearchInput, drawn over the border rather than around it. “Optional” is spelled out next to the label instead of marking required fields with an asterisk — in a form where every field is optional, an asterisk convention says nothing."})]})}},n={name:"Edge case — over the character count",render:()=>e.jsx(a,{label:"What did we get wrong?",optional:!0,value:"x".repeat(412),onValueChange:()=>{},maxLength:400}),parameters:{docs:{description:{story:"The count turns red but submission is not blocked. This is optional feedback on a goodwill form; hard-failing someone for a long explanation would be the wrong trade."}}}};var r,s,i;t.parameters={...t.parameters,docs:{...(r=t.parameters)==null?void 0:r.docs,source:{originalSource:`{
  render: () => {
    const [a, setA] = useState("");
    const [b, setB] = useState("This is our office VPN, not a bot. Three of us share it.");
    return <div className="sb-stack">\r
        <TextArea label="What did we get wrong?" optional hint="A sentence is plenty. You can also send this empty." value={a} onValueChange={setA} placeholder="e.g. This is our office VPN, not a bot." maxLength={400} />\r
        <TextArea label="Filled" value={b} onValueChange={setB} maxLength={400} />\r
        <TextArea label="Disabled" value="" onValueChange={() => {}} disabled />\r
        <p className="sb-note">\r
          Focus uses the same single ink outline as SearchInput, drawn over the\r
          border rather than around it. &ldquo;Optional&rdquo; is spelled out next to\r
          the label instead of marking required fields with an asterisk — in a form\r
          where every field is optional, an asterisk convention says nothing.\r
        </p>\r
      </div>;
  }
}`,...(i=(s=t.parameters)==null?void 0:s.docs)==null?void 0:i.source}}};var l,d,u;n.parameters={...n.parameters,docs:{...(l=n.parameters)==null?void 0:l.docs,source:{originalSource:`{
  name: "Edge case — over the character count",
  render: () => <TextArea label="What did we get wrong?" optional value={"x".repeat(412)} onValueChange={() => {}} maxLength={400} />,
  parameters: {
    docs: {
      description: {
        story: "The count turns red but submission is not blocked. This is optional feedback on a goodwill form; hard-failing someone for a long explanation would be the wrong trade."
      }
    }
  }
}`,...(u=(d=n.parameters)==null?void 0:d.docs)==null?void 0:u.source}}};const T=["States","OverLimit"];export{n as OverLimit,t as States,T as __namedExportsOrder,w as default};
