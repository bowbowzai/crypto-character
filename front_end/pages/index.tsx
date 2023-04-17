import { useEffect, useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import truncateEthAddress from "truncate-eth-address";
import { eyes } from "@/assets/eyes";
import { hairs } from "@/assets/hairstyle";
import { mouths } from "@/assets/mouth";
import { clothes } from "@/assets/clothes";
import { head } from "@/assets";
import { LightDark, StyleOption, SideMenu } from "@/components";

export default function Home() {
  const [themeMode, setThemekMode] = useState("");
  const [characterDesign, setCharacterDesign] = useState({
    hairstyle: hairs[0],
    eyestyle: eyes[0],
    mouthstyle: mouths[0],
    clothstyle: clothes[0],
  });

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
    <main className="h-screen bg-white dark:bg-black">
      <div className="fixed top-4 left-4">
        <ConnectButton />
      </div>
      <h1 className="text-center py-10 font-press-start text-5xl dark:text-gray-300">
        Crypto Character
      </h1>
      {/* character */}
      <div className="fixed left-[50%] -translate-x-[50%] w-[300px]">
        <div className="relative select-none">
          {/* cloth */}
          <Image
            src={characterDesign.clothstyle}
            alt="cloth"
            className="absolute top-[80px] left-[50%] -translate-x-[55%] w-[200px]"
          />
          {/* hair */}
          <Image
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
          />
          {/* eye */}
          <Image
            src={characterDesign.eyestyle}
            alt="eye"
            className="absolute top-[40px] left-[50%] -translate-x-[32.5px] w-[45px]"
          />
          {/* nose */}
          <div className="absolute left-[139px] top-[58px] h-[3px] w-[0.1px] bg-gray-400"></div>
          {/* mouth */}
          <Image
            src={characterDesign.mouthstyle}
            alt="mouth"
            className="absolute top-[67px] left-[50%] -translate-x-[109%] w-4"
          />
        </div>
        {/* ownership */}
        <div className="z-[30] relative dark:text-white">
          {/* hair ownership */}
          <div>
            <div className="absolute top-0 -left-[50px] ">
              <div>
                Hair owned by: <br />
                {truncateEthAddress(
                  "0xC8965DD608a2a1293027E42Bf63c5E180436591d"
                )}
              </div>
              <div className="absolute top-[25px] -right-[70px] w-[70px] h-[1px] bg-white">
                <div className="absolute -top-[3.5px] right-0 w-[7px] h-[7px] rounded-full bg-white border border-1 border-blue-300"></div>
              </div>
            </div>
          </div>
          {/* eyes ownership */}
          <div>
            <div className="absolute top-[20px] -right-[35px] ">
              <div>
                Eye owned by: <br />
                {truncateEthAddress(
                  "0xC8965DD608a2a1293027E42Bf63c5E180436591d"
                )}
              </div>
              <div className="absolute top-[25px] -left-[70px] w-[70px] h-[1px] bg-white">
                <div className="absolute -top-[3.5px] left-0 w-[7px] h-[7px] rounded-full bg-white border border-1 border-blue-300"></div>
              </div>
            </div>
          </div>
          {/* mouth ownership */}
          <div>
            <div className="absolute top-[50px] -left-[60px] ">
              <div>
                Mouth owned by: <br />
                {truncateEthAddress(
                  "0xC8965DD608a2a1293027E42Bf63c5E180436591d"
                )}
              </div>
              <div className="absolute top-[25px] -right-[70px] w-[70px] h-[1px] bg-white">
                <div className="absolute -top-[3.5px] right-0 w-[7px] h-[7px] rounded-full bg-white border border-1 border-blue-300"></div>
              </div>
            </div>
          </div>
          {/* cloth ownership */}
          <div>
            <div className="absolute top-[130px] -right-[65px] ">
              <div>
                Cloth owned by: <br />
                {truncateEthAddress(
                  "0xC8965DD608a2a1293027E42Bf63c5E180436591d"
                )}
              </div>
              <div className="absolute top-[25px] -left-[70px] w-[70px] h-[1px] bg-white">
                <div className="absolute -top-[3.5px] left-0 w-[7px] h-[7px] rounded-full bg-white border border-1 border-blue-300"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* style selection */}
      <div className="w-[30%] fixed right-0 top-0 bottom-0">
        <StyleOption setCharacterDesign={setCharacterDesign} />
      </div>

      {/* side menu */}
      <SideMenu />
      {/* light/dark mode toogle */}
      <LightDark themeMode={themeMode} setThemeMode={setThemekMode} />
    </main>
  );
}
