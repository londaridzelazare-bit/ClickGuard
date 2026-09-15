import{j as e}from"./jsx-runtime-DF2Pcvd1.js";import{c as m}from"./cx-DJxyWpib.js";import{b as D}from"./Icon-4ZrsAClT.js";import"./index-B2-qRKKC.js";import"./_commonjsHelpers-Cpj98o6Y.js";function a({label:d,value:F,sub:s,size:R="page",valueTone:u="default",icon:v,iconTone:V="neutral",bare:P=!1,className:I}){return e.jsxs("div",{className:m("cg-metric",`cg-metric--${R}`,P&&"cg-metric--bare",I),children:[e.jsxs("div",{className:"cg-metric__head",children:[e.jsx("div",{className:"cg-metric__label",children:d}),v&&e.jsx(D,{name:v,tone:V})]}),e.jsx("div",{className:m("cg-metric__value",u!=="default"&&`cg-metric__value--${u}`),children:F}),s!=null&&s!==""&&e.jsx("div",{className:"cg-metric__sub",children:s})]})}try{a.displayName="MetricCard",a.__docgenInfo={description:"",displayName:"MetricCard",props:{label:{defaultValue:null,description:"",name:"label",required:!0,type:{name:"ReactNode"}},value:{defaultValue:null,description:"",name:"value",required:!0,type:{name:"ReactNode"}},sub:{defaultValue:null,description:"",name:"sub",required:!1,type:{name:"ReactNode"}},size:{defaultValue:{value:"page"},description:"`page` = 22px value for the header row. `drawer` = 18px inside a panel.",name:"size",required:!1,type:{name:"enum",value:[{value:'"page"'},{value:'"drawer"'}]}},valueTone:{defaultValue:{value:"default"},description:"Reserve `success` for money saved and `danger` for money lost.",name:"valueTone",required:!1,type:{name:"enum",value:[{value:'"danger"'},{value:'"success"'},{value:'"default"'}]}},icon:{defaultValue:null,description:`Identifies the metric by shape as well as colour. The text label still
carries the meaning, so the icon is decorative and hidden from assistive
tech — nothing here depends on colour or glyph alone.`,name:"icon",required:!1,type:{name:"enum",value:[{value:'"search"'},{value:'"shieldBlock"'},{value:'"shieldCheck"'},{value:'"flag"'},{value:'"check"'},{value:'"minus"'},{value:'"close"'},{value:'"chevronLeft"'},{value:'"chevronRight"'},{value:'"chevronDown"'},{value:'"calendar"'},{value:'"circle"'},{value:'"undo"'},{value:'"info"'}]}},iconTone:{defaultValue:{value:"neutral"},description:"Tone of the icon badge. Defaults to neutral.",name:"iconTone",required:!1,type:{name:"enum",value:[{value:'"danger"'},{value:'"warning"'},{value:'"success"'},{value:'"accent"'},{value:'"neutral"'}]}},bare:{defaultValue:{value:"false"},description:"",name:"bare",required:!1,type:{name:"boolean"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}}}}}catch{}const Y={title:"Primitives/MetricCard",component:a,args:{label:"Blocked visitors",value:"6",sub:"of 22 visitors seen",size:"page",valueTone:"default"},parameters:{layout:"padded"}},r={},n={name:"Page header — the three product metrics",render:()=>e.jsxs("div",{className:"sb-stack",style:{maxWidth:"none"},children:[e.jsxs("div",{className:"sb-grid-3",children:[e.jsx(a,{label:"Blocked visitors",value:"6",sub:"of 22 visitors seen",icon:"shieldBlock",iconTone:"danger"}),e.jsx(a,{label:"Spend protected",value:"$142.40",sub:"45 attempts stopped",valueTone:"success",icon:"shieldCheck",iconTone:"success"}),e.jsx(a,{label:"Flagged, not yet blocked",value:"4",sub:"Review when you have a minute",icon:"flag",iconTone:"warning"})]}),e.jsx("p",{className:"sb-note",children:"Three distinct shapes, three semantic tones drawn from the same role tokens the statuses use — a blocked visitor is red here for the same reason the pill is. The text label is never dropped, so the icon and the colour are both reinforcement rather than the message."})]})},o={name:"Without icons",render:()=>e.jsxs("div",{className:"sb-grid-3",children:[e.jsx(a,{label:"Blocked visitors",value:"6",sub:"of 22 visitors seen"}),e.jsx(a,{label:"Spend protected",value:"$142.40",sub:"45 attempts stopped",valueTone:"success"}),e.jsx(a,{label:"Flagged, not yet blocked",value:"4",sub:"Review when you have a minute"})]})},l={render:()=>e.jsxs("div",{className:"sb-stack",children:[e.jsxs("div",{className:"sb-grid-2",style:{maxWidth:480},children:[e.jsx(a,{size:"drawer",label:"Spent before block",value:"$12.80",sub:"4 paid clicks"}),e.jsx(a,{size:"drawer",label:"Blocked since",value:"$0.00",sub:"3 attempts stopped",valueTone:"success"})]}),e.jsx("p",{className:"sb-note",children:"Green is only ever money the product saved; red is only ever money that leaked through. A plain count never gets a colour — colouring “6 blocked visitors” green would be the product claiming credit for a number the customer has not agreed is good yet."})]})},t={name:"Edge case — money leaked while a sync was pending",render:()=>e.jsxs("div",{className:"sb-grid-2",style:{maxWidth:480},children:[e.jsx(a,{size:"drawer",label:"Spent before block",value:"$19.20",sub:"6 paid clicks"}),e.jsx(a,{size:"drawer",label:"Blocked since",value:"$25.60",sub:"8 clicks slipped through while Google sync pending",valueTone:"danger"})]})},i={render:()=>e.jsxs("div",{className:"sb-grid-3",children:[e.jsx(a,{label:"Blocked visitors",value:"0",sub:"Your ads are live",icon:"shieldBlock",iconTone:"danger"}),e.jsx(a,{label:"Spend protected",value:"$0.00",sub:"Nothing to protect yet",icon:"shieldCheck",iconTone:"success"}),e.jsx(a,{label:"Flagged, not yet blocked",value:"0",sub:"Nothing to review",icon:"flag",iconTone:"warning"})]})},c={name:"Scoped to a filtered view",render:()=>e.jsxs("div",{className:"sb-stack",style:{maxWidth:"none"},children:[e.jsxs("div",{className:"sb-grid-3",children:[e.jsx(a,{label:"Blocked visitors",value:"3",sub:"of 3 visitors in view",icon:"shieldBlock",iconTone:"danger"}),e.jsx(a,{label:"Spend protected",value:"$41.60",sub:"16 attempts stopped · $25.60 still leaked",valueTone:"success",icon:"shieldCheck",iconTone:"success"}),e.jsx(a,{label:"Flagged, not yet blocked",value:"0",sub:"Nothing to review",icon:"flag",iconTone:"warning"})]}),e.jsx("p",{className:"sb-note",children:"The sub-label switches from “visitors seen” to “visitors in view” once filters narrow the set, so the number above it is never mistaken for an account-wide total."})]})};var p,h,b;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:"{}",...(b=(h=r.parameters)==null?void 0:h.docs)==null?void 0:b.source}}};var g,f,k;n.parameters={...n.parameters,docs:{...(g=n.parameters)==null?void 0:g.docs,source:{originalSource:`{
  name: "Page header — the three product metrics",
  render: () => <div className="sb-stack" style={{
    maxWidth: "none"
  }}>\r
      <div className="sb-grid-3">\r
        <MetricCard label="Blocked visitors" value="6" sub="of 22 visitors seen" icon="shieldBlock" iconTone="danger" />\r
        <MetricCard label="Spend protected" value="$142.40" sub="45 attempts stopped" valueTone="success" icon="shieldCheck" iconTone="success" />\r
        <MetricCard label="Flagged, not yet blocked" value="4" sub="Review when you have a minute" icon="flag" iconTone="warning" />\r
      </div>\r
      <p className="sb-note">\r
        Three distinct shapes, three semantic tones drawn from the same role\r
        tokens the statuses use — a blocked visitor is red here for the same\r
        reason the pill is. The text label is never dropped, so the icon and the\r
        colour are both reinforcement rather than the message.\r
      </p>\r
    </div>
}`,...(k=(f=n.parameters)==null?void 0:f.docs)==null?void 0:k.source}}};var y,w,x;o.parameters={...o.parameters,docs:{...(y=o.parameters)==null?void 0:y.docs,source:{originalSource:`{
  name: "Without icons",
  render: () => <div className="sb-grid-3">\r
      <MetricCard label="Blocked visitors" value="6" sub="of 22 visitors seen" />\r
      <MetricCard label="Spend protected" value="$142.40" sub="45 attempts stopped" valueTone="success" />\r
      <MetricCard label="Flagged, not yet blocked" value="4" sub="Review when you have a minute" />\r
    </div>
}`,...(x=(w=o.parameters)==null?void 0:w.docs)==null?void 0:x.source}}};var N,T,j;l.parameters={...l.parameters,docs:{...(N=l.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: () => <div className="sb-stack">\r
      <div className="sb-grid-2" style={{
      maxWidth: 480
    }}>\r
        <MetricCard size="drawer" label="Spent before block" value="$12.80" sub="4 paid clicks" />\r
        <MetricCard size="drawer" label="Blocked since" value="$0.00" sub="3 attempts stopped" valueTone="success" />\r
      </div>\r
      <p className="sb-note">\r
        Green is only ever money the product saved; red is only ever money that\r
        leaked through. A plain count never gets a colour — colouring\r
        &ldquo;6 blocked visitors&rdquo; green would be the product claiming credit\r
        for a number the customer has not agreed is good yet.\r
      </p>\r
    </div>
}`,...(j=(T=l.parameters)==null?void 0:T.docs)==null?void 0:j.source}}};var C,S,M;t.parameters={...t.parameters,docs:{...(C=t.parameters)==null?void 0:C.docs,source:{originalSource:`{
  name: "Edge case — money leaked while a sync was pending",
  render: () => <div className="sb-grid-2" style={{
    maxWidth: 480
  }}>\r
      <MetricCard size="drawer" label="Spent before block" value="$19.20" sub="6 paid clicks" />\r
      <MetricCard size="drawer" label="Blocked since" value="$25.60" sub="8 clicks slipped through while Google sync pending" valueTone="danger" />\r
    </div>
}`,...(M=(S=t.parameters)==null?void 0:S.docs)==null?void 0:M.source}}};var B,_,$;i.parameters={...i.parameters,docs:{...(B=i.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: () => <div className="sb-grid-3">\r
      <MetricCard label="Blocked visitors" value="0" sub="Your ads are live" icon="shieldBlock" iconTone="danger" />\r
      <MetricCard label="Spend protected" value="$0.00" sub="Nothing to protect yet" icon="shieldCheck" iconTone="success" />\r
      <MetricCard label="Flagged, not yet blocked" value="0" sub="Nothing to review" icon="flag" iconTone="warning" />\r
    </div>
}`,...($=(_=i.parameters)==null?void 0:_.docs)==null?void 0:$.source}}};var q,z,W;c.parameters={...c.parameters,docs:{...(q=c.parameters)==null?void 0:q.docs,source:{originalSource:`{
  name: "Scoped to a filtered view",
  render: () => <div className="sb-stack" style={{
    maxWidth: "none"
  }}>\r
      <div className="sb-grid-3">\r
        <MetricCard label="Blocked visitors" value="3" sub="of 3 visitors in view" icon="shieldBlock" iconTone="danger" />\r
        <MetricCard label="Spend protected" value="$41.60" sub="16 attempts stopped · $25.60 still leaked" valueTone="success" icon="shieldCheck" iconTone="success" />\r
        <MetricCard label="Flagged, not yet blocked" value="0" sub="Nothing to review" icon="flag" iconTone="warning" />\r
      </div>\r
      <p className="sb-note">\r
        The sub-label switches from &ldquo;visitors seen&rdquo; to &ldquo;visitors in\r
        view&rdquo; once filters narrow the set, so the number above it is never\r
        mistaken for an account-wide total.\r
      </p>\r
    </div>
}`,...(W=(z=c.parameters)==null?void 0:z.docs)==null?void 0:W.source}}};const Z=["Playground","PageHeader","WithoutIcons","DrawerSize","MoneyLeaked","ZeroState","FilteredScope"];export{l as DrawerSize,c as FilteredScope,t as MoneyLeaked,n as PageHeader,r as Playground,o as WithoutIcons,i as ZeroState,Z as __namedExportsOrder,Y as default};
