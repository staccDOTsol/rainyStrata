import React, { useEffect, useState } from "react";
import {
  Stack,
  Text,
  Button,
  useDisclosure,
  Flex,
} from "@chakra-ui/react";
import { getMatchesProgram,
  Utils,
  State} from '../../raindrops/js/lib'


import { useRouter } from "next/router";
import { Header } from "@/components/Header";
import { ProfileButton } from "@/components/ProfileButton";
import { useDelegateWallet } from "src";
import { Connection, Keypair, PublicKey } from "@solana/web3.js";

import MatchesState = State.Matches;
import { BN } from "bn.js";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
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
      "amount": 666138,
      "sourceType": 1,
      "index": 0,
      "validationProgram": "nameAxQRRBnd4kLfsVoZBBXfrByZdZTkh8mULLxLyqV"
    }
  ]
}

const Home = () => {
  const [pot, setPot ] = useState<number>(0)//FrBNQdKzxVLA2kMCSJPmYPNAC4dLE38ri8F5MMu8a1i
  const [prev, setPrev] = useState<string> ("")
  const [stuff, setStuff] = useState<number[]>([])
  const router = useRouter();
  const [ first, setFirst ] = useState<boolean> (true)
  const sidebar = useDisclosure();
  const [things, setThings] = useState<Element[]>([])
  const [diffs, setDiffs] = useState([])
  const [addies, setAddies] = useState([])
  const { keypair: delegateWallet, loading } = useDelegateWallet();
  const  wallet  = useAnchorWallet()
  const [mi, setMi] = useState<any>  ()
  const [ap, setAp] = useState<any>  ()
  const [oi, setOi] = useState<boolean>  (false)
  const [wo, setWo] = useState<any>  ()

  useEffect( () => {
    setTimeout(async function(){
   
    const anchorProgram = await getMatchesProgram(delegateWallet as Keypair, 'devnet', "https://devnet.genesysgo.net/");
    
  setAp(anchorProgram)
 
    let winOracle = new PublicKey(config.winOracle)
    //console.log(123)
  // @ts-ignore
  const matchInstance = await anchorProgram.fetchMatch(winOracle);
  setMi(matchInstance)

  
  //console.log(1)
 

  //console.log(123213)

  
const oracleInstance = await anchorProgram.fetchOracle(winOracle);
setWo(winOracle)
setInterval(async function(){
  if (!oi){
    setOi(true)

  } else {
    setOi(false)
  }
}, 3500)
    }, 1000)
  }, [delegateWallet])
  useEffect( () => {

  if (delegateWallet && mi){
    
  
    const u = mi.object;
    if (u.winning.toBase58().toString().substring(0,3) +'...'+ u.winning.toBase58().toString().substring(u.winning.toBase58().toString().length-3,u.winning.toBase58().toString().length) != prev){
      setPrev(u.winning.toBase58().toString().substring(0,3) +'...'+ u.winning.toBase58().toString().substring(u.winning.toBase58().toString().length-3,u.winning.toBase58().toString().length))
    console.log(prev)
     setOi(false) }
    }

  }, [mi])
  
useEffect( () => {
  let somethings: any [] = [] 
setThings(somethings)
setAddies([])
setDiffs([])
}, [delegateWallet])
useEffect( () => {

  if (delegateWallet && mi){
    setTimeout(async function(){
    const anchorProgram = await getMatchesProgram(delegateWallet as Keypair, 'devnet', "https://devnet.genesysgo.net/");
    let connection = new Connection("https://api.devnet.solana.com")
    let tokenAmount = await connection.getTokenAccountBalance(new PublicKey("FrBNQdKzxVLA2kMCSJPmYPNAC4dLE38ri8F5MMu8a1i"));
console.log(tokenAmount.value.uiAmount)
    setPot(tokenAmount.value.uiAmount as number * 0.9)

  setAp(anchorProgram)
 
    let winOracle = new PublicKey(config.winOracle)
    //console.log(123)
  // @ts-ignore
  const matchInstance = await anchorProgram.fetchMatch(winOracle);
  setMi(matchInstance)

const u = mi.object;

    const lastplay = mi.object.lastplay.toNumber().toString();
 
      let last2 = mi.object.lastplay.toNumber()
    let tAddies = addies 
    let gogo = true
    if (addies.length > 0){
      
    // @ts-ignore
    if (lastplay == addies[addies.length-1].split(':')[0]){
gogo = false 
    }
  }
    if (gogo){
      let now = (parseInt((u.lastthousand.toNumber() -  new Date().getTime() / 1000).toString()))
   
      let diff = (Math.round(now) * 100) / 100

      let tDiffs = diffs 
     // @ts-ignore
      tAddies.push(lastplay + ': '+diff.toString() + ': '+ u.winning.toBase58().toString().substring(0,3) +'...'+ u.winning.toBase58().toString().substring(u.winning.toBase58().toString().length-3,u.winning.toBase58().toString().length))

      // @ts-ignore

  tDiffs.push(diff)
    setAddies(tAddies)
    setDiffs(tDiffs)
    console.log(diffs)
  

    let somethings: any [] = things
    
let c = 0
    let is: JSX.Element[] = []
    
    for (var i = 0; i < diffs[diffs.length-2]  - diff  && i < 16; i++){
      is[i + c] = (<br />)
      c++
    }
    let something = (<
      Flex key={(things.length  * 138).toString() }
      align="center"
      justifyContent="space-evenly"
      w="full"
      borderColor="primary.500"
      borderWidth="1px"
      borderRadius="md"
      overflow="hidden"
    >
    {addies[addies.length-1]}
    {is.map((name, index) => (
     
           <br key={(index + things.length).toString() }>
            </br>
          ))}
        </Flex>)
        let go = true 
        for (var abc of somethings){
          if (abc.toString().indexOf(u.winning.toBase58().toString().substring(0,3) +'...'+ u.winning.toBase58().toString().substring(u.winning.toBase58().toString().length-3,u.winning.toBase58().toString().length)) != -1){
            go = true 
          }
        }
        somethings.push(something)
        
   
      somethings.reverse()
    setThings(somethings)
 
  
    }})}
}, [oi])
  async function play(){
    console.log(1)
    if (delegateWallet && mi){
      
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
        <Flex
            align="center"
            justifyContent="space-evenly"
            w="full"
            borderColor="primary.500"
            borderWidth="1px"
            borderRadius="md"
            overflow="hidden"

          > Pot is currently {pot} WSOL (devnet)
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
              Send WRAPPED sol to {delegateWallet?.publicKey.toBase58()} in order to play.. gl... you disqualify if you play outside of 2-10 seconds after your last play :) <br /> forgot to mention, every 1000s 90% of the pot goes to the person who submits a tx after the 1k mark. Sewn ppl will enter a key of their choice and be assigned a value within that second, so we can support even more massively multiplayer nonsense 
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
          ></Flex>
        </Stack>
      </Stack>
    </div>
  );
};

export default Home;
