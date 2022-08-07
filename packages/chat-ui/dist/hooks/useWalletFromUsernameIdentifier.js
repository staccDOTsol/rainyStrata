import{useConnection as r}from"@solana/wallet-adapter-react";import{PublicKey as e}from"@solana/web3.js";import{ChatSdk as a}from"@strata-foundation/chat";import{useTokenAccount as o}from"@strata-foundation/react";import{useMemo as t}from"react";import{useAsync as n}from"react-async-hook";import{useChatSdk as s}from"../contexts/chatSdk.js";import{useCaseInsensitiveMarker as i}from"./useCaseInsensitiveMarker.js";function c(c){const{chatSdk:m}=s(),{result:f,loading:l,error:u}=n((async r=>r?r.getNamespaces():void 0),[m]),{result:d,loading:p,error:g}=n((async(r,o)=>r&&o?a.caseInsensitiveMarkerKey(new e(o),r):void 0),[c,f?.userNamespace.toBase58()]),{info:w,loading:k}=i(d&&d[0]),{connection:v}=r(),{result:y,loading:h,error:j}=n((async(r,e)=>{if(e){return(await r.getTokenLargestAccounts(e)).value[0].address}}),[v,w?.certificateMint]),{info:M}=o(y);return{loading:l||p||k||h,wallet:t((()=>{if(M&&f&&!M.owner.equals(f.userNamespace))return M?.owner}),[f,M]),error:u||g||j}}export{c as useWalletFromUsernameIdentifier};
//# sourceMappingURL=useWalletFromUsernameIdentifier.js.map
