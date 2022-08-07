import{jsxs as o,jsx as r}from"react/jsx-runtime";import{useColorMode as i,useColorModeValue as e,Flex as t,SkeletonCircle as a,Avatar as n,SkeletonText as s,VStack as c,Text as d}from"@chakra-ui/react";import{useRouter as m}from"next/router";import{useChat as g}from"../../hooks/useChat.js";import{useChatKeyFromIdentifier as h}from"../../hooks/useChatKeyFromIdentifier.js";import{route as l,routes as p}from"../../routes.js";function f({identifier:f,onClick:u}){const{chatKey:v,loading:y}=h(f),{info:j,loading:b}=g(v),x=y||b,{colorMode:k}=i(),w=m(),{id:C}=w.query,O=e("gray.200","gray.800"),z=e("gray.500","gray.400");return o(t,Object.assign({overflow:"none",minW:"200px",align:"center",bg:f===C?O:void 0,px:4,py:3,cursor:"pointer",borderRadius:"10px",_hover:{bg:"light"===k?"gray.200":"gray.700"},onClick:async()=>{await w.push(l(p.chat,{id:f}),void 0,{shallow:!0}),u&&u()}},{children:[x?r(a,{mr:2},void 0):r(n,{mr:2,size:"md",src:j?.imageUrl},void 0),x?r(s,{width:"200px"},void 0):o(c,Object.assign({spacing:0,align:"start"},{children:[r(d,Object.assign({fontSize:"md",_dark:{color:"white"}},{children:j?.name}),void 0),o(d,Object.assign({fontSize:"sm",color:z},{children:[f,".chat"]}),void 0)]}),void 0)]}),void 0)}export{f as ChatSidebarPreview};
//# sourceMappingURL=ChatSidebarPreview.js.map
