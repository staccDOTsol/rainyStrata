/// <reference types="@project-serum/anchor/node_modules/@solana/web3.js" />
import { Keypair } from "@solana/web3.js";
import { ChatSdk } from "@strata-foundation/chat";
import { SplTokenBonding } from "@strata-foundation/spl-token-bonding";
import { ICreateChatModalState } from "./CreateChatModal";
interface IWazardSubmitOpts {
    sdks: {
        tokenBondingSdk: SplTokenBonding | undefined;
        chatSdk: ChatSdk | undefined;
    };
    data: ICreateChatModalState;
    delegateWallet: Keypair | undefined;
    setState: (value: Partial<ICreateChatModalState>) => void;
}
export declare const wizardSubmit: ({ sdks, data: { wizardData }, delegateWallet, setState, }: IWazardSubmitOpts) => Promise<void>;
export {};
//# sourceMappingURL=wizardSubmit.d.ts.map