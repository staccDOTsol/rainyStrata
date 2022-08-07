/// <reference types="@project-serum/anchor/node_modules/@solana/web3.js" />
/// <reference types="node" />
/// <reference types="@metaplex-foundation/mpl-core/node_modules/@solana/web3.js" />
/// <reference types="@solana/spl-token/node_modules/@solana/web3.js" />
/// <reference types="@solana/spl-governance/node_modules/@solana/web3.js" />
import { PublicKey } from "@solana/web3.js";
export declare function useWalletProfile(wallet: PublicKey | undefined): {
    loading: boolean;
    account?: import("@solana/web3.js").AccountInfo<Buffer> | undefined;
    info?: import("@strata-foundation/chat").IProfile | undefined;
};
//# sourceMappingURL=useWalletProfile.d.ts.map