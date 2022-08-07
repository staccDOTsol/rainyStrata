import React, { useEffect, useState } from "react";
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
  State} from '../../raindrops/js/lib'
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
import { setMaxListeners } from "process";
import { setOriginalNode } from "typescript";
const config = {
  "winOracle": "HZvn514zNVvBTU3Q7xUgKGRaGX3nFw68tLGpZVJYei6H",
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
  const [prev, setPrev] = useState<number> (0)
  const [stuff, setStuff] = useState<number[]>([])
  const router = useRouter();
  const sidebar = useDisclosure();
  const [things, setThings] = useState<Element>()
  const [diffs, setDiffs] = useState([])
  const [addies, setAddies] = useState([])
  const [not, setNot] = useState(true)
  const { keypair: delegateWallet, loading } = useDelegateWallet();
  const [mi, setMi] = useState<any>  ()
  const [ap, setAp] = useState<any>  ()
  const [oi, setOi] = useState<any>  ()
  const [wo, setWo] = useState<any>  ()
async function something(){
  if (delegateWallet){
  const anchorProgram = await getMatchesProgram(delegateWallet, 'devnet', "https://solana--devnet.datahub.figment.io/apikey/fff8d9138bc9e233a2c1a5d4f777e6ad");

  setAp(anchorProgram)
  //console.log(1)
 

  //console.log(123213)

  let winOracle = new PublicKey(config.winOracle)
    //console.log(123)
// @ts-ignore
const matchInstance = await anchorProgram.fetchMatch(winOracle);
setMi(matchInstance)

const oracleInstance = await anchorProgram.fetchOracle(winOracle);
setOi(oracleInstance)
setWo(winOracle)
      }
}
  setInterval(async function(){
    if (delegateWallet){
await something()
    }
  }, 15000)
  setTimeout(async function(){
    if (delegateWallet){
await something()
    }
  }, 1000)
  async function play(){
    console.log(1)
    if (delegateWallet){
      
console.log(2)
const indices: any[] = [];
const winning = mi.object.winning;
const lastplay = mi.object.lastplay;
console.log(3)
      console.log(4)
      const setup = config.tokensToJoin[0];
      await ap.joinMatch(
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
          winOracle:wo,
          sourceType: setup.sourceType as MatchesState.TokenType,
          index:
            setup.index != null && setup.index != undefined
              ? new BN(setup.index)
              : null,
        },
        
      );
    }      console.log(5)

}
  useEffect( () =>{
    
    if (delegateWallet && not){
      setNot(false)
 

const lastplay = mi.object.lastplay;
const u = mi.object;

if (u.winning.toBase58() != prev){
  setPrev(u.winning.toBase58())


let last2 = 0
let now = (parseInt((u.lastthousand.toNumber() -  new Date().getTime() / 1000).toString()))
let diff = (now - last2)
let tDiffs = diffs 
let tAddies = addies 
// @ts-ignore
tDiffs.push(diff)
// @ts-ignore
tAddies.push(diff.toString() + ': '+ u.winning.toBase58().toString().substring(0,3) + u.winning.toBase58().toString().substring(u.winning.toBase58().toString().length-3,u.winning.toBase58().toString().length))
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

    setNot(true)   
  }, [mi])
   
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
