import{useWallet as t}from"@solana/wallet-adapter-react";import{useSettingsKey as e}from"./useSettingsKey.js";import{useSettings as o}from"./useSettings.js";function r(){const{publicKey:r}=t(),{key:i}=e(r||void 0);return o(i)}export{r as useWalletSettings};
//# sourceMappingURL=useWalletSettings.js.map
