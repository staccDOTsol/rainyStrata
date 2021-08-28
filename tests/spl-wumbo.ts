import * as anchor from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";
import { createMint } from "@project-serum/common";
import { NATIVE_MINT } from "@solana/spl-token";
import { BN } from "@wum.bo/anchor";
import { expect, use } from "chai";
import ChaiAsPromised from "chai-as-promised";

import { SplWumbo, WumboV0 } from "../packages/spl-wumbo";
import { SplTokenBonding, TokenBondingV0 } from "../packages/spl-token-bonding/dist/lib";
import {
  PeriodUnit,
  SplTokenStaking,
  TokenStakingV0,
} from "../packages/spl-token-staking/dist/lib";

use(ChaiAsPromised);

const sleep = (ts: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ts);
  });

const percent = (percent: number): number => Math.floor((percent / 100) * 4294967295); // unit32 max value

describe("spl-wumbo", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider.local());

  const program = anchor.workspace.SplWumbo;
  const program2 = anchor.workspace.SplTokenBonding;
  const program3 = anchor.workspace.SplTokenStaking;

  const wumboProgram = new SplWumbo(program);
  const tokenBondingProgram = new SplTokenBonding(program2);
  const tokenStakingProgram = new SplTokenStaking(program3);

  let baseCurve: PublicKey;
  let baseMint: PublicKey = NATIVE_MINT;
  let tokenBonding: PublicKey;
  let tokenBondingAcct: TokenBondingV0;
  let wumbo: PublicKey;
  let wumboAcct: WumboV0;

  it("Initializes Wumbo", async () => {
    baseCurve = await tokenBondingProgram.initializeLogCurve({
      c: new BN(1000000000000), // 1
      g: new BN(100000000000), // 0.1
      taylorIterations: 15,
    });

    tokenBonding = await tokenBondingProgram.createTokenBonding({
      curve: baseCurve,
      baseMint,
      targetMintDecimals: 2,
      authority: wumboProgram.wallet.publicKey,
      baseRoyaltyPercentage: percent(5),
      targetRoyaltyPercentage: percent(0),
      mintCap: new BN(1000), // 10.0
    });

    tokenBondingAcct = (await tokenBondingProgram.account.tokenBondingV0.fetch(
      tokenBonding
    )) as TokenBondingV0;

    wumbo = await wumboProgram.createWumbo({
      wumboMint: tokenBondingAcct.targetMint,
      baseCurve: tokenBondingAcct.curve,
    });

    wumboAcct = (await wumboProgram.account.wumboV0.fetch(wumbo)) as WumboV0;

    expect(wumbo).to.exist;
    expect(wumboAcct.wumboMint.toString()).to.eq(tokenBondingAcct.targetMint.toString());
    expect(wumboAcct.baseCurve.toString()).to.eq(tokenBondingAcct.curve.toString());
  });

  describe("Unclaimed social token", () => {
    let socialTokenBonding: PublicKey;
    let socialTokenBondingAcct: TokenBondingV0;
    let socialTokenStaking: PublicKey;
    let socialTokenStakingAcct: TokenStakingV0;
    let name = anchor.web3.Keypair.generate();
    let nameOwner = anchor.web3.Keypair.generate();
    let tokenRef: PublicKey;
    let reverseTokenRef: PublicKey;

    it("Creates the social token", async () => {
      socialTokenBonding = await tokenBondingProgram.createTokenBonding({
        curve: baseCurve,
        baseMint: tokenBondingAcct.targetMint,
        targetMintDecimals: 2,
        authority: wumboProgram.wallet.publicKey,
        baseRoyaltyPercentage: percent(5),
        targetRoyaltyPercentage: percent(0),
        mintCap: new BN(1000),
      });

      socialTokenBondingAcct = (await tokenBondingProgram.account.tokenBondingV0.fetch(
        socialTokenBonding
      )) as TokenBondingV0;

      socialTokenStaking = await tokenStakingProgram.createTokenStaking({
        authority: wumboProgram.wallet.publicKey,
        baseMint: tokenBondingAcct.targetMint,
        periodUnit: PeriodUnit.SECOND,
        period: 5,
        targetMintDecimals: 2,
        rewardPercentPerPeriodPerLockupPeriod: 4294967295, // 100%
      });

      socialTokenStakingAcct = (await tokenStakingProgram.account.tokenStakingV0.fetch(
        socialTokenStaking
      )) as any; // TODO should be (as TokenStakingV0) casting does not like it

      let { tokenRef: _tr, reverseTokenRef: _rtr } = await wumboProgram.createSocialToken({
        wumboInstance: wumbo,
        tokenBonding: socialTokenBonding,
        tokenStaking: socialTokenStaking,
        name: name.publicKey,
        nameOwner: nameOwner.publicKey,
      });

      tokenRef = _tr;
      reverseTokenRef = _rtr;

      expect(tokenRef).to.exist;
      expect(reverseTokenRef).to.exist;
    });
  });

  describe("Claimed social token", () => {
    it("Creates the social token", async () => {});
  });
});
