/// <reference types="@project-serum/anchor/node_modules/@solana/web3.js" />
/// <reference types="node" />
import { web3 } from "@project-serum/anchor";
export interface ObjectWrapper<T, V> {
    program: V;
    key: web3.PublicKey;
    object: T;
    data: Buffer;
}
//# sourceMappingURL=objectWrapper.d.ts.map