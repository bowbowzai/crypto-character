import React, { useEffect, useState } from "react";

interface SideMenuProps {
  handleExport: () => void;
}

const SideMenu = ({ handleExport }: SideMenuProps) => {
  return (
    <div className="hidden sm:block fixed right-0 bottom-0 md:right-auto md:bottom-auto md:top-[50%] md:-translate-y-[50%] md:left-0 drop-shadow-lg py-3 px-3 border border-l-1 border-r-0 md:border-r-2 md:border-l-0 border-black rounded-tl-md rounded-bl-md md:rounded-bl-none md:rounded-tl-none md:rounded-tr-md md:rounded-br-md dark:text-gray-300 dark:border-white">
      <div onClick={handleExport} className="hover-flow">
        Export Image
      </div>
      <div
        className="hover-flow"
        onClick={() => {
          const url = `https://mumbai.polygonscan.com/address/0x3Ae5A3E073Ae97EC4F53665E9D41EdD94D956cd9`;
          window.open(url, "_blank", "noopener,noreferrer");
        }}
      >
        See Contract
      </div>
    </div>
  );
};

export default SideMenu;
