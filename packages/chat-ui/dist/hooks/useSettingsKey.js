import{PublicKey as o}from"@solana/web3.js";import{ChatSdk as t}from"@strata-foundation/chat";import{useAsync as n}from"react-async-hook";function a(a){const{result:r,loading:e}=n((async n=>n?t.settingsKey(new o(n)):void 0),[a?.toBase58()]);return{loading:e,key:r?r[0]:void 0}}export{a as useSettingsKey};
//# sourceMappingURL=useSettingsKey.js.map
