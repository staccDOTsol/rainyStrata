import React, { useState } from "react";
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
  State} from '../../rain/js/lib'
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
let prev = 0;
let not = true
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
    "seed": "Ff9GNMJzhyU32wj12GD3bdUVae4xGTtS5pkdRvxvaieU",
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
  const [stuff, setStuff] = useState<number[]>([])
  const router = useRouter();
  const sidebar = useDisclosure();
  const [things, setThings] = useState<Element>()
  const [diffs, setDiffs] = useState([])
  const [addies, setAddies] = useState([])
  const { keypair: delegateWallet, loading } = useDelegateWallet();
  
  async function play(){
    if (delegateWallet){
      console.log(1)
    const anchorProgram = await getMatchesProgram(delegateWallet, 'devnet', "https://solana--devnet.datahub.figment.io/apikey/fff8d9138bc9e233a2c1a5d4f777e6ad");


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
console.log(2)

const winning = matchInstance.object.winning;
const lastplay = matchInstance.object.lastplay;
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
          winOracle,
          sourceType: setup.sourceType as MatchesState.TokenType,
          index:
            setup.index != null && setup.index != undefined
              ? new BN(setup.index)
              : null,
        },
        
      );
    }      console.log(3)

  }
}
  setInterval(async function(){
    if (delegateWallet && not){
      not = false 
    const anchorProgram = await getMatchesProgram(delegateWallet, 'devnet', "https://solana--devnet.datahub.figment.io/apikey/fff8d9138bc9e233a2c1a5d4f777e6ad");


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
const oracleInstance = await anchorProgram.fetchOracle(winOracle);
const lastplay = matchInstance.object.lastplay;
const u = matchInstance.object;
const o = oracleInstance.object;

if (lastplay != prev){
  prev = lastplay


let last2 = 0
let now = (1000 - parseInt((u.lastthousand.toNumber() -  new Date().getTime() / 1000).toString()))
let diff = (now - last2)
let tDiffs = diffs 
let tAddies = addies 
// @ts-ignore
tDiffs.push(diff)
// @ts-ignore
tAddies.push(u.winning.toBase58().toString().substring(0,3) + u.winning.toBase58().toString().substring(u.winning.toBase58().toString().length-3,u.winning.toBase58().toString().length))
setAddies(tAddies)
setDiffs(tDiffs)
let somethings: any[] = []
for (var anis in diffs){
let is: JSX.Element[] = []

for (var i = 0; i < diffs[anis]  && i < 10; i++){
  is[i] = (<br />)
}
let something = (<
  Flex
  align="center"
  justifyContent="space-evenly"
  w="full"
  borderColor="primary.500"
  borderWidth="1px"
  borderRadius="md"
  overflow="hidden"
>
{is.map((name, index) => (
       <br key={index}>
        </br>
      ))}
      {addies[anis]}
    </Flex>)
    somethings.push(something)
    // @ts-ignore
    setThings(something)
}
    }}
    not = true;
  
  }, 1000)
  return (
    <div>
      <Header onSidebarOpen={sidebar.onOpen} />
      <Stack
        px={4}
        direction={{ base: "column", lg: "row" }}
        gap={{ base: 0, lg: 16 }}
        w="full"
        h="full"
        justifyContent="center"
        alignItems="bottom"
      >
        <Stack maxW="420px" gap={6}>
         
        {
          things}
        <Flex
            align="center"
            justifyContent="space-evenly"
            w="full"
            borderColor="primary.500"
            borderWidth="1px"
            borderRadius="md"
            overflow="hidden"

          >
        <Text>
              Send WRAPPED sol to {delegateWallet?.publicKey.toBase58()} in order to play.. gl... you disqualify if you play outside of 2-10 seconds after your last play :)
            </Text>
            </Flex>
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
          <Flex
            align="center"
            justifyContent="space-evenly"
            w="full"
            borderColor="primary.500"
            borderWidth="1px"
            borderRadius="md"
            overflow="hidden"
          ></Flex>
        </Stack>
      </Stack>
    </div>
  );
};

export default Home;
