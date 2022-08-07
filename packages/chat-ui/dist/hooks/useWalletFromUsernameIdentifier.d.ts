/// <reference types="@project-serum/anchor/node_modules/@solana/web3.js" />
import { PublicKey } from "@solana/web3.js";
export declare function useWalletFromUsernameIdentifier(identifier?: string): {
    loading: boolean;
    wallet: PublicKey | undefined;
    error?: Error;
};
//# sourceMappingURL=useWalletFromUsernameIdentifier.d.ts.map