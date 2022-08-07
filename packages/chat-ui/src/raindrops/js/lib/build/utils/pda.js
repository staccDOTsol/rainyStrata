var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// @ts-nocheck
import { web3 } from "@project-serum/anchor";
import { TOKEN_PROGRAM_ID, SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID, NAMESPACE_ID, ITEM_ID, TOKEN_METADATA_PROGRAM_ID, MATCHES_ID, PLAYER_ID, STAKING_ID, } from "../constants/programIds";
import { PREFIX as ITEM_PREFIX, MARKER } from "../constants/item";
import { PREFIX as MATCHES_PREFIX } from "../constants/matches";
import { PREFIX as NAMESPACE_PREFIX } from "../constants/namespace";
import { PREFIX as PLAYER_PREFIX } from "../constants/player";
import { PREFIX as STAKING_PREFIX, STAKING_COUNTER, } from "../constants/staking";
export const getAtaForMint = (mint, wallet) => __awaiter(void 0, void 0, void 0, function* () {
    return yield web3.PublicKey.findProgramAddress([wallet.toBuffer(), TOKEN_PROGRAM_ID.toBuffer(), mint.toBuffer()], SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID);
});
export const getMatch = (oracle) => __awaiter(void 0, void 0, void 0, function* () {
    return yield web3.PublicKey.findProgramAddress([Buffer.from(MATCHES_PREFIX), oracle.toBuffer()], MATCHES_ID);
});
export const getMatchTokenAccountEscrow = (oracle, tokenMint, tokenOwner) => __awaiter(void 0, void 0, void 0, function* () {
    return yield web3.PublicKey.findProgramAddress([
        Buffer.from(MATCHES_PREFIX),
        oracle.toBuffer(),
        tokenMint.toBuffer(),
        tokenOwner.toBuffer(),
    ], MATCHES_ID);
});
export const getOracle = (seed, payer) => __awaiter(void 0, void 0, void 0, function* () {
    return yield web3.PublicKey.findProgramAddress([Buffer.from(MATCHES_PREFIX), payer.toBuffer(), seed.toBuffer()], MATCHES_ID);
});
export const getNamespacePDA = (mint) => __awaiter(void 0, void 0, void 0, function* () {
    return yield web3.PublicKey.findProgramAddress([Buffer.from(NAMESPACE_PREFIX), mint.toBuffer()], NAMESPACE_ID);
});
export const getItemPDA = (mint, index) => __awaiter(void 0, void 0, void 0, function* () {
    return yield web3.PublicKey.findProgramAddress([
        Buffer.from(ITEM_PREFIX),
        mint.toBuffer(),
        index.toArrayLike(Buffer, "le", 8),
    ], ITEM_ID);
});
export const getPlayerPDA = (mint, index) => __awaiter(void 0, void 0, void 0, function* () {
    return yield web3.PublicKey.findProgramAddress([
        Buffer.from(PLAYER_PREFIX),
        mint.toBuffer(),
        index.toArrayLike(Buffer, "le", 8),
    ], PLAYER_ID);
});
export const getItemActivationMarker = (args) => __awaiter(void 0, void 0, void 0, function* () {
    return yield web3.PublicKey.findProgramAddress([
        Buffer.from(ITEM_PREFIX),
        args.itemMint.toBuffer(),
        args.index.toArrayLike(Buffer, "le", 8),
        args.usageIndex.toArrayLike(Buffer, "le", 8),
        args.amount.toArrayLike(Buffer, "le", 8),
        Buffer.from(MARKER),
    ], ITEM_ID);
});
export const getCraftItemCounter = (args) => __awaiter(void 0, void 0, void 0, function* () {
    return yield web3.PublicKey.findProgramAddress([
        Buffer.from(ITEM_PREFIX),
        args.itemClassMint.toBuffer(),
        args.classIndex.toArrayLike(Buffer, "le", 8),
        args.newItemMint.toBuffer(),
        args.craftEscrowIndex.toArrayLike(Buffer, "le", 8),
        args.craftItemIndex.toArrayLike(Buffer, "le", 8),
        args.craftItemMint.toBuffer(),
        Buffer.from(args.componentScope),
    ], ITEM_ID);
});
export const getCraftItemEscrow = (args) => __awaiter(void 0, void 0, void 0, function* () {
    return yield web3.PublicKey.findProgramAddress([
        Buffer.from(ITEM_PREFIX),
        args.itemClassMint.toBuffer(),
        args.classIndex.toArrayLike(Buffer, "le", 8),
        args.payer.toBuffer(),
        args.newItemMint.toBuffer(),
        args.craftItemToken.toBuffer(),
        args.craftEscrowIndex.toArrayLike(Buffer, "le", 8),
        args.craftIndex.toArrayLike(Buffer, "le", 8),
        args.craftItemMint.toBuffer(),
        args.amountToMake.toArrayLike(Buffer, "le", 8),
        args.amountToContributeFromThisContributor.toArrayLike(Buffer, "le", 8),
        Buffer.from(args.componentScope),
    ], ITEM_ID);
});
export const getItemEscrow = (args) => __awaiter(void 0, void 0, void 0, function* () {
    return yield web3.PublicKey.findProgramAddress([
        Buffer.from(ITEM_PREFIX),
        args.itemClassMint.toBuffer(),
        args.classIndex.toArrayLike(Buffer, "le", 8),
        args.payer.toBuffer(),
        args.newItemMint.toBuffer(),
        args.newItemToken.toBuffer(),
        args.craftEscrowIndex.toArrayLike(Buffer, "le", 8),
        args.amountToMake.toArrayLike(Buffer, "le", 8),
        Buffer.from(args.componentScope),
    ], ITEM_ID);
});
export const getArtifactIntermediaryStakingAccount = (args) => __awaiter(void 0, void 0, void 0, function* () {
    return yield web3.PublicKey.findProgramAddress([
        Buffer.from(STAKING_PREFIX),
        args.artifactClassMint.toBuffer(),
        args.artifactMint.toBuffer(),
        args.index.toArrayLike(Buffer, "le", 8),
        args.stakingMint.toBuffer(),
        args.stakingIndex.toArrayLike(Buffer, "le", 8),
    ], STAKING_ID);
});
export const getArtifactIntermediaryStakingCounterForWarmup = (args) => __awaiter(void 0, void 0, void 0, function* () {
    return yield web3.PublicKey.findProgramAddress([
        Buffer.from(STAKING_PREFIX),
        args.artifactClassMint.toBuffer(),
        args.artifactMint.toBuffer(),
        args.index.toArrayLike(Buffer, "le", 8),
        args.stakingMint.toBuffer(),
        args.stakingIndex.toArrayLike(Buffer, "le", 8),
        Buffer.from(STAKING_COUNTER),
    ], STAKING_ID);
});
export const getArtifactIntermediaryStakingCounterForCooldown = (args) => __awaiter(void 0, void 0, void 0, function* () {
    return yield web3.PublicKey.findProgramAddress([
        Buffer.from(STAKING_PREFIX),
        args.artifactClassMint.toBuffer(),
        args.artifactMint.toBuffer(),
        args.index.toArrayLike(Buffer, "le", 8),
        args.stakingMint.toBuffer(),
        args.stakingIndex.toArrayLike(Buffer, "le", 8),
        Buffer.from(STAKING_COUNTER),
        args.stakingAccount.toBuffer(),
    ], STAKING_ID);
});
export const getArtifactMintStakingAccount = (args) => __awaiter(void 0, void 0, void 0, function* () {
    return yield web3.PublicKey.findProgramAddress([
        Buffer.from(STAKING_PREFIX),
        args.artifactClassMint.toBuffer(),
        args.artifactMint.toBuffer(),
        args.index.toArrayLike(Buffer, "le", 8),
        args.stakingMint.toBuffer(),
    ], STAKING_ID);
});
export const getMetadata = (mint) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield web3.PublicKey.findProgramAddress([
        Buffer.from("metadata"),
        TOKEN_METADATA_PROGRAM_ID.toBuffer(),
        mint.toBuffer(),
    ], TOKEN_METADATA_PROGRAM_ID))[0];
});
export const getEdition = (mint) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield web3.PublicKey.findProgramAddress([
        Buffer.from("metadata"),
        TOKEN_METADATA_PROGRAM_ID.toBuffer(),
        mint.toBuffer(),
        Buffer.from("edition"),
    ], TOKEN_METADATA_PROGRAM_ID))[0];
});
