import{__awaiter as e,__rest as t}from"./node_modules/tslib/tslib.es6.js";import{Metadata as i}from"@metaplex-foundation/mpl-token-metadata";import{ENTRY_SEED as s,NAMESPACES_PROGRAM_ID as r,NAMESPACES_IDL as n,NAMESPACE_SEED as a,withInitNameEntry as o,withInitNameEntryMint as c,CLAIM_REQUEST_SEED as l,withCreateClaimRequest as d,withClaimNameEntry as u}from"@cardinal/namespaces";import{LocalStorageLRU as m}from"@cocalc/local-storage-lru";import{utils as h,Program as y}from"@project-serum/anchor";import{Token as p,ASSOCIATED_TOKEN_PROGRAM_ID as g,TOKEN_PROGRAM_ID as f,NATIVE_MINT as K}from"@solana/spl-token";import{PublicKey as P,Keypair as v,SystemProgram as b,Transaction as I,SYSVAR_RENT_PUBKEY as S}from"@solana/web3.js";import{AnchorSdk as w,truthy as A,SplTokenMetadata as M,getMintInfo as C,toBN as k,createMintInstructions as T}from"@strata-foundation/spl-utils";import{SplTokenBonding as B}from"@strata-foundation/spl-token-bonding";import N from"bn.js";import D from"bs58";import x from"lit-js-sdk";import{v4 as j}from"uuid";import{PostAction as O,PermissionType as U,MessageType as W}from"./generated/chat.js";export{ChatIDLJson,ChatType,PermissionType,PostAction,MessageType as RawMessageType}from"./generated/chat.js";import{getAuthSig as V}from"./lit.js";export{AUTH_SIGNATURE_BODY,getAuthSig}from"./lit.js";import{uploadFiles as z}from"./shdw.js";export{initStorageIfNeeded,randomizeFileName,uploadFiles}from"./shdw.js";const J=new P("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"),F=new m;class _{constructor(e){this.url=e}setSymKey(e,t){F.set("enc2"+e,t)}getSymKey(e){return F.get("enc2"+e)}getKey(e,t){return`sym-2-${this.url}-${e.toBase58()}-${t}`}setSymKeyToUse(e,t,i){const s=this.getKey(e,t);F.set(s,JSON.stringify(i))}getTimeSinceLastSet(e,t){const i=F.get(this.getKey(e,t));return i?(new Date).valueOf()-JSON.parse(i).timeMillis:null}getSymKeyToUse(e,t){const i=new Date;i.setDate(i.getDate()-1);const s=this.getTimeSinceLastSet(e,t);if(!s)return null;if(s>108e5)return null;const r=F.get(this.getKey(e,t));return r?JSON.parse(r):null}}const L={name:"AES-CBC",length:256};function R(){return e(this,void 0,void 0,(function*(){return yield crypto.subtle.generateKey(L,!0,["encrypt","decrypt"])}))}function E(t){return e(this,void 0,void 0,(function*(){return yield crypto.subtle.importKey("raw",t,L,!0,["encrypt","decrypt"])}))}function q(e){return crypto.subtle.exportKey("raw",e)}var G,$;function H(e){return e.replace(new RegExp("\0","g"),"")}!function(e){e.Text="text",e.Html="html",e.Gify="gify",e.Image="image",e.React="react"}(G||(G={})),function(e){e.Chat="chat",e.User="me"}($||($={}));class Y extends w{constructor({provider:t,program:i,litClient:s,namespacesProgram:r,symKeyStorage:n=new _(t.connection._rpcEndpoint),tokenBondingProgram:a,tokenMetadataProgram:o}){super({provider:t,program:i}),this.conditionVersion=2,this._namespaces=null,this._namespacesPromise=null,this.entryDecoder=(e,t)=>{const i=this.namespacesProgram.coder.accounts.decode("entry",t.data);return Object.assign(Object.assign({},i),{publicKey:e})},this.chatDecoder=(e,t)=>{const i=this.program.coder.accounts.decode("ChatV0",t.data);return Object.assign(Object.assign({},i),{name:H(i.name),imageUrl:H(i.imageUrl),metadataUrl:H(i.metadataUrl),publicKey:e})},this.chatPermissionsDecoder=(e,t)=>{const i=this.program.coder.accounts.decode("ChatPermissionsV0",t.data);return Object.assign(Object.assign({},i),{publicKey:e})},this.delegateWalletDecoder=(e,t)=>{const i=this.program.coder.accounts.decode("DelegateWalletV0",t.data);return Object.assign(Object.assign({},i),{publicKey:e})},this.profileDecoder=(e,t)=>{const i=this.program.coder.accounts.decode("ProfileV0",t.data);return Object.assign(Object.assign({},i),{imageUrl:H(i.imageUrl),metadataUrl:H(i.metadataUrl),publicKey:e})},this.settingsDecoder=(t,i)=>{const s=this.program.coder.accounts.decode("SettingsV0",i.data),r=this;return Object.assign(Object.assign({},s),{publicKey:t,getDelegateWalletSeed(){return e(this,void 0,void 0,(function*(){const e=yield r.getSymmetricKey(s.encryptedSymmetricKey,[ee(s.ownerWallet)]);return r.litJsSdk.decryptString(new Blob([r.litJsSdk.uint8arrayFromString(s.encryptedDelegateWallet,"base16")]),e)}))}})},this.caseInsensitiveMarkerDecoder=(e,t)=>{const i=this.program.coder.accounts.decode("CaseInsensitiveMarkerV0",t.data);return Object.assign(Object.assign({},i),{publicKey:e})},this.symKeyFetchCache={},this.namespacesProgram=r,this.authingLit=null;const c=t.connection._rpcEndpoint;c.includes("dev")||c.includes("local")||c.includes("127.0.0.1")?this.chain="solanaDevnet":this.chain="solana",this.litClient=s,this.symKeyStorage=n,this.litJsSdk=x,this.tokenBondingProgram=a,this.tokenMetadataProgram=o}get isLitAuthed(){return Boolean(this.litAuthSig)}_litAuth(){return e(this,void 0,void 0,(function*(){const e=F.get("lit-auth-sol-signature");F.get("lit-auth-sol-signature-date");const t=JSON.parse(e);if(this.wallet&&this.wallet.publicKey)if(this.wallet.publicKey.toBase58()!==(null==t?void 0:t.address))try{if(!this.wallet.signMessage)throw new Error("This wallet does not support signMessage. Please use another wallet");this.litAuthSig=yield V(this.wallet.publicKey,this.wallet),F.set("lit-auth-sol-signature",JSON.stringify(this.litAuthSig)),F.set("lit-auth-sol-signature-date",(new Date).valueOf().toString())}finally{this.authingLit=null}else this.litAuthSig=t}))}litAuth(){return e(this,void 0,void 0,(function*(){return yield this.authingLit,this.isLitAuthed||this.authingLit||(this.authingLit=this._litAuth()),this.authingLit}))}getNamespace(t){return e(this,void 0,void 0,(function*(){return yield this.namespacesProgram.account.namespace.fetch(t)}))}static init(t,i=Y.ID,s=B.ID){return e(this,void 0,void 0,(function*(){const e=new y(n,r,t),a=yield y.fetchIdl(i,t),o=new y(a,i,t),c=yield M.init(t),l=yield B.init(t,s),d=new x.LitNodeClient({alertWhenUnauthorized:!1,debug:!1});try{yield d.connect()}catch(e){console.warn(e)}return new this({provider:t,program:o,litClient:d,namespacesProgram:e,tokenBondingProgram:l,tokenMetadataProgram:c})}))}getChat(e){return this.getAccount(e,this.chatDecoder)}getChatPermissions(e){return this.getAccount(e,this.chatPermissionsDecoder)}getProfile(e){return this.getAccount(e,this.profileDecoder)}getSettings(e){return this.getAccount(e,this.settingsDecoder)}getCaseInsensitiveMarker(e){return this.getAccount(e,this.caseInsensitiveMarkerDecoder)}getMessagesFromParts(e,t=!0){const i=e.reduce(((e,t)=>(e[t.id]=e[t.id]||[],e[t.id].push(t),e)),{}),s=Object.values(i).map((e=>this.getMessageFromParts(e,t)));return s.filter(A).sort(((e,t)=>e.startBlockTime-t.startBlockTime))}_getSymmetricKey(t,i){return e(this,void 0,void 0,(function*(){const e=this.symKeyStorage.getSymKey(t);let s=e?Buffer.from(e,"hex"):void 0;if(!s){yield this.litAuth(),s=yield this.litClient.getEncryptionKey({solRpcConditions:i,toDecrypt:t,chain:this.chain,authSig:this.litAuthSig});const e=Buffer.from(s).toString("hex");this.symKeyStorage.setSymKey(t,e)}return delete this.symKeyFetchCache[t],s}))}getSymmetricKey(t,i){return e(this,void 0,void 0,(function*(){return this.symKeyFetchCache[t]||(this.symKeyFetchCache[t]=this._getSymmetricKey(t,i)),this.symKeyFetchCache[t]}))}getMessageFromParts(i,s=!0){if(0==i.length)return;const r=i.length!==i[0].totalParts;if(s&&r)return;const n=i.sort(((e,t)=>e.currentPart-t.currentPart)).map((e=>e.content)).join(""),a=i[0],{messageType:o,readPermissionAmount:c,chatKey:l,encryptedSymmetricKey:d,referenceMessageId:u,readPermissionKey:m,readPermissionType:h}=a,y=t(a,["messageType","readPermissionAmount","chatKey","encryptedSymmetricKey","referenceMessageId","readPermissionKey","readPermissionType"]);let p;return Object.assign(Object.assign({},y),{complete:!r,referenceMessageId:u,type:o&&Object.keys(o)[0],encryptedSymmetricKey:d,startBlockTime:i[0].blockTime,endBlockTime:i[i.length-1].blockTime,txids:i.map((e=>e.txid)),readPermissionAmount:c,readPermissionKey:m,readPermissionType:h,content:n,chatKey:l,getDecodedMessage:()=>e(this,void 0,void 0,(function*(){if(p)return p;let t;try{const e=yield C(this.provider,m);t=k(c,e)}catch(e){t=new N(c)}if(d){yield this.litAuth();const s=Z(i[0].conditionVersion,m,t,this.chain,h);try{const t=new Blob([this.litJsSdk.uint8arrayFromString(n,"base16")]),i=yield this.getSymmetricKey(d,s);p=JSON.parse(yield this.litJsSdk.decryptString(t,i)),p.decryptedAttachments=[],p.decryptedAttachments.push(...yield Promise.all((p.encryptedAttachments||[]).map((t=>e(this,void 0,void 0,(function*(){const e=yield fetch(t.file||t).then((e=>e.blob())),s=yield this.litJsSdk.decryptFile({symmetricKey:i,file:e});return{file:new Blob([s]),name:t.name||"Attachment"}}))))))}catch(e){console.error("Failed to decode message",e)}}else p=JSON.parse(n);return p})),parts:i})}getMessagePartsFromInflatedTx({chat:t,transaction:i,txid:s,meta:r,blockTime:n,idl:a}){return e(this,void 0,void 0,(function*(){if(null==r?void 0:r.err)return[];const o=i.message.instructions.filter((e=>se(i.message.accountKeys[e.programIdIndex]).equals(this.programId))),c=yield this.getChat(t);if(a||(a=yield y.fetchIdl(c.postMessageProgramId,this.provider)),!a)throw new Error("Chat only supports programs with published IDLs.");const l=new y(a,c.postMessageProgramId,this.provider).coder.instruction,d=o.filter((e=>se(i.message.accountKeys[e.programIdIndex]).equals(c.postMessageProgramId))).map((e=>{const t=Buffer.concat([D.decode(e.data),Buffer.alloc(1e3)]),{name:s,data:r}=l.decode(t),n=a.instructions.find((e=>e.name==s)),o=n.accounts.findIndex((e=>"sender"===e.name)),c=n.accounts.findIndex((e=>"chat"===e.name));return{data:r,sender:se(i.message.accountKeys[e.accounts[o]]),chat:se(i.message.accountKeys[e.accounts[c]]),profile:se(i.message.accountKeys[e.accounts[2]])}})).filter(A);return Promise.all(d.map((t=>e(this,void 0,void 0,(function*(){const e=t.data.args;let i=t.sender;if(n&&n<1657043710){i=(yield this.getProfile(t.profile)).ownerWallet}if(!e.readPermissionKey){const i=(yield Y.chatPermissionsKey(t.chat,this.programId))[0],s=yield this.getChatPermissions(i);e.readPermissionKey=null==s?void 0:s.readPermissionKey,e.readPermissionType=null==s?void 0:s.readPermissionType}return Object.assign(Object.assign({},e),{blockTime:n,txid:s,chatKey:t.chat,sender:i})})))))}))}getMessagePartsFromTx({chat:t,txid:i,idl:s}){var r;return e(this,void 0,void 0,(function*(){const e=this.provider.connection,n=yield e.getTransaction(i,{commitment:"confirmed"});return n?(null===(r=n.meta)||void 0===r?void 0:r.err)?[]:this.getMessagePartsFromInflatedTx({chat:t,transaction:n.transaction,txid:i,meta:n.meta,blockTime:n.blockTime,idl:s}):[]}))}static chatKey(e,t=Y.ID){return P.findProgramAddress([Buffer.from("identified-chat","utf-8"),e.toBuffer()],t)}static chatPermissionsKey(e,t=Y.ID){return P.findProgramAddress([Buffer.from("permissions","utf-8"),e.toBuffer()],t)}static caseInsensitiveMarkerKey(e,t,i=Y.ID){return P.findProgramAddress([Buffer.from("case_insensitive","utf-8"),e.toBuffer(),h.bytes.utf8.encode(t.toLowerCase())],i)}static entryKey(e,t){return P.findProgramAddress([h.bytes.utf8.encode(s),e.toBytes(),h.bytes.utf8.encode(t)],r)}static delegateWalletKey(e,t=Y.ID){return P.findProgramAddress([Buffer.from("delegate-wallet","utf-8"),e.toBuffer()],t)}static profileKey(e,t=Y.ID){return P.findProgramAddress([Buffer.from("wallet_profile","utf-8"),e.toBuffer()],t)}static settingsKey(e,t=Y.ID){return P.findProgramAddress([Buffer.from("settings","utf-8"),e.toBuffer()],t)}static namespacesKey(e=Y.ID){return P.findProgramAddress([Buffer.from("namespaces","utf-8")],e)}initializeNamespacesInstructions(){return e(this,void 0,void 0,(function*(){try{return yield this.getNamespaces(),{instructions:[],signers:[],output:null}}catch(e){}const[e]=yield Y.namespacesKey(),[t,i]=yield P.findProgramAddress([h.bytes.utf8.encode(a),h.bytes.utf8.encode($.Chat)],r),[s,n]=yield P.findProgramAddress([h.bytes.utf8.encode(a),h.bytes.utf8.encode($.User)],r),o=[];return o.push(yield this.program.instruction.initializeNamespacesV0({chatNamespaceName:$.Chat,userNamespaceName:$.User,chatNamespaceBump:i,userNamespaceBump:n},{accounts:{payer:this.wallet.publicKey,namespaces:e,namespacesProgram:r,chatNamespace:t,userNamespace:s,systemProgram:b.programId}})),{instructions:o,signers:[],output:null}}))}initializeNamespaces(){return e(this,void 0,void 0,(function*(){return this.execute(this.initializeNamespacesInstructions(),this.wallet.publicKey,"confirmed")}))}_getNamespaces(){return e(this,void 0,void 0,(function*(){const e=(yield Y.namespacesKey(this.programId))[0],t=yield this.program.account.namespacesV0.fetch(e);return Object.assign(Object.assign({},t),{publicKey:e,chat:yield this.getNamespace(t.chatNamespace),user:yield this.getNamespace(t.userNamespace)})}))}getNamespaces(){return e(this,void 0,void 0,(function*(){return this._namespaces||(this._namespacesPromise=this._getNamespaces(),this._namespaces=yield this._namespacesPromise),this._namespaces}))}claimIdentifierInstructions({payer:t=this.wallet.publicKey,owner:s=this.wallet.publicKey,identifier:n,type:a}){return e(this,void 0,void 0,(function*(){const e=new I,m=v.generate();let y=[],p=m.publicKey;const g=yield this.getNamespaces();let f,K;a===$.Chat?(f=g.chat.name,K=g.chatNamespace):(f=g.user.name,K=g.userNamespace);const[S]=yield Y.entryKey(K,n),w=yield this.namespacesProgram.account.entry.fetchNullable(S);w?(p=w.mint,y=[]):(yield o(e,this.provider.connection,this.provider.wallet,f,n),y.push(m),yield c(e,this.provider.connection,this.provider.wallet,f,n,m));const[A]=yield P.findProgramAddress([h.bytes.utf8.encode(l),K.toBytes(),h.bytes.utf8.encode(n),s.toBytes()],r);(yield this.provider.connection.getAccountInfo(A))||(yield d(this.provider.connection,this.provider.wallet,f,n,s,e));const M=e.instructions,C=yield i.getPDA(p),k=(yield Y.caseInsensitiveMarkerKey(K,n,this.programId))[0];a!==$.Chat||(null==w?void 0:w.isClaimed)?(null==w?void 0:w.isClaimed)||M.push(yield this.program.instruction.approveUserIdentifierV0({accounts:{payer:t,caseInsensitiveMarker:k,namespaces:g.publicKey,userNamespace:g.userNamespace,claimRequest:A,entry:S,certificateMintMetadata:C,namespacesProgram:r,tokenMetadataProgram:J,systemProgram:b.programId}})):M.push(yield this.program.instruction.approveChatIdentifierV0({accounts:{payer:t,caseInsensitiveMarker:k,namespaces:g.publicKey,chatNamespace:g.chatNamespace,claimRequest:A,entry:S,certificateMintMetadata:C,namespacesProgram:r,tokenMetadataProgram:J,systemProgram:b.programId}}));const T=new I;return(null==w?void 0:w.isClaimed)||(yield u(T,this.provider.connection,Object.assign(Object.assign({},this.provider.wallet),{publicKey:s}),f,n,p,0,s,t)),{instructions:[M,T.instructions],signers:[y,[]],output:{certificateMint:p}}}))}claimIdentifier(t,i){return e(this,void 0,void 0,(function*(){return this.executeBig(this.claimIdentifierInstructions(t),t.payer,i)}))}claimChatAdminInstructions({chat:t,admin:i=this.wallet.publicKey}){var s;return e(this,void 0,void 0,(function*(){const e=yield this.getChat(t);if(e.identifierCertificateMint&&!(null===(s=e.admin)||void 0===s?void 0:s.equals(i))){const s=yield p.getAssociatedTokenAddress(g,f,e.identifierCertificateMint,i,!0);return{output:null,signers:[],instructions:[yield this.instruction.claimAdminV0({accounts:{chat:t,identifierCertificateMintAccount:s,ownerWallet:i}})]}}return{output:null,signers:[],instructions:[]}}))}claimAdmin(t,i="confirmed"){return e(this,void 0,void 0,(function*(){return this.execute(this.claimChatAdminInstructions(t),t.admin,i)}))}closeChatInstructions({refund:t=this.wallet.publicKey,chat:i,admin:s=this.wallet.publicKey}){return e(this,void 0,void 0,(function*(){const e=[];e.push(...(yield this.claimChatAdminInstructions({chat:i,admin:s})).instructions);const r=(yield Y.chatPermissionsKey(i))[0];return(yield this.getChatPermissions(r))&&e.push(yield this.instruction.closeChatPermissionsV0({accounts:{refund:t,admin:s,chat:i,chatPermissions:r,systemProgram:b.programId}})),e.push(yield this.instruction.closeChatV0({accounts:{refund:t,admin:s,chat:i,systemProgram:b.programId}})),{signers:[],instructions:e,output:null}}))}closeChat(t,i){return e(this,void 0,void 0,(function*(){yield this.execute(this.closeChatInstructions(t),t.refund,i)}))}initializeChatInstructions({payer:t=this.wallet.publicKey,identifierCertificateMint:s,identifier:r,name:n,permissions:a,postMessageProgramId:o=this.programId,imageUrl:c="",metadataUrl:l="",chatKeypair:d,admin:u=this.wallet.publicKey}){return e(this,void 0,void 0,(function*(){const e=[],m=[];if(r){const i=yield this.claimIdentifierInstructions({payer:t,owner:u,identifier:r,type:$.Chat});s=i.output.certificateMint,e.push(...i.instructions),m.push(...i.signers)}const h=[],y=[];let P,I;if(s){P=(yield Y.chatKey(s,this.programId))[0];const e=yield this.getNamespaces();if(!r){const e=yield i.getPDA(s),t=yield new i(e,yield this.provider.connection.getAccountInfo(e)),[n]=t.data.data.name.split(".");r=n}const[a]=yield yield Y.entryKey(e.chatNamespace,r),d=yield p.getAssociatedTokenAddress(g,f,s,u,!0),m=yield this.instruction.initializeChatV0({name:n,imageUrl:c,metadataUrl:l,postMessageProgramId:o},{accounts:{payer:t,chat:P,namespaces:e.publicKey,entry:a,identifierCertificateMint:s,identifierCertificateMintAccount:d,ownerWallet:u,systemProgram:b.programId}});h.push(m)}else{P=(d=d||v.generate()).publicKey;const e=yield this.instruction.initializeUnidentifiedChatV0({name:n,imageUrl:c,metadataUrl:l,postMessageProgramId:o},u,{accounts:{payer:t,chat:P,systemProgram:b.programId}});h.push(e),y.push(d)}if(a){let e,i,{readPermissionKey:s,postPermissionKey:r,postPermissionAction:n=O.Hold,postPayDestination:o,postPermissionAmount:c=1,defaultReadPermissionAmount:l=1,readPermissionType:d=U.Token,postPermissionType:m=U.Token}=a;s.equals(K)&&(d=U.Native),r.equals(K)&&(m=U.Native);try{const t=yield C(this.provider,r);e=k(c,t)}catch(t){e=new N(c)}try{const e=yield C(this.provider,s);i=k(l,e)}catch(e){i=new N(l)}I=(yield Y.chatPermissionsKey(P,this.programId))[0],h.push(yield this.instruction.initializeChatPermissionsV0({defaultReadPermissionAmount:i,postPermissionKey:r,readPermissionKey:s,postPermissionAction:n,postPermissionAmount:e,postPayDestination:o||null,readPermissionType:d,postPermissionType:m},{accounts:{payer:t,chat:P,chatPermissions:I,admin:u,systemProgram:b.programId}}))}return e.push(h),m.push(y),{output:{chat:P,chatPermissions:I,chatKeypair:d,identifierCertificateMint:s},signers:m,instructions:e}}))}initializeChat(t,i="confirmed"){return e(this,void 0,void 0,(function*(){return this.executeBig(this.initializeChatInstructions(t),t.payer,i)}))}initializeProfileInstructions({payer:t=this.wallet.publicKey,ownerWallet:s=this.wallet.publicKey,identifierCertificateMint:r,identifier:n,imageUrl:a="",metadataUrl:o=""}){return e(this,void 0,void 0,(function*(){const e=[],c=(yield Y.profileKey(s,this.programId))[0],l=yield this.getNamespaces(),d=yield i.getPDA(r);if(!n){const e=yield new i(d,yield this.provider.connection.getAccountInfo(d)),[t]=e.data.data.name.split(".");n=t}const[u]=yield Y.entryKey(l.userNamespace,n),m=yield p.getAssociatedTokenAddress(g,f,r,s,!0);return e.push(yield this.instruction.initializeProfileV0({imageUrl:a,metadataUrl:o},{accounts:{payer:t,walletProfile:c,namespaces:l.publicKey,entry:u,identifierCertificateMint:r,identifierCertificateMintAccount:m,ownerWallet:s,systemProgram:b.programId}})),{output:{walletProfile:c},instructions:e,signers:[]}}))}initializeProfile(t,i="confirmed"){return e(this,void 0,void 0,(function*(){return this.execute(this.initializeProfileInstructions(t),t.payer,i)}))}initializeSettingsInstructions({payer:t=this.wallet.publicKey,ownerWallet:i=this.wallet.publicKey,settings:s}){return e(this,void 0,void 0,(function*(){const e=[],r=(yield Y.settingsKey(i,this.programId))[0],n=yield R(),a=yield this.litJsSdk.encryptWithSymmetricKey(n,this.litJsSdk.uint8arrayFromString(s.delegateWalletSeed)),o=ie(yield a.arrayBuffer());yield this.litAuth();const c={encryptedDelegateWallet:o,encryptedSymmetricKey:this.litJsSdk.uint8arrayToString(yield this.litClient.saveEncryptionKey({solRpcConditions:[ee(i)],symmetricKey:new Uint8Array(yield crypto.subtle.exportKey("raw",n)),authSig:this.litAuthSig,chain:this.chain}),"base16")};return e.push(yield this.instruction.initializeSettingsV0(c,{accounts:{payer:t,settings:r,ownerWallet:i,rent:S,systemProgram:b.programId}})),{output:{settings:r},instructions:e,signers:[]}}))}initializeSettings(t,i="confirmed"){return e(this,void 0,void 0,(function*(){return this.execute(this.initializeSettingsInstructions(t),t.payer,i)}))}initializeDelegateWalletInstructions({payer:t=this.wallet.publicKey,ownerWallet:i=this.wallet.publicKey,delegateWalletKeypair:s,delegateWallet:r}){return e(this,void 0,void 0,(function*(){s||r||(s=v.generate()),r||(r=s.publicKey);const e=(yield Y.delegateWalletKey(r))[0],n=[],a=[s].filter(A);return n.push(yield this.instruction.initializeDelegateWalletV0({accounts:{delegateWallet:e,payer:t,owner:i,delegate:r,systemProgram:b.programId}})),{output:{delegateWallet:e,delegateWalletKeypair:s},instructions:n,signers:a}}))}initializeDelegateWallet(t,i="confirmed"){return e(this,void 0,void 0,(function*(){return this.execute(this.initializeDelegateWalletInstructions(t),t.payer,i)}))}sendMessageInstructions({sender:s=this.wallet.publicKey,chat:r,message:n,readPermissionAmount:a,delegateWallet:o,delegateWalletKeypair:c,encrypted:l=!0,nftMint:d,readPermissionKey:u,readPermissionType:m}){return e(this,void 0,void 0,(function*(){const{referenceMessageId:h,type:y}=n,P=t(n,["referenceMessageId","type"]);l&&(yield this.litAuth());let{fileAttachments:v}=P,b=t(P,["fileAttachments"]);const I=(yield Y.chatPermissionsKey(r,this.programId))[0],S=yield this.getChatPermissions(I);let w;try{const e=yield C(this.provider,S.readPermissionKey);w=k(a||S.defaultReadPermissionAmount,e)}catch(e){w=new N(a||S.defaultReadPermissionAmount)}const M=Z(this.conditionVersion,S.readPermissionKey,w,this.chain,S.readPermissionType),T=this.symKeyStorage.getSymKeyToUse(S.readPermissionKey,w.toNumber());let B,D,x;if(l&&(B=T?yield E(Buffer.from(T.symKey,"hex")):yield R()),v&&l&&(v=yield Promise.all(v.map((t=>e(this,void 0,void 0,(function*(){const e=yield this.litJsSdk.encryptWithSymmetricKey(B,yield t.file.arrayBuffer());return{file:new File([e],t.file.name+".encrypted"),name:t.name}})))))),v){let e;l?(b.encryptedAttachments=b.encryptedAttachments||[],e=b.encryptedAttachments):(b.attachments=b.attachments||[],e=b.attachments);const t=((yield z(this.provider,v.map((e=>e.file)),c))||[]).filter(A);if(t.length!=v.length)throw new Error("Failed to upload all files");e.push(...t.map(((e,t)=>({file:e,name:v[t].name}))))}if(l){const e=yield this.litJsSdk.encryptWithSymmetricKey(B,this.litJsSdk.uint8arrayFromString(JSON.stringify(b)));x=ie(yield e.arrayBuffer()),T?D=T.encryptedSymKey:(D=this.litJsSdk.uint8arrayToString(yield this.litClient.saveEncryptionKey({solRpcConditions:M,symmetricKey:new Uint8Array(yield crypto.subtle.exportKey("raw",B)),authSig:this.litAuthSig,chain:this.chain}),"base16"),this.symKeyStorage.setSymKeyToUse(S.readPermissionKey,w.toNumber(),{symKey:Buffer.from(yield q(B)).toString("hex"),encryptedSymKey:D,timeMillis:(new Date).valueOf()}))}else D="",x=JSON.stringify(P);const O=yield p.getAssociatedTokenAddress(g,f,d||S.postPermissionKey,s,!0),U=[];d&&U.push({pubkey:yield i.getPDA(d),isWritable:!1,isSigner:!1}),(o||c)&&(o||(o=c.publicKey),U.push({pubkey:(yield Y.delegateWalletKey(o,this.programId))[0],isWritable:!1,isSigner:!1}));const V=x.length,J=Math.ceil(V/352),F=[],_=[],L=j(),G=(null==S?void 0:S.postPermissionKey.equals(K))?this.instruction.sendNativeMessageV0:this.instruction.sendTokenMessageV0;for(let e=0;e<J;e++){const t=[];t.push(yield G({conditionVersion:this.conditionVersion,id:L,content:x.slice(352*e,352*(e+1)),encryptedSymmetricKey:D,readPermissionAmount:w,readPermissionType:m||S.readPermissionType,readPermissionKey:u||S.readPermissionKey,totalParts:J,currentPart:e,messageType:W[($=y,$.charAt(0).toUpperCase()+$.slice(1))],referenceMessageId:h||null},{accounts:{chat:r,chatPermissions:I,sender:s,signer:o||s,postPermissionAccount:O,postPermissionMint:d||S.postPermissionKey,tokenProgram:f},remainingAccounts:U})),F.push(t),_.push([c].filter(A))}var $;return{instructions:F,output:{messageId:L},signers:_}}))}sendMessage(t,i="confirmed"){return e(this,void 0,void 0,(function*(){return this.executeBig(this.sendMessageInstructions(t),t.payer,i)}))}createMetadataForBondingInstructions({metadataUpdateAuthority:t=this.provider.wallet.publicKey,metadata:i,targetMintKeypair:s=v.generate(),decimals:r}){return e(this,void 0,void 0,(function*(){const e=s.publicKey,n=[],a=[];n.push(...yield T(this.tokenBondingProgram.provider,this.provider.wallet.publicKey,e,r)),a.push(s);const{instructions:o,signers:c,output:l}=yield this.tokenMetadataProgram.createMetadataInstructions({data:i,mint:e,mintAuthority:this.provider.wallet.publicKey,authority:t});return n.push(...o),a.push(...c),n.push(p.createSetAuthorityInstruction(f,e,(yield B.tokenBondingKey(e))[0],"MintTokens",this.provider.wallet.publicKey,[])),{instructions:n,signers:a,output:Object.assign(Object.assign({},l),{mint:e})}}))}}function Z(e,t,i,s,r){if(0===e)return[X(t,i,s)];if(1===e)return[Q(t,i,s),{operator:"or"},X(t,i,s)];const n=Object.keys(r)[0];return"token"===n?[X(t,i,s)]:"native"==n?[te(t,i,s)]:[Q(t,i,s)]}function Q(e,t,i){return{method:"balanceOfMetaplexCollection",params:[e.toBase58()],chain:i,returnValueTest:{key:"",comparator:">=",value:t.toString(10)}}}function X(e,t,i){return{method:"balanceOfToken",params:[e.toBase58()],chain:i,returnValueTest:{key:"$.amount",comparator:">=",value:t.toString(10)}}}function ee(e){return{method:"",params:[":userAddress"],chain:"solana",returnValueTest:{key:"",comparator:"=",value:e.toBase58()}}}function te(e,t,i){return{method:"getBalance",params:[e.toBase58()],chain:i,returnValueTest:{key:"",comparator:">=",value:t.toString(10)}}}function ie(e){return[...new Uint8Array(e)].map((e=>e.toString(16).padStart(2,"0"))).join("")}function se(e){return"string"==typeof e?new P(e):e}Y.ID=new P("chatGL6yNgZT2Z3BeMYGcgdMpcBKdmxko4C5UhEX4To");export{Y as ChatSdk,$ as IdentifierType,_ as LocalSymKeyStorage,G as MessageType,q as exportSymmetricKey,E as importSymmetricKey};
//# sourceMappingURL=index.js.map