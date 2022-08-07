import{jsx as e,jsxs as o}from"react/jsx-runtime";import t,{useRef as r,useState as s,useMemo as i,useCallback as a}from"react";import{useOutsideClick as n,useColorModeValue as l,Skeleton as d,Tooltip as c,HStack as m,Icon as g,Box as p,Flex as f,VStack as h,Avatar as j,Hide as u,Text as v}from"@chakra-ui/react";import{useWallet as b}from"@solana/wallet-adapter-react";import{MessageType as y}from"@strata-foundation/chat";import{useMint as w,useTokenMetadata as x,useErrorHandler as O}from"@strata-foundation/react";import{humanReadable as k,toNumber as M}from"@strata-foundation/spl-utils";import A from"moment";import{useAsync as C}from"react-async-hook";import{BsLockFill as T}from"react-icons/bs";import{BuyMoreButton as P}from"../BuyMoreButton.js";import{useEmojis as R}from"../../contexts/emojis.js";import{useSendMessage as B}from"../../contexts/sendMessage.js";import{useReply as I}from"../../contexts/reply.js";import{useWalletProfile as D}from"../../hooks/useWalletProfile.js";import{useChatOwnedAmounts as K}from"../../hooks/useChatOwnedAmounts.js";import{useChatPermissionsFromChat as S}from"../../hooks/useChatPermissionsFromChat.js";import{MessageBody as z}from"./MessageBody.js";import{MessageToolbar as U}from"./MessageToolbar.js";import{DisplayReply as E}from"./DisplayReply.js";import{MessageHeader as F}from"./MessageHeader.js";import{Reacts as L}from"./Reacts.js";import{MessageStatus as $}from"./MessageStatus.js";const _={allowedTags:["b","i","em","strong","a","code","ul","li","p"],allowedAttributes:{a:["href","target"]}};function H(t){const H=r(),[N,Y]=s(!1);n({ref:H,handler:()=>Y(!1)});const{id:q,getDecodedMessage:G,sender:J,readPermissionAmount:Q,chatKey:V,txids:X,startBlockTime:Z,htmlAllowlist:ee=_,reacts:oe,type:te,showUser:re=!0,pending:se=!1,reply:ie,scrollToMessage:ae}=t,{publicKey:ne}=b(),{referenceMessageId:le,showPicker:de}=R(),{info:ce}=D(J),{info:me}=S(V),ge=i((()=>{if(Z){const e=new Date(0);return e.setUTCSeconds(Z),e}}),[Z]),pe=me?.readPermissionKey,fe=w(pe),{metadata:he}=x(pe),je=fe&&Q&&k(Q,fe),{ownedReadAmount:ue,ownedPostAmount:ve}=K(ne||void 0,V),be=i((()=>Q&&fe&&(ue||0)<M(Q,fe)),[Q,fe,ue]),{result:ye,loading:we,error:xe}=C((e=>G?G():Promise.resolve(void 0)),[be]),Oe=l("gray.400","gray.600"),ke=l("gray.200","gray.800"),{handleErrors:Me}=O(),{sendMessage:Ae,error:Ce}=B();Me(Ce,xe);const Te=a((()=>{de(q)}),[de,q]),{replyMessage:Pe}=I(),Re=i((()=>q===le||q===Pe?.id||N?ke:"initial"),[ke,le,q,Pe?.id,N]),Be=l("black","white"),Ie=i((()=>e(d,Object.assign({startColor:Oe,height:"20px"},{children:Array.from({length:W(q||"")},(()=>".")).join()}),void 0)),[q,Oe]),De=a((t=>e(c,Object.assign({label:`You need ${je} ${he?.data.symbol} to read this message`},{children:o(m,Object.assign({onClick:t.onClick,spacing:2,_hover:{cursor:"pointer"}},{children:[e(d,Object.assign({startColor:Oe,height:"20px",speed:1e5},{children:Array.from({length:W(q||"")},(()=>".")).join()}),void 0),e(g,{color:Oe,as:T},void 0)]}),void 0)}),void 0)),[je,he,Oe,q]);return ye?.type===y.React?null:o(p,Object.assign({ref:H,onMouseEnter:()=>Y(!0),onMouseLeave:()=>Y(!1),onClick:()=>Y(!0),position:"relative"},{children:[N&&e(f,Object.assign({position:"absolute",right:{base:8,md:28},top:-4,zIndex:1,justifyContent:"flex-end",alignItems:"flex-end",onClick:e=>e.preventDefault()},{children:e(U,Object.assign({},t),void 0)}),void 0),e(p,Object.assign({bg:Re},{children:o(h,Object.assign({spacing:0,gap:0,w:"full"},{children:[ie&&e(E,{reply:ie,scrollToMessage:ae},void 0),o(m,Object.assign({pl:2,pr:2,pb:1,pt:ie?0:1,w:"full",align:"start",spacing:2,className:"strata-message"},{children:[re?e(j,{mt:"6px",size:"sm",src:ce?.imageUrl},void 0):e(p,{w:"34px"},void 0),o(h,Object.assign({w:"full",align:"start",spacing:0},{children:[re&&e(F,{chatKey:V,sender:J,startBlockTime:Z},void 0),e(p,Object.assign({w:"fit-content",position:"relative",textAlign:"left",wordBreak:"break-word",color:Be,id:q},{children:!be&&ye&&te?e(z,{htmlAllowlist:ee,message:ye,messageType:te},void 0):we?Ie:be?e(P,{mint:pe,trigger:De},void 0):e(c,Object.assign({label:"Failed to decode message"},{children:e(d,Object.assign({startColor:Oe,height:"20px",speed:1e5},{children:Array.from({length:W(q||"")},(()=>".")).join()}),void 0)}),void 0)}),void 0),oe&&oe.length>0&&e(L,{onAddReaction:Te,reacts:oe,onReact:(e,o)=>{o||Ae({message:{type:y.React,emoji:e,referenceMessageId:q}})}},void 0)]}),void 0),o(m,Object.assign({alignItems:"center",flexShrink:0},{children:[re&&e(u,Object.assign({below:"md"},{children:e(v,Object.assign({fontSize:"xs",color:"gray.500",_dark:{color:"gray.400"}},{children:A(ge).format("LT")}),void 0)}),void 0),e($,{txids:X,pending:se},void 0)]}),void 0)]}),void 0)]}),void 0)}),void 0)]}),void 0)}const N={};function W(e){return N[e]||(N[e]=10+100*Math.random()),N[e]}const Y=t.memo(H);export{Y as MemodMessage,H as Message};
//# sourceMappingURL=Message.js.map
