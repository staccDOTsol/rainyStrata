//  @ts-nocheck
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { web3 } from "@project-serum/anchor";
import { SystemProgram } from "@solana/web3.js";
import { Instruction as SolKitInstruction, InstructionUtils, } from "@raindrop-studios/sol-kit";
import { getNamespacePDA } from "../utils/pda";
import { TOKEN_PROGRAM_ID } from "../constants/programIds";
export class Instruction extends SolKitInstruction {
    constructor(args) {
        super(args);
    }
    initializeNamespace(args, accounts) {
        return __awaiter(this, void 0, void 0, function* () {
            const [namespacePDA, _namespaceBump] = yield getNamespacePDA(accounts.mint);
            InstructionUtils.convertNumbersToBNs(args, [
                "desiredNamespaceArraySize",
                "bump",
            ]);
            const remainingAccounts = args.whitelistedStakingMints.map((mint) => {
                return { pubkey: mint, isWritable: false, isSigner: false };
            });
            return [
                yield this.program.client.methods
                    .initializeNamespace(args)
                    .accounts({
                    namespace: namespacePDA,
                    mint: accounts.mint,
                    metadata: accounts.metadata,
                    masterEdition: accounts.masterEdition,
                    payer: this.program.client.provider.wallet
                        .publicKey,
                    tokenProgram: TOKEN_PROGRAM_ID,
                    systemProgram: SystemProgram.programId,
                    rent: web3.SYSVAR_RENT_PUBKEY,
                })
                    .remainingAccounts(remainingAccounts)
                    .instruction(),
            ];
        });
    }
    updateNamespace(args, accounts) {
        return __awaiter(this, void 0, void 0, function* () {
            const [namespacePDA, _namespaceBump] = yield getNamespacePDA(accounts.mint);
            const remainingAccounts = args.whitelistedStakingMints.map((mint) => ({
                pubkey: mint,
                isWritable: false,
                isSigner: false,
            }));
            return [
                yield this.program.client.methods
                    .updateNamespace(args)
                    .accounts({
                    namespace: namespacePDA,
                    namespaceToken: accounts.namespaceToken,
                    tokenHolder: accounts.tokenHolder,
                })
                    .remainingAccounts(remainingAccounts)
                    .instruction(),
            ];
        });
    }
}
