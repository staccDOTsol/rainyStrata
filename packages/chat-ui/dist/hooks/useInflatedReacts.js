import{useWallet as e}from"@solana/wallet-adapter-react";import{useAsync as o}from"react-async-hook";async function r(e,o){if(!o)return;const r=(await Promise.all(o.map((async e=>({decoded:await e.getDecodedMessage(),message:e}))))).reduce(((e,o)=>{if(o.decoded?.emoji){const r=e[o.decoded.emoji]||[];e[o.decoded.emoji]=[...r,o]}return e}),{}),t=Object.entries(r).map((([o,r])=>{const t=function(e){const o=new Set;return e.filter((e=>{const r=e.message.sender.toBase58();if(!o.has(r))return o.add(r),e}))}(r),n=r.length,s=e&&r.some((({message:o})=>o.sender.equals(e)));return{emoji:o,count:n,messages:t.map((({message:e})=>e)),mine:Boolean(s)}}));return t}function t(t){const{publicKey:n}=e(),{result:s,error:a,loading:c}=o(r,[n||void 0,t]);return{reacts:s,error:a,loading:c}}export{t as useInflatedReacts};
//# sourceMappingURL=useInflatedReacts.js.map
