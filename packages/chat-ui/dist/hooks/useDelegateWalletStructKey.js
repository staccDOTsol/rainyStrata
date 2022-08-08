import{PublicKey as o}from"@solana/web3.js";import{ChatSdk as t}from"@strata-foundation/chat";import{useAsync as a}from"react-async-hook";function e(e){const{result:n,loading:r}=a((async a=>a?t.delegateWalletKey(new o(a)):void 0),[e?.toBase58()]);return{loading:r,key:n?n[0]:void 0}}export{e as useDelegateWalletStructKey};
//# sourceMappingURL=useDelegateWalletStructKey.js.map
