import{useWallet as o}from"@solana/wallet-adapter-react";import{Keypair as e}from"@solana/web3.js";import{mnemonicToSeedSync as r}from"bip39";import{useMemo as t}from"react";import{useAsync as a}from"react-async-hook";import{useWalletSettings as n}from"./useWalletSettings.js";"undefined"!=typeof localStorage?localStorage:require("localstorage-memory");const l={};function i(o){if(!l[o]){const t=r(o,""),a=e.fromSeed(t.slice(0,32));l[o]=a}return l[o]}function c(){o();const{info:e,account:r,loading:l}=n(),{loading:c,result:m,error:f}=a((async o=>{if(o)return o?.getDelegateWalletSeed()}),[e]),s=t((()=>m?i(m):void 0),[m]);return{error:f,loading:c||l||Boolean(!e&&r),legacyKeypair:null,mnemonic:m,keypair:s,legacyMnemonic:null}}export{i as getKeypairFromMnemonic,c as useDelegateWallet};
//# sourceMappingURL=useDelegateWallet.js.map
