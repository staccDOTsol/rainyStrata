import{useRef as t,useState as r,useCallback as e,useEffect as a}from"react";import n from"@emoji-mart/data";const c=()=>{const c=t(),[i,m]=r([]),[o,l]=r(),s=e((t=>{let r,e;return(r=t.currentTarget.value.substring(0,t.currentTarget.selectionStart).match(/(^|\W):((:?\w|\+|\-)[^:]*)?$/))?(e=r[0].match(/:(.*)/)[1],(e.match(RegExp(" ","g"))||[]).length>1?null:e):null}),[]),u=e((()=>{m([]),l(null)}),[m]),h=e((async t=>{let r=s(t);r&&r.length>=2?(l(r),m(await c.current(r))):u()}),[c,m,s,u]);return a((()=>{(async()=>{if(!c.current){const t=await import("emoji-mart");await t.init({data:n}),c.current=t.SearchIndex.search}})()})),{emojis:i,searchMatch:o,getCurrentlyTypedEmoji:s,search:h,reset:u}};export{c as useEmojiSearch};
//# sourceMappingURL=useEmojiSearch.js.map
