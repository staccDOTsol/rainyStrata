import{jsx as e,jsxs as r}from"react/jsx-runtime";import{Image as i,WrapItem as t,CloseButton as o,Wrap as n}from"@chakra-ui/react";import{useMemo as l}from"react";const c=new Set("png,jpg,jpeg,gif,mp4,svg".split(","));function s({files:s,onCancelFile:a}){const f={color:"#0645AD",cursor:"pointer"},g=l((()=>s.map((({file:r,name:t})=>{const o=t.split(".").pop();return o&&c.has(o)?{key:t,el:e(i,{mt:"4px",height:"300px",src:"string"==typeof r?r:p(r),alt:t},void 0),file:r}:{key:t,el:e("a",Object.assign({style:f,href:"string"==typeof r?r:p(r),rel:"noreferrer",target:"_blank"},{children:t}),void 0),file:r}})).map((({key:i,el:n,file:l})=>e(t,a?{children:r("div",Object.assign({style:{position:"relative"}},{children:[n,e(o,{position:"absolute",right:"-18px",top:"-12px",color:"gray.400",_hover:{color:"gray.600",cursor:"pointer"},onClick:()=>a(l)},void 0)]}),void 0)}:{children:n},i)))),[a,s]);return 0==s.length?null:e(n,Object.assign({className:"files"},{children:g}),void 0)}function p(e){if(e){return(window.URL||window.webkitURL).createObjectURL(e)}}export{s as Files};
//# sourceMappingURL=Files.js.map
