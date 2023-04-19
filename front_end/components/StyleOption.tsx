import React, { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import {
  useClothStyleURIs,
  useEyeStyleURIs,
  useHairStyleURIs,
  useMouthStyleURIs,
  useSelectNewStyle,
} from "@/hooks";
import ipfsToHttps from "@/utils/ipfsToHttps";
import { ethers } from "ethers";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "@tanstack/react-query";
import { Character } from "@/types/TCharacter";
import { toast, ToastContainer } from "react-toastify";
import { FaEthereum } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import "react-accessible-accordion/dist/fancy-example.css";

interface StyleOptionProps {
  highestBid: {
    hair: string;
    eye: string;
    mouth: string;
    cloth: string;
  };
  getCharacterRefetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<Character, unknown>>;
}

const StyleOption = ({ highestBid, getCharacterRefetch }: StyleOptionProps) => {
  const [hairStyleURIs, setHairStyleURIs] = useState<string[]>([]);
  const [eyeStyleURIs, setEyeStyleURIs] = useState<string[]>([]);
  const [mouthStyleURIs, setMouthStyleURIs] = useState<string[]>([]);
  const [clothStyleURIs, setClothStyleURIs] = useState<string[]>([]);

  const { data: hairStylesData } = useHairStyleURIs(
    handleGetHairStyleURIsSuccess
  );
  const { data: eyeStylesData } = useEyeStyleURIs(handleGetEyeStyleURIsSuccess);

  const { data: mouthStylesData } = useMouthStyleURIs(
    handleGetMouthStyleURIsSuccess
  );

  const { data: clothStylesData } = useClothStyleURIs(
    handleGetClothStyleURIsSuccess
  );

  const { mutate: selectNewStyle } = useSelectNewStyle(
    handleSetNewStyleSuccess,
    handleSetNewStyleFailed
  );

  function handleGetHairStyleURIsSuccess(hairStyleURIs: string[]) {
    const updatedURIs = hairStyleURIs.map((uri) => ipfsToHttps(uri));
    setHairStyleURIs(updatedURIs);
  }

  function handleGetEyeStyleURIsSuccess(eyeStyleURIs: string[]) {
    const updatedURIs = eyeStyleURIs.map((uri) => ipfsToHttps(uri));
    setEyeStyleURIs(updatedURIs);
  }

  function handleGetMouthStyleURIsSuccess(mouthStyleURIs: string[]) {
    const updatedURIs = mouthStyleURIs.map((uri) => ipfsToHttps(uri));
    setMouthStyleURIs(updatedURIs);
  }

  function handleGetClothStyleURIsSuccess(clothStyleURIs: string[]) {
    const updatedURIs = clothStyleURIs.map((uri) => ipfsToHttps(uri));
    setClothStyleURIs(updatedURIs);
  }

  function handleSetNewStyle(part: string, index: number, bidAmount: string) {
    const amountNeeded = ethers.utils.parseEther("0.0011").add(bidAmount);
    selectNewStyle({
      part,
      index,
      bidAmount: amountNeeded.toString(),
    });
  }

  function handleSetNewStyleSuccess(transactionHash: string) {
    setTimeout(() => {
      toast.success("Check your transaction🙋", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        onClick: () => {
          const url = `https://mumbai.polygonscan.com/tx/${transactionHash}`;
          window.open(url, "_blank", "noopener,noreferrer");
        },
      });
    }, 100);
    getCharacterRefetch();
  }

  function handleSetNewStyleFailed() {}

  return (
    <div>
      <ToastContainer />
      <Accordion preExpanded={["hair"]} allowZeroExpanded>
        <AccordionItem uuid={"hair"}>
          <AccordionItemHeading>
            <AccordionItemButton>Hairstyle</AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <div className="grid grid-cols-4 items-center">
              {hairStyleURIs.map((img, index) => (
                <div
                  key={"hair" + index}
                  onClick={() =>
                    handleSetNewStyle("hair", index, highestBid.hair)
                  }
                  className="cursor-pointer hover:scale-105 transition"
                >
                  <img src={img} alt={`hair ${index}`} />
                </div>
              ))}
            </div>
          </AccordionItemPanel>
        </AccordionItem>
        <AccordionItem uuid={"eye"}>
          <AccordionItemHeading>
            <AccordionItemButton>Eye</AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <div className="grid grid-cols-4 items-center">
              {eyeStyleURIs.map((img, index) => (
                <div
                  key={"eye" + index}
                  onClick={() =>
                    handleSetNewStyle("eye", index, highestBid.eye)
                  }
                  className="cursor-pointer hover:scale-105 transition"
                >
                  <img src={img} alt={`eye ${index}`} />
                </div>
              ))}
            </div>
          </AccordionItemPanel>
        </AccordionItem>
        <AccordionItem uuid={"mouth"}>
          <AccordionItemHeading>
            <AccordionItemButton>Mouth</AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <div className="grid grid-cols-4 items-center">
              {mouthStyleURIs.map((img, index) => (
                <div
                  key={"mouth" + index}
                  onClick={() =>
                    handleSetNewStyle("mouth", index, highestBid.mouth)
                  }
                  className="cursor-pointer hover:scale-105 transition"
                >
                  <img src={img} alt={`mouth ${index}`} />
                </div>
              ))}
            </div>
          </AccordionItemPanel>
        </AccordionItem>
        <AccordionItem uuid={"cloth"}>
          <AccordionItemHeading>
            <AccordionItemButton>Cloth</AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <div className="grid grid-cols-4 items-center">
              {clothStyleURIs.map((img, index) => (
                <div
                  key={"cloth" + index}
                  onClick={() =>
                    handleSetNewStyle("cloth", index, highestBid.cloth)
                  }
                  className="cursor-pointer hover:scale-105 transition"
                >
                  <img src={img} alt={`cloth ${index}`} />
                </div>
              ))}
            </div>
          </AccordionItemPanel>
        </AccordionItem>
      </Accordion>
      <div className="flex flex-col gap-2 text-black dark:text-white mt-5">
        <h3 className="text-center ">🚀 Highest Bid Board 🚀</h3>
        <div className="flex items-center gap-1">
          Hair: {ethers.utils.formatEther(highestBid?.hair ?? "0")}{" "}
          <FaEthereum className="text-sm mt-[1px]" />{" "}
        </div>
        <div className="flex items-center gap-1">
          Eye: {ethers.utils.formatEther(highestBid?.eye ?? "0")}{" "}
          <FaEthereum className="text-sm mt-[1px]" />
        </div>
        <div className="flex items-center gap-1">
          Mouth: {ethers.utils.formatEther(highestBid?.mouth ?? "0")}
          <FaEthereum className="text-sm mt-[1px]" />
        </div>
        <div className="flex items-center gap-1">
          Cloth: {ethers.utils.formatEther(highestBid?.cloth ?? "0")}
          <FaEthereum className="text-sm mt-[1px]" />
        </div>
      </div>
    </div>
  );
};

export default StyleOption;
