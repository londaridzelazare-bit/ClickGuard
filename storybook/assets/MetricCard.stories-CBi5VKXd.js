import{j as e}from"./jsx-runtime-DF2Pcvd1.js";import{c}from"./cx-DJxyWpib.js";import"./index-B2-qRKKC.js";import"./_commonjsHelpers-Cpj98o6Y.js";function a({label:n,value:S,sub:r,size:M="page",valueTone:i="default",bare:C=!1,className:$}){return e.jsxs("div",{className:c("cg-metric",`cg-metric--${M}`,C&&"cg-metric--bare",$),children:[e.jsx("div",{className:"cg-metric__label",children:n}),e.jsx("div",{className:c("cg-metric__value",i!=="default"&&`cg-metric__value--${i}`),children:S}),r!=null&&r!==""&&e.jsx("div",{className:"cg-metric__sub",children:r})]})}try{a.displayName="MetricCard",a.__docgenInfo={description:"",displayName:"MetricCard",props:{label:{defaultValue:null,description:"",name:"label",required:!0,type:{name:"ReactNode"}},value:{defaultValue:null,description:"",name:"value",required:!0,type:{name:"ReactNode"}},sub:{defaultValue:null,description:"",name:"sub",required:!1,type:{name:"ReactNode"}},size:{defaultValue:{value:"page"},description:"`page` = 22px value for the header row. `drawer` = 18px inside a panel.",name:"size",required:!1,type:{name:"enum",value:[{value:'"page"'},{value:'"drawer"'}]}},valueTone:{defaultValue:{value:"default"},description:"Reserve `success` for money saved and `danger` for money lost.",name:"valueTone",required:!1,type:{name:"enum",value:[{value:'"danger"'},{value:'"success"'},{value:'"default"'}]}},bare:{defaultValue:{value:"false"},description:"",name:"bare",required:!1,type:{name:"boolean"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}}}}}catch{}const R={title:"Primitives/MetricCard",component:a,args:{label:"Blocked visitors",value:"6",sub:"of 22 visitors seen",size:"page",valueTone:"default"},parameters:{layout:"padded"}},s={},l={render:()=>e.jsxs("div",{className:"sb-grid-3",children:[e.jsx(a,{label:"Blocked visitors",value:"6",sub:"of 22 visitors seen"}),e.jsx(a,{label:"Spend protected",value:"$142.40",sub:"45 attempts stopped",valueTone:"success"}),e.jsx(a,{label:"Flagged, not yet blocked",value:"4",sub:"Review when you have a minute"})]})},t={render:()=>e.jsxs("div",{className:"sb-stack",children:[e.jsxs("div",{className:"sb-grid-2",style:{maxWidth:480},children:[e.jsx(a,{size:"drawer",label:"Spent before block",value:"$12.80",sub:"4 paid clicks"}),e.jsx(a,{size:"drawer",label:"Blocked since",value:"$0.00",sub:"3 attempts stopped",valueTone:"success"})]}),e.jsx("p",{className:"sb-note",children:"Green is only ever money the product saved; red is only ever money that leaked through. A plain count never gets a colour — colouring “6 blocked visitors” green would be the product claiming credit for a number the customer has not agreed is good yet."})]})},d={name:"Edge case — money leaked while a sync was pending",render:()=>e.jsxs("div",{className:"sb-grid-2",style:{maxWidth:480},children:[e.jsx(a,{size:"drawer",label:"Spent before block",value:"$19.20",sub:"6 paid clicks"}),e.jsx(a,{size:"drawer",label:"Blocked since",value:"$25.60",sub:"8 clicks slipped through while Google sync pending",valueTone:"danger"})]})},o={render:()=>e.jsxs("div",{className:"sb-grid-3",children:[e.jsx(a,{label:"Blocked visitors",value:"0",sub:"Your ads are live"}),e.jsx(a,{label:"Spend protected",value:"$0.00",sub:"Nothing to protect yet"}),e.jsx(a,{label:"Flagged, not yet blocked",value:"0",sub:"Nothing to review"})]})};var u,p,m;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:"{}",...(m=(p=s.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};var v,b,g;l.parameters={...l.parameters,docs:{...(v=l.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: () => <div className="sb-grid-3">\r
      <MetricCard label="Blocked visitors" value="6" sub="of 22 visitors seen" />\r
      <MetricCard label="Spend protected" value="$142.40" sub="45 attempts stopped" valueTone="success" />\r
      <MetricCard label="Flagged, not yet blocked" value="4" sub="Review when you have a minute" />\r
    </div>
}`,...(g=(b=l.parameters)==null?void 0:b.docs)==null?void 0:g.source}}};var h,y,f;t.parameters={...t.parameters,docs:{...(h=t.parameters)==null?void 0:h.docs,source:{originalSource:`{
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
}`,...(f=(y=t.parameters)==null?void 0:y.docs)==null?void 0:f.source}}};var k,x,w;d.parameters={...d.parameters,docs:{...(k=d.parameters)==null?void 0:k.docs,source:{originalSource:`{
  name: "Edge case — money leaked while a sync was pending",
  render: () => <div className="sb-grid-2" style={{
    maxWidth: 480
  }}>\r
      <MetricCard size="drawer" label="Spent before block" value="$19.20" sub="6 paid clicks" />\r
      <MetricCard size="drawer" label="Blocked since" value="$25.60" sub="8 clicks slipped through while Google sync pending" valueTone="danger" />\r
    </div>
}`,...(w=(x=d.parameters)==null?void 0:x.docs)==null?void 0:w.source}}};var N,j,_;o.parameters={...o.parameters,docs:{...(N=o.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: () => <div className="sb-grid-3">\r
      <MetricCard label="Blocked visitors" value="0" sub="Your ads are live" />\r
      <MetricCard label="Spend protected" value="$0.00" sub="Nothing to protect yet" />\r
      <MetricCard label="Flagged, not yet blocked" value="0" sub="Nothing to review" />\r
    </div>
}`,...(_=(j=o.parameters)==null?void 0:j.docs)==null?void 0:_.source}}};const V=["Playground","PageHeader","DrawerSize","MoneyLeaked","ZeroState"];export{t as DrawerSize,d as MoneyLeaked,l as PageHeader,s as Playground,o as ZeroState,V as __namedExportsOrder,R as default};
