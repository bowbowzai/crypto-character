import React, { Dispatch, SetStateAction } from "react";
import Image, { StaticImageData } from "next/image";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";
import { hairs } from "@/assets/hairstyle";
import { eyes } from "@/assets/eyes";
import { mouths } from "@/assets/mouth";
import { clothes } from "@/assets/clothes";

interface StyleOptionProps {
  setCharacterDesign: Dispatch<
    SetStateAction<{
      hairstyle: StaticImageData;
      eyestyle: StaticImageData;
      mouthstyle: StaticImageData;
      clothstyle: StaticImageData;
    }>
  >;
}

const StyleOption = ({ setCharacterDesign }: StyleOptionProps) => {
  function handleChangeHairStyle(property: string, img: StaticImageData) {
    setCharacterDesign((prev) => ({
      ...prev,
      [property]: img,
    }));
  }
  return (
    <div>
      <Accordion preExpanded={["hair"]} allowZeroExpanded>
        <AccordionItem uuid={"hair"}>
          <AccordionItemHeading>
            <AccordionItemButton>Hairstyle</AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <div className="grid grid-cols-4 items-center">
              {hairs.map((img, index) => (
                <div
                  onClick={() => handleChangeHairStyle("hairstyle", img)}
                  className="cursor-pointer hover:scale-105 transition"
                >
                  <Image src={img} alt={`hair ${index}`} />
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
              {eyes.map((img, index) => (
                <div
                  onClick={() => handleChangeHairStyle("eyestyle", img)}
                  className="cursor-pointer hover:scale-105 transition"
                >
                  <Image src={img} alt={`eye ${index}`} />
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
              {mouths.map((img, index) => (
                <div
                  onClick={() => handleChangeHairStyle("mouthstyle", img)}
                  className="cursor-pointer hover:scale-105 transition"
                >
                  <Image src={img} alt={`mouth ${index}`} />
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
              {clothes.map((img, index) => (
                <div
                  onClick={() => handleChangeHairStyle("clothstyle", img)}
                  className="cursor-pointer hover:scale-105 transition"
                >
                  <Image src={img} alt={`cloth ${index}`} />
                </div>
              ))}
            </div>
          </AccordionItemPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default StyleOption;
