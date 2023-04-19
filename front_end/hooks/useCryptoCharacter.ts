import * as wagmi from "wagmi";
import { useProvider, useSigner } from "wagmi";

import { ContractTransaction, ethers } from "ethers";
import { cryptocharacter } from "../constants/index";
import { mumbai, localhost } from "../constants/index";
import { Character } from "@/types/TCharacter";

const useCryptoCharacter = () => {
  const { data: signer } = useSigner();
  const provider = useProvider();

  const contract = wagmi.useContract({
    address: mumbai.cryptocharacter,
    abi: cryptocharacter,
    signerOrProvider: signer || provider,
  });

  const selectNewStyle = async ({
    part,
    bidAmount,
    index,
  }: {
    part: string;
    index: string | number;
    bidAmount: string;
  }): Promise<string> => {
    let tx: ContractTransaction;

    switch (part) {
      case "hair":
        tx = await contract?.selectNewHairStyle(index, {
          value: bidAmount,
          gasLimit: 130000,
        });
        break;
      case "eye":
        tx = await contract?.selectNewEyeStyle(index, {
          value: bidAmount,
          gasLimit: 130000,
        });
        break;
      case "mouth":
        tx = await contract?.selectNewMouthStyle(index, {
          value: bidAmount,
          gasLimit: 130000,
        });
        break;
      case "cloth":
        tx = await contract?.selectNewClothStyle(index, {
          value: bidAmount,
          gasLimit: 130000,
        });
        break;
      default:
        throw new Error("No part provided");
    }

    const { transactionHash } = await tx.wait();

    return transactionHash;
  };

  const getCharacter = async (): Promise<Character> => {
    return contract?.getCharacter();
  };

  const getHairStyleURIs = async (): Promise<string[]> => {
    return contract?.getHairStyleURIs();
  };

  const getEyeStyleURIs = async (): Promise<string[]> => {
    return contract?.getEyeStyleURIs();
  };

  const getMouthStyleURIs = async (): Promise<string[]> => {
    return contract?.getMouthStyleURIs();
  };

  const getClothStyleURIs = async (): Promise<string[]> => {
    return contract?.getClothStyleURIs();
  };

  return {
    contract,
    getCharacter,
    getHairStyleURIs,
    getEyeStyleURIs,
    getMouthStyleURIs,
    getClothStyleURIs,
    selectNewStyle,
  };
};

export default useCryptoCharacter;
