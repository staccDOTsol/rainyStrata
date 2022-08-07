// @ts-nocheck
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { web3, Program, BN, AnchorProvider, // @ts-ignore
 } from "@project-serum/anchor";
// @ts-ignore
import NodeWallet from "@project-serum/anchor/dist/cjs/nodewallet";
import { MATCHES_ID, TOKEN_PROGRAM_ID } from "../constants/programIds";
import { getAtaForMint, getItemPDA, getMatch, getMatchTokenAccountEscrow, getOracle, getPlayerPDA, } from "../utils/pda";
import log from "loglevel";
import { getCluster } from "../utils/connection";
import { sendTransactionWithRetry, sendTransactionWithRetryWithKeypair } from "../utils/transactions";
import { TokenType, } from "../state/matches"; // @ts-ignore
import { Token } from "@solana/spl-token";
import { createAssociatedTokenAccountInstruction } from "../utils/ata";
export function transformTokenValidations(args) {
    if (args.tokenEntryValidation) {
        args.tokenEntryValidation = args.tokenEntryValidation.map((r) => {
            const newRFilter = Object.assign({}, r.filter);
            Object.keys(newRFilter).forEach((k) => {
                Object.keys(newRFilter[k]).forEach((y) => {
                    if (typeof newRFilter[k][y] === "string") {
                        newRFilter[k][y] = new web3.PublicKey(newRFilter[k][y]);
                    }
                });
            });
            r.filter = newRFilter;
            if (r.validation) {
                if (typeof r.validation.key === "string") {
                    r.validation.key = new web3.PublicKey(r.validation.key);
                    r.validation.code = new BN(r.validation.code);
                }
            }
            return r;
        });
    }
}
export class MatchWrapper {
    constructor(args) {
        this.program = args.program;
        this.key = args.key;
        this.object = args.object;
        this.data = args.data;
    }
}
export class MatchesInstruction {
    constructor(args) {
        this.id = args.id;
        this.program = args.program;
    }
    createMatch(kp, args, _accounts = {}, _additionalArgs = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const [match, _matchBump] = yield getMatch(args.winOracle);
            transformTokenValidations(args);
            return {
                instructions: [
                    yield this.program.methods
                        .createMatch(args)
                        .accounts({
                        matchInstance: match,
                        payer: this.program.provider.wallet.publicKey,
                        systemProgram: web3.SystemProgram.programId,
                        rent: web3.SYSVAR_RENT_PUBKEY,
                    })
                        .instruction(),
                ],
                signers: [],
            };
        });
    }
    disburseTokensByOracle(args, accounts, additionalArgs) {
        return __awaiter(this, void 0, void 0, function* () {
            const match = (yield getMatch(accounts.winOracle))[0];
            const tfer = additionalArgs.tokenDelta;
            const [tokenAccountEscrow, _escrowBump] = yield getMatchTokenAccountEscrow(accounts.winOracle, new web3.PublicKey("So11111111111111111111111111111111111111112"), new web3.PublicKey("CMVfmxKAK1VQMFAQifnpsmTmg2JEdLtw5MkmqqHm9wCY"));
            console.group(tokenAccountEscrow.toBase58());
            let destinationTokenAccount = tfer.to;
            const info = yield this.program.provider
            // @ts-ignore
            .connection.getAccountInfo(destinationTokenAccount);
            const instructions = [];
            // @ts-ignore
            if (!info.owner.equals(TOKEN_PROGRAM_ID)) {
                const destinationTokenOwner = destinationTokenAccount;
                destinationTokenAccount = (
                // @ts-ignore
                yield getAtaForMint(tfer.mint, destinationTokenAccount))[0];
                const exists = yield this.program.provider.connection.getAccountInfo(destinationTokenAccount);
                if (!exists || exists.data.length == 0) {
                    instructions.unshift(
                    // @ts-ignore
                    createAssociatedTokenAccountInstruction(destinationTokenAccount, this.program.provider.wallet.publicKey, 
                    // @ts-ignore
                    destinationTokenOwner, tfer.mint));
                }
            }
            instructions.push(
            // @ts-ignore
            yield this.program.methods
                // @ts-ignore
                .disburseTokensByOracle(args)
                .accounts({
                matchInstance: match,
                tokenAccountEscrow,
                tokenMint: tfer.mint,
                originalSender: tfer.from,
                // @ts-ignore
                destinationTokenAccount,
                winOracle: accounts.winOracle,
                tokenProgram: TOKEN_PROGRAM_ID,
                systemProgram: web3.SystemProgram.programId,
                rent: web3.SYSVAR_RENT_PUBKEY,
            })
                .instruction());
            return {
                instructions,
                signers: [],
            };
        });
    }
    drainMatch(_args, accounts, additionalArgs) {
        return __awaiter(this, void 0, void 0, function* () {
            const match = (yield getMatch(additionalArgs.winOracle))[0];
            return {
                instructions: [
                    yield this.program.methods
                        .drainMatch()
                        .accounts({
                        matchInstance: match,
                        authority: this.program.provider.wallet
                            .publicKey,
                        receiver: accounts.receiver ||
                            this.program.provider.wallet.publicKey,
                    })
                        .instruction(),
                ],
                signers: [],
            };
        });
    }
    drainOracle(args, accounts, _additionalArgs = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const [oracle, oracleBump] = yield getOracle(new web3.PublicKey(args.seed), new web3.PublicKey(args.authority));
            const [match, _matchBump] = yield getMatch(oracle);
            return {
                instructions: [
                    yield this.program.methods
                        .drainOracle(Object.assign(Object.assign({}, args), { seed: new web3.PublicKey(args.seed) }))
                        .accounts({
                        matchInstance: match,
                        authority: this.program.provider.wallet
                            .publicKey,
                        receiver: accounts.receiver ||
                            this.program.provider.wallet.publicKey,
                        oracle,
                    })
                        .instruction(),
                ],
                signers: [],
            };
        });
    }
    updateMatch(kp, args, accounts, _additionalArgs = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const match = (yield getMatch(accounts.winOracle))[0];
            transformTokenValidations(args);
            return {
                instructions: [
                    yield this.program.methods
                        .updateMatch(args)
                        .accounts({
                        matchInstance: match,
                        winOracle: accounts.winOracle,
                        authority: this.program.provider.wallet
                            .publicKey,
                    })
                        .instruction(),
                ],
                signers: [],
            };
        });
    }
    leaveMatch(args, accounts, additionalArgs) {
        return __awaiter(this, void 0, void 0, function* () {
            const match = (yield getMatch(additionalArgs.winOracle))[0];
            const destinationTokenAccount = (yield getAtaForMint(accounts.tokenMint, accounts.receiver))[0];
            const [tokenAccountEscrow, _escrowBump] = yield getMatchTokenAccountEscrow(additionalArgs.winOracle, new web3.PublicKey("So11111111111111111111111111111111111111112"), new web3.PublicKey("CMVfmxKAK1VQMFAQifnpsmTmg2JEdLtw5MkmqqHm9wCY"));
            console.group(tokenAccountEscrow.toBase58());
            const signers = [];
            return {
                instructions: [
                    yield this.program.methods
                        .leaveMatch(args)
                        .accounts({
                        matchInstance: match,
                        tokenAccountEscrow,
                        tokenMint: accounts.tokenMint,
                        destinationTokenAccount,
                        receiver: this.program.provider.wallet
                            .publicKey,
                        tokenProgram: TOKEN_PROGRAM_ID,
                    })
                        .instruction(),
                ],
                signers,
            };
        });
    }
    joinMatch(kp, args, accounts, additionalArgs, winning) {
        return __awaiter(this, void 0, void 0, function* () {
            const match = (yield getMatch(additionalArgs.winOracle))[0];
            console.log(1);
            console.log(match.toBase58());
            // @ts-ignore
            const [tokenAccountEscrow, _escrowBump] = yield getMatchTokenAccountEscrow(
            // @ts-ignore
            additionalArgs.winOracle, new web3.PublicKey("So11111111111111111111111111111111111111112"), new web3.PublicKey("CMVfmxKAK1VQMFAQifnpsmTmg2JEdLtw5MkmqqHm9wCY"));
            const destinationTokenOwner = this.program.provider.wallet.publicKey;
            let destinationTokenAccount = (yield getAtaForMint(new web3.PublicKey("So11111111111111111111111111111111111111112"), destinationTokenOwner))[0];
            const sourceTokenAccount = accounts.sourceTokenAccount ||
                (yield getAtaForMint(accounts.tokenMint, this.program.provider.wallet.publicKey))[0];
            const transferAuthority = accounts.tokenTransferAuthority || web3.Keypair.generate();
            console.group(tokenAccountEscrow.toBase58());
            const signers = [transferAuthority];
            return {
                instructions: [
                    Token.createApproveInstruction(TOKEN_PROGRAM_ID, sourceTokenAccount, transferAuthority.publicKey, this.program.provider.wallet.publicKey, [], args.amount.toNumber()),
                    yield this.program.methods
                        .joinMatch(args)
                        .accounts({
                        dunngg: new web3.PublicKey("DuNNX7BkxNzK26eJSwhwaJ5D4EneM1D7ATsPhGgezDgg"),
                        destinationTokenAccount,
                        matchInstance: match,
                        tokenTransferAuthority: transferAuthority.publicKey,
                        tokenAccountEscrow,
                        tokenMint: accounts.tokenMint,
                        sourceTokenAccount,
                        sourceItemOrPlayerPda: additionalArgs.sourceType == TokenType.Any
                            ? web3.SystemProgram.programId
                            : additionalArgs.sourceType == TokenType.Item
                                ? (
                                // @ts-ignore
                                yield getItemPDA(accounts.tokenMint, additionalArgs.index))[0]
                                : (
                                // @ts-ignore
                                yield getPlayerPDA(accounts.tokenMint, additionalArgs.index))[0],
                        payer: this.program.provider.wallet.publicKey,
                        systemProgram: web3.SystemProgram.programId,
                        validationProgram: accounts.validationProgram || web3.SystemProgram.programId,
                        tokenProgram: TOKEN_PROGRAM_ID,
                        rent: web3.SYSVAR_RENT_PUBKEY,
                    })
                        .signers(signers)
                        .instruction(),
                    Token.createRevokeInstruction(TOKEN_PROGRAM_ID, sourceTokenAccount, this.program.provider.wallet.publicKey, []),
                ],
                signers,
            };
        });
    }
    updateMatchFromOracle(kp, args = {}, accounts, _additionalArgs = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const match = (yield getMatch(accounts.winOracle))[0];
            console.log(1);
            console.log(match.toBase58());
            return {
                instructions: [
                    yield this.program.methods
                        .updateMatchFromOracle(kp)
                        .accounts({
                        matchInstance: match,
                        winOracle: accounts.winOracle,
                        authority: this.program.provider.wallet
                            .publicKey,
                        clock: web3.SYSVAR_CLOCK_PUBKEY,
                    })
                        .instruction(),
                ],
                signers: [],
            };
        });
    }
    join(args, _accounts = {}, _additionalArgs = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            // @ts-ignore
            const matchInstance = (yield getMatch(args.winOracle))[0];
            // @ts-ignore
            const match = (yield getMatch(args.winOracle))[0];
            // @ts-ignore
            const [tokenAccountEscrow, _escrowBump] = yield getMatchTokenAccountEscrow(
            // @ts-ignore
            args.winOracle, new web3.PublicKey("So11111111111111111111111111111111111111112"), new web3.PublicKey("CMVfmxKAK1VQMFAQifnpsmTmg2JEdLtw5MkmqqHm9wCY"));
            const destinationTokenOwner = this.program.provider.wallet.publicKey;
            let destinationTokenAccount = (yield getAtaForMint(new web3.PublicKey("So11111111111111111111111111111111111111112"), destinationTokenOwner))[0];
            return {
                instructions: [
                    yield this.program.methods
                        .join(Object.assign(Object.assign({}, args), { seed: new web3.PublicKey(args.seed) }))
                        .accounts({
                        tokenAccountEscrow,
                        tokenMint: new web3.PublicKey("So11111111111111111111111111111111111111112"),
                        destinationTokenAccount,
                        tokenProgram: TOKEN_PROGRAM_ID,
                        matchInstance,
                        payer: this.program.provider.wallet.publicKey,
                        systemProgram: web3.SystemProgram.programId,
                        rent: web3.SYSVAR_RENT_PUBKEY,
                    })
                        .instruction(),
                ],
                signers: [],
            };
        });
    }
    createOrUpdateOracle(args, _accounts = {}, _additionalArgs = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const [oracle, _oracleBump] = yield getOracle(new web3.PublicKey(args.seed), args.authority);
            const tokenTransfers = args.tokenTransfers
                ? args.tokenTransfers.map((t) => (Object.assign(Object.assign({}, t), { from: new web3.PublicKey(t.from), to: t.to ? new web3.PublicKey(t.to) : null, mint: new web3.PublicKey(t.mint), amount: new BN(t.amount) })))
                : null;
            return {
                instructions: [
                    yield this.program.methods
                        .createOrUpdateOracle(Object.assign(Object.assign({}, args), { tokenTransfers, seed: new web3.PublicKey(args.seed) }))
                        .accounts({
                        oracle,
                        payer: this.program.provider.wallet.publicKey,
                        systemProgram: web3.SystemProgram.programId,
                        rent: web3.SYSVAR_RENT_PUBKEY,
                    })
                        .instruction(),
                ],
                signers: [],
            };
        });
    }
}
export class MatchesProgram {
    constructor(args) {
        this.id = args.id;
        this.program = args.program;
        this.instruction = new MatchesInstruction({
            id: this.id,
            program: this.program,
        });
    }
    fetchMatch(oracle) {
        return __awaiter(this, void 0, void 0, function* () {
            const matchPda = (yield getMatch(oracle))[0];
            const match = yield this.program.account.match.fetch(matchPda);
            return new MatchWrapper({
                program: this,
                key: matchPda,
                data: match.data,
                object: match,
            });
        });
    }
    fetchOracle(oracle) {
        return __awaiter(this, void 0, void 0, function* () {
            const oracleAcct = yield this.program.provider.connection.getAccountInfo(oracle);
            const oracleInstance = yield this.program.account.winOracle.coder.accounts.decode("WinOracle", 
            // @ts-ignore
            oracleAcct.data);
            return new MatchWrapper({
                program: this,
                key: oracle,
                // @ts-ignore
                data: oracleAcct.data,
                object: oracleInstance,
            });
        });
    }
    createMatch(kp, args, _accounts = {}, additionalArgs) {
        return __awaiter(this, void 0, void 0, function* () {
            const { instructions, signers } = yield this.instruction.createMatch(kp, args);
            yield sendTransactionWithRetryWithKeypair(this.program.provider.connection, kp, instructions, signers);
        });
    }
    disburseTokensByOracle(args, accounts, additionalArgs) {
        return __awaiter(this, void 0, void 0, function* () {
            const { instructions, signers } = yield this.instruction.disburseTokensByOracle(args, accounts, additionalArgs);
            yield sendTransactionWithRetry(this.program.provider.connection, this.program.provider.wallet, instructions, signers);
        });
    }
    drainMatch(args, accounts, additionalArgs) {
        return __awaiter(this, void 0, void 0, function* () {
            const { instructions, signers } = yield this.instruction.drainMatch(args, accounts, additionalArgs);
            yield sendTransactionWithRetry(this.program.provider.connection, this.program.provider.wallet, instructions, signers);
        });
    }
    drainOracle(args, accounts, _additionalArgs = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const { instructions, signers } = yield this.instruction.drainOracle(args, accounts);
            yield sendTransactionWithRetry(this.program.provider.connection, this.program.provider.wallet, instructions, signers);
        });
    }
    joinMatch(kp, args, accounts, additionalArgs, winning) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(5);
            const { instructions, signers } = yield this.instruction.joinMatch(kp, args, accounts, additionalArgs, winning);
            console.log(instructions);
            yield sendTransactionWithRetryWithKeypair(this.program.provider.connection, kp, instructions, signers);
        });
    }
    leaveMatch(args, accounts, additionalArgs) {
        return __awaiter(this, void 0, void 0, function* () {
            const { instructions, signers } = yield this.instruction.leaveMatch(args, accounts, additionalArgs);
            yield sendTransactionWithRetry(this.program.provider.connection, this.program.provider.wallet, instructions, signers);
        });
    }
    updateMatch(kp, args, accounts, _additionalArgs = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const { instructions, signers } = yield this.instruction.updateMatch(kp, args, accounts);
            yield sendTransactionWithRetryWithKeypair(this.program.provider.connection, kp, instructions, signers);
        });
    }
    updateMatchFromOracle(kp, args = {}, accounts, _additionalArgs = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const { instructions, signers } = yield this.instruction.updateMatchFromOracle(kp, args, accounts);
            yield sendTransactionWithRetryWithKeypair(this.program.provider.connection, kp, instructions, signers);
        });
    }
    join(kp, args, _accounts = {}, _additionalArgs = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const { instructions, signers } = yield this.instruction.join(args);
            yield sendTransactionWithRetryWithKeypair(this.program.provider.connection, kp, instructions, signers);
        });
    }
    createOrUpdateOracle(kp, args, _accounts = {}, _additionalArgs = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const { instructions, signers } = yield this.instruction.createOrUpdateOracle(args);
            yield sendTransactionWithRetryWithKeypair(this.program.provider.connection, kp, instructions, signers);
        });
    }
}
export function getMatchesProgram(anchorWallet, env, customRpcUrl = "https://solana--devnet.datahub.figment.io/apikey/fff8d9138bc9e233a2c1a5d4f777e6ad") {
    return __awaiter(this, void 0, void 0, function* () {
        if (customRpcUrl)
            log.debug("USING CUSTOM URL", customRpcUrl);
        const solConnection = new web3.Connection(customRpcUrl || getCluster(env));
        if (anchorWallet instanceof web3.Keypair)
            anchorWallet = new NodeWallet(anchorWallet);
        const provider = new AnchorProvider(solConnection, anchorWallet, {
            preflightCommitment: "recent",
        });
        const idl = yield Program.fetchIdl(MATCHES_ID, provider);
        // @ts-ignore
        const program = new Program(idl, MATCHES_ID, provider);
        return new MatchesProgram({
            id: MATCHES_ID,
            program,
        });
    });
}
