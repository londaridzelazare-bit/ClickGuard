import{j as u}from"./jsx-runtime-DF2Pcvd1.js";import{E as m}from"./EmptyState-4Y9rD5rO.js";import{B as p}from"./Button-DMpeJ588.js";import"./index-B2-qRKKC.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./cx-DJxyWpib.js";import"./Icon-4ZrsAClT.js";const N={title:"Primitives/EmptyState",component:m,parameters:{layout:"padded",backgrounds:{default:"raised"}}},e={name:"New account — good news",args:{icon:"success",title:"Nothing to block yet. We're watching.",description:"Your ads are live and every click is being checked. Visitors appear here the moment we see one, and anything that looks automated gets blocked before it can click again.",footnote:"Connected: Google Ads · Meta Ads"},parameters:{docs:{description:{story:"An empty threat table is good news, so it gets a green check rather than the usual grey shrug. It also says what *is* happening, because the anxious reading of an empty security screen is 'is this thing even switched on?' — and an advertiser who thinks it is off turns it off."}}}},t={name:"Filters match nothing — the user's own doing",args:{compact:!0,title:"No visitors match these filters",description:'Nothing matches "Tokyo" with the current status and platform filters. Try a shorter search, or clear the filters.',action:u.jsx(p,{children:"Clear filters"})},parameters:{docs:{description:{story:"No icon here. This is not a product state, it is the user's own filter — dressing it up with an illustration would imply something went wrong. It names the actual search term so the fix is obvious, and hands over the one button that fixes it."}}}},s={args:{icon:"neutral",compact:!0,title:"No visitors blocked in this period",description:"We've seen 22 visitors in the last 30 days and none of them crossed the block threshold. Widen the date range to look further back."}};var o,r,a;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`{
  name: "New account — good news",
  args: {
    icon: "success",
    title: "Nothing to block yet. We're watching.",
    description: "Your ads are live and every click is being checked. Visitors appear here the moment we see one, and anything that looks automated gets blocked before it can click again.",
    footnote: "Connected: Google Ads · Meta Ads"
  },
  parameters: {
    docs: {
      description: {
        story: "An empty threat table is good news, so it gets a green check rather than the usual grey shrug. It also says what *is* happening, because the anxious reading of an empty security screen is 'is this thing even switched on?' — and an advertiser who thinks it is off turns it off."
      }
    }
  }
}`,...(a=(r=e.parameters)==null?void 0:r.docs)==null?void 0:a.source}}};var i,n,c;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`{
  name: "Filters match nothing — the user's own doing",
  args: {
    compact: true,
    title: "No visitors match these filters",
    description: 'Nothing matches "Tokyo" with the current status and platform filters. Try a shorter search, or clear the filters.',
    action: <Button>Clear filters</Button>
  },
  parameters: {
    docs: {
      description: {
        story: "No icon here. This is not a product state, it is the user's own filter — dressing it up with an illustration would imply something went wrong. It names the actual search term so the fix is obvious, and hands over the one button that fixes it."
      }
    }
  }
}`,...(c=(n=t.parameters)==null?void 0:n.docs)==null?void 0:c.source}}};var h,d,l;s.parameters={...s.parameters,docs:{...(h=s.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    icon: "neutral",
    compact: true,
    title: "No visitors blocked in this period",
    description: "We've seen 22 visitors in the last 30 days and none of them crossed the block threshold. Widen the date range to look further back."
  }
}`,...(l=(d=s.parameters)==null?void 0:d.docs)==null?void 0:l.source}}};const x=["NothingToBlockYet","NoResults","NoBlockedYet"];export{s as NoBlockedYet,t as NoResults,e as NothingToBlockYet,x as __namedExportsOrder,N as default};
