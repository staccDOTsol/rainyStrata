/// <reference types="@project-serum/anchor/node_modules/@solana/web3.js" />
import { web3, Program as AnchorProgram, AnchorProvider, Wallet, Idl } from "@project-serum/anchor";
import { Keypair, TransactionInstruction } from "@solana/web3.js";
import { Instruction } from "../instruction";
import { SendTransactionResult } from "../transaction/send";
export * from "./objectWrapper";
export declare namespace Program {
    interface ProgramConfig {
        asyncSigning: boolean;
        provider?: AnchorProvider;
        idl?: Idl | null;
        client?: AnchorProgram;
    }
    abstract class Program {
        instruction: Instruction;
        asyncSigning: boolean;
        static PREFIX: string;
        protected PROGRAM_ID: web3.PublicKey;
        get id(): web3.PublicKey;
        private _client;
        get client(): AnchorProgram;
        set client(client: AnchorProgram);
        sendWithRetry(instructions: Array<TransactionInstruction>, signers?: Array<Keypair>, options?: SendOptions): Promise<SendTransactionResult>;
        sendWithAsyncSigningAndRetry(instructions: Array<TransactionInstruction>, signers?: Array<Keypair>, options?: SendOptions): Promise<SendTransactionResult>;
        static getProgramWithConfig<T extends Program>(type: {
            new (): T;
        }, config: ProgramConfig): Promise<T>;
        static getProgramWithWallet<T extends Program>(type: {
            new (): T;
        }, wallet: Wallet, env: string, customRpcUrl?: string): Promise<T>;
        static getProgramWithWalletKeyPair<T extends Program>(type: {
            new (): T;
        }, walletKeyPair: web3.Keypair, env: string, customRpcUrl?: string): Promise<T>;
        static getProgram<T extends Program>(type: {
            new (): T;
        }, anchorWallet: Wallet | null, env: string, customRpcUrl?: string, walletKeyPair?: web3.Keypair): Promise<T>;
    }
}
export declare namespace ProgramHelpers {
    function getProgramWithConfig<T extends Program.Program>(type: {
        new (): T;
    }, config: Program.ProgramConfig): Promise<T>;
    function getProgram<T extends Program.Program>(type: {
        new (): T;
    }, wallet: Wallet | null, env: string, customRpcUrl?: string, walletKeyPair?: web3.Keypair): Promise<T>;
}
export interface SendOptions {
    commitment: web3.Commitment;
    timeout?: number;
}
export declare class IDLNotFoundError extends Error {
    constructor(message: string);
}
//# sourceMappingURL=index.d.ts.map