import { useEffect, useState, useRef } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import truncateEthAddress from "truncate-eth-address";
import html2canvas from "html2canvas";
import htmlToImage from "html-to-image";
import { head } from "@/assets";
import { LightDark, StyleOption, SideMenu, Loading } from "@/components";
import { Character } from "@/types/TCharacter";
import { useCharacter } from "@/hooks";
import getIPFSImage from "@/hooks/useIPFSImage";

export default function Home() {
  const [isCharacterLoading, setIsCharacterLoading] = useState(true);
  const [themeMode, setThemekMode] = useState("");
  const [characterDesign, setCharacterDesign] = useState({
    hairstyle: "",
    eyestyle: "",
    mouthstyle: "",
    clothstyle: "",
  });
  const [highestBid, setHighestBid] = useState({
    hair: "",
    eye: "",
    mouth: "",
    cloth: "",
  });

  const { data: characterData, refetch: getCharacterRefetch } = useCharacter(
    handleGetCharacterSuccess
  );

  async function handleGetCharacterSuccess(character: Character) {
    const hair = character.hair;
    const eye = character.eye;
    const mouth = character.mouth;
    const cloth = character.cloth;

    const hairURL = await getIPFSImage(hair?.styleURI ?? "");
    const eyeURL = await getIPFSImage(eye?.styleURI ?? "");
    const mouthURL = await getIPFSImage(mouth?.styleURI ?? "");
    const clothURL = await getIPFSImage(cloth?.styleURI ?? "");

    setCharacterDesign((prev) => ({
      hairstyle: hairURL,
      eyestyle: eyeURL,
      mouthstyle: mouthURL,
      clothstyle: clothURL,
    }));

    setHighestBid({
      hair: hair?.highestBid.toString() ?? "",
      eye: eye?.highestBid.toString() ?? "",
      mouth: mouth?.highestBid.toString() ?? "",
      cloth: cloth?.highestBid.toString() ?? "",
    });

    setIsCharacterLoading(false);
  }

  const handleExport = async () => {
    const element = document.getElementById("print"),
      canvas = await html2canvas(element!),
      data = canvas.toDataURL("image/jpg"),
      link = document.createElement("a");

    link.href = data;
    link.download = "downloaded-image.jpg";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setThemekMode("dark");
      document.documentElement.classList.add("dark");
    } else {
      setThemekMode("light");
      document.documentElement.classList.remove("dark");
    }
  }, [themeMode]);

  return (
    <main
      id="print"
      className="font-press-start h-screen bg-white dark:bg-black min-w-[450px] min-h-screen"
    >
      <div className="fixed top-4 left-4">
        <ConnectButton />
      </div>
      <h1 className="text-xl pt-20 pb-5 md:py-10  md:text-2xl lg:text-5xl text-center font-press-start  dark:text-gray-300">
        Crypto Character
      </h1>
      {/* character */}
      {isCharacterLoading ? (
        <div className="fixed left-[50%] -translate-x-[50%] top-[50%] -translate-y-[50%]">
          <Loading />
        </div>
      ) : (
        <div>
          <div className="fixed left-[50%] -translate-x-[50%] w-[300px]">
            {/* character */}
            <div className="crypto-character relative select-none">
              {/* cloth */}
              <img
                src={characterDesign.clothstyle}
                alt="cloth"
                className="absolute top-[80px] left-[50%] -translate-x-[55%] w-[200px] select-none"
                draggable={false}
              />
              {/* hair */}
              <img
                src={characterDesign.hairstyle}
                alt="hair"
                className="absolute -top-[15px] left-[50%] -translate-x-[79.5px] z-[10] w-[140px]"
                draggable={false}
              />
              {/* head */}
              <Image
                src={head}
                alt="head"
                className="absolute left-[50%] -translate-x-[57%] top-[3px] w-[100px] h-[120px]"
                draggable={false}
              />
              {/* eye */}
              <img
                src={characterDesign.eyestyle}
                alt="eye"
                className="absolute top-[40px] left-[50%] -translate-x-[32.5px] w-[45px]"
                draggable={false}
              />
              {/* nose */}
              <div className="absolute left-[139px] top-[58px] h-[3px] w-[0.1px] bg-gray-400"></div>
              {/* mouth */}
              <img
                src={characterDesign.mouthstyle}
                alt="mouth"
                className="absolute top-[67px] left-[50%] -translate-x-[109%] w-4"
                draggable={false}
              />
            </div>
            {/* ownership */}
            <div className="z-[30] relative dark:text-white text-sm">
              {/* hair ownership */}
              <div>
                <div className="absolute top-0 -left-[50px] ">
                  <div>
                    Hair owned by: <br />
                    {truncateEthAddress(characterData?.hair?.owner ?? "")}
                  </div>
                  <div className="absolute top-[25px] -right-[70px] w-[70px] h-[1px] bg-black dark:bg-white ">
                    <div className="absolute -top-[3.5px] right-0 w-[7px] h-[7px] rounded-full bg-white border border-1 border-blue-300"></div>
                  </div>
                </div>
              </div>
              {/* eyes ownership */}
              <div>
                <div className="absolute top-[20px] -right-[35px] ">
                  <div>
                    Eye owned by: <br />
                    {truncateEthAddress(characterData?.eye?.owner ?? "")}
                  </div>
                  <div className="absolute top-[25px] -left-[70px] w-[70px] h-[1px] bg-black dark:bg-white ">
                    <div className="absolute -top-[3.5px] left-0 w-[7px] h-[7px] rounded-full bg-white border border-1 border-blue-300"></div>
                  </div>
                </div>
              </div>
              {/* mouth ownership */}
              <div>
                <div className="absolute top-[50px] -left-[60px] ">
                  <div>
                    Mouth owned by: <br />
                    {truncateEthAddress(characterData?.mouth?.owner ?? "")}
                  </div>
                  <div className="absolute top-[25px] -right-[70px] w-[70px] h-[1px] bg-black dark:bg-white ">
                    <div className="absolute -top-[3.5px] right-0 w-[7px] h-[7px] rounded-full bg-white border border-1 border-blue-300"></div>
                  </div>
                </div>
              </div>
              {/* cloth ownership */}
              <div>
                <div className="absolute top-[130px] -right-[65px] ">
                  <div>
                    Cloth owned by: <br />
                    {truncateEthAddress(characterData?.cloth?.owner ?? "")}
                  </div>
                  <div className="absolute top-[25px] -left-[70px] w-[70px] h-[1px] bg-black dark:bg-white ">
                    <div className="absolute -top-[3.5px] left-0 w-[7px] h-[7px] rounded-full bg-white border border-1 border-blue-300"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* style selection */}
          <div className="hidden md:block w-[30%] fixed right-0 top-0 bottom-0">
            <StyleOption
              highestBid={highestBid}
              getCharacterRefetch={getCharacterRefetch}
            />
          </div>
        </div>
      )}

      {/* side menu */}
      <SideMenu handleExport={handleExport} />
      {/* light/dark mode toogle */}
      <LightDark themeMode={themeMode} setThemeMode={setThemekMode} />
    </main>
  );
}
