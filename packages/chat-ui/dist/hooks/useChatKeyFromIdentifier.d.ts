/// <reference types="@project-serum/anchor/node_modules/@solana/web3.js" />
import { PublicKey } from "@solana/web3.js";
export declare function useChatKeyFromIdentifier(identifier?: string): {
    loading: boolean;
    chatKey: PublicKey | undefined;
    error?: Error;
};
//# sourceMappingURL=useChatKeyFromIdentifier.d.ts.map