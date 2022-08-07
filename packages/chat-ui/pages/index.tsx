import React from "react";
import {
  Stack,
  Text,
  Image,
  Button,
  useDisclosure,
  Flex,
} from "@chakra-ui/react";
import { getMatchesProgram,
  Utils,
  State} from '../../raindrops/js/lib/build/main'
  const { PDA } = Utils

import { useRouter } from "next/router";
import { Layout } from "@/components/Layout";
import { Header } from "@/components/Header";
import { ProfileButton } from "@/components/ProfileButton";
import { route, routes } from "../src/routes";
import { useDelegateWallet } from "src";
import { PublicKey } from "@solana/web3.js";

import MatchesState = State.Matches;
import { BN } from "bn.js";
const config = {
  "winOracle": null,
  "matchState": { "started": true },
  "winOracleCooldown": 0,
  "space": 300,
  "minimumAllowedEntryTime": null,
  "tokenEntryValidation": null,
  "authority": "CMVfmxKAK1VQMFAQifnpsmTmg2JEdLtw5MkmqqHm9wCY",
  "leaveAllowed": true,
  "joinAllowedDuringStart": true,
  "oracleState": {
    "seed": "4B54MUDkeasn6M99jQsxheprttLctMpx6AZK2NQbdhux",
    "authority": "CMVfmxKAK1VQMFAQifnpsmTmg2JEdLtw5MkmqqHm9wCY",
    "finalized": false,
    "tokenTransferRoot": null,
    "tokenTransfers": [ ]
  },
  "tokensToJoin": [
    {
      "mint": "So11111111111111111111111111111111111111112",
      "amount": 13800,
      "sourceType": 1,
      "index": 0,
      "validationProgram": "nameAxQRRBnd4kLfsVoZBBXfrByZdZTkh8mULLxLyqV"
    }
  ]
}

const Home = () => {
  const router = useRouter();
  const sidebar = useDisclosure();
  const { keypair: delegateWallet, loading } = useDelegateWallet();
  async function play(){
    if (delegateWallet){
    const anchorProgram = await getMatchesProgram(delegateWallet, 'devnet', "https://api.devnet.solana.com");


    const indices: any[] = [];

    let winOracle = config.winOracle
    ? new PublicKey(config.winOracle)
    : (
        await PDA.getOracle(
          new PublicKey(config.oracleState.seed),

          config.oracleState.authority
            ? new PublicKey(config.oracleState.authority)
            : delegateWallet.publicKey
        )
      )[0];
      
// @ts-ignore
const matchInstance = await anchorProgram.fetchMatch(winOracle);

const winning = matchInstance.object.winning;
    for (let i = 0; i < indices.length; i++) {
      const setup = config.tokensToJoin[indices[i]];
      await anchorProgram.joinMatch(
        delegateWallet,
        {
          amount: new BN(setup.amount),
          tokenEntryValidation: null,
          tokenEntryValidationProof: null,
        },
        {
          tokenMint: new PublicKey(setup.mint),
          sourceTokenAccount: null,
          tokenTransferAuthority: null,
          validationProgram: setup.validationProgram
            ? new PublicKey(setup.validationProgram)
            : null,
        },
        {
          winOracle: config.winOracle
            ? new PublicKey(config.winOracle)
            : (
                await PDA.getOracle(
                  new PublicKey(config.oracleState.seed),

                  config.oracleState.authority
                    ? new PublicKey(config.oracleState.authority)
                    : delegateWallet.publicKey
                )
              )[0],
          sourceType: setup.sourceType as MatchesState.TokenType,
          index:
            setup.index != null && setup.index != undefined
              ? new BN(setup.index)
              : null,
        },
        
      );
    }
  }
  }
  return (
    <Layout
      isSidebarOpen={sidebar.isOpen}
      onSidebarClose={sidebar.onClose}
      onSidebarOpen={sidebar.onOpen}
    >
      <Header onSidebarOpen={sidebar.onOpen} />
      <Stack
        px={4}
        direction={{ base: "column", lg: "row" }}
        gap={{ base: 0, lg: 16 }}
        w="full"
        h="full"
        justifyContent="center"
        alignItems="center"
      >
        <Image
          src="./splash.png"
          alt="strata.im splash image"
          w={{ base: "300px", lg: "440px" }}
        />
        <Stack maxW="420px" gap={6}>
          <Stack alignItems={{ base: "center", lg: "start" }}>
            <Text fontSize={{ base: "2xl", lg: "4xl" }} fontWeight="bold">
              Welcome to strata.im
            </Text>
            <Text fontSize={{ base: "md", lg: "lg" }} fontWeight="bold">
              The first gated group chat built on Solana
            </Text>
            <Text fontSize={{ base: "sm", lg: "md" }}>
              Just connect your wallet, and start chatting! All of your messages
              run through the Solana Blockchain and are fully encrypted via Lit
              Protocol. With strata.im, you own your chat experience.
            </Text>
          </Stack>
          <Button
            colorScheme="primary"
            size="lg"
            onClick={() =>
              router.push(
                route(routes.chat, {
                  id: "solana",
                }),
                undefined,
                { shallow: true }
              )
            }
          >
            Start Chatting
          </Button>
          <Flex
            align="center"
            justifyContent="space-evenly"
            w="full"
            borderColor="primary.500"
            borderWidth="1px"
            borderRadius="md"
            overflow="hidden"
          >
            <Button onClick={play}>Play</Button>
            <ProfileButton size="lg" >
              Create Profile
            </ProfileButton>
          </Flex>
        </Stack>
      </Stack>
    </Layout>
  );
};

export default Home;
