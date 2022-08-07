import{PublicKey as o}from"@solana/web3.js";import{ChatSdk as t}from"@strata-foundation/chat";import{useAsync as r}from"react-async-hook";function a(a){const{result:n,loading:e}=r((async r=>r?t.profileKey(new o(r)):void 0),[a?.toBase58()]);return{loading:e,key:n?n[0]:void 0}}export{a as useProfileKey};
//# sourceMappingURL=useProfileKey.js.map
