import{PublicKey as o}from"@solana/web3.js";import{ChatSdk as t}from"@strata-foundation/chat";import{useAsync as a}from"react-async-hook";function n(n){const{result:r,loading:i}=a((async a=>a?t.chatPermissionsKey(new o(a)):void 0),[n?.toBase58()]);return{loading:i,key:r?r[0]:void 0}}export{n as useChatPermissionsKey};
//# sourceMappingURL=useChatPermissionsKey.js.map
