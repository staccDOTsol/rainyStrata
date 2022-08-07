import{jsx as i,Fragment as e,jsxs as o}from"react/jsx-runtime";import{useDisclosure as t,Flex as n,VStack as s,Button as a,Text as d,Box as r,HStack as l,Divider as c,Avatar as m}from"@chakra-ui/react";import{useWallet as p}from"@solana/wallet-adapter-react";import{useWalletModal as g}from"@solana/wallet-adapter-react-ui";import{useErrorHandler as h,useMint as v,useTokenMetadata as b,roundToDecimals as f}from"@strata-foundation/react";import{toNumber as u}from"@strata-foundation/spl-token-bonding";import{useChatPermissionsFromChat as j}from"../../hooks/useChatPermissionsFromChat.js";import{useLoadDelegate as O}from"../../hooks/useLoadDelegate.js";import{useChatOwnedAmounts as x}from"../../hooks/useChatOwnedAmounts.js";import{BuyMoreButton as y}from"../BuyMoreButton.js";import{LoadWalletModal as w}from"../LoadWalletModal.js";import{Chatbox as P}from"./Chatbox.js";import{NATIVE_MINT as z}from"@solana/spl-token";const C={bg:"linear-gradient(0deg, rgba(17,24,39) 40%, rgba(21,24,38,0) 100%)"};function k({chatKey:k,onAddPendingMessage:A,files:W,setFiles:K,onUploadFile:S}){const{isOpen:T,onOpen:L,onClose:M}=t(),{connected:F,publicKey:R}=p(),{setVisible:I}=g(),{delegateWallet:B,needsTopOff:D,needsInit:U,loading:Y,error:q}=O(),{isOpen:E,onClose:H,onOpen:V}=t({defaultIsOpen:!1}),{handleErrors:_}=h(),{info:G}=j(k),J=G?.readPermissionKey,N=G?.postPermissionKey,Q=v(J),X=v(N),{metadata:Z,image:$}=b(J),{metadata:ii,image:ei}=b(N),{ownedReadAmount:oi,ownedPostAmount:ti,isSame:ni}=x(R||void 0,k),si=G?.postPermissionAmount&&X&&u(G?.postPermissionAmount,X),ai=void 0===si||void 0===ti||ti>=si;return _(q),i(n,Object.assign({w:"full",position:"relative"},{children:F&&ai&&!D?o(s,Object.assign({w:"full"},{children:[!B&&o(l,Object.assign({mb:-3,mt:1,fontSize:"sm"},{children:[i(d,Object.assign({fontWeight:"bold"},{children:"Tired of approving transactions?"}),void 0),i(a,Object.assign({fontSize:"sm",variant:"link",size:"md",colorScheme:"primary",onClick:()=>V(),px:16},{children:"Load Delegate Wallet"}),void 0)]}),void 0),(D||U)&&i(w,{isOpen:E,onClose:H,onLoaded:H},void 0),i(P,{chatKey:k,onAddPendingMessage:A,files:W,setFiles:K,onUploadFile:S},void 0)]}),void 0):i(n,Object.assign({position:"absolute",bottom:"0",pb:12,pt:40,w:"full",justify:"center",bg:"linear-gradient(0deg, rgba(255,255,255) 40%, rgba(255,255,255,0) 100%)",_dark:C},{children:i(s,Object.assign({w:"full",h:"full",justify:"center",align:"center",maxW:"360px"},{children:F?ai?D?o(e,{children:[i(w,{isOpen:T,onClose:M,onLoaded:()=>M()},void 0),i(n,Object.assign({justify:"center",mb:"6px"},{children:i(a,Object.assign({isLoading:Y,size:"md",colorScheme:"primary",onClick:()=>L(),px:16},{children:"Top Off Chat Wallet"}),void 0)}),void 0)]},void 0):null:o(e,{children:[i(d,Object.assign({fontWeight:"bold",align:"center"},{children:"In order to participate in this chat:"}),void 0),o(r,Object.assign({w:"full",fontSize:"sm"},{children:[Z&&o(l,Object.assign({spacing:1},{children:[i(d,{children:"Read Message"},void 0),i(n,Object.assign({grow:1},{children:i(c,{variant:"dashed"},void 0)}),void 0),o(d,Object.assign({fontWeight:"bold",textTransform:"capitalize"},{children:["Hold"," ",G?.defaultReadPermissionAmount&&Q&&f(u(G.defaultReadPermissionAmount,Q),4)]}),void 0),i(m,{w:"18px",h:"18px",title:Z?.data.symbol,src:$},void 0)]}),void 0),ii&&o(l,Object.assign({spacing:1},{children:[i(d,{children:"Post Message"},void 0),i(n,Object.assign({grow:1},{children:i(c,{variant:"dashed"},void 0)}),void 0),o(d,Object.assign({fontWeight:"bold",textTransform:"capitalize"},{children:[Object.keys(G?.postPermissionAction||{})[0]," ",G?.postPermissionAmount&&X&&f(u(G.postPermissionAmount,X),4)]}),void 0),i(m,{w:"18px",h:"18px",title:ii?.data.symbol,src:ei},void 0)]}),void 0)]}),void 0),o(r,Object.assign({w:"full",fontSize:"sm"},{children:[Z&&o(l,Object.assign({spacing:1},{children:[i(d,{children:"You currently have"},void 0),i(n,Object.assign({grow:1},{children:i(c,{variant:"dashed"},void 0)}),void 0),i(d,Object.assign({fontWeight:"bold",textTransform:"capitalize"},{children:oi?f(oi,4):0}),void 0),i(m,{w:"18px",h:"18px",title:Z?.data.symbol,src:$},void 0)]}),void 0),!ni&&ii&&o(l,Object.assign({spacing:1},{children:[i(d,{children:"You currently have"},void 0),i(n,Object.assign({grow:1},{children:i(c,{variant:"dashed"},void 0)}),void 0),i(d,Object.assign({fontWeight:"bold",textTransform:"capitalize"},{children:ti?f(ti,4):0}),void 0),i(m,{w:"18px",h:"18px",title:ii?.data.symbol,src:ei},void 0)]}),void 0)]}),void 0),o(r,Object.assign({pt:4},{children:[i(y,{mint:G?.readPermissionKey,btnProps:{px:16,size:"md",variant:"solid"}},void 0),!ni&&G&&!z.equals(G?.postPermissionKey)&&i(y,{mint:G?.postPermissionKey,btnProps:{px:16,size:"md",variant:"solid"}},void 0)]}),void 0)]},void 0):i(e,{children:i(a,Object.assign({size:"md",colorScheme:"primary",onClick:()=>I(!0),px:16},{children:"Connect Wallet"}),void 0)},void 0)}),void 0)}),void 0)}),void 0)}export{k as ChatboxWithGuards};
//# sourceMappingURL=ChatboxWithGuards.js.map
