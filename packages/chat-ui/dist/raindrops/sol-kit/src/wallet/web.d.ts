/// <reference types="@project-serum/anchor/node_modules/@solana/web3.js" />
import { web3, Wallet } from "@project-serum/anchor";
import { SendOptions } from "../program";
export declare class WebWallet implements Wallet {
    _signTransaction: (transaction: web3.Transaction) => Promise<web3.Transaction>;
    _signAllTransactions: (transaction: web3.Transaction[]) => Promise<web3.Transaction[]>;
    sendTransaction: (transaction: web3.Transaction, connection: web3.Connection, options?: SendOptions) => Promise<string>;
    _publicKey: web3.PublicKey;
    payer: web3.Keypair;
    static fakeWallet(): WebWallet;
    constructor(publicKey: web3.PublicKey, signTransaction: (transaction: web3.Transaction) => Promise<web3.Transaction>, signAllTransactions: (transaction: web3.Transaction[]) => Promise<web3.Transaction[]>, sendTransaction: any);
    signTransaction(tx: web3.Transaction): Promise<web3.Transaction>;
    signAllTransactions(txs: web3.Transaction[]): Promise<web3.Transaction[]>;
    get publicKey(): web3.PublicKey;
}
//# sourceMappingURL=web.d.ts.map