/// <reference types="@project-serum/anchor/node_modules/@solana/web3.js" />
import { Keypair } from "@solana/web3.js";
export declare function useLoadDelegate(): {
    delegateWallet: Keypair | undefined;
    mnemonic: string | undefined;
    loadingNeeds: boolean;
    needsInit: boolean;
    needsTopOff: boolean | undefined;
    loadDelegate: (sol: number) => Promise<void>;
    loading: boolean;
    error: Error | undefined;
};
//# sourceMappingURL=useLoadDelegate.d.ts.map