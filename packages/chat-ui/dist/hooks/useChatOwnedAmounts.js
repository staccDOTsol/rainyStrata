import{useCollectionOwnedAmount as o,useUserOwnedAmount as e}from"@strata-foundation/react";import{useChatPermissionsFromChat as s}from"./useChatPermissionsFromChat.js";const t=(t,n)=>{const{info:i}=s(n),{readPermissionKey:r,readPermissionType:a,postPermissionKey:m,postPermissionType:d}={...i},{amount:u,loading:p}=o(r),{amount:f,loading:y}=o(m),P=e(t,r),c=e(t,m);return{isSame:r&&m?r.equals(m):void 0,ownedReadAmount:"nft"==Object.keys(a||{})[0]?u:P,ownedPostAmount:"nft"==Object.keys(d||{})[0]?f:c,loading:p||y}};export{t as useChatOwnedAmounts};
//# sourceMappingURL=useChatOwnedAmounts.js.map
