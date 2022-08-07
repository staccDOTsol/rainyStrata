import{jsx as e,jsxs as i,Fragment as o}from"react/jsx-runtime";import{useDisclosure as n,useColorModeValue as t,Flex as s,Popover as r,PopoverTrigger as a,PopoverContent as l,PopoverBody as c,VStack as d,Text as m,Divider as h,HStack as p,Icon as g,CloseButton as v,Menu as f,MenuButton as u,IconButton as b,MenuList as j,MenuItem as y,Button as O,Modal as x,ModalOverlay as k,ModalContent as w,ModalHeader as C,ModalCloseButton as A,ModalBody as S,InputGroup as M,Input as F,InputRightAddon as H}from"@chakra-ui/react";import{AiFillLock as P,AiOutlinePlus as R,AiOutlineGif as I,AiOutlineSend as E}from"react-icons/ai";import{MessageType as L}from"@strata-foundation/chat";import{useTokenMetadata as T,useMint as z,useErrorHandler as D}from"@strata-foundation/react";import{useRef as K,useState as G,useEffect as B,useCallback as U}from"react";import{useAsyncCallback as W}from"react-async-hook";import $ from"react-hot-toast";import{IoMdAttach as _}from"react-icons/io";import{Converter as N}from"showdown";import{useSendMessage as q}from"../../contexts/sendMessage.js";import{useReply as J}from"../../contexts/reply.js";import{useEmojiSearch as Q}from"../../hooks/useEmojiSearch.js";import{Files as V}from"../Files.js";import{GifSearch as X}from"../GifSearch.js";import{LongPromiseNotification as Y}from"../LongPromiseNotification.js";import{ChatInput as Z}from"./ChatInput.js";import{ReplyBar as ee}from"./ReplyBar.js";import{useAnalyticsEventTracker as ie}from"../../hooks/useAnalyticsEventTracker.js";import{useChatPermissionsFromChat as oe}from"@/hooks/useChatPermissionsFromChat";import{toNumber as ne,toBN as te}from"@strata-foundation/spl-utils";const se=new N({simpleLineBreaks:!0}),re={base:"full",md:"50%"};function ae({chatKey:N,onAddPendingMessage:ae,files:le,setFiles:ce,onUploadFile:de}){const me=K(null),[he,pe]=G(""),{emojis:ge,search:ve,searchMatch:fe,reset:ue}=Q(),{isOpen:be,onToggle:je,onClose:ye}=n(),Oe=ie(),{info:xe}=oe(N),{metadata:ke}=T(xe?.readPermissionKey),we=z(xe?.readPermissionKey),Ce=t("gray.100","gray.800"),{handleErrors:Ae}=D(),{isOpen:Se,onClose:Me,onOpen:Fe}=n(),[He,Pe]=G();B((()=>{we&&xe&&Pe(ne(xe.defaultReadPermissionAmount,we).toString())}),[we,xe]);const[Re,Ie]=G(),[Ee,Le]=G(!1),{sendMessage:Te,error:ze}=q(),De=U((e=>ce((i=>i.filter((i=>i.file!=e))))),[ce]),{replyMessage:Ke,hideReply:Ge}=J();B((()=>{Ke&&me.current?.focus()}),[Ke]);const Be=e=>{Le(!1),ae&&ae(e)},{execute:Ue}=W((async i=>{pe(""),ue(),Le(!0),Ge();try{Ke?.id&&(i.referenceMessageId=Ke?.id);const o={message:i,onAddPendingMessage:Be};if(Re&&(o.readPermissionAmount=te(Re,we),Ie(void 0)),i.fileAttachments&&i.fileAttachments.length>0){const n=`Uploading ${i.fileAttachments.map((e=>e.name))} to SHDW Drive...`;$.custom((i=>e(Y,{estTimeMillis:6e4,text:n,onError:e=>{Ae(e),$.dismiss(i.id)},exec:async()=>(await Te(o),!0),onComplete:async()=>{$.dismiss(i.id)}},void 0)),{duration:1/0}),ce([])}else await Te(o)}finally{Le(!1)}Oe({action:"Send Message"})})),We=U((async e=>{const i=e.currentTarget.value;ve(e),pe(i)}),[pe,ve]),$e=U((e=>{"Enter"===e.key&&(e.shiftKey||(e.preventDefault(),Ue({type:L.Html,html:se.makeHtml(he.replace("\n","\n\n")),fileAttachments:le})))}),[Ue,le,he]);B((()=>{if(me.current){me.current.style.height="0px";const e=me.current.scrollHeight;me.current.style.height=e+"px"}}),[me,he]);const _e=U((()=>Ue({type:L.Html,html:se.makeHtml(he),fileAttachments:le})),[Ue,he,le]);return Ae(ze),i(o,{children:[i(s,Object.assign({direction:"column",position:"sticky",bottom:0,p:2,w:"full",minH:"76px"},{children:[i(r,Object.assign({matchWidth:!0,isOpen:ge.length>0,placement:"top",autoFocus:!1,closeOnBlur:!1},{children:[e(a,{children:e(s,{w:"full"},void 0)},void 0),e(l,Object.assign({bg:Ce,border:"none",w:re},{children:e(c,Object.assign({px:0,pt:0},{children:i(d,Object.assign({spacing:0,w:"full",align:"start"},{children:[i(m,Object.assign({p:2,fontSize:"xs",fontWeight:"bold",textTransform:"uppercase",lineHeight:"normal"},{children:["Emojis Matching :",e(m,Object.assign({as:"span",textTransform:"none"},{children:fe}),void 0)]}),void 0),e(h,{},void 0),ge.map(((o,n)=>i(p,Object.assign({w:"full",p:2,onClick:()=>{return e=o.skins[0].native,pe([`:${fe}`,`:${fe}:`].reduce(((i,o)=>i.replace(o,e)),he)),me.current?.focus(),void ue();var e},_hover:{cursor:"pointer",bg:"gray.200",_dark:{bg:"gray.700"}}},{children:[e(m,Object.assign({fontSize:"xl"},{children:o.skins[0].native}),void 0),e(m,Object.assign({fontSize:"sm"},{children:o.name}),void 0)]}),o.name)))]}),void 0)}),void 0)}),void 0)]}),void 0),i(d,Object.assign({p:"10px",spacing:2,w:"full",align:"left",bg:Ce,rounded:"lg"},{children:[e(V,{files:le,onCancelFile:De},void 0),Re&&i(p,Object.assign({spacing:1,alignItems:"center"},{children:[e(g,{as:P},void 0),i(m,{children:[Re," ",ke?.data.symbol]},void 0),e(v,{color:"gray.400",_hover:{color:"gray.600",cursor:"pointer"},onClick:()=>Ie(void 0)},void 0)]}),void 0),e(ee,{},void 0),i(p,Object.assign({w:"full",alignItems:"flex-end"},{children:[e(Z,{inputRef:me,onChange:We,value:he,onKeyDown:$e},void 0),i(f,Object.assign({isLazy:!0},{children:[e(u,{as:b,isLoading:Ee,variant:"outline","aria-label":"Attachment",icon:e(g,{w:"24px",h:"24px",as:R},void 0)},void 0),i(j,{children:[e(y,Object.assign({icon:e(g,{mt:"3px",h:"16px",w:"16px",as:_},void 0),onClick:de},{children:"Upload File"}),void 0),e(y,Object.assign({icon:e(g,{mt:"3px",h:"16px",w:"16px",as:I},void 0),onClick:je},{children:"GIF"}),void 0)]},void 0)]}),void 0),e(b,{variant:"outline","aria-label":"Additional Message Locking",onClick:Fe,icon:e(g,{w:"24px",h:"24px",as:P},void 0)},void 0),e(O,Object.assign({isLoading:Ee,colorScheme:"primary",variant:"outline",isDisabled:!he&&0==le.length,onClick:_e},{children:e(g,{as:E},void 0)}),void 0)]}),void 0)]}),void 0)]}),void 0),i(x,Object.assign({isOpen:be,onClose:ye,size:"2xl",isCentered:!0,trapFocus:!0},{children:[e(k,{},void 0),i(w,Object.assign({borderRadius:"xl",shadow:"xl"},{children:[e(C,{children:"Select GIF"},void 0),e(A,{},void 0),e(S,{children:e(X,{onSelect:e=>{ye(),Ue({type:L.Gify,gifyId:e})}},void 0)},void 0)]}),void 0)]}),void 0),e(x,Object.assign({isOpen:Se,onClose:Me,isCentered:!0},{children:i(w,Object.assign({p:4,borderRadius:"xl"},{children:[e(C,Object.assign({pb:0},{children:"Change Read Amount"}),void 0),e(S,{children:i(d,Object.assign({spacing:8},{children:[i(m,{children:["Holders in the chat will need this amount of"," ",ke?.data.symbol," to read this message."]},void 0),i(M,{children:[e(F,{borderRight:"none",value:He,onChange:e=>Pe(e.target.value),type:"number",step:Math.pow(10,-(we?.decimals||0))},void 0),e(H,{children:ke?.data.symbol},void 0)]},void 0),i(p,Object.assign({w:"full",spacing:2},{children:[e(O,Object.assign({w:"full",variant:"outline",onClick:()=>Me()},{children:"Close"}),void 0),e(O,Object.assign({w:"full",colorScheme:"primary",onClick:()=>{He&&Ie(Number(He)),Me()}},{children:"Set Amount"}),void 0)]}),void 0)]}),void 0)},void 0)]}),void 0)}),void 0)]},void 0)}export{ae as Chatbox};
//# sourceMappingURL=Chatbox.js.map
