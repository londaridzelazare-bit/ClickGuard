import{j as e}from"./jsx-runtime-DF2Pcvd1.js";import{r as c}from"./index-B2-qRKKC.js";import{c as f}from"./cx-DJxyWpib.js";import{C as W}from"./Checkbox-B6bAN6z_.js";import{S as ue}from"./StatusPill-CmxwTPc2.js";import{T as pe}from"./ThreatBar-C4P3JZko.js";import{E as ae}from"./EmptyState-B1oEKDw1.js";import{B as me}from"./Button-BhRfCGa_.js";import{P as ge}from"./Pagination-BOGBHBTr.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./Icon-C9i3uB6W.js";import"./tokens-DxNgueAT.js";function k({columns:t,rows:n,rowKey:p,sort:o,onSortChange:g,selectable:h=!1,checkedKeys:r=[],onCheckedChange:l,activeKey:b=null,onRowActivate:u,loading:i=!1,skeletonRows:y=8,empty:v,footer:K,scrollable:ne=!1,scrollResetKey:re,caption:z,className:oe,style:le}){const w=c.useRef(null);c.useEffect(()=>{var s;(s=w.current)==null||s.scrollTo({top:0})},[re]),c.useEffect(()=>{if(!b||!w.current)return;const s=w.current.querySelector(`[data-row-key="${CSS.escape(b)}"]`);s==null||s.scrollIntoView({block:"nearest"})},[b,n]);const A=[h?"40px":null,...t.map(s=>s.width)].filter(Boolean).join(" "),E=new Set(r),D=n.map(p),P=D.filter(s=>E.has(s)),x=n.length>0&&P.length===n.length,ie=P.length>0&&!x;function ce(){l&&l(x?[]:D)}function de(s){l&&l(a=>a.includes(s)?a.filter(d=>d!==s):[...a,s])}const he=!i&&n.length===0;return e.jsxs("div",{className:f("cg-table",ne&&"cg-table--scroll",oe),style:le,children:[z&&e.jsx("div",{className:"cg-sr-only",children:z}),e.jsxs("div",{className:"cg-table__grid cg-table__head",style:{gridTemplateColumns:A},children:[h&&e.jsx(W,{checked:x,indeterminate:ie,onChange:ce,disabled:n.length===0,"aria-label":x?"Clear selection":"Select all visible visitors"}),t.map(s=>{const a=(o==null?void 0:o.key)===s.key,d=a&&o.dir==="asc"?"↑":"↓",S=e.jsxs(e.Fragment,{children:[s.label,e.jsx("span",{className:f("cg-table__arrow",!a&&"cg-table__arrow--idle"),"aria-hidden":"true",children:d})]});return e.jsx("div",{className:f("cg-table__th",s.align==="right"&&"cg-table__th--right"),"aria-sort":a?o.dir==="asc"?"ascending":"descending":"none",children:s.sortable&&g?e.jsx("button",{type:"button",className:f("cg-table__sort",a&&"cg-table__sort--active"),onClick:()=>g(s.key),children:S}):e.jsx("span",{className:"cg-table__th",children:s.label})},s.key)})]}),e.jsxs("div",{className:"cg-table__body",ref:w,children:[i&&Array.from({length:y}).map((s,a)=>e.jsxs("div",{className:"cg-table__grid cg-table__skeleton-row",style:{gridTemplateColumns:A},"aria-hidden":"true",children:[h&&e.jsx("div",{className:"cg-table__bone",style:{width:16,height:16}}),t.map(d=>e.jsx(c.Fragment,{children:d.skeleton?d.skeleton(a):e.jsx("div",{className:"cg-table__bone",style:{height:10,width:"60%"}})},d.key))]},`sk-${a}`)),!i&&n.map(s=>{const a=p(s),d=b===a,S=E.has(a);return e.jsxs("div",{role:"button",tabIndex:0,"aria-current":d?"true":void 0,"data-row-key":a,className:f("cg-table__grid","cg-table__row",d&&"cg-table__row--active",S&&"cg-table__row--checked"),style:{gridTemplateColumns:A},onClick:()=>u==null?void 0:u(s),onKeyDown:m=>{(m.key==="Enter"||m.key===" ")&&(m.preventDefault(),u==null||u(s))},children:[h&&e.jsx(W,{checked:S,onChange:()=>de(a),"aria-label":`Select ${a}`}),t.map(m=>e.jsx("div",{className:f("cg-table__cell",m.align==="right"&&"cg-table__cell--right"),children:m.render(s)},m.key))]},a)}),he&&v]}),K&&e.jsx("div",{className:"cg-table__footer",children:K})]})}try{k.displayName="DataTable",k.__docgenInfo={description:"",displayName:"DataTable",props:{columns:{defaultValue:null,description:"",name:"columns",required:!0,type:{name:"DataTableColumn<T>[]"}},rows:{defaultValue:null,description:"",name:"rows",required:!0,type:{name:"T[]"}},rowKey:{defaultValue:null,description:"",name:"rowKey",required:!0,type:{name:"(row: T) => string"}},sort:{defaultValue:null,description:"",name:"sort",required:!1,type:{name:"SortState"}},onSortChange:{defaultValue:null,description:"",name:"onSortChange",required:!1,type:{name:"((key: string) => void)"}},selectable:{defaultValue:{value:"false"},description:"Adds the leading checkbox column and the select-all header control.",name:"selectable",required:!1,type:{name:"boolean"}},checkedKeys:{defaultValue:{value:"[]"},description:"",name:"checkedKeys",required:!1,type:{name:"string[]"}},onCheckedChange:{defaultValue:null,description:`Same shape as a \`useState\` setter, and deliberately so: row toggles are
emitted as updater functions, so several clicks landing inside one React
batch each see the previous selection rather than the one from the last
render. Passing a raw array from props would silently drop all but the
final click.`,name:"onCheckedChange",required:!1,type:{name:"Dispatch<SetStateAction<string[]>>"}},activeKey:{defaultValue:{value:"null"},description:"The row currently drilled into. Gets the selection rail.",name:"activeKey",required:!1,type:{name:"string | null"}},onRowActivate:{defaultValue:null,description:"",name:"onRowActivate",required:!1,type:{name:"((row: T) => void)"}},loading:{defaultValue:{value:"false"},description:"",name:"loading",required:!1,type:{name:"boolean"}},skeletonRows:{defaultValue:{value:"8"},description:"",name:"skeletonRows",required:!1,type:{name:"number"}},empty:{defaultValue:null,description:"Shown instead of rows when `rows` is empty and not loading.",name:"empty",required:!1,type:{name:"ReactNode"}},footer:{defaultValue:null,description:"Pinned below the body — where `Pagination` goes.",name:"footer",required:!1,type:{name:"ReactNode"}},scrollable:{defaultValue:{value:"false"},description:`Gives the table its own scrolling body: the header and footer stay put
and only the rows move. The table then fills whatever height its parent
gives it, so the parent must size it (flex, grid or an explicit height).`,name:"scrollable",required:!1,type:{name:"boolean"}},scrollResetKey:{defaultValue:null,description:`Change this value to return the body to the top — typically the current
page number, so a new page never opens scrolled halfway down.`,name:"scrollResetKey",required:!1,type:{name:"string | number"}},caption:{defaultValue:null,description:"",name:"caption",required:!1,type:{name:"string"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},style:{defaultValue:null,description:"",name:"style",required:!1,type:{name:"CSSProperties"}}}}}catch{}const q=[{ip:"185.220.101.42",sub:"Datacenter · Frankfurt",status:"Blocked",score:88,label:"Automated traffic",visits:5,paid:4,blockedOn:"Google Ads, Meta Ads",blockedDay:"Sep 9",lastSeen:"38 h ago"},{ip:"102.89.14.7",sub:"Mobile · Lagos",status:"Blocked",score:96,label:"Click farm pattern",visits:14,paid:14,blockedOn:"Google Ads, Meta Ads",blockedDay:"Sep 10",lastSeen:"14 h ago"},{ip:"77.111.246.19",sub:"VPN · London",status:"Flagged",score:58,label:"Repeat clicks, but converted",visits:7,paid:3,blockedOn:"—",blockedDay:"",lastSeen:"2 d ago"},{ip:"24.6.113.201",sub:"Residential · Austin",status:"Clean",score:8,label:"Normal behavior",visits:2,paid:1,blockedOn:"—",blockedDay:"",lastSeen:"25 h ago"}],R=[{key:"visitor",label:"Visitor",width:"1.35fr",sortable:!0,render:t=>e.jsxs("div",{className:"cg-truncate",children:[e.jsx("div",{className:"cg-mono",style:{fontSize:"var(--cg-text-13)"},children:t.ip}),e.jsx("div",{style:{fontSize:"var(--cg-text-12)",color:"var(--cg-text-muted)",marginTop:2},children:t.sub})]}),skeleton:()=>e.jsxs("div",{children:[e.jsx("div",{className:"cg-table__bone",style:{height:10,width:96}}),e.jsx("div",{className:"cg-table__bone cg-table__bone--faint",style:{height:8,width:72,marginTop:8}})]})},{key:"status",label:"Status",width:"128px",sortable:!0,render:t=>e.jsx(ue,{status:t.status}),skeleton:()=>e.jsx("div",{className:"cg-table__bone",style:{height:18,width:64,borderRadius:999}})},{key:"threat",label:"Threat",width:"1.6fr",sortable:!0,render:t=>e.jsx(pe,{score:t.score,label:t.label,status:t.status})},{key:"visits",label:"Visits",width:"96px",sortable:!0,render:t=>e.jsxs("div",{children:[e.jsx("div",{className:"cg-num",children:t.visits}),e.jsxs("div",{style:{fontSize:"var(--cg-text-12)",color:"var(--cg-text-muted)",marginTop:2},children:[t.paid," paid"]})]})},{key:"blocked",label:"Blocked on",width:"1.5fr",sortable:!0,render:t=>e.jsxs("div",{className:"cg-truncate",children:[e.jsx("div",{children:t.blockedOn}),t.blockedDay&&e.jsx("div",{style:{fontSize:"var(--cg-text-12)",color:"var(--cg-text-muted)",marginTop:2},children:t.blockedDay})]})},{key:"lastSeen",label:"Last seen",width:"110px",sortable:!0,render:t=>e.jsx("span",{style:{color:"var(--cg-text-secondary)"},children:t.lastSeen})}],Te={title:"Threat monitoring/DataTable",component:k,args:{columns:R,rows:q,rowKey:t=>t.ip,selectable:!0},parameters:{layout:"padded",docs:{description:{component:"A grid-based table that takes column definitions with their own track widths and renderers. It owns sorting affordances, row selection, the drilled-in row treatment, the loading skeleton and the empty slot — so a screen supplies data and columns, never layout."}}}},_={render:()=>{const[t,n]=c.useState({key:"lastSeen",dir:"desc"}),[p,o]=c.useState([]),[g,h]=c.useState("102.89.14.7");return e.jsxs("div",{className:"sb-stack",style:{maxWidth:"none"},children:[e.jsx(k,{columns:R,rows:q,rowKey:r=>r.ip,sort:t,onSortChange:r=>n(l=>l.key===r?{key:r,dir:l.dir==="asc"?"desc":"asc"}:{key:r,dir:r==="visitor"?"asc":"desc"}),selectable:!0,checkedKeys:p,onCheckedChange:o,activeKey:g,onRowActivate:r=>h(l=>l===r.ip?null:r.ip),caption:"Visitors"}),e.jsxs("p",{className:"sb-note",children:["Click a row to drill in (ink rail plus a tinted surface), a checkbox to select it for a bulk action (quieter fill), or a column header to sort. Both selected treatments draw from ",e.jsx("code",{children:"--cg-selected-*"}),", so the drilled-in row, the checkboxes and the toolbar chips all agree on what “selected” looks like. Select-all applies only to visible rows — a filtered view that silently selects hidden ones is how people accidentally unblock two hundred visitors."]})]})}},j={name:"Scrolling body with pagination",render:()=>{const t=Array.from({length:37},(i,y)=>{const v=q[y%q.length];return{...v,ip:`${v.ip.split(".").slice(0,3).join(".")}.${y*7%250}`}}),[n,p]=c.useState(1),[o,g]=c.useState(10),[h,r]=c.useState(null),[l,b]=c.useState([]),u=t.slice((n-1)*o,n*o);return e.jsxs("div",{className:"sb-stack",style:{maxWidth:"none"},children:[e.jsx("div",{style:{height:460,display:"flex",flexDirection:"column"},children:e.jsx(k,{columns:R,rows:u,rowKey:i=>i.ip,selectable:!0,checkedKeys:l,onCheckedChange:b,activeKey:h,onRowActivate:i=>r(y=>y===i.ip?null:i.ip),scrollable:!0,scrollResetKey:`${n}-${o}`,style:{flex:1},footer:e.jsx(ge,{page:n,pageSize:o,total:t.length,onPageChange:p,pageSizeOptions:[10,25,50],onPageSizeChange:i=>{g(i),p(1)},itemLabel:"visitors"})})}),e.jsxs("p",{className:"sb-note",children:["With ",e.jsx("code",{children:"scrollable"}),", the header and footer stay fixed and only the rows scroll, so column labels and page controls never leave the screen. The table fills the height its parent gives it — here a 460px frame; in the prototype, whatever is left below the toolbar. Changing page returns the body to the top, and the active row is scrolled into view when it changes."]}),e.jsxs("p",{className:"sb-note",children:["The table must be allowed to ",e.jsx("em",{children:"fill"})," its space but not ",e.jsx("em",{children:"shrink"})," ","below it. In a flex column, items shrink by default — which is exactly the bug that once squashed this table in the prototype and clipped rows with nothing left to scroll."]})]})}},N={args:{rows:[],loading:!0}},C={name:"Empty — nothing to block yet",args:{rows:[],empty:e.jsx(ae,{icon:"success",title:"Nothing to block yet. We're watching.",description:"Your ads are live and every click is being checked. Visitors appear here the moment we see one, and anything that looks automated gets blocked before it can click again.",footnote:"Connected: Google Ads · Meta Ads"})},parameters:{docs:{description:{story:"An empty threat table is good news, so it gets a green check rather than the usual grey shrug. It also states what *is* happening, because the anxious reading of an empty security screen is 'is this thing even on?'."}}}},T={name:"Empty — filters match nothing",args:{rows:[],empty:e.jsx(ae,{compact:!0,title:"No visitors match these filters",description:'Nothing matches "Tokyo" with the current status and platform filters. Try a shorter search, or clear the filters.',action:e.jsx(me,{children:"Clear filters"})})}},V={args:{footer:"Showing 4 of 22 visitors"}};var O,B,$;_.parameters={..._.parameters,docs:{...(O=_.parameters)==null?void 0:O.docs,source:{originalSource:`{
  render: () => {
    const [sort, setSort] = useState<SortState>({
      key: "lastSeen",
      dir: "desc"
    });
    const [checked, setChecked] = useState<string[]>([]);
    const [active, setActive] = useState<string | null>("102.89.14.7");
    return <div className="sb-stack" style={{
      maxWidth: "none"
    }}>\r
        <DataTable columns={columns} rows={ROWS} rowKey={r => r.ip} sort={sort} onSortChange={key => setSort(s => s.key === key ? {
        key,
        dir: s.dir === "asc" ? "desc" : "asc"
      } : {
        key,
        dir: key === "visitor" ? "asc" : "desc"
      })} selectable checkedKeys={checked} onCheckedChange={setChecked} activeKey={active} onRowActivate={r => setActive(a => a === r.ip ? null : r.ip)} caption="Visitors" />\r
        <p className="sb-note">\r
          Click a row to drill in (ink rail plus a tinted surface), a checkbox to\r
          select it for a bulk action (quieter fill), or a column header to sort.\r
          Both selected treatments draw from <code>--cg-selected-*</code>, so the\r
          drilled-in row, the checkboxes and the toolbar chips all agree on what\r
          &ldquo;selected&rdquo; looks like. Select-all applies only to visible rows —\r
          a filtered view that silently selects hidden ones is how people\r
          accidentally unblock two hundred visitors.\r
        </p>\r
      </div>;
  }
}`,...($=(B=_.parameters)==null?void 0:B.docs)==null?void 0:$.source}}};var I,L,F;j.parameters={...j.parameters,docs:{...(I=j.parameters)==null?void 0:I.docs,source:{originalSource:`{
  name: "Scrolling body with pagination",
  render: () => {
    // Enough rows to need both: 10 per page overflows the fixed-height frame,
    // and 37 rows spans four pages.
    const many: Row[] = Array.from({
      length: 37
    }, (_, i) => {
      const base = ROWS[i % ROWS.length];
      return {
        ...base,
        ip: \`\${base.ip.split(".").slice(0, 3).join(".")}.\${i * 7 % 250}\`
      };
    });
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const [active, setActive] = useState<string | null>(null);
    const [checked, setChecked] = useState<string[]>([]);
    const pageRows = many.slice((page - 1) * size, page * size);
    return <div className="sb-stack" style={{
      maxWidth: "none"
    }}>\r
        <div style={{
        height: 460,
        display: "flex",
        flexDirection: "column"
      }}>\r
          <DataTable columns={columns} rows={pageRows} rowKey={r => r.ip} selectable checkedKeys={checked} onCheckedChange={setChecked} activeKey={active} onRowActivate={r => setActive(a => a === r.ip ? null : r.ip)} scrollable scrollResetKey={\`\${page}-\${size}\`} style={{
          flex: 1
        }} footer={<Pagination page={page} pageSize={size} total={many.length} onPageChange={setPage} pageSizeOptions={[10, 25, 50]} onPageSizeChange={n => {
          setSize(n);
          setPage(1);
        }} itemLabel="visitors" />} />\r
        </div>\r
        <p className="sb-note">\r
          With <code>scrollable</code>, the header and footer stay fixed and only the\r
          rows scroll, so column labels and page controls never leave the screen. The\r
          table fills the height its parent gives it — here a 460px frame; in the\r
          prototype, whatever is left below the toolbar. Changing page returns the body\r
          to the top, and the active row is scrolled into view when it changes.\r
        </p>\r
        <p className="sb-note">\r
          The table must be allowed to <em>fill</em> its space but not <em>shrink</em>{" "}\r
          below it. In a flex column, items shrink by default — which is exactly the bug\r
          that once squashed this table in the prototype and clipped rows with nothing\r
          left to scroll.\r
        </p>\r
      </div>;
  }
}`,...(F=(L=j.parameters)==null?void 0:L.docs)==null?void 0:F.source}}};var G,M,Y;N.parameters={...N.parameters,docs:{...(G=N.parameters)==null?void 0:G.docs,source:{originalSource:`{
  args: {
    rows: [],
    loading: true
  }
}`,...(Y=(M=N.parameters)==null?void 0:M.docs)==null?void 0:Y.source}}};var H,J,Q;C.parameters={...C.parameters,docs:{...(H=C.parameters)==null?void 0:H.docs,source:{originalSource:`{
  name: "Empty — nothing to block yet",
  args: {
    rows: [],
    empty: <EmptyState icon="success" title="Nothing to block yet. We're watching." description="Your ads are live and every click is being checked. Visitors appear here the moment we see one, and anything that looks automated gets blocked before it can click again." footnote="Connected: Google Ads · Meta Ads" />
  },
  parameters: {
    docs: {
      description: {
        story: "An empty threat table is good news, so it gets a green check rather than the usual grey shrug. It also states what *is* happening, because the anxious reading of an empty security screen is 'is this thing even on?'."
      }
    }
  }
}`,...(Q=(J=C.parameters)==null?void 0:J.docs)==null?void 0:Q.source}}};var U,X,Z;T.parameters={...T.parameters,docs:{...(U=T.parameters)==null?void 0:U.docs,source:{originalSource:`{
  name: "Empty — filters match nothing",
  args: {
    rows: [],
    empty: <EmptyState compact title="No visitors match these filters" description={'Nothing matches "Tokyo" with the current status and platform filters. Try a shorter search, or clear the filters.'} action={<Button>Clear filters</Button>} />
  }
}`,...(Z=(X=T.parameters)==null?void 0:X.docs)==null?void 0:Z.source}}};var ee,te,se;V.parameters={...V.parameters,docs:{...(ee=V.parameters)==null?void 0:ee.docs,source:{originalSource:`{
  args: {
    footer: "Showing 4 of 22 visitors"
  }
}`,...(se=(te=V.parameters)==null?void 0:te.docs)==null?void 0:se.source}}};const Ve=["Interactive","ScrollingWithPagination","Loading","EmptyNewAccount","EmptyNoResults","WithFooter"];export{C as EmptyNewAccount,T as EmptyNoResults,_ as Interactive,N as Loading,j as ScrollingWithPagination,V as WithFooter,Ve as __namedExportsOrder,Te as default};
