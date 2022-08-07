import{useMemo as o}from"react";import{useProfile as r}from"./useProfile.js";import{useProfileKey as i}from"./useProfileKey.js";function e(e){const{key:n,loading:t}=i(e||void 0),f=r(n);return{...f,loading:o((()=>f.loading||t),[f.loading,t])}}export{e as useWalletProfile};
//# sourceMappingURL=useWalletProfile.js.map
